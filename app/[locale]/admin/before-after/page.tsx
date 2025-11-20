import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BeforeAfterClient from "./BeforeAfterClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BeforeAfterPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const items = await prisma.beforeAfter.findMany({
    orderBy: [{ order: "asc" }],
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Before/After Gallery</h1>
        <p className="text-gray-600">
          Manage before and after comparison images
        </p>
      </div>

      <BeforeAfterClient items={items} locale={locale} />
    </div>
  );
}
