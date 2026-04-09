import { NextRequest, NextResponse } from 'next/server'
import { routes } from '@/config/routes'
import { getPublicOrigin } from '@/lib/public-origin'

export async function GET(req: NextRequest) {
  // Get URL in request
  const url = new URL(req.url)
  // Ensures we use the actual public origin URL, and not a localhost one
  const publicOrigin = getPublicOrigin(req, url.origin)
  // Get potential error
  const error = url.searchParams.get('error')
  // Get attempt number, set to 0 if not present. Will protect against reroutes
  const attempt = Number(url.searchParams.get('attempt') || '0') || 0

  // Derive a safe callback URL
  const defaultAfterLogin = routes.app.clusters.getHref()
  // Search for provided callbackUrl, or use default if not present
  let raw = url.searchParams.get('callbackUrl') || defaultAfterLogin
  // Debugging output
  const debug = process.env.AUTH_DEBUG === 'true' || process.env.NODE_ENV !== 'production'
  if (debug) console.log('[AUTH][SIGNIN] incoming', { raw, error })

  // Only allow same-origin URLs and prefer relative paths
  try {
    if (/^https?:\/\//i.test(raw)) {
      const target = new URL(raw)
      const isSame = target.origin === url.origin || target.origin === publicOrigin
      raw = isSame ? target.pathname + target.search + target.hash : defaultAfterLogin
    }
  } catch {
    raw = defaultAfterLogin
  }

  // Prevent redirect loops back into auth endpoints
  const lower = raw.toLowerCase()
  // Users should not be sent to static files or API routes
  const staticPrefixes = ['/favicon', '/_next', '/assets', '/public', '/sb-', '/sb_', '/images']
  // URLs that looks like files are treated like static
  const looksLikeFile = /\.[a-z0-9]{2,4}(?:\?.*)?$/i.test(lower)
  // If path starts with static prefixes or looks like a file, they should not be accessible
  const isStatic = staticPrefixes.some((p) => lower.startsWith(p)) || looksLikeFile
  // Avoid redirecting back into the sign-in route or NextAuth API (infinite loop risk)
  const isLoopTarget = lower.startsWith('/sign-in') || lower.startsWith('/api/auth')
  // Final sanitized callback: if static or loopy, replace with defaultAfterLogin
  const safeCallback = isLoopTarget || isStatic ? defaultAfterLogin : raw
  // Debugging output
  if (debug) console.log('[AUTH][SIGNIN] sanitized', { safeCallback })

  // If NextAuth reported a known error, do NOT bounce to /api/auth/signin because pages.signIn is configured
  // which would redirect straight back here and loop. Instead, send users to our debug/error page.
  // Ignore unknown values (e.g. some providers append their id in this param when using custom pages).
  const knownErrors = new Set([
    'AccessDenied',
    'Configuration',
    'Callback',
    'OAuthSignin',
    'OAuthCallback',
    'OAuthCreateAccount',
    'EmailCreateAccount',
    'EmailSignin',
    'CredentialsSignin',
    'SessionRequired',
    'Default',
  ])
  if (error && knownErrors.has(error)) {
    const to = new URL('/auth-debug', publicOrigin)
    to.searchParams.set('error', error)
    to.searchParams.set('callbackUrl', safeCallback)
    if (debug) console.log('[AUTH][SIGNIN] redirect(error->auth-debug)', { to: to.toString() })
    return NextResponse.redirect(to, { status: 302 })
  }

  // If NextAuth bounced back with a non-standard "error" (often the provider id), avoid infinite loops.
  // Also stop looping after a first automatic attempt.
  if (error && !knownErrors.has(error)) {
    const to = new URL('/sign-in-debug', publicOrigin)
    to.searchParams.set('callbackUrl', safeCallback)
    to.searchParams.set('reason', 'provider-indicated')
    if (debug) console.log('[AUTH][SIGNIN] redirect(provider-indicated->sign-in-debug)', { to: to.toString() })
    return NextResponse.redirect(to, { status: 302 })
  }

  if (attempt >= 1) {
    const to = new URL('/sign-in-debug', publicOrigin)
    to.searchParams.set('callbackUrl', safeCallback)
    to.searchParams.set('reason', 'attempted')
    if (debug) console.log('[AUTH][SIGNIN] redirect(attempt-guard->sign-in-debug)', { to: to.toString() })
    return NextResponse.redirect(to, { status: 302 })
  }

  // Optional: verify that 'dex' provider is actually registered to avoid a confusing loop
  try {
    const providersUrl = new URL('/api/auth/providers', publicOrigin)
    const pRes = await fetch(providersUrl, { cache: 'no-store' })
    let providers: Record<string, unknown> | null = null
    if (pRes.ok) {
      providers = (await pRes.json()) as Record<string, unknown>
    } else {
      const text = await pRes.text().catch(() => '')
      if (debug) console.log('[AUTH][SIGNIN] providers non-OK', { status: pRes.status, text: text.slice(0, 200) })
    }
    if (debug) console.log('[AUTH][SIGNIN] providers', providers)
    const hasDex = providers && Object.prototype.hasOwnProperty.call(providers, 'dex')
    if (providers && !hasDex) {
      const to = new URL('/auth-debug', publicOrigin)
      to.searchParams.set('error', 'missing-provider-dex')
      to.searchParams.set('callbackUrl', safeCallback)
      if (debug) console.log('[AUTH][SIGNIN] redirect(missing-provider->auth-debug)', { to: to.toString() })
      return NextResponse.redirect(to, { status: 302 })
    }
  } catch (e) {
    if (debug) console.log('[AUTH][SIGNIN] providers check failed', String(e))
  }

  // Normal case: go straight to Dex provider with sanitized callback
  const to = new URL('/api/auth/signin/dex', publicOrigin)
  to.searchParams.set('callbackUrl', safeCallback)
  if (debug) console.log('[AUTH][SIGNIN] redirect', { to: to.toString(), publicOrigin })
  return NextResponse.redirect(to, { status: 302 })
}
