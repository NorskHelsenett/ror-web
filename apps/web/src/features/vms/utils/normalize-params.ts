/**
 * Represents the normalized parameters for cluster view operations.
 *
 * @property view - The type of view to display, either 'grid' or 'list'.
 * @property page - The current page number for pagination.
 * @property limit - The maximum number of items per page.
 * @property sort - (Optional) The field by which to sort the results.
 * @property order - The sort order, either 'asc' (ascending) or 'desc' (descending).
 * @property filters - (Optional) A string representing applied filters.
 */
export interface NormalizeParamsResult {
  view: 'grid' | 'list'
  page: number
  limit: number
  sort?: string
  order: 'asc' | 'desc'
  filters?: string
}

/**
 * Normalizes and parses query parameters from a given object.
 *
 * Extracts and converts values for pagination, sorting, view type, and filters,
 * providing default values when parameters are missing or invalid.
 *
 * @param parameters - An object containing query parameters as strings or string arrays.
 * @returns An object containing normalized parameters:
 * - `view`: Either 'grid' or 'list' (defaults to 'grid').
 * - `page`: The current page number (defaults to 1).
 * - `limit`: The number of items per page (defaults to 10).
 * - `sort`: The sort field, if provided.
 * - `order`: Either 'asc' or 'desc' (defaults to 'asc').
 * - `filters`: The filter value if set to 'open', otherwise undefined.
 */
export function normalizeParams(parameters: Record<string, string | string[] | undefined>): NormalizeParamsResult {
  const get = (key: string): string | undefined =>
    typeof parameters[key] === 'string' ? (parameters[key] as string) : undefined

  const page = Number(get('page') ?? '1') || 1
  const limit = Number(get('limit') ?? '10') || 10
  const sort = get('sort')
  const order: 'asc' | 'desc' = get('order') === 'desc' ? 'desc' : 'asc'
  const view: 'grid' | 'list' = get('view') === 'list' ? 'list' : 'grid'
  const filters = get('filters') === 'open' ? 'open' : undefined

  return { view, page, limit, sort, order, filters }
}
