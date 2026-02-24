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
  pageSize = 50,
  sort,
  order,
}: UseVmSearchWithLoadingOptions) {
  const [allItems, setAllItems] = useState(initialItems)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(initialItems.length)

  const trimmedQuery = query.trim()
  const searchResults = useVmSearch(allItems, trimmedQuery)

  const loadingRef = useRef(false)
  const queryRef = useRef('')
  const searchAttemptedRef = useRef(false)

  useEffect(() => {
    if (queryRef.current !== trimmedQuery) {
      const previousQuery = queryRef.current
      queryRef.current = trimmedQuery
      searchAttemptedRef.current = false

      if (!trimmedQuery) {
        setAllItems(initialItems)
        setOffset(initialItems.length)
        setHasMore(true)
        setIsLoadingMore(false)
        loadingRef.current = false
        return
      }

      if (!trimmedQuery.startsWith(previousQuery) || searchResults.length === 0) {
        setAllItems(initialItems)
        setOffset(initialItems.length)
        setHasMore(true)
        loadingRef.current = false
      }
    }
  }, [trimmedQuery, initialItems, searchResults.length])

  useEffect(() => {
    const shouldLoad =
      trimmedQuery && (searchResults.length === 0 || !searchAttemptedRef.current) && hasMore && !loadingRef.current

    if (!shouldLoad) {
      return
    }

    const loadMore = async () => {
      loadingRef.current = true
      setIsLoadingMore(true)
      searchAttemptedRef.current = true

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
        }
      } catch (error) {
        console.error('Failed to load more VMs:', error)
        setHasMore(false)
      } finally {
        loadingRef.current = false
        setIsLoadingMore(false)
      }
    }

    loadMore()
  }, [trimmedQuery, searchResults.length, hasMore, offset, pageSize, sort, order])

  return {
    results: searchResults,
    allLoadedItems: allItems,
    isLoadingMore,
    hasMore: trimmedQuery ? hasMore : true,
  }
}
