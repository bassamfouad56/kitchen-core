import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PartnershipsListClient from "./PartnershipsListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PartnershipsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const partnerships = await prisma.partnership.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Partnership Management</h1>
        <p className="text-gray-600">
          Manage brand partner logos displayed on the website
        </p>
      </div>

      <PartnershipsListClient partnerships={partnerships} locale={locale} />
    </div>
  );
}
