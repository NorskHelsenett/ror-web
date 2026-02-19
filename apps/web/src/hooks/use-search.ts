/*
 * FILE OVERVIEW:
 *
 * Generic hook for fuzzy searching any dataset with Fuse.js.
 */

import Fuse, { FuseOptionKey } from 'fuse.js'
import { useMemo, useState, useEffect, useTransition } from 'react'

/**
 * Options for configuring the useSearch hook.
 *
 * @template T - The type of items to be searched.
 * @template M - The mapped type (searchable object).
 * @property {number} [threshold] - The minimum score for a result to be considered a match. Lower values mean stricter matching.
 * @property {FuseOptionKey<T>[]} [keys] - The list of keys in the item to search against.
 * @property {(item: T) => Record<string, any>} [mapItem] - A function to transform an item before searching.
 */
export interface UseSearchOptions<T, M = T> {
  keys?: (keyof M)[]
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
export function useSearch<T, M = T>(items: T[], query: string, options: UseSearchOptions<T, M> = {}) {
  const { keys = [], mapItem } = options

  const [results, setResults] = useState<T[]>(items)
  const [isPending, startTransition] = useTransition()

  const sourceItems = useMemo(() => {
    return mapItem
      ? items.map((item) => ({ original: item, mapped: mapItem(item) }))
      : items.map((i) => ({ original: i, mapped: i as unknown as M }))
  }, [items, mapItem])

  useEffect(() => {
    if (!query.trim()) {
      setResults(items)
      return
    }

    const normalizedQuery = query.trim().toLowerCase()

    startTransition(() => {
      const filtered = sourceItems
        .filter(({ mapped }) =>
          keys.some((key) => {
            const value = String((mapped as any)[key] ?? '').toLowerCase()
            return value.startsWith(normalizedQuery)
          })
        )
        .map((item) => item.original)

      setResults(filtered)
    })
  }, [query, sourceItems, items, keys])

  return { results, isSearching: isPending }
}
