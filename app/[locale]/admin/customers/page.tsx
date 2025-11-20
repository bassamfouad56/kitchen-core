import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CustomersListClient from "./CustomersListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CustomersPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const customers = await prisma.customer.findMany({
    include: {
      projects: {
        select: {
          id: true,
          titleEn: true,
          titleAr: true,
          category: true,
          year: true,
        },
      },
      _count: {
        select: {
          projects: true,
          interactions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Get unique values for filters
  const statuses = ["ACTIVE", "INACTIVE", "SUSPENDED", "CLOSED"];
  const types = ["INDIVIDUAL", "BUSINESS", "CORPORATE", "GOVERNMENT"];

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
          <p className="text-gray-600">
            Manage your customer database and relationships
          </p>
        </div>
        <a
          href={`/${locale}/admin/customers/new`}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add New Customer
        </a>
      </div>

      <CustomersListClient
        customers={customers}
        statuses={statuses}
        types={types}
        locale={locale}
      />
    </div>
  );
}
