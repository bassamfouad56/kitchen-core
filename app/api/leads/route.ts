import { NextRequest } from 'next/server';
import {
  successResponse,
  handleApiError,
  paginatedResponse
} from '@/lib/api/response';
import { requireAuth } from '@/lib/api/auth';
import { getLeads, createLead } from '@/lib/db/leads';
import { createLeadSchema, leadQuerySchema } from '@/lib/validations/lead';

/**
 * GET /api/leads
 * Get all leads with filtering and pagination (requires authentication)
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const query = leadQuerySchema.parse({
      status: searchParams.get('status'),
      source: searchParams.get('source'),
      priority: searchParams.get('priority'),
      assignedTo: searchParams.get('assignedTo'),
      page: searchParams.get('page') || '1',
      pageSize: searchParams.get('pageSize') || '20',
    });

    const { leads, total } = await getLeads(query);

    return paginatedResponse(leads, query.page, query.pageSize, total);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/leads
 * Create a new lead (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createLeadSchema.parse(body);

    // Create lead (cast to Prisma's LeadCreateInput type)
    const lead = await createLead(validatedData as any);

    return successResponse(lead, 'Lead created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}





