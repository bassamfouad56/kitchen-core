import { NextRequest } from 'next/server';
import {
  successResponse,
  handleApiError,
  paginatedResponse
} from '@/lib/api/response';
import { requireAuth } from '@/lib/api/auth';
import { getProjects, createProject } from '@/lib/db/projects';
import { createProjectSchema, projectQuerySchema } from '@/lib/validations/project';

/**
 * GET /api/projects
 * Get all projects with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const query = projectQuerySchema.parse({
      category: searchParams.get('category'),
      featured: searchParams.get('featured'),
      published: searchParams.get('published'),
      page: searchParams.get('page') || '1',
      pageSize: searchParams.get('pageSize') || '10',
    });

    const { projects, total } = await getProjects(query);

    return paginatedResponse(projects, query.page, query.pageSize, total);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/projects
 * Create a new project (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createProjectSchema.parse(body);

    // Create project
    const project = await createProject(validatedData);

    return successResponse(project, 'Project created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
