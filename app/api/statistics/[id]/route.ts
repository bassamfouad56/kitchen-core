import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const statistic = await prisma.statistic.findUnique({
      where: { id },
    });

    if (!statistic) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(statistic);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch statistic" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const statistic = await prisma.statistic.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(statistic);
  } catch (error) {
    console.error("Error updating statistic:", error);
    return NextResponse.json(
      { error: "Failed to update statistic" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.statistic.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting statistic:", error);
    return NextResponse.json(
      { error: "Failed to delete statistic" },
      { status: 500 },
    );
  }
}
