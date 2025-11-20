import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EngineeringMetricsClient from "./EngineeringMetricsClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EngineeringMetricsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const metrics = await prisma.engineeringMetric.findMany({
    orderBy: [{ order: "asc" }],
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Engineering Metrics</h1>
        <p className="text-gray-600">
          Manage engineering statistics and performance metrics
        </p>
      </div>

      <EngineeringMetricsClient metrics={metrics} locale={locale} />
    </div>
  );
}
