import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'

    // If accessing admin routes without token, redirect to login
    if (isAdminRoute && !token && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // If logged in and trying to access login page, redirect to dashboard
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }
        // Require token for all other admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
