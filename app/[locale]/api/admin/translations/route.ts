import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - List all translations
export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const translations = await prisma.uITranslation.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    return NextResponse.json(translations);
  } catch (error) {
    console.error("Error fetching translations:", error);
    return NextResponse.json(
      { error: "Failed to fetch translations" },
      { status: 500 },
    );
  }
}

// POST - Create new translation
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (!data.key || !data.category || !data.textEn || !data.textAr) {
      return NextResponse.json(
        { error: "Key, category, English text, and Arabic text are required" },
        { status: 400 },
      );
    }

    // Check if key already exists
    const existingTranslation = await prisma.uITranslation.findUnique({
      where: { key: data.key },
    });

    if (existingTranslation) {
      return NextResponse.json(
        { error: "A translation with this key already exists" },
        { status: 400 },
      );
    }

    // Create translation
    const translation = await prisma.uITranslation.create({
      data: {
        key: data.key,
        category: data.category,
        textEn: data.textEn,
        textAr: data.textAr,
        description: data.description || null,
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(translation, { status: 201 });
  } catch (error) {
    console.error("Error creating translation:", error);
    return NextResponse.json(
      { error: "Failed to create translation" },
      { status: 500 },
    );
  }
}
