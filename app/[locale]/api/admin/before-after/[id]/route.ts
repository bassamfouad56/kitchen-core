import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single before/after item
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
    const item = await prisma.beforeAfter.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching before/after item:", error);
    return NextResponse.json(
      { error: "Failed to fetch before/after item" },
      { status: 500 },
    );
  }
}

// PUT - Update before/after item
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
    if (
      !data.titleEn ||
      !data.titleAr ||
      !data.beforeImage ||
      !data.afterImage
    ) {
      return NextResponse.json(
        {
          error:
            "English title, Arabic title, before image, and after image are required",
        },
        { status: 400 },
      );
    }

    const item = await prisma.beforeAfter.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        order: data.order ?? 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error updating before/after item:", error);
    return NextResponse.json(
      { error: "Failed to update before/after item" },
      { status: 500 },
    );
  }
}

// DELETE - Delete before/after item
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
    await prisma.beforeAfter.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting before/after item:", error);
    return NextResponse.json(
      { error: "Failed to delete before/after item" },
      { status: 500 },
    );
  }
}
