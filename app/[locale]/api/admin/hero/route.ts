import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Fetch hero section
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const heroSection = await prisma.heroSection.findFirst();
    return NextResponse.json(heroSection);
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero section" },
      { status: 500 },
    );
  }
}

// POST - Create hero section
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Check if hero section already exists (singleton)
    const existing = await prisma.heroSection.findFirst();
    if (existing) {
      return NextResponse.json(
        { error: "Hero section already exists. Use PUT to update." },
        { status: 400 },
      );
    }

    const heroSection = await prisma.heroSection.create({
      data: {
        badgeEn: data.badgeEn,
        badgeAr: data.badgeAr,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        titleHighlightEn: data.titleHighlightEn,
        titleHighlightAr: data.titleHighlightAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        backgroundImage: data.backgroundImage,
        cta1TextEn: data.cta1TextEn,
        cta1TextAr: data.cta1TextAr,
        cta1Link: data.cta1Link,
        cta2TextEn: data.cta2TextEn,
        cta2TextAr: data.cta2TextAr,
        cta2Link: data.cta2Link,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(heroSection);
  } catch (error) {
    console.error("Error creating hero section:", error);
    return NextResponse.json(
      { error: "Failed to create hero section" },
      { status: 500 },
    );
  }
}

// PUT - Update hero section
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Find existing hero section
    const existing = await prisma.heroSection.findFirst();
    if (!existing) {
      return NextResponse.json(
        { error: "Hero section not found. Use POST to create." },
        { status: 404 },
      );
    }

    const heroSection = await prisma.heroSection.update({
      where: { id: existing.id },
      data: {
        badgeEn: data.badgeEn,
        badgeAr: data.badgeAr,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        titleHighlightEn: data.titleHighlightEn,
        titleHighlightAr: data.titleHighlightAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        backgroundImage: data.backgroundImage,
        cta1TextEn: data.cta1TextEn,
        cta1TextAr: data.cta1TextAr,
        cta1Link: data.cta1Link,
        cta2TextEn: data.cta2TextEn,
        cta2TextAr: data.cta2TextAr,
        cta2Link: data.cta2Link,
        published: data.published,
      },
    });

    return NextResponse.json(heroSection);
  } catch (error) {
    console.error("Error updating hero section:", error);
    return NextResponse.json(
      { error: "Failed to update hero section" },
      { status: 500 },
    );
  }
}
