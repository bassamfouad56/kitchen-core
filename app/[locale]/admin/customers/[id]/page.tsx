import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CustomerDetailsClient from "./CustomerDetailsClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function CustomerDetailsPage({ params }: Props) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      projects: {
        select: {
          id: true,
          titleEn: true,
          titleAr: true,
          slug: true,
          category: true,
          location: true,
          year: true,
          area: true,
          budget: true,
          published: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
      interactions: {
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          projects: true,
          interactions: true,
        },
      },
    },
  });

  if (!customer) {
    redirect(`/${locale}/admin/customers`);
  }

  return (
    <div className="p-8">
      <CustomerDetailsClient customer={customer} locale={locale} />
    </div>
  );
}
