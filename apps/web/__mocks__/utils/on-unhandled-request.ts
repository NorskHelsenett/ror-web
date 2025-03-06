import { env } from '@/env'

/**
 * Only print DX error messages from MSW for these urls.
 * They are meant to help the developer see that a request was not caught by MSW
 */
export const warningList: string[] = [env.NEXT_PUBLIC_ROR_API_URL as string]

export function onUnhandledRequest(request: Request, print: { warning: () => void }) {
  if (request.url.includes('__next') || request.url.includes('stream')) {
    return
  }

  if (warningList.some((warning) => warning.includes(request.url))) {
    return print.warning()
  }

  return
}
