// List of request patterns that should be ignored by the MSW unhandled request warning
export const ignoreList: string[] = [
  '_next', // Next.js internal assets like /_next/static/...
  '__next', // Older Next.js asset path format or potential typo backup
  'stream', // Streaming endpoints (e.g., server-sent events or WebSocket setups)
  'http://localhost:4318/v1/traces', // OpenTelemetry trace reporting endpoint
]

/**
 * Custom handler for MSW's onUnhandledRequest lifecycle event.
 * Decides whether to suppress or show a warning for unmocked requests.
 */
export function onUnhandledRequest(request: Request, print: { warning: () => void }) {
  // Parse the full request URL to extract its path
  const url = new URL(request.url)
  const path = url.pathname

  // Ignore Next.js RSC requests (e.g. /vms?_rsc=...).
  // These are framework internals and should not be mocked as API endpoints.
  const accept = request.headers.get('accept') || ''
  const isRscRequest = url.searchParams.has('_rsc') || accept.includes('text/x-component')
  if (isRscRequest) {
    return
  }

  // Check if the request should be ignored based on the ignore list
  const onIgnoreList = ignoreList.some(
    (ignore) =>
      path.startsWith(`/${ignore}`) || // Path starts with ignored prefix (e.g., /_next)
      path.includes(ignore) || // Path contains ignore string anywhere
      ignore === request.url // Full URL matches exactly
  )

  // If the request matches any ignore condition, do not print a warning
  if (onIgnoreList) {
    return
  }

  // Otherwise, trigger MSW's warning to alert developers about an unhandled request
  return print.warning()
}
