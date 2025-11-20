import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TechnicalSpecsClient from "./TechnicalSpecsClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TechnicalSpecsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const specs = await prisma.technicalSpec.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const categories = Array.from(new Set(specs.map((s) => s.category))).sort();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Technical Specifications</h1>
        <p className="text-gray-600">Manage technical specs and features</p>
      </div>

      <TechnicalSpecsClient
        specs={specs}
        categories={categories}
        locale={locale}
      />
    </div>
  );
}
