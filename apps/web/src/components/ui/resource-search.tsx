'use client'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Input } from '@/components/shadcn/input'
import { Search } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useSearch } from '@/hooks/use-search'

export interface ResourceSearchProps<T> {
  items: T[]
  onResultsChange?: (results: T[]) => void
  onQueryChange?: (query: string) => void
  searchText?: string
  keys: string[]
  mapItem?: (item: T) => Record<string, unknown>
  threshold?: number
  getItemsKey?: (items: T[]) => string
}

export function ResourceSearch<T>({
  items,
  onResultsChange,
  onQueryChange,
  searchText,
  keys,
  mapItem,
  threshold = 0.3,
  getItemsKey,
}: ResourceSearchProps<T>) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 120)
  const results = useSearch(items, debouncedQuery, { keys, mapItem, threshold })

  const lastSentKeyRef = useRef('')

  useEffect(() => {
    const nextKey = getItemsKey ? getItemsKey(results) : JSON.stringify(results)
    if (nextKey !== lastSentKeyRef.current) {
      onResultsChange?.(results)
      onQueryChange?.(debouncedQuery)
      lastSentKeyRef.current = nextKey
    }
  }, [results, onResultsChange, onQueryChange, debouncedQuery, getItemsKey])

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
