// API-related types
import { NextRequest } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface RequestWithUser extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}
