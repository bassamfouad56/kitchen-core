import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import NewPartnershipClient from "./NewPartnershipClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewPartnershipPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Partnership</h1>
        <p className="text-gray-600">Add a new brand partner to the website</p>
      </div>

      <NewPartnershipClient locale={locale} />
    </div>
  );
}
