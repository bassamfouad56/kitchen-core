import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CTASectionClient from "./CTASectionClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CTASectionPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  // Fetch or auto-create the singleton CTA section
  let cta = await prisma.cTASection.findFirst();

  if (!cta) {
    cta = await prisma.cTASection.create({
      data: {
        badgeEn: "Get Started",
        badgeAr: "ابدأ الآن",
        titleEn: "Ready to Transform Your Space?",
        titleAr: "هل أنت مستعد لتحويل مساحتك؟",
        descriptionEn:
          "Contact us today to discuss your project and get a free consultation.",
        descriptionAr:
          "اتصل بنا اليوم لمناقشة مشروعك والحصول على استشارة مجانية.",
        buttonTextEn: "Contact Us",
        buttonTextAr: "اتصل بنا",
        buttonLink: "/contact",
        published: true,
      },
    });
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Call-to-Action Section</h1>
        <p className="text-gray-600">
          Manage the global CTA section displayed across the site
        </p>
      </div>

      <CTASectionClient cta={cta} locale={locale} />
    </div>
  );
}
