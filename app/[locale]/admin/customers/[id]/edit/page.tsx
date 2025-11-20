import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditCustomerClient from "./EditCustomerClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditCustomerPage({ params }: Props) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    redirect(`/${locale}/admin/customers`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Customer</h1>
        <p className="text-gray-600">Update customer information</p>
      </div>

      <EditCustomerClient customer={customer} locale={locale} />
    </div>
  );
}
