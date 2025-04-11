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
    },
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
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [dexIdpProvider],
  trustHost: trusthost,
  pages: {
    signIn: routes.auth.signIn.getHref(),
  },
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === 'dex') {
        if (!account?.access_token) {
          throw new Error('Did not receive access_token from DexIdp on login callback')
        }
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
    authorized: async ({ auth }) => {
      // If the request has a valid auth token, it is authorized
      const validated = validateAuthToken(auth)
      if (!validated) {
        return false
      }

      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth?.user
    },
  },
})

function validateAuthToken(session: Session | null): boolean {
  if (!session) {
    return false
  }

  try {
    const decodedToken = jwtDecode(session.accessToken)
    const expirationTime = (decodedToken.exp as number) * 1000
    return expirationTime >= Date.now()
  } catch {
    return false
  }
}
