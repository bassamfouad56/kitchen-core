import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';
import { unauthorizedResponse, forbiddenResponse } from './response';

/**
 * Get the current session or throw an error
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

/**
 * Require admin role
 */
export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required');
  }

  return session;
}

/**
 * Require specific role
 */
export async function requireRole(role: 'ADMIN' | 'EDITOR') {
  const session = await requireAuth();

  if (session.user.role !== role && session.user.role !== 'ADMIN') {
    throw new Error(`Forbidden: ${role} access required`);
  }

  return session;
}

/**
 * Get current user or null
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

/**
 * Middleware to protect API routes
 */
export async function withAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      await requireAuth();
      return handler(request, context);
    } catch (error) {
      return unauthorizedResponse();
    }
  };
}

/**
 * Middleware to require admin access
 */
export async function withAdmin(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      await requireAdmin();
      return handler(request, context);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Forbidden')) {
        return forbiddenResponse();
      }
      return unauthorizedResponse();
    }
  };
}
