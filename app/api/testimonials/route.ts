import { NextRequest } from 'next/server';
import {
  successResponse,
  handleApiError,
  paginatedResponse
} from '@/lib/api/response';
import { requireAuth } from '@/lib/api/auth';
import { getTestimonials } from '@/lib/db/content';
import { createTestimonialSchema, testimonialQuerySchema } from '@/lib/validations/testimonial';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/testimonials
 * Get testimonials with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const query = testimonialQuerySchema.parse({
      featured: searchParams.get('featured'),
      published: searchParams.get('published'),
      rating: searchParams.get('rating'),
      page: searchParams.get('page') || '1',
      pageSize: searchParams.get('pageSize') || '10',
    });

    const { testimonials, total } = await getTestimonials(query);

    return paginatedResponse(testimonials, query.page, query.pageSize, total);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/testimonials
 * Create a new testimonial (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createTestimonialSchema.parse(body);

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: validatedData,
    });

    return successResponse(testimonial, 'Testimonial created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
