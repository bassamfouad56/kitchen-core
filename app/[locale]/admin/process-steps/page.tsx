import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProcessStepsListClient from "./ProcessStepsListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProcessStepsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const processSteps = await prisma.processStep.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Process Steps</h1>
          <p className="text-gray-600">
            Manage the process timeline displayed on the homepage
          </p>
        </div>
        <a
          href={`/${locale}/admin/process-steps/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Step
        </a>
      </div>

      <ProcessStepsListClient processSteps={processSteps} locale={locale} />
    </div>
  );
}
