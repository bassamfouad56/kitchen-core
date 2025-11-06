import { NextRequest } from 'next/server';
import { successResponse, handleApiError } from '@/lib/api/response';
import { requireAuth } from '@/lib/api/auth';
import { getServices } from '@/lib/db/content';
import { createServiceSchema } from '@/lib/validations/service';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/services
 * Get all services
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    const services = await getServices({
      published: published === 'true' ? true : undefined,
    });

    return successResponse(services);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/services
 * Create a new service (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createServiceSchema.parse(body);

    // Create service
    const service = await prisma.service.create({
      data: validatedData,
    });

    return successResponse(service, 'Service created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
