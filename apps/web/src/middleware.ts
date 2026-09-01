import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { JWT as NextAuthJWT } from 'next-auth/jwt'

// Extend NextAuth's JWT type to include custom fields for access tokens
type AppJWT = NextAuthJWT & {
  accessToken?: string // The OAuth access token we need for API calls
  accessTokenExpires?: number // Absolute expiry time in ms since epoch
}

// TODO: Consider if this can use getPublicOrigin lib function (probably can but things seem to work now and I am scared :'( )
/**
 * Utility to figure out the correct "public" origin for redirects.
 * - Prefers NEXTAUTH_URL if explicitly set (most reliable).
 * - Else builds it from x-forwarded-proto + host headers (common behind proxies).
 * - Defaults to https if proto is missing.
 */
function publicOrigin(req: NextRequest) {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? ''
  return `${proto}://${host}`
}

export async function middleware(req: NextRequest) {
  const debug = process.env.AUTH_DEBUG === 'true' || process.env.NODE_ENV !== 'production'
  const path = req.nextUrl.pathname

  // Debug logging
  if (debug) console.log('[AUTH][MW] start', { path, method: req.method })

  // ── 1. Skip static assets ────────────────────────────
  // Regex to match file extensions for images, CSS, JS, fonts, etc.
  if (/\.(?:png|jpg|jpeg|gif|svg|ico|css|js|map|txt|woff|woff2|ttf|eot)$/i.test(path)) {
    if (debug) console.log('[AUTH][MW] bypass(static)', { path })
    return NextResponse.next()
  }

  // ── 2. Skip bypass routes ────────────────────────────
  // Certain endpoints like sign-in, health checks, and NextAuth API
  // must remain accessible without auth.
  const bypass = [
    '/sign-in',
    '/sign-in-debug',
    '/auth-debug',
    '/api/auth',
    '/api/health',
    '/api/healthz',
    '/health',
    '/healthz',
  ]
  if (bypass.some((p) => path.startsWith(p))) {
    if (debug) console.log('[AUTH][MW] bypass', { path })
    return NextResponse.next()
  }

  // ── 3. Reject unauthenticated prefetch requests ──────
  // Next.js <Link> prefetches send Next-Router-Prefetch: 1. If unauthenticated,
  // returning a redirect here causes the sign-in route to set next-auth.callback-url
  // to the prefetched path (e.g. /statistics), overwriting the real callbackUrl and
  // landing the user on the wrong page after login. Return 401 instead so Next.js
  // discards the cache entry and re-evaluates on actual navigation.
  const isPrefetch = req.headers.get('next-router-prefetch') === '1'

  // ── 4. Get session token ─────────────────────────────
  // This reads the NextAuth JWT (stored in cookies).
  // Requires the same secret used in NextAuth config.
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })) as AppJWT | null

  const origin = publicOrigin(req)
  // Debug logging
  if (debug) console.log('[AUTH][MW] origin', { origin })

  // If no token found -> redirect to sign-in and remember where to go back
  if (!token) {
    if (isPrefetch) return new NextResponse(null, { status: 401 })
    const url = new URL('/sign-in', origin)
    url.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search)
    if (debug) console.log('[AUTH][MW] no token -> redirect', { to: url.toString() })
    return NextResponse.redirect(url)
  }

  // Debug logging
  if (debug) {
    console.log('[AUTH][MW] token present', {
      hasAccessToken: Boolean(token.accessToken),
      tokenExpSec: typeof token.exp === 'number' ? token.exp : undefined,
      accessTokenExpiresMs: token.accessTokenExpires,
    })
  }

  // ── 4. Validate token expiry ─────────────────────────
  // Use only the session JWT expiry (token.exp), NOT accessTokenExpires.
  // Access token refresh is handled transparently by the NextAuth JWT callback
  // when the session is read server-side. Checking accessTokenExpires here would
  // force a full IdP re-auth (and a new callbackUrl) every time the short-lived
  // access token expires, even when the refresh token is still valid.
  const expMs = typeof token.exp === 'number' ? token.exp * 1000 : undefined

  // Redirect to sign-in if session is expired or a previous refresh attempt failed
  if (!expMs || Date.now() >= expMs || token.error === 'RefreshAccessTokenError') {
    if (isPrefetch) return new NextResponse(null, { status: 401 })
    const url = new URL('/sign-in', origin)
    url.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search)
    if (debug)
      console.log('[AUTH][MW] session expired or refresh error -> redirect', {
        nowIso: new Date().toISOString(),
        expIso: expMs ? new Date(expMs).toISOString() : 'n/a',
        refreshError: token.error,
        to: url.toString(),
      })
    return NextResponse.redirect(url)
  }

  // Debug logging
  if (debug) {
    console.log('[AUTH][MW] allow', {
      nowIso: new Date().toISOString(),
      sessionExpIso: new Date(expMs).toISOString(),
      sessionSecondsRemaining: Math.floor((expMs - Date.now()) / 1000),
      accessTokenExpIso: token.accessTokenExpires ? new Date(token.accessTokenExpires).toISOString() : 'n/a',
    })
  }

  // ── 5. Allow request ─────────────────────────────────
  return NextResponse.next()
}

export const config = {
  matcher: [
    `/((?!api|_next/static|_next/image|_next/webpack|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-in-debug|auth-debug|mockServiceWorker|$).*)`,
  ],
}
