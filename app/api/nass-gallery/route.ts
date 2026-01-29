import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createNassGallerySchema } from "@/lib/validations/nass-gallery";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/api/response";

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
      return successResponse(gallery);
    }

    const galleries = await prisma.nassGallery.findMany({
      include: {
        images: { orderBy: { order: "asc" } },
        features: { orderBy: { order: "asc" } },
      },
      orderBy: { order: "asc" },
    });
    return successResponse(galleries);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return errorResponse("Failed to fetch galleries");
  }
}

// POST - Create new gallery
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();

    // Validate request body
    const validation = createNassGallerySchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    // Separate images and features from the main body
    const { images, features, ...galleryData } = validation.data;

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

    return successResponse(gallery, "Gallery created successfully");
  } catch (error) {
    console.error("Error creating gallery:", error);
    return errorResponse("Failed to create gallery");
  }
}
