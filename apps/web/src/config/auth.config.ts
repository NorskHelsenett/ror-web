import type { NextAuthOptions, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { OAuthConfig } from 'next-auth/providers/oauth'
import { jwtDecode } from 'jwt-decode'
import { env } from '@/config/env'

/* Module augmentations, make types more specific */
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string // OAuth access token to call APIs
    refreshToken?: string // OAuth refresh token to get new access token
    accessTokenExpires?: number // Absolute expiry time of access token (ms)
    error?: 'RefreshAccessTokenError' // Name for error when refresh fails
  }
}

declare module 'next-auth' {
  interface Session {
    // Define session.user object
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      emailVerified?: Date | null
    }
    // Bring up access token to client session for API calls
    accessToken: string
    // Name for error when refresh fails
    error?: 'RefreshAccessTokenError'
  }
}

/* ========= Local types =========
   Shapes from our provider (Dex) and NextAuth's OAuth account payload.
*/
type DexProfile = {
  sub: string
  name?: string
  preferred_username?: string
  email?: string
  picture?: string
} & Record<string, unknown>

type OAuthAccount = {
  access_token?: string
  refresh_token?: string
  expires_at?: number // Seconds since epoch (absolute)
  expires_in?: number // Seconds from now (relative)
}

/* ========= Helpers ========= */
/**
 * Compute an absolute access-token expiry timestamp (ms since epoch).
 *
 * Priority:
 * 1) Use absolute `expires_at` if provided by IdP.
 * 2) Else, compute from relative `expires_in` + now.
 * 3) Else, decode JWT `exp` claim if accessToken is a JWT.
 * 4) Else, conservative fallback of 1 hour.
 */
function computeAccessTokenExpiry(
  account?: Pick<OAuthAccount, 'expires_at' | 'expires_in'>,
  accessToken?: string
): number {
  if (typeof account?.expires_at === 'number') return account.expires_at * 1000
  if (typeof account?.expires_in === 'number') return Date.now() + account.expires_in * 1000
  if (accessToken) {
    try {
      const decoded = jwtDecode<{ exp?: number }>(accessToken)
      if (typeof decoded.exp === 'number') return decoded.exp * 1000
    } catch {}
  }
  // Conservative fallback when IdP doesn’t provide expiry
  return Date.now() + 60 * 60 * 1000 // 1h
}

/**
 * Attempt to refresh the access token using the refresh token.
 * Returns a new JWT payload with updated tokens/expiry or a marked error.
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // If we don't have a refresh token, we cannot refresh, therefore mark error for UI
    if (!token.refreshToken) {
      return { ...token, error: 'RefreshAccessTokenError' as const }
    }

    // Build standard OAuth2 token refresh request body (x-www-form-urlencoded)
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      client_id: env.AUTH_CLIENT_ID,
      client_secret: env.AUTH_CLIENT_SECRET,
    })

    // Exchange refresh_token for a new access_token at the provider's token endpoint
    const res = await fetch(`${env.AUTH_ISSUER}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      cache: 'no-store',
    })

    // If the response is not OK, log the error and return the original token with an error
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[AUTH] refreshAccessToken failed:', res.status, text)
      return { ...token, error: 'RefreshAccessTokenError' as const }
    }

    // Parse refresh response
    const data: {
      access_token?: string
      refresh_token?: string
      expires_in?: number
    } = await res.json()

    // Prefer new tokens if present; otherwise keep previous ones
    const nextAccess = data.access_token ?? token.accessToken
    const nextRefresh = data.refresh_token ?? token.refreshToken
    // Compute absolute expiry: use expires_in if present, else decode JWT
    const nextExpires =
      typeof data.expires_in === 'number'
        ? Date.now() + data.expires_in * 1000
        : computeAccessTokenExpiry(undefined, nextAccess)

    // Success: return updated token payload, clear error flag
    return {
      ...token,
      accessToken: nextAccess,
      refreshToken: nextRefresh,
      accessTokenExpires: nextExpires,
      error: undefined,
    }
  } catch (err) {
    // Log and return error
    console.error('[AUTH] refreshAccessToken exception:', err)
    return { ...token, error: 'RefreshAccessTokenError' as const }
  }
}

/* ========= Dex as generic OAuth/OIDC provider (wellKnown discovery) ========= */
const DexProvider: OAuthConfig<DexProfile> = {
  id: 'dex',
  name: 'dex',
  type: 'oauth',
  wellKnown: `${env.AUTH_ISSUER}/.well-known/openid-configuration`, // OIDC discovery URL
  clientId: env.AUTH_CLIENT_ID,
  clientSecret: env.AUTH_CLIENT_SECRET,
  authorization: {
    params: {
      scope: 'openid profile email groups offline_access', // ask for identity + refresh capability
      response_type: 'code', // authorization code flow with PKCE
    },
  },
  checks: ['pkce', 'state'], // standard OIDC/NextAuth security checks
  // Map the OIDC profile to NextAuth's internal user shape
  profile(profile) {
    console.log('[AUTH] Profile from Dex:', profile)
    return {
      id: profile.sub,
      name: profile.name || profile.preferred_username || profile.sub,
      email: profile.email,
      image: profile.picture,
      emailVerified: null, // Dex does potentially not provide email verification info
    }
  },
}

/* ========= NextAuth options (v4) =========
   Core NextAuth configuration: security, providers, pages, callbacks, logging.
*/
export const authOptions: NextAuthOptions = {
  // Secret for signing/encrypting NextAuth cookies/JWTs (ensure set in prod)
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  // Enable debug logging
  debug: process.env.NODE_ENV !== 'production',
  // Store session in signed JWT
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // session JWT lifetime (not the API access token)
  },
  providers: [DexProvider],
  // Custom error page
  pages: {
    error: '/auth-debug',
  },
  callbacks: {
    /**
     * Runs on sign-in and on every request that needs to read/update the JWT.
     * We store access/refresh tokens and manage access-token rotation here.
     */
    async jwt({ token, account }) {
      const acc = account as OAuthAccount | undefined

      // Initial sign-in: capture tokens and compute access token expiry
      if (acc?.access_token) {
        token.accessToken = acc.access_token
        token.refreshToken = acc.refresh_token
        token.accessTokenExpires = computeAccessTokenExpiry(
          { expires_at: acc.expires_at, expires_in: acc.expires_in },
          acc.access_token
        )
        return token
      }

      // If token existed but had no expiry (some IdPs), compute one from JWT
      if (!token.accessTokenExpires && token.accessToken) {
        token.accessTokenExpires = computeAccessTokenExpiry(undefined, token.accessToken)
      }

      // If access token is still valid, return as-is
      if (token.accessToken && token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      // Otherwise try to refresh (may set token.error on failure)
      return refreshAccessToken(token)
    },

    /**
     * Controls what ends up in the client-visible `session` object.
     * We copy the access token for client API calls and shape `session.user`.
     */
    async session({ session, token }) {
      session.accessToken = (token.accessToken as string) ?? ''
      session.user = {
        id: (token.sub as string) ?? '',
        name: (token.name as string) ?? null,
        email: (token.email as string) ?? null,
        image: null, // could be forwarded if needed
        emailVerified: null, // not provided by Dex profile mapping above
      }
      if (token.error) session.error = token.error
      return session
    },
  },
  // Non-blocking event hooks for observability during auth lifecycle
  events: {
    async signIn(message: {
      user: { id?: string } | null
      account: { provider?: string } | null
      isNewUser?: boolean
    }) {
      const dbg = process.env.AUTH_DEBUG === 'true' || process.env.NODE_ENV !== 'production'
      if (!dbg) return
      try {
        console.log('[AUTH][EVT] signIn', {
          provider: message?.account?.provider,
          userId: message?.user?.id,
          isNewUser: message?.isNewUser,
        })
      } catch {}
    },
    async session(message: { session?: Session & { accessToken?: string } }) {
      const dbg = process.env.AUTH_DEBUG === 'true' || process.env.NODE_ENV !== 'production'
      if (!dbg) return
      try {
        console.log('[AUTH][EVT] session', {
          userId: message?.session?.user?.id,
          hasAccessToken: Boolean(message?.session?.accessToken),
        })
      } catch {}
    },
  },
  // Route NextAuth's internal logger to console in non-prod (quiet in prod)
  logger: {
    error(code, metadata) {
      const dbg = process.env.AUTH_DEBUG === 'true' || process.env.NODE_ENV !== 'production'
      if (!dbg) return
      try {
        console.error('[AUTH][LOG] error', code, metadata)
      } catch {}
    },
    warn(code) {
      const dbg = process.env.AUTH_DEBUG === 'true' || process.env.NODE_ENV !== 'production'
      if (!dbg) return
      try {
        console.warn('[AUTH][LOG] warn', code)
      } catch {}
    },
    debug(code, metadata) {
      const dbg = process.env.AUTH_DEBUG === 'true' || process.env.NODE_ENV !== 'production'
      if (!dbg) return
      try {
        console.log('[AUTH][LOG] debug', code, metadata)
      } catch {}
    },
  },
}

/* ========= Optional helper used by middleware, etc. =========
   Quick validity check for a session's access token based on JWT `exp`.
   Returns `true` if the token exists and hasn't expired yet.
*/
export function validateAuthToken(session: Session | null): boolean {
  if (!session?.accessToken) return false
  try {
    const decoded = jwtDecode<{ exp?: number }>(session.accessToken)
    return typeof decoded.exp === 'number' ? decoded.exp * 1000 >= Date.now() : false
  } catch {
    return false
  }
}
