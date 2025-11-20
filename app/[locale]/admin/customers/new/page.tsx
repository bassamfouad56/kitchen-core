import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import NewCustomerClient from "./NewCustomerClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewCustomerPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Customer</h1>
        <p className="text-gray-600">Create a new customer record</p>
      </div>

      <NewCustomerClient locale={locale} />
    </div>
  );
}
