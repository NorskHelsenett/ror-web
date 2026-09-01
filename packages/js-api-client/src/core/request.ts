import type { ApiClientConfig } from '../types/config'
import { ApiError, AuthenticationError, AuthorizationError, NotFoundError } from './errors'
import { logApiError } from './logger'

export interface ApiRequestFunction {
  (requestOptions: RequestOptions): Promise<unknown>
}

export interface RequestOptions {
  /**
   * The pathname of the request
   */
  path: string
  /**
   * The HTTP method of the request
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /**
   * Optional url search param to add to the request
   */
  params?: URLSearchParams
  /**
   * Optional body argument to send along
   */
  body?: any
}

/**
 * The generateRequest function is a higher-order function that creates an API request function.
 *
 * @remarks
 * It configures the request with the provided API client configuration and returns a function
 * that can be used to make HTTP requests to an API.
 *
 * The returned function handles URL construction, query parameters, request headers,
 * and error responses automatically.
 *
 * @throws {NetworkError} When a network error occurs during the request
 * @throws {AuthenticationError} When the API returns a 401 status code
 * @throws {AuthorizationError} When the API returns a 403 status code
 * @throws {NotFoundError} When the API returns a 404 status code
 * @throws {ApiError} When the API returns any other error status code
 */
export function generateRequest(config: ApiClientConfig): ApiRequestFunction {
  return async (requestOptions: RequestOptions) => {
    /**
     * Construct a url based on the baseUrl and the path
     */
    const url = new URL(requestOptions.path, config.baseUrl)

    /**
     * Add query parameters to the url variable if provided
     */
    if (requestOptions.params) {
      requestOptions.params.forEach((value, name) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(name, String(value))
        }
      })
    }

    /**
     * Setup the final fetch options
     */
    const fetchOptions: RequestInit = {
      method: requestOptions.method,
      headers: config.headers,
      ...(requestOptions.body && { body: JSON.stringify(requestOptions.body) }),
    }

    /**
     * Execute the request
     */
    try {
      const response = await fetch(url.toString(), fetchOptions)

      if (!response.ok) {
        handleErrorResponse(response)
      }

      const json = await response.json()
      // A null body on a 2xx response is treated as not found
      if (json === null) {
        throw new NotFoundError('Empty response from API')
      }
      return json
    } catch (error) {
      // Enhanced error logging with environment information
      const additionalInfo = {
        environment: typeof process === 'object' && process.versions && process.versions.node ? 'server' : 'client',
        fetchUrl: url.toString(),
        headers: JSON.stringify(fetchOptions.headers || {}),
      }
      logApiError(requestOptions.method, url.toString(), error, additionalInfo)
      if (error instanceof ApiError) {
        throw error
      } else if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error occured')
    }
  }
}

function handleErrorResponse(response: Response): never {
  switch (response.status) {
    case 401:
      throw new AuthenticationError(response.statusText || 'Unauthorized')
    case 403:
      throw new AuthorizationError(response.statusText || 'Forbidden')
    case 404:
      throw new NotFoundError(response.statusText || 'Not found')
    default:
      throw new ApiError(response.statusText || 'API error', response.status)
  }
}
