import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import NewUserClient from "./NewUserClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewUserPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New User</h1>
        <p className="text-gray-600">Add a new admin user to the system</p>
      </div>

      <NewUserClient locale={locale} />
    </div>
  );
}
