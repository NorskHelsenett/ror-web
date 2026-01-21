/*
 * FILE OVERVIEW:
 *
 * Custom hook for sorting items based on provided definitions, sort key, and order.
 */

import { SortOrder } from '@/types/resources-page'
import { useMemo } from 'react'

/**
 * Defines the sorting configuration for a specific type.
 *
 * @template T - The type of items to be sorted.
 * @property key - The unique identifier for the sort definition.
 * @property extractor - A function that extracts the value to sort by from an item.
 *   The extracted value can be a string, number, null, or undefined.
 * @property compareFn - Optional custom comparison function for advanced sorting logic.
 *   If provided, this will be used instead of the default comparison.
 */
export interface SortDefinition<T> {
  key: string
  extractor: (item: T) => string | number | null | undefined
  compareFn?: (a: T, b: T) => number
}

/**
 * Custom React hook for sorting an array of items based on a specified key and order.
 *
 * @template T - The type of items in the array.
 * @param params - The parameters for sorting.
 * @param params.items - The array of items to sort.
 * @param params.sortKey - The key to sort by, corresponding to a definition.
 * @param params.sortOrder - The order to sort in ('asc' or 'desc'). Defaults to 'asc'.
 * @param params.definitions - An array of sort definitions, each containing a key and an extractor function.
 * @returns The sorted array of items. If no sort key or definition is provided, returns the original array.
 */
export function useSorting<T>({
  items,
  sortKey,
  sortOrder = 'asc',
  definitions,
}: {
  items: T[]
  sortKey?: string
  sortOrder?: SortOrder
  definitions: SortDefinition<T>[]
}) {
  return useMemo(() => {
    if (!sortKey) return items

    const def = definitions.find((d) => d.key === sortKey)
    if (!def) return items

    const { extractor, compareFn } = def
    const orderMultiplier = sortOrder === 'desc' ? -1 : 1

    return [...items].sort((a, b) => {
      // Use custom comparison function if provided
      if (compareFn) {
        return compareFn(a, b) * orderMultiplier
      }

      // Default comparison logic
      const aVal = extractor(a)
      const bVal = extractor(b)

      // Handle null/undefined
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      // Numeric compare
      if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * orderMultiplier

      // String compare
      return String(aVal).localeCompare(String(bVal)) * orderMultiplier
    })
  }, [items, sortKey, sortOrder, definitions])
}
