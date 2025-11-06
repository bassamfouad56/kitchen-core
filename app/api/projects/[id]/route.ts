import { NextRequest } from 'next/server';
import {
  successResponse,
  handleApiError,
  notFoundResponse,
} from '@/lib/api/response';
import { requireAuth } from '@/lib/api/auth';
import {
  getProjectById,
  updateProject,
  deleteProject,
} from '@/lib/db/projects';
import { updateProjectSchema } from '@/lib/validations/project';

/**
 * GET /api/projects/[id]
 * Get a single project by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
      return notFoundResponse('Project');
    }

    return successResponse(project);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/projects/[id]
 * Update a project (requires authentication)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Require authentication
    await requireAuth();

    // Check if project exists
    const existingProject = await getProjectById(id);
    if (!existingProject) {
      return notFoundResponse('Project');
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateProjectSchema.parse(body);

    // Update project
    const project = await updateProject(id, validatedData);

    return successResponse(project, 'Project updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/projects/[id]
 * Delete a project (requires authentication)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Require authentication
    await requireAuth();

    // Check if project exists
    const existingProject = await getProjectById(id);
    if (!existingProject) {
      return notFoundResponse('Project');
    }

    // Delete project
    await deleteProject(id);

    return successResponse(null, 'Project deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
