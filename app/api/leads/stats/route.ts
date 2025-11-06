import { NextRequest } from 'next/server';
import { successResponse, handleApiError } from '@/lib/api/response';
import { requireAuth } from '@/lib/api/auth';
import { getLeadStats } from '@/lib/db/leads';

/**
 * GET /api/leads/stats
 * Get lead statistics and metrics (requires authentication)
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    const stats = await getLeadStats();

    return successResponse(stats);
  } catch (error) {
    return handleApiError(error);
  }
}
