import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditProcessStepClient from "./EditProcessStepClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditProcessStepPage({ params }: Props) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const processStep = await prisma.processStep.findUnique({
    where: { id },
  });

  if (!processStep) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Process Step</h1>
        <p className="text-gray-600">Update process step details</p>
      </div>

      <EditProcessStepClient processStep={processStep} locale={locale} />
    </div>
  );
}
