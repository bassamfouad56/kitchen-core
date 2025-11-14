import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  getClientIP,
  checkRateLimit,
  apiLimiter,
  contactLimiter,
  authLimiter,
} from "@/lib/rate-limit";

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin authentication check - MUST come before other checks
  if (pathname.includes("/admin") && !pathname.includes("/admin/login")) {
    // Check for NextAuth session token (different cookie names for dev vs production)
    const token =
      request.cookies.get("next-auth.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!token) {
      // Extract locale from pathname if present
      const localeMatch = pathname.match(/^\/(en|ar)\//);
      const locale = localeMatch ? localeMatch[1] : "en";

      console.warn(`[Auth] Unauthorized admin access attempt: ${pathname}`);
      return NextResponse.redirect(
        new URL(`/${locale}/admin/login`, request.url),
      );
    }
  }

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const ip = getClientIP(request);

    // Apply different rate limits based on endpoint
    let limiter = apiLimiter;
    let limitType = "API";

    if (pathname.startsWith("/api/contact")) {
      limiter = contactLimiter;
      limitType = "Contact Form";
    } else if (pathname.startsWith("/api/auth")) {
      limiter = authLimiter;
      limitType = "Authentication";
    }

    // Check rate limit
    const { success, headers, reset } = await checkRateLimit(limiter, ip);

    // Create response
    const response = success
      ? NextResponse.next()
      : NextResponse.json(
          {
            error: "Too Many Requests",
            message: `${limitType} rate limit exceeded. Please try again later.`,
            retryAfter: reset,
          },
          { status: 429 },
        );

    // Add rate limit headers to response
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Log rate limit hit (for monitoring)
    if (!success) {
      console.warn(
        `[Rate Limit] ${limitType} exceeded for IP: ${ip} on ${pathname}`,
      );
    }

    return response;
  }

  // Apply next-intl middleware for all routes (including admin)
  const intlResponse = intlMiddleware(request);

  // Add security headers
  intlResponse.headers.set("X-Content-Type-Options", "nosniff");
  intlResponse.headers.set("X-Frame-Options", "SAMEORIGIN");
  intlResponse.headers.set("X-XSS-Protection", "1; mode=block");

  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
