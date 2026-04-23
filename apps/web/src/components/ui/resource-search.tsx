'use client'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Input } from '@/components/shadcn/input'
import { Search } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearch } from '@/hooks/use-search'
import { VmSearchWithOptions } from '@/features/vms/components/vm-search-with-options'

/**
 * Props for the `ResourceSearch` component.
 *
 * @template T - The type of items to be searched.
 * @property {T[]} items - The array of items to search through.
 * @property {(results: T[], searchQuery?: string) => void} [onResultsChange] - Optional callback invoked when the search results change.
 * @property {string} [searchText] - Optional initial search text.
 * @property {string[]} keys - The keys of the item objects to use for searching.
 * @property {(item: T) => Record<string, unknown>} [mapItem] - Optional function to map an item to a searchable object.
 * @property {number} [threshold] - Optional threshold for search sensitivity (e.g., for fuzzy search).
 * @property {(items: T[]) => string} [getItemsKey] - Optional function to generate a unique key for the items array.
 */
export interface ResourceSearchProps<T> {
  items: T[]
  onResultsChange?: (results: T[], searchQuery?: string) => void
  onFieldChange?: (field: string) => void
  searchText?: string
  keys: string[]
  mapItem?: (item: T) => Record<string, unknown>
  threshold?: number
  getItemsKey?: (items: T[]) => string
  resourceType?: string
}

/**
 * A generic search input component that filters a list of items based on user input.
 *
 * @template T - The type of items to search.
 * @param props - The props for ResourceSearch.
 * @param props.items - The array of items to search through.
 * @param props.onResultsChange - Callback invoked when the search results change.
 * @param props.searchText - Optional placeholder and aria-label text for the input.
 * @param props.keys - Keys of the item to use for searching.
 * @param props.mapItem - Function to map an item for searching.
 * @param props.threshold - Optional threshold for search matching (default: 0.3).
 * @param props.getItemsKey - Optional function to generate a unique key for the results.
 * @param props.resourceType - Resource type to return different search options
 * @returns A search input field that filters items and notifies on result changes.
 */
export function ResourceSearch<T>({
  items,
  onResultsChange,
  onFieldChange,
  searchText,
  keys,
  mapItem,
  threshold = 0.3,
  getItemsKey,
  resourceType,
}: ResourceSearchProps<T>) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 120)
  const results = useSearch(items, debouncedQuery, { keys, mapItem, threshold })

  const lastSentKeyRef = useRef('')

  useEffect(() => {
    if (resourceType === 'vms') return

    const resultsKey = getItemsKey ? getItemsKey(results) : JSON.stringify(results)
    const nextKey = `${debouncedQuery}::${resultsKey}`

    if (nextKey !== lastSentKeyRef.current) {
      onResultsChange?.(results, debouncedQuery)
      lastSentKeyRef.current = nextKey
    }
  }, [results, debouncedQuery, onResultsChange, getItemsKey, resourceType])

  const handleVmQueryChange = useCallback(
    (query: string) => {
      onResultsChange?.(items, query)
    },
    [onResultsChange, items]
  )

  if (resourceType === 'vms') {
    return <VmSearchWithOptions onFieldChange={onFieldChange} onQueryChange={handleVmQueryChange} />
  }

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      aria-label={searchText || 'Search...'}
      placeholder={searchText || 'Search...'}
      icon={<Search className='w-4 h-4' />}
      iconPosition='left'
    />
  )
}
