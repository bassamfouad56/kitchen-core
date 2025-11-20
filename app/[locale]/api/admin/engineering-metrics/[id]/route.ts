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
    const metric = await prisma.engineeringMetric.findUnique({
      where: { id },
    });

    if (!metric) {
      return NextResponse.json(
        { error: "Engineering metric not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(metric);
  } catch (error) {
    console.error("Error fetching engineering metric:", error);
    return NextResponse.json(
      { error: "Failed to fetch engineering metric" },
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

    if (!data.number || !data.labelEn || !data.labelAr) {
      return NextResponse.json(
        { error: "Number, English label, and Arabic label are required" },
        { status: 400 },
      );
    }

    const metric = await prisma.engineeringMetric.update({
      where: { id },
      data: {
        number: data.number,
        labelEn: data.labelEn,
        labelAr: data.labelAr,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        icon: data.icon || null,
        order: data.order ?? 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(metric);
  } catch (error) {
    console.error("Error updating engineering metric:", error);
    return NextResponse.json(
      { error: "Failed to update engineering metric" },
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
    await prisma.engineeringMetric.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting engineering metric:", error);
    return NextResponse.json(
      { error: "Failed to delete engineering metric" },
      { status: 500 },
    );
  }
}
