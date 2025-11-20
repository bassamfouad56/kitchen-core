import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single translation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const translation = await prisma.uITranslation.findUnique({
      where: { id },
    });

    if (!translation) {
      return NextResponse.json(
        { error: "Translation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(translation);
  } catch (error) {
    console.error("Error fetching translation:", error);
    return NextResponse.json(
      { error: "Failed to fetch translation" },
      { status: 500 },
    );
  }
}

// PUT - Update translation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const data = await request.json();

    // Validation
    if (!data.key || !data.category || !data.textEn || !data.textAr) {
      return NextResponse.json(
        { error: "Key, category, English text, and Arabic text are required" },
        { status: 400 },
      );
    }

    // Check if key is already taken by another translation
    const existingTranslation = await prisma.uITranslation.findFirst({
      where: {
        key: data.key,
        NOT: { id },
      },
    });

    if (existingTranslation) {
      return NextResponse.json(
        { error: "This key is already in use by another translation" },
        { status: 400 },
      );
    }

    // Update translation
    const translation = await prisma.uITranslation.update({
      where: { id },
      data: {
        key: data.key,
        category: data.category,
        textEn: data.textEn,
        textAr: data.textAr,
        description: data.description || null,
        order: data.order ?? 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(translation);
  } catch (error) {
    console.error("Error updating translation:", error);
    return NextResponse.json(
      { error: "Failed to update translation" },
      { status: 500 },
    );
  }
}

// DELETE - Delete translation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.uITranslation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting translation:", error);
    return NextResponse.json(
      { error: "Failed to delete translation" },
      { status: 500 },
    );
  }
}
