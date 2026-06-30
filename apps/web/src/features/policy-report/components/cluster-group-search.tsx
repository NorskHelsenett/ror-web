'use client'

import { useState, useEffect, useRef } from 'react'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Input } from '@/components/shadcn/input'
import { Search } from 'lucide-react'
import { useClusterGroupSearch } from '../hooks/use-cluster-group-search'
import type { ClusterGroup } from '../types/policy-report-types'

interface ClusterGroupSearchProps {
  items: ClusterGroup[]
  onResultsChange: (results: ClusterGroup[]) => void
}

export function ClusterGroupSearch({ items, onResultsChange }: ClusterGroupSearchProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 120)
  const results = useClusterGroupSearch(items, debouncedQuery)

  const lastSentKeyRef = useRef('')

  useEffect(() => {
    const nextKey = results.map((g) => g.clusterUid).join(',')
    if (nextKey !== lastSentKeyRef.current) {
      onResultsChange(results)
      lastSentKeyRef.current = nextKey
    }
  }, [results, onResultsChange])

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      aria-label='Search clusters'
      placeholder='Find clusters...'
      icon={<Search className='w-4 h-4' />}
      iconPosition='left'
    />
  )
}
