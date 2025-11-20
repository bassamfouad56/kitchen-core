import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single partnership
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
    const partnership = await prisma.partnership.findUnique({
      where: { id },
    });

    if (!partnership) {
      return NextResponse.json(
        { error: "Partnership not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(partnership);
  } catch (error) {
    console.error("Error fetching partnership:", error);
    return NextResponse.json(
      { error: "Failed to fetch partnership" },
      { status: 500 },
    );
  }
}

// PUT - Update partnership
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
    if (!data.nameEn || !data.nameAr) {
      return NextResponse.json(
        { error: "Both English and Arabic names are required" },
        { status: 400 },
      );
    }

    // Update partnership
    const partnership = await prisma.partnership.update({
      where: { id },
      data: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        logo: data.logo || null,
        url: data.url || null,
        order: data.order ?? 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(partnership);
  } catch (error) {
    console.error("Error updating partnership:", error);
    return NextResponse.json(
      { error: "Failed to update partnership" },
      { status: 500 },
    );
  }
}

// DELETE - Delete partnership
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
    await prisma.partnership.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting partnership:", error);
    return NextResponse.json(
      { error: "Failed to delete partnership" },
      { status: 500 },
    );
  }
}
