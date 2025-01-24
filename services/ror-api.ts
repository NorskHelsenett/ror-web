import { env } from "@/env";
import { createApiClient, loggingMiddleware } from "@/packages/ror-api-client";

export const rorApiClient = (accessToken: string) => {
  if (!accessToken) {
    throw new Error("No access token provided for rorApiClient");
  }

  const middlewares = [loggingMiddleware];
  const config = {
    baseUrl: env.NEXT_PUBLIC_ROR_API_URL,
    accessToken,
  };
  return createApiClient(config, middlewares);
};
