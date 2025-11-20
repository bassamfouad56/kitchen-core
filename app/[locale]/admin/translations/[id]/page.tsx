import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditTranslationClient from "./EditTranslationClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditTranslationPage({ params }: Props) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const translation = await prisma.uITranslation.findUnique({
    where: { id },
  });

  if (!translation) {
    redirect(`/${locale}/admin/translations`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Translation</h1>
        <p className="text-gray-600">Update UI translation text</p>
      </div>

      <EditTranslationClient translation={translation} locale={locale} />
    </div>
  );
}
