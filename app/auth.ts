import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import { env } from "@/env";

/**
 * We are adding the accessToken to the session so it can be retrieved from the
 * `auth()` function. Here we are simply augmenting the existing Session type to
 * include the accessToken.
 */
declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}

/**
 * DexIDP provider configuration
 */
const dexIdpProvider: Provider = {
  type: "oidc",
  id: "dex",
  name: "dex",
  issuer: env.AUTH_ISSUER,
  clientId: env.AUTH_CLIENT_ID,
  clientSecret: env.AUTH_CLIENT_SECRET,
  authorization: {
    params: {
      scope: "openid profile email groups",
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [dexIdpProvider],
  trustHost: env.AUTH_TRUST_HOST,
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === "dex") {
        if (!account?.access_token) {
          throw new Error(
            "Did not receive access_token from DexIdp on login callback",
          );
        }
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
