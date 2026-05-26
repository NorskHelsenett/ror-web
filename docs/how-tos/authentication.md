[Back to README](README.md)

# How to – understand the Dex authentication flow

This guide explains how user authentication works end-to-end in the ROR web app.  
Authentication is built on [NextAuth v4](https://next-auth.js.org/) with **Dex** as the OIDC/OAuth2 identity provider.

---

## Auth-related source files

| File | Role |
|---|---|
| `src/config/auth.config.ts` | **Core config** – Dex provider, token callbacks, session shaping, token refresh |
| `src/config/next-auth.ts` | Thin wrapper – exports the NextAuth handler and `auth()` helper |
| `src/app/api/auth/[...nextauth]/route.ts` | Catch-all route – hands all `/api/auth/*` traffic to NextAuth |
| `src/app/(public)/sign-in/route.ts` | Custom sign-in entry point – validates the callback URL and redirects to Dex |
| `src/middleware.ts` | Edge middleware – enforces authentication on every protected route |
| `src/features/auth/utils/auth-guard.ts` | Server-side helpers – `authGuard()` and `getSession()` for use in Server Components |
| `src/features/auth/components/sign-out-button.tsx` | Sign-out UI component |
| `src/app/auth-debug/page.tsx` | Debug dashboard – shows token status and environment config |
| `src/app/sign-in-debug/page.tsx` | Debug page shown when automatic sign-in fails |

---

## Step-by-step login flow

```
Browser                     Next.js edge            NextAuth             Dex (OIDC)
  │                              │                      │                    │
  │── GET /protected-page ──────▶│                      │                    │
  │                    middleware.ts reads JWT cookie    │                    │
  │                    token missing or expired          │                    │
  │◀── 302 /sign-in?callbackUrl=/protected-page ────────│                    │
  │                              │                      │                    │
  │── GET /sign-in ─────────────▶│                      │                    │
  │              sign-in/route.ts sanitises callbackUrl  │                    │
  │◀── 302 /api/auth/signin/dex?callbackUrl=... ────────│                    │
  │                              │                      │                    │
  │── GET /api/auth/signin/dex ─▶│                      │                    │
  │                              │── PKCE + state ─────▶│                    │
  │◀── 302 dex/auth?... ─────────────────────────────────────────────────────│
  │                              │                      │                    │
  │── user logs in at Dex ───────────────────────────────────────────────────▶│
  │◀── 302 /api/auth/callback/dex?code=…&state=… ──────────────────────────│
  │                              │                      │                    │
  │── GET /api/auth/callback/dex▶│                      │                    │
  │                              │── exchange code ─────▶│── /token ────────▶│
  │                              │                      │◀─ access+refresh ──│
  │                              │  callbacks.jwt() stores tokens in cookie   │
  │◀── 302 /protected-page ──────│                      │                    │
```

---

## 1 · Middleware – route protection (`src/middleware.ts`)

Runs on **every request** (except static assets and the bypass list).

1. Reads the NextAuth JWT from the session cookie using `getToken()`.
2. If **no token** → redirect to `/sign-in?callbackUrl=<current-path>`.
3. If token is **expired** (checks `accessTokenExpires` or `exp`) → same redirect.
4. Otherwise → allow the request to continue.

Key bypass paths (no auth required):
- `/sign-in`, `/sign-in-debug`, `/auth-debug`
- `/api/auth/**`
- `/api/health`, `/api/healthz`

---

## 2 · Sign-in entry point (`src/app/(public)/sign-in/route.ts`)

A plain Next.js route handler (`GET /sign-in`) that acts as the visible sign-in page.

1. Reads `callbackUrl` from the query string and sanitises it (same-origin check, loop prevention).
2. Checks for known NextAuth error codes (`error` query param) and forwards them to `/auth-debug`.
3. Verifies the `dex` provider is registered at `/api/auth/providers`.
4. Redirects to `/api/auth/signin/dex?callbackUrl=<safe-callback>` to start the OAuth flow.

---

## 3 · NextAuth catch-all route (`src/app/api/auth/[...nextauth]/route.ts`)

Delegates all `/api/auth/*` requests to the NextAuth handler configured in `auth.config.ts`.  
This single route handles sign-in, callback, sign-out, CSRF token, and provider listing.

---

## 4 · Core NextAuth configuration (`src/config/auth.config.ts`)

### Dex provider

```ts
const DexProvider: OAuthConfig<DexProfile> = {
  id: 'dex',
  type: 'oauth',
  wellKnown: `${env.AUTH_ISSUER}/.well-known/openid-configuration`, // OIDC discovery
  authorization: {
    params: { scope: 'openid profile email groups offline_access', response_type: 'code' },
  },
  checks: ['pkce', 'state'], // security checks
  profile(profile) { /* maps Dex claims → NextAuth user shape */ },
}
```

Uses **OIDC discovery** so NextAuth automatically finds the authorization, token, and JWKS endpoints from the `/.well-known/openid-configuration` document.

### `jwt` callback – token storage and refresh

Called on every sign-in **and** on every request where the session is needed.

- **Initial sign-in**: captures `access_token`, `refresh_token`, and computes `accessTokenExpires` from `expires_at` / `expires_in` / the JWT `exp` claim.
- **Subsequent calls**: if the access token is still valid, returns it unchanged.
- **If expired**: calls `refreshAccessToken()` to exchange the refresh token for a new one at `${AUTH_ISSUER}/token`. On failure sets `token.error = 'RefreshAccessTokenError'`.

### `session` callback – client-visible session

Shapes what `useSession()` / `getServerSession()` return to components:

```ts
session.accessToken  // ← the raw access token for API calls
session.user         // ← { id, name, email, image, emailVerified }
session.error        // ← 'RefreshAccessTokenError' if refresh failed
```

---

## 5 · Server-side helpers (`src/features/auth/utils/auth-guard.ts`)

Use these in **Server Components** and **Server Actions**:

```ts
// Redirect to sign-in if not authenticated, otherwise return session
const session = await authGuard()

// Return session or null without redirecting
const session = await getSession()
```

Both call `auth()` from `src/config/next-auth.ts`, which is an alias for `getServerSession(authOptions)`.

---

## 6 · Required environment variables

| Variable | Purpose |
|---|---|
| `AUTH_SECRET` (or `NEXTAUTH_SECRET`) | Signs/encrypts NextAuth cookies and JWTs |
| `AUTH_ISSUER` | Base URL of the Dex server (e.g. `https://dex.example.com`) |
| `AUTH_CLIENT_ID` | OAuth2 client ID registered in Dex |
| `AUTH_CLIENT_SECRET` | OAuth2 client secret registered in Dex |
| `AUTH_TRUST_HOST` | Set to `true` when running behind a reverse proxy |
| `NEXTAUTH_URL` | Public base URL of this app (used for OAuth redirect URIs) |

See `.env.example` in `apps/web/` for the full list.

---

## Debugging authentication

- Visit `/auth-debug` – live token inspection and environment config dashboard.
- Visit `/sign-in-debug` – manual sign-in button with Dex, useful when automatic redirect fails.
- Set `AUTH_DEBUG=true` in your environment to enable verbose `[AUTH]` console logs in middleware, the sign-in route, and the NextAuth callbacks.
- The `/api/auth/debug` endpoint returns the raw decoded NextAuth JWT (not the Dex access token).
- The `/api/auth/token` endpoint returns the Dex access token from the current session.
