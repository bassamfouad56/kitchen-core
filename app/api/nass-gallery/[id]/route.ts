import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single gallery by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const gallery = await prisma.nassGallery.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
        features: { orderBy: { order: "asc" } },
      },
    });

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 },
    );
  }
}

// PUT - Update gallery
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
    const { images, features, ...galleryData } = body;

    // Delete existing images and features, then create new ones
    await prisma.nassImage.deleteMany({
      where: { galleryId: id },
    });

    await prisma.nassFeature.deleteMany({
      where: { galleryId: id },
    });

    const gallery = await prisma.nassGallery.update({
      where: { id },
      data: {
        ...galleryData,
        images:
          images && images.length > 0
            ? {
                create: images,
              }
            : undefined,
        features:
          features && features.length > 0
            ? {
                create: features,
              }
            : undefined,
      },
      include: {
        images: { orderBy: { order: "asc" } },
        features: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error updating gallery:", error);
    return NextResponse.json(
      { error: "Failed to update gallery" },
      { status: 500 },
    );
  }
}

// DELETE - Delete gallery
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
    // Images and features will be cascade deleted due to schema
    await prisma.nassGallery.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery" },
      { status: 500 },
    );
  }
}
