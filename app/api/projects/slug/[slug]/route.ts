import { NextRequest } from 'next/server';
import { successResponse, handleApiError, notFoundResponse } from '@/lib/api/response';
import { getProjectBySlug } from '@/lib/db/projects';

/**
 * GET /api/projects/slug/[slug]
 * Get a project by slug (for public viewing)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return notFoundResponse('Project');
    }

    // Only return published projects to public
    if (!project.published) {
      return notFoundResponse('Project');
    }

    return successResponse(project);
  } catch (error) {
    return handleApiError(error);
  }
}
