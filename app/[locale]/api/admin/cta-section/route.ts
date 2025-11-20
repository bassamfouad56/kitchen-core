import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let cta = await prisma.cTASection.findFirst();

    // Auto-create if doesn't exist (singleton pattern)
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

    return NextResponse.json(cta);
  } catch (error) {
    console.error("Error fetching CTA section:", error);
    return NextResponse.json(
      { error: "Failed to fetch CTA section" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (
      !data.badgeEn ||
      !data.badgeAr ||
      !data.titleEn ||
      !data.titleAr ||
      !data.descriptionEn ||
      !data.descriptionAr ||
      !data.buttonTextEn ||
      !data.buttonTextAr ||
      !data.buttonLink
    ) {
      return NextResponse.json(
        { error: "All bilingual fields and button link are required" },
        { status: 400 },
      );
    }

    // Get the existing CTA (should always exist)
    const existingCta = await prisma.cTASection.findFirst();

    if (!existingCta) {
      return NextResponse.json(
        { error: "CTA section not found" },
        { status: 404 },
      );
    }

    const cta = await prisma.cTASection.update({
      where: { id: existingCta.id },
      data: {
        badgeEn: data.badgeEn,
        badgeAr: data.badgeAr,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        buttonTextEn: data.buttonTextEn,
        buttonTextAr: data.buttonTextAr,
        buttonLink: data.buttonLink,
        image: data.image || null,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(cta);
  } catch (error) {
    console.error("Error updating CTA section:", error);
    return NextResponse.json(
      { error: "Failed to update CTA section" },
      { status: 500 },
    );
  }
}
