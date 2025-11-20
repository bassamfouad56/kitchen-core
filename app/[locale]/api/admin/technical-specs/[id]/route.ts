import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const spec = await prisma.technicalSpec.findUnique({
      where: { id },
    });

    if (!spec) {
      return NextResponse.json({ error: "Spec not found" }, { status: 404 });
    }

    return NextResponse.json(spec);
  } catch (error) {
    console.error("Error fetching technical spec:", error);
    return NextResponse.json(
      { error: "Failed to fetch technical spec" },
      { status: 500 },
    );
  }
}

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

    if (
      !data.titleEn ||
      !data.titleAr ||
      !data.descriptionEn ||
      !data.descriptionAr ||
      !data.icon ||
      !data.category
    ) {
      return NextResponse.json(
        {
          error:
            "English title, Arabic title, descriptions, icon, and category are required",
        },
        { status: 400 },
      );
    }

    const spec = await prisma.technicalSpec.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        icon: data.icon,
        category: data.category,
        order: data.order ?? 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(spec);
  } catch (error) {
    console.error("Error updating technical spec:", error);
    return NextResponse.json(
      { error: "Failed to update technical spec" },
      { status: 500 },
    );
  }
}

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
    await prisma.technicalSpec.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting technical spec:", error);
    return NextResponse.json(
      { error: "Failed to delete technical spec" },
      { status: 500 },
    );
  }
}
