import { z } from 'zod'
import { ValidationError } from './errors'
import { logValidationError } from './logger'

/**
 * Validates response data against a Zod schema
 *
 * @param data - The unknown data to validate
 * @param schema - The Zod schema to validate against
 * @returns The validated and typed data
 * @throws {ValidationError} When validation fails, with detailed error information
 *
 * @example
 * const userSchema = z.object({ id: z.string(), name: z.string() });
 * try {
 *   const validatedUser = validateResponse(responseData, userSchema);
 *   // validatedUser is now typed as { id: string, name: string }
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     console.error('Validation errors:', error.validationErrors);
 *   }
 * }
 */
export function validateResponse<T>(data: unknown, schema: z.ZodType<T>): T {
  try {
    // This solution handles the case where the data is an empty object,
    // like when the user does not have access to any clusters.
    // This could benefit from being fixed in the API, but for now we handle it here.
    // TODO: Ask Håvard or Roger if this should be fixed in the API when they are back from holidays.
    if (
      typeof data === 'object' &&
      data !== null &&
      Object.keys(data).length === 0 &&
      schema.safeParse({ resources: [] }).success
    ) {
      return schema.parse({ resources: [] })
    }

    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string[]> = {}

      for (const issue of error.issues) {
        const path = issue.path.join('.')
        if (!formattedErrors[path]) {
          formattedErrors[path] = []
        }
        formattedErrors[path].push(issue.message)
      }

      const validationError = new ValidationError('Response validation failed', formattedErrors)
      logValidationError(validationError, data)
      throw validationError
    }
    throw error
  }
}
