import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - List all galleries or get by collectionKey
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collectionKey = searchParams.get("collectionKey");

    if (collectionKey) {
      const gallery = await prisma.nassGallery.findUnique({
        where: { collectionKey },
        include: {
          images: { orderBy: { order: "asc" } },
          features: { orderBy: { order: "asc" } },
        },
      });
      return NextResponse.json(gallery);
    }

    const galleries = await prisma.nassGallery.findMany({
      include: {
        images: { orderBy: { order: "asc" } },
        features: { orderBy: { order: "asc" } },
      },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(galleries);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 },
    );
  }
}

// POST - Create new gallery
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Separate images and features from the main body
    const { images, features, ...galleryData } = body;

    const gallery = await prisma.nassGallery.create({
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

    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery:", error);
    return NextResponse.json(
      { error: "Failed to create gallery" },
      { status: 500 },
    );
  }
}
