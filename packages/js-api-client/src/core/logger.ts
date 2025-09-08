import { ZodError } from 'zod'
import { isApiError, ValidationError } from './errors'

interface ErrorInfo {
  method: string
  endpoint: string
  timestamp: string
  type?: string
  message?: string
  status?: number
  stack?: string
  details?: string
}

/**
 * Log API errors with detailed information for debugging
 *
 * @param endpoint - The API endpoint where the error occurred
 * @param error - The error object
 * @param additionalInfo - Optional additional context for the error
 */
export function logApiError(
  method: string,
  endpoint: string,
  error: unknown,
  additionalInfo: Record<string, string> = {}
) {
  const errorInfo: ErrorInfo = {
    method,
    endpoint,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  }

  if (isApiError(error)) {
    errorInfo.type = error.name
    errorInfo.message = error.message
    errorInfo.status = error.status

    if (error.details) {
      errorInfo['details'] = error.details
    }
  } else if (error instanceof Error) {
    errorInfo.type = error.name
    errorInfo.message = error.message
    errorInfo.stack = error.stack
  } else {
    errorInfo.message = String(error)
    errorInfo.type = 'Unknown'
  }

  console.error(`[@ror/js-api-client] Error`, errorInfo)
}

export function logValidationError(error: ValidationError, data: unknown) {
  let messageArray: string[] = []

  if (error instanceof ZodError) {
    const zodErr = error as ZodError
    messageArray = zodErr.issues.map((e) => {
      const path = e.path.join('.') || '(root)'
      return `${path} - ${e.message}`
    })
  } else if ('validationErrors' in error && error.validationErrors) {
    messageArray = Object.entries(error.validationErrors).map(([key, value]) => `${key}: ${value}`)
  }
  console.error('[@ror/js-api-client] ValidationError', '\nMessages:', messageArray, '\nData:', data)
}
