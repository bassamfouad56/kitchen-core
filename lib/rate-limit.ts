import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client
// Fallback to in-memory if Upstash credentials not provided (for local dev)
let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Create rate limiters with fallback to mock implementation
function createRateLimiter(requests: number, window: string, prefix: string) {
  if (!redis) {
    // Mock rate limiter for development without Upstash
    console.warn(`⚠️ Rate limiting disabled: Upstash Redis not configured (${prefix})`);
    return {
      limit: async () => ({ success: true, limit: requests, remaining: requests, reset: Date.now() + 60000 }),
    };
  }

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window as any),
    analytics: true,
    prefix: `@ratelimit:${prefix}`,
  });
}

// API endpoints: 100 requests per minute per IP
export const apiLimiter = createRateLimiter(100, '1 m', 'api');

// Contact form: 3 submissions per hour per IP
export const contactLimiter = createRateLimiter(3, '1 h', 'contact');

// Auth/Login: 5 attempts per 15 minutes per IP
export const authLimiter = createRateLimiter(5, '15 m', 'auth');

// Newsletter signup: 2 signups per day per IP
export const newsletterLimiter = createRateLimiter(2, '1 d', 'newsletter');

// Admin actions: 50 requests per minute
export const adminLimiter = createRateLimiter(50, '1 m', 'admin');

// Helper function to get client IP from request
export function getClientIP(request: Request): string {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a default for local development
  return '127.0.0.1';
}

// Helper function to check rate limit and return appropriate response
export async function checkRateLimit(
  limiter: typeof apiLimiter,
  identifier: string
) {
  const { success, limit, remaining, reset } = await limiter.limit(identifier);

  return {
    success,
    limit,
    remaining,
    reset: new Date(reset).toISOString(),
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(reset).toISOString(),
    },
  };
}

// Type for rate limit result
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: string;
  headers: Record<string, string>;
}
