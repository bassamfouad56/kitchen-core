import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditPartnershipClient from "./EditPartnershipClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditPartnershipPage({ params }: Props) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const partnership = await prisma.partnership.findUnique({
    where: { id },
  });

  if (!partnership) {
    redirect(`/${locale}/admin/partnerships`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Partnership</h1>
        <p className="text-gray-600">Update brand partner information</p>
      </div>

      <EditPartnershipClient partnership={partnership} locale={locale} />
    </div>
  );
}
