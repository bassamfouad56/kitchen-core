import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single process step
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
    const processStep = await prisma.processStep.findUnique({
      where: { id },
    });

    if (!processStep) {
      return NextResponse.json(
        { error: "Process step not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(processStep);
  } catch (error) {
    console.error("Error fetching process step:", error);
    return NextResponse.json(
      { error: "Failed to fetch process step" },
      { status: 500 },
    );
  }
}

// PUT - Update process step
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

    const processStep = await prisma.processStep.update({
      where: { id },
      data: {
        number: data.number,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        duration: data.duration,
        iconName: data.iconName,
        order: data.order,
        published: data.published,
      },
    });

    return NextResponse.json(processStep);
  } catch (error) {
    console.error("Error updating process step:", error);
    return NextResponse.json(
      { error: "Failed to update process step" },
      { status: 500 },
    );
  }
}

// DELETE - Delete process step
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
    await prisma.processStep.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting process step:", error);
    return NextResponse.json(
      { error: "Failed to delete process step" },
      { status: 500 },
    );
  }
}
