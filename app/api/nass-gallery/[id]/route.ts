import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateNassGallerySchema } from "@/lib/validations/nass-gallery";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
} from "@/lib/api/response";

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
      return notFoundResponse("Gallery");
    }

    return successResponse(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return errorResponse("Failed to fetch gallery");
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
      return errorResponse("Unauthorized", 401);
    }

    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validation = updateNassGallerySchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    // Check if gallery exists
    const existing = await prisma.nassGallery.findUnique({
      where: { id },
    });

    if (!existing) {
      return notFoundResponse("Gallery");
    }

    const { images, features, ...galleryData } = validation.data;

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

    return successResponse(gallery, "Gallery updated successfully");
  } catch (error) {
    console.error("Error updating gallery:", error);
    return errorResponse("Failed to update gallery");
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
      return errorResponse("Unauthorized", 401);
    }

    const { id } = await params;

    // Check if gallery exists
    const existing = await prisma.nassGallery.findUnique({
      where: { id },
    });

    if (!existing) {
      return notFoundResponse("Gallery");
    }

    // Images and features will be cascade deleted due to schema
    await prisma.nassGallery.delete({
      where: { id },
    });

    return successResponse(null, "Gallery deleted successfully");
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return errorResponse("Failed to delete gallery");
  }
}
