import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * We use this library to validate needed env variables to run the project
 *
 */

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_ISSUER: z.string().url(),
    AUTH_CLIENT_ID: z.string().min(1),
    AUTH_CLIENT_SECRET: z.string().min(1),
    AUTH_TRUST_HOST: z
      .string()
      // only allow "true" or "false"
      .refine((s) => s === "true" || s === "false")
      // transform to boolean
      .transform((s) => s === "true")
      .optional(),
  },
  /**
   * Environment variables available on the client (and server).
   * Next.js uses the prefix `NEXT_PUBLIC_` to expose environment variables to the client.
   */
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_ROR_API_URL: z.string().url(),
  },
  /**
   * The runtime environment variables mapped to our `server` and `client` schemas.
   *
   * @remarks
   * `import.meta.env` is a Vite specific feature.
   */
  runtimeEnv: {
    /**
     * Authentication provider configuration.
     * {@link /app/auth.ts}
     */
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_ISSUER: process.env.AUTH_ISSUER,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET,
    /**
     * When deploying your application behind a reverse proxy, you’ll need to set AUTH_TRUST_HOST equal to true.
     * This tells Auth.js to trust the X-Forwarded-Host header from the reverse proxy.
     * @docs {@link https://authjs.dev/getting-started/deployment#auth_trust_host}
     */
    AUTH_URL_TRUST_HOST: process.env.AUTH_TRUST_HOST,

    /**
     * The API endpoint for the ROR API.
     */
    NEXT_PUBLIC_ROR_API_URL: process.env.NEXT_PUBLIC_ROR_API_URL,
  },
});
