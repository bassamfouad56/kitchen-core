import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  error: string | Error,
  status: number = 500,
  details?: any
) {
  const errorMessage = error instanceof Error ? error.message : error;

  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      details,
    },
    { status }
  );
}

/**
 * Create a validation error response (from Zod)
 */
export function validationErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      details: error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    },
    { status: 400 }
  );
}

/**
 * Create a not found response
 */
export function notFoundResponse(resource: string = 'Resource') {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
    },
    { status: 404 }
  );
}

/**
 * Create an unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 401 }
  );
}

/**
 * Create a forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden') {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 403 }
  );
}

/**
 * Handle API errors with proper responses
 */
export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  if (error instanceof Error) {
    // Known error types
    if (error.message.includes('not found')) {
      return notFoundResponse();
    }

    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }

    if (error.message.includes('Forbidden')) {
      return forbiddenResponse();
    }

    return errorResponse(error.message);
  }

  return errorResponse('An unexpected error occurred');
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  totalCount: number
) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return successResponse<PaginatedResponse<T>>({
    data,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalCount,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
}
