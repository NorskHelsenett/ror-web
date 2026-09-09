import { useMemo } from 'react'
import Fuse, { FuseOptionKey } from 'fuse.js'

/**
 * Options for configuring the {@link useSearch} hook.
 *
 * @template T - The type of the raw items being searched.
 * @template M - The shape actually handed to Fuse for matching. Defaults to `T` when no `mapItem` is provided.
 * @property threshold - Match strictness, `0`–`1`. Lower is stricter. Defaults to `0.3`.
 * @property keys - Keys on the (mapped) item to search against. Defaults to `[]` (no matches).
 * @property mapItem - Transforms an item into the searchable shape before matching.
 */
export interface UseSearchOptions<T, M = T> {
  threshold?: number
  keys?: FuseOptionKey<M>[]
  mapItem?: (item: T) => M
}

/**
 * Custom hook for searching and filtering an array of items using fuzzy matching.
 *
 * @template T - The type of items in the array.
 * @template M - The mapped searchable type.
 * @param items - The array of items to search through.
 * @param query - The search query string.
 * @param options - Optional configuration for the search.
 * @returns An array of items that match the search query.
 */
export function useSearch<T, M = T>(items: T[], query: string, options: UseSearchOptions<T, M> = {}): T[] {
  const { threshold = 0.3, keys = [], mapItem } = options

  const { fuse, sourceItems } = useMemo(() => {
    const sourceItems = mapItem
      ? items.map((item) => ({ original: item, mapped: mapItem(item) }))
      : items.map((i) => ({ original: i, mapped: i as unknown as M }))
    const fuse = new Fuse<M>(
      sourceItems.map((i) => i.mapped),
      { keys, threshold, ignoreLocation: true, useExtendedSearch: true }
    )
    return { fuse, sourceItems }
  }, [items, keys, threshold, mapItem])

  if (!query.trim()) return items
  // Extended search gives meaning to !, ^, =, ', | — strip them so free-text queries always match literally.
  const sanitizedQuery = query
    .trim()
    .replace(/[!^='|]/g, ' ')
    .trim()
  if (!sanitizedQuery) return items
  const results = fuse.search(sanitizedQuery)

  return results.map((r) => sourceItems[r.refIndex].original)
}
