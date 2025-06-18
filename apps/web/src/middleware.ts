import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp: number
  iat?: number
  sub?: string
  email?: string
  name?: string
  [key: string]: string | number | boolean | undefined
}

// Debug route patterns that should bypass authentication
const debugRoutes = ['/sign-in', '/sign-in-debug', '/auth-debug', '/api/auth']

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Log middleware execution context
  console.log(`[MIDDLEWARE] Running for path: ${path}`)

  // Skip auth for debug routes and API routes
  if (debugRoutes.some((route) => path.startsWith(route))) {
    console.log(`[MIDDLEWARE] Bypassing auth for route: ${path}`)
    return NextResponse.next()
  }

  // Try to get token with simplified configuration
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    // Let NextAuth handle cookie detection automatically
  })

  if (!token) {
    console.log(`[MIDDLEWARE] No token found, redirecting to sign-in`)
    return NextResponse.redirect(`${req.nextUrl.origin}/sign-in`)
  }

  console.log(`[MIDDLEWARE] Token exists, validating...`)

  try {
    // Check if token has valid expiration
    if (token.exp && typeof token.exp === 'number') {
      const currentTime = Date.now()
      const expirationTime = token.exp * 1000

      console.log(`[MIDDLEWARE] Token expiration check:`, {
        currentTime: new Date(currentTime).toISOString(),
        expirationTime: new Date(expirationTime).toISOString(),
        isExpired: currentTime >= expirationTime,
        timeRemaining: `${Math.floor((expirationTime - currentTime) / 1000)}s`,
      })

      if (currentTime >= expirationTime) {
        console.log(`[MIDDLEWARE] Token expired, redirecting to sign-in`)
        return NextResponse.redirect(`${req.nextUrl.origin}/sign-in`)
      }
    }

    // If we have an accessToken, validate it as well
    if (token.accessToken && typeof token.accessToken === 'string') {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token.accessToken)

        if (decodedToken.exp) {
          const currentTime = Date.now()
          const expirationTime = decodedToken.exp * 1000

          if (currentTime >= expirationTime) {
            console.log(`[MIDDLEWARE] Access token expired, redirecting to sign-in`)
            return NextResponse.redirect(`${req.nextUrl.origin}/sign-in`)
          }
        }
      } catch (error) {
        console.warn(`[MIDDLEWARE] Could not decode access token, but continuing:`, error)
        // Don't fail here - the main session token is still valid
      }
    }
  } catch (error) {
    console.error(`[MIDDLEWARE] Error processing token:`, error)
    return NextResponse.redirect(`${req.nextUrl.origin}/sign-in`)
  }

  console.log(`[MIDDLEWARE] Token valid, proceeding`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - sign-in (authentication page)
     * - sign-in-debug (authentication debug page)
     * - auth-debug (debugging page)
     * - api/auth (authentication API routes)
     */
    `/((?!api|_next/static|_next/image|_next/webpack|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-in-debug|auth-debug|mockServiceWorker).*)`,
  ],
}
