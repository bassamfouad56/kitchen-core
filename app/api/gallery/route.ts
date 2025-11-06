import { NextRequest } from 'next/server';
import {
  successResponse,
  handleApiError,
  paginatedResponse
} from '@/lib/api/response';
import { requireAuth } from '@/lib/api/auth';
import { getGalleryImages } from '@/lib/db/content';
import { createGalleryImageSchema, galleryQuerySchema } from '@/lib/validations/gallery';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/gallery
 * Get gallery images with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const query = galleryQuerySchema.parse({
      category: searchParams.get('category'),
      size: searchParams.get('size'),
      published: searchParams.get('published'),
      page: searchParams.get('page') || '1',
      pageSize: searchParams.get('pageSize') || '20',
    });

    const { images, total } = await getGalleryImages(query);

    return paginatedResponse(images, query.page, query.pageSize, total);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/gallery
 * Create a new gallery image (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createGalleryImageSchema.parse(body);

    // Create gallery image
    const image = await prisma.galleryImage.create({
      data: validatedData,
    });

    return successResponse(image, 'Gallery image created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
