'use client'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Input } from '@/components/shadcn/input'
import { Search } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useSearch } from '@/hooks/use-search'

/**
 * Props for the `ResourceSearch` component.
 *
 * @template T - The type of items to be searched.
 * @property {T[]} items - The array of items to search through.
 * @property {(results: T[]) => void} [onResultsChange] - Optional callback invoked when the search results change.
 * @property {string} [searchText] - Optional initial search text.
 * @property {string[]} keys - The keys of the item objects to use for searching.
 * @property {(item: T) => Record<string, unknown>} [mapItem] - Optional function to map an item to a searchable object.
 * @property {number} [threshold] - Optional threshold for search sensitivity (e.g., for fuzzy search).
 * @property {(items: T[]) => string} [getItemsKey] - Optional function to generate a unique key for the items array.
 */
export interface ResourceSearchProps<T> {
  items: T[]
  onResultsChange?: (results: T[]) => void
  searchText?: string
  keys: string[]
  mapItem?: (item: T) => Record<string, unknown>
  threshold?: number
  getItemsKey?: (items: T[]) => string
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
 * @returns A search input field that filters items and notifies on result changes.
 */
export function ResourceSearch<T>({
  items,
  onResultsChange,
  searchText,
  keys,
  mapItem,
  threshold = 0.3,
  getItemsKey,
}: ResourceSearchProps<T>) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 120)
  const { results, isSearching } = useSearch(items, debouncedQuery, { keys, mapItem })

  const lastSentKeyRef = useRef('')

  useEffect(() => {
    const nextKey = getItemsKey ? getItemsKey(results) : JSON.stringify(results)
    if (nextKey !== lastSentKeyRef.current) {
      onResultsChange?.(results)
      lastSentKeyRef.current = nextKey
    }
  }, [results, onResultsChange, getItemsKey])

  return (
    <div className='relative'>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={searchText || 'Search...'}
        placeholder={searchText || 'Search...'}
        icon={<Search className='w-4 h-4' />}
        iconPosition='left'
        className='pr-8'
      />

      {isSearching && (
        <div className='absolute right-2 top-1/2 -translate-y-1/2'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent' />
        </div>
      )}
    </div>
  )
}
