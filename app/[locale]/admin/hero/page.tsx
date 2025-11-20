import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import HeroSectionClient from "./HeroSectionClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HeroSectionPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  // Fetch existing hero section (singleton)
  const heroSection = await prisma.heroSection.findFirst();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hero Section Management</h1>
        <p className="text-gray-600">
          Control the main homepage hero banner (badge, title, description,
          CTAs, background)
        </p>
      </div>

      <HeroSectionClient heroSection={heroSection} locale={locale} />
    </div>
  );
}
