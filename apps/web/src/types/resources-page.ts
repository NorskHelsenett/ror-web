/*
 * FILE OVERVIEW:
 *
 * Types related to the resources page view
 */

/**
 * Represents the query parameters for the clusters page view.
 *
 * @property view - The display mode of the clusters, either 'grid' or 'list'.
 * @property page - The current page number for pagination.
 * @property limit - The maximum number of items per page.
 * @property sort - The field by which to sort the clusters.
 * @property order - The sort direction, either 'asc' (ascending) or 'desc' (descending).
 * @property filters - A string representing applied filters.
 * @property filterPanel - A string representing the state of the filter panel.
 * @property search - A string representing the search query.
 */
export interface Params {
  view?: 'grid' | 'list'
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  filters?: string
  filterPanel?: string
  search?: string
}

/**
 * Represents the order in which items can be sorted.
 * - `'asc'`: Sort in ascending order.
 * - `'desc'`: Sort in descending order.
 */
export type SortOrder = 'asc' | 'desc'
