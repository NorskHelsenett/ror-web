import { RorApiError, RorForbiddenError, RorNotFoundError, RorUnauthorizedError } from './error'
import { createClustersResource } from './resources/clusters/clusters.resource'
import { createUsersResource } from './resources/users/users.resource'
import type { ApiClientConfig, RequestConfig, RetryPolicyConfig, Middleware } from './types'

const DEFAULT_MAX_RETRIES = 3
const DEFAULT_RETRY_INTERVAL = 1000
const DEFAULT_RETRY_POLICY: RetryPolicyConfig = {
  maxRetries: DEFAULT_MAX_RETRIES,
  retryInterval: DEFAULT_RETRY_INTERVAL,
}

export function createApiClient(config: ApiClientConfig, middlewares: Middleware[] = []) {
  const defaultConfig: ApiClientConfig = {
    retryPolicy: DEFAULT_RETRY_POLICY,
    ...config,
  }

  function getHeaders(additionalHeaders?: HeadersInit): HeadersInit {
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Authorization', `Bearer ${defaultConfig.accessToken}`)

    if (additionalHeaders) {
      Object.entries(additionalHeaders).forEach(([key, value]) => headers.set(key, value))
    }

    if (defaultConfig.headers) {
      Object.entries(defaultConfig.headers).forEach(([key, value]) => headers.set(key, value))
    }

    return headers
  }

  function buildUrl(path: string): string {
    const baseUrl = new URL(defaultConfig.baseUrl)
    baseUrl.pathname = path
    return baseUrl.toString()
  }

  function buildFetchConfiguration<T extends object = {}>(config: RequestConfig<T>): RequestInit {
    return {
      method: config.method,
      headers: getHeaders(config.headers),
      ...(config.body && { body: JSON.stringify(config.body) }),
    }
  }

  function handleErrorResponse(response: Response) {
    switch (response.status) {
      case 404:
        throw new RorNotFoundError(response.statusText)
      case 403:
        throw new RorForbiddenError(response.statusText)
      case 401:
        throw new RorUnauthorizedError(response.statusText)
      default:
        throw new RorApiError(response.statusText, response.status)
    }
  }

  async function handleResponse(response: Response) {
    if (!response.ok) {
      handleErrorResponse(response)
    }
    const result = await response.json()
    return result
  }

  function applyMiddleware(middlewares: Middleware[], baseRequest: (config: RequestConfig<any>) => Promise<unknown>) {
    return middlewares.reduceRight((request, middleware) => middleware(request), baseRequest)
  }

  async function request<R, TBody extends object = {}>(config: RequestConfig<TBody>): Promise<R> {
    const fetchConfig = buildFetchConfiguration(config)
    const url = buildUrl(config.path)
    const response = await fetch(url, fetchConfig)
    return handleResponse(response)
  }

  const requestWithMiddleware = applyMiddleware(middlewares, request)

  const baseClient = {
    get: <R>(path: string, headers?: HeadersInit) =>
      requestWithMiddleware({ baseUrl: defaultConfig.baseUrl, path, method: 'GET', headers }) as Promise<R>,

    post: <R, T extends object>(path: string, body: T, headers?: HeadersInit) =>
      requestWithMiddleware({
        baseUrl: defaultConfig.baseUrl,
        path,
        method: 'POST',
        body,
        headers,
      }) as Promise<R>,

    put: <R, T extends object>(path: string, body: T, headers?: HeadersInit) =>
      requestWithMiddleware({
        baseUrl: defaultConfig.baseUrl,
        path,
        method: 'PUT',
        body,
        headers,
      }) as Promise<R>,

    delete: <R>(path: string, headers?: HeadersInit) =>
      requestWithMiddleware({ baseUrl: defaultConfig.baseUrl, path, method: 'DELETE', headers }) as Promise<R>,
  }

  return {
    client: baseClient,
    users: createUsersResource(baseClient),
    clusters: createClustersResource(baseClient),
  }
}
