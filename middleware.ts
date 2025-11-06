import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getClientIP, checkRateLimit, apiLimiter, contactLimiter, authLimiter } from '@/lib/rate-limit';

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = getClientIP(request);

    // Apply different rate limits based on endpoint
    let limiter = apiLimiter;
    let limitType = 'API';

    if (pathname.startsWith('/api/contact')) {
      limiter = contactLimiter;
      limitType = 'Contact Form';
    } else if (pathname.startsWith('/api/auth')) {
      limiter = authLimiter;
      limitType = 'Authentication';
    }

    // Check rate limit
    const { success, headers, reset } = await checkRateLimit(limiter, ip);

    // Create response
    const response = success
      ? NextResponse.next()
      : NextResponse.json(
          {
            error: 'Too Many Requests',
            message: `${limitType} rate limit exceeded. Please try again later.`,
            retryAfter: reset,
          },
          { status: 429 }
        );

    // Add rate limit headers to response
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Log rate limit hit (for monitoring)
    if (!success) {
      console.warn(`[Rate Limit] ${limitType} exceeded for IP: ${ip} on ${pathname}`);
    }

    return response;
  }

  // For admin routes, skip intl middleware
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    return response;
  }

  // Apply next-intl middleware for all other routes
  const intlResponse = intlMiddleware(request);

  // Add security headers
  intlResponse.headers.set('X-Content-Type-Options', 'nosniff');
  intlResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  intlResponse.headers.set('X-XSS-Protection', '1; mode=block');

  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};
