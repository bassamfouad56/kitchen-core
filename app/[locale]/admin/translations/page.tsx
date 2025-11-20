import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TranslationsListClient from "./TranslationsListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TranslationsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  // Get all translations
  const translations = await prisma.uITranslation.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  // Get unique categories
  const categories = Array.from(
    new Set(translations.map((t) => t.category)),
  ).sort();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UI Translation Management</h1>
        <p className="text-gray-600">
          Manage all website text translations (English & Arabic)
        </p>
      </div>

      <TranslationsListClient
        translations={translations}
        categories={categories}
        locale={locale}
      />
    </div>
  );
}
