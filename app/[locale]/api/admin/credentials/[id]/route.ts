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
    const credential = await prisma.credential.findUnique({
      where: { id },
    });

    if (!credential) {
      return NextResponse.json(
        { error: "Credential not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(credential);
  } catch (error) {
    console.error("Error fetching credential:", error);
    return NextResponse.json(
      { error: "Failed to fetch credential" },
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

    if (!data.titleEn || !data.titleAr || !data.issuer) {
      return NextResponse.json(
        { error: "English title, Arabic title, and issuer are required" },
        { status: 400 },
      );
    }

    const credential = await prisma.credential.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        issuer: data.issuer,
        image: data.image || null,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        year: data.year || null,
        order: data.order ?? 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(credential);
  } catch (error) {
    console.error("Error updating credential:", error);
    return NextResponse.json(
      { error: "Failed to update credential" },
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
    await prisma.credential.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting credential:", error);
    return NextResponse.json(
      { error: "Failed to delete credential" },
      { status: 500 },
    );
  }
}
