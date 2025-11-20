import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CredentialsClient from "./CredentialsClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CredentialsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const credentials = await prisma.credential.findMany({
    orderBy: [{ order: "asc" }],
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Credentials & Certifications
        </h1>
        <p className="text-gray-600">
          Manage professional certifications, credentials, and awards
        </p>
      </div>

      <CredentialsClient credentials={credentials} locale={locale} />
    </div>
  );
}
