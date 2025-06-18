import NextAuth, { Session } from 'next-auth'
import { Provider } from 'next-auth/providers'
import { jwtDecode } from 'jwt-decode'
import { env } from '@/config/env'
import { routes } from './routes'

/**
 * We are adding the accessToken to the session so it can be retrieved from the
 * `auth()` function. Here we are simply augmenting the existing Session type to
 * include the accessToken.
 */
declare module 'next-auth' {
  interface Session {
    accessToken: string
  }
}

/**
 * DexIDP provider configuration
 */
const dexIdpProvider: Provider = {
  type: 'oidc',
  id: 'dex',
  name: 'dex',
  issuer: env.AUTH_ISSUER,
  clientId: env.AUTH_CLIENT_ID,
  clientSecret: env.AUTH_CLIENT_SECRET,
  authorization: {
    params: {
      scope: 'openid profile email groups',
      response_type: 'code',
    },
  },
  checks: ['pkce', 'state'],
  client: {
    token_endpoint_auth_method: 'client_secret_basic',
  },
  profile(profile) {
    console.log('[NEXTAUTH] Profile received from Dex:', profile)
    return {
      id: profile.sub,
      name: profile.name || profile.preferred_username || profile.sub,
      email: profile.email,
      image: profile.picture,
      emailVerified: null,
    }
  },
}

const trusthost = Boolean(JSON.parse(env.AUTH_TRUST_HOST))

/**
 * Setup NextAuth (otherwise also known as Auth.js)
 * Note that it exports:
 * - Handlers
 * - signIn function
 * - signOut function
 * - auth utility function
 */
// Log the environment configuration for debugging
console.log('[NEXTAUTH] Configuration:', {
  environment: process.env.NODE_ENV,
  trustHost: trusthost,
  issuerSet: !!env.AUTH_ISSUER,
  nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set',
  secretsAvailable: {
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    AUTH_SECRET: !!process.env.AUTH_SECRET,
  },
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [dexIdpProvider],
  trustHost: trusthost,
  debug: process.env.NODE_ENV !== 'production', // Enable debug logs only in non-production environments

  // Force JWT strategy for tokens
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Simplified cookie configuration - let NextAuth handle naming
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        domain: process.env.NODE_ENV === 'production' ? undefined : undefined, // Let NextAuth auto-detect
      },
    },
  },
  pages: {
    signIn: routes.auth.signIn.getHref(),
    error: '/auth-debug', // Redirect to our debug page on auth errors
  },
  callbacks: {
    jwt({ token, account, user }) {
      // Only log during initial token creation or refresh
      if (account) {
        console.log('[NEXTAUTH] JWT callback with account:', {
          provider: account.provider,
          hasAccessToken: !!account.access_token,
          tokenType: typeof account.access_token,
          expires_in: account.expires_in,
        })
      }

      if (account?.provider === 'dex') {
        if (!account?.access_token) {
          console.error('[NEXTAUTH] Missing access_token in account data')
          throw new Error('Did not receive access_token from DexIdp on login callback')
        }

        try {
          // Decode the token to verify it's valid and extract expiration
          const decodedAccessToken = jwtDecode(account.access_token)
          console.log('[NEXTAUTH] Decoded access token:', {
            hasExp: 'exp' in decodedAccessToken,
            expValue: decodedAccessToken.exp,
            expDate: decodedAccessToken.exp ? new Date(decodedAccessToken.exp * 1000).toISOString() : 'N/A',
            sub: decodedAccessToken.sub || 'N/A',
          })

          // Store both the access token and its expiration
          const updatedToken = {
            ...token,
            accessToken: account.access_token,
            // Use the token's exp or the decoded access token's exp
            exp: token.exp || decodedAccessToken.exp,
            sub: token.sub || decodedAccessToken.sub,
            name: token.name || user?.name,
            email: token.email || user?.email,
            tokenType: 'Bearer',
          }

          console.log('[NEXTAUTH] Successfully added accessToken to JWT')
          return updatedToken
        } catch (error) {
          console.error('[NEXTAUTH] Error decoding access token:', error)
          // Still return the token with the access token but without decoded properties
          return {
            ...token,
            accessToken: account.access_token,
            name: token.name || user?.name,
            email: token.email || user?.email,
          }
        }
      }
      return token
    },
    session({ session, token }) {
      // Debug log the token contents (without exposing sensitive data)
      console.log('[NEXTAUTH] Session callback:', {
        hasAccessToken: !!token.accessToken,
        tokenType: typeof token.accessToken,
        hasExpField: 'exp' in token,
        expValue: token.exp,
        expiresAt: token.exp ? new Date(Number(token.exp) * 1000).toISOString() : 'N/A',
      })

      if (!token.accessToken) {
        console.warn('[NEXTAUTH] Missing accessToken in token during session creation')
      }

      // Transfer necessary properties to the session
      session.accessToken = token.accessToken as string

      // Add user information if available
      if (token.sub && session.user) {
        session.user.id = token.sub as string
        session.user.name = session.user.name || (token.name as string) || (token.sub as string)
        session.user.email = session.user.email || (token.email as string)
      }

      return session
    },
    authorized: async ({ request, auth }) => {
      // Don't run authorization on auth API routes
      if (request.nextUrl.pathname.startsWith('/api/auth')) {
        return true
      }

      if (request.method === 'POST') {
        // If it's a POST request, validate the auth token
        return validateAuthToken(auth)
      }

      // For GET requests, just check if user exists
      return !!auth?.user
    },
  },
})

function validateAuthToken(session: Session | null): boolean {
  if (!session) {
    console.log('[NEXTAUTH] validateAuthToken: No session available')
    return false
  }

  if (!session.accessToken) {
    console.log('[NEXTAUTH] validateAuthToken: No accessToken in session')
    return false
  }

  try {
    // Check if the token is a JWT that needs decoding
    let expirationTime: number

    // If the session object itself has the exp property (added in our JWT callback)
    interface SessionWithExp extends Session {
      exp?: number
    }

    if (session.user && 'exp' in session && typeof (session as SessionWithExp).exp === 'number') {
      expirationTime = (session as SessionWithExp).exp! * 1000
      console.log('[NEXTAUTH] Using exp from session object')
    } else {
      // Otherwise decode the accessToken
      const decodedToken = jwtDecode(session.accessToken)

      if (typeof decodedToken.exp !== 'number') {
        console.warn('[NEXTAUTH] validateAuthToken: Token missing expiration time')
        return false
      }

      expirationTime = decodedToken.exp * 1000
    }

    const currentTime = Date.now()
    const isValid = expirationTime >= currentTime
    const timeRemaining = Math.max(0, expirationTime - currentTime)

    console.log('[NEXTAUTH] Token validation:', {
      valid: isValid,
      expiresAt: new Date(expirationTime).toISOString(),
      now: new Date(currentTime).toISOString(),
      timeRemaining: `${Math.floor(timeRemaining / 1000)}s`,
      timeRemainingMinutes: `${Math.floor(timeRemaining / (1000 * 60))}m`,
    })

    return isValid
  } catch (error) {
    console.error('[NEXTAUTH] Error validating token:', error)
    return false
  }
}
