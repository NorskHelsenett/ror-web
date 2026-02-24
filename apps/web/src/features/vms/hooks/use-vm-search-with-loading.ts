import { useState, useEffect, useRef } from 'react'
import type { VirtualMachine } from '@ror/js-api-client'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import { useVmSearch } from './use-vm-search'
import { loadMoreVMs } from '@/utils/vms-actions'

interface UseVmSearchWithLoadingOptions {
  initialItems: (VirtualMachine | VMWithBackupStatus)[]
  query: string
  pageSize?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export function useVmSearchWithLoading({
  initialItems,
  query,
  pageSize = 100,
  sort,
  order,
}: UseVmSearchWithLoadingOptions) {
  const [allItems, setAllItems] = useState(initialItems)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(initialItems.length)
  const [hasLoadedAll, setHasLoadedAll] = useState(false)

  const trimmedQuery = query.trim()
  const searchResults = useVmSearch(allItems, trimmedQuery)

  const loadingRef = useRef(false)
  const queryRef = useRef('')

  useEffect(() => {
    // When query changes, reset everything
    if (queryRef.current !== trimmedQuery) {
      queryRef.current = trimmedQuery
      setHasLoadedAll(false)

      if (!trimmedQuery) {
        // Query cleared - reset to initial state
        setAllItems(initialItems)
        setOffset(initialItems.length)
        setHasMore(true)
        setIsLoadingMore(false)
        loadingRef.current = false
        return
      }

      // New search query - reset to initial items and start loading all
      setAllItems(initialItems)
      setOffset(initialItems.length)
      setHasMore(true)
      loadingRef.current = false
    }
  }, [trimmedQuery, initialItems])

  // Load ALL VMs when searching to ensure we find everything
  useEffect(() => {
    if (!trimmedQuery || hasLoadedAll || !hasMore || loadingRef.current) {
      return
    }

    const loadAllVMs = async () => {
      loadingRef.current = true
      setIsLoadingMore(true)

      try {
        const result = await loadMoreVMs({
          offset,
          limit: pageSize,
          sort,
          order,
        })

        if (queryRef.current === trimmedQuery) {
          setAllItems((prev) => [...prev, ...result.items])
          setOffset((prev) => prev + result.items.length)
          setHasMore(result.hasMore)

          // If no more data, mark as fully loaded
          if (!result.hasMore) {
            setHasLoadedAll(true)
          }
        }
      } catch (error) {
        console.error('Failed to load more VMs:', error)
        setHasMore(false)
        setHasLoadedAll(true)
      } finally {
        loadingRef.current = false
        setIsLoadingMore(false)
      }
    }

    loadAllVMs()
  }, [trimmedQuery, hasLoadedAll, hasMore, offset, pageSize, sort, order])

  return {
    results: searchResults,
    allLoadedItems: allItems,
    isLoadingMore,
    hasMore: trimmedQuery ? hasMore : true,
    isFullyLoaded: hasLoadedAll,
  }
}
