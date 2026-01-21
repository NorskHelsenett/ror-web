'use client'

import {
  getBackupRunEndTime,
  getBackupRunExpiryTime,
  getBackupRunId,
  getBackupRunKey,
  getBackupRunMappedBackupJobId,
  getBackupRunSource,
  getBackupRunStartTime,
  PageViewProps,
} from '@/features/vms/backup/utils/backup-run'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useDisplayData } from '@/hooks/use-display-data'
import { useFilters } from '@/hooks/use-filters'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { loadMoreBackupRuns } from '@/utils/backup-run-actions'
import { searchBackupRunById, searchBackupRunsByQuery } from '@/utils/backup-run-search-actions'
import { BackupRun } from '@ror/js-api-client'
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { RotateCw, Search } from 'lucide-react'
import { Input } from '@/components/shadcn/input'
import { SortSelect } from '@/components/ui/sort-select'
import { sortingOptionsBackupRun } from '@/features/backup/config/page-view-options'
import { Button } from '@/components/shadcn/button'
import { DataTable } from '@/components/ui/data-table'
import { getBackupRunTableColumns } from '@/features/backup/backup-run/components/backup-run-columns'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { cn } from '@/utils/clsxm'
import { BackupRunColumnsData } from '@/features/backup/backup-run/types/backup-run-types'

export const PageView = ({ className, backupRuns, params, backupJobId }: PageViewProps) => {
  const filtersOpen = params.filters === 'open'
  const [isPending, startTransition] = useTransition()
  const [isServerSearching, setIsServerSearching] = useState(false)
  const searchAbortControllerRef = useRef<AbortController | null>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<BackupRun>({
    initial: backupRuns,
    sort: params.sort,
    pageSize: 50,
    getItemId: getBackupRunId,
    getItemsKey: getBackupRunKey,
    loadMore: async (offset, limit) => {
      if (isServerSearching) {
        return { items: [], hasMore: false }
      }
      const res = await loadMoreBackupRuns({
        offset,
        limit,
        sort: params.sort,
        order: params.order,
      })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  const safeItems = useMemo(() => items.filter((c) => getBackupRunId(c)), [items])

  const filterDefinitions = [{ key: 'source', extractor: (backupRun: BackupRun) => getBackupRunSource(backupRun) }]
  const definitions: SortDefinition<BackupRun>[] = [
    { key: 'source', extractor: (item) => getBackupRunSource(item) },
    { key: 'startTime', extractor: (item) => getBackupRunStartTime(item) },
    { key: 'endTime', extractor: (item) => getBackupRunEndTime(item) },
    { key: 'expiryTime', extractor: (item) => getBackupRunExpiryTime(item) },
    { key: 'backupJobId', extractor: (item) => getBackupRunMappedBackupJobId(item) },
  ]

  const { filteredItems, resetFilters } = useFilters<BackupRun>(safeItems, filterDefinitions)
  const { setSelectedDisplayData } = useDisplayData<BackupRunColumnsData>('backup-runs')
  const [searchResults, setSearchResults] = useState<BackupRun[]>(safeItems)
  const [serverSearchResults, setServerSearchResults] = useState<BackupRun[]>([])
  // Initialize search query from backupJobId parameter
  const [searchQuery, setSearchQuery] = useState(backupJobId || '')
  const debouncedQuery = useDebouncedValue(searchQuery, 800)
  const sortedItems = useSorting({ items: filteredItems, sortKey: params.sort, sortOrder: params.order, definitions })

  // Enhanced search handler with server-side fallback
  useEffect(() => {
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort()
      searchAbortControllerRef.current = null
    }
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = null
    }

    if (!debouncedQuery.trim()) {
      setSearchResults(safeItems)
      setServerSearchResults([])
      setIsServerSearching(false)
      return
    }

    const trimmedQuery = debouncedQuery.trim()

    // First, try exact ID match in loaded data
    const exactIdMatch = safeItems.filter(
      (item) => getBackupRunId(item) === trimmedQuery || getBackupRunMappedBackupJobId(item) === trimmedQuery
    )

    if (exactIdMatch.length > 0) {
      setSearchResults(exactIdMatch)
      setServerSearchResults([])
      setIsServerSearching(false)
      return
    }

    // If no exact ID match, do fuzzy search in loaded data
    const fuzzyMatches = safeItems.filter((item) => {
      const id = getBackupRunId(item).toLowerCase()
      const source = getBackupRunSource(item).toLowerCase()
      const backupJobId = getBackupRunMappedBackupJobId(item).toLowerCase()
      const queryLower = trimmedQuery.toLowerCase()

      return id.includes(queryLower) || source.includes(queryLower) || backupJobId.includes(queryLower)
    })

    if (fuzzyMatches.length > 0) {
      setSearchResults(fuzzyMatches)
      setServerSearchResults([])
      setIsServerSearching(false)
      return
    }

    // If no local matches found, search on the server
    setIsServerSearching(true)

    // Set a 5-second timeout to unfreeze the UI
    searchTimeoutRef.current = setTimeout(() => {}, 5000)

    // Create new abort controller for this search request
    searchAbortControllerRef.current = new AbortController()
    const currentAbortController = searchAbortControllerRef.current

    startTransition(async () => {
      try {
        if (currentAbortController.signal.aborted) return

        // Try exact ID search first
        const exactResult = await searchBackupRunById(trimmedQuery)

        if (currentAbortController.signal.aborted) return

        if (exactResult) {
          setServerSearchResults([exactResult])
          setSearchResults([])
          return
        }

        // For backup job IDs with colons, also try query search (but with reduced limit)
        if (trimmedQuery.includes(':')) {
          const queryResults = await searchBackupRunsByQuery(trimmedQuery, 10)

          if (currentAbortController.signal.aborted) return

          setServerSearchResults(queryResults)
          setSearchResults([])
        } else {
          setServerSearchResults([])
          setSearchResults([])
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Server search failed:', error)
        }
        if (!currentAbortController.signal.aborted) {
          setServerSearchResults([])
          setSearchResults([])
        }
      } finally {
        if (!currentAbortController.signal.aborted) {
          setIsServerSearching(false)
        }
      }
    })
  }, [debouncedQuery, safeItems])

  // Cleanup effect to cancel ongoing requests when component unmounts
  useEffect(() => {
    return () => {
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort()
      }
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  const lastSafeKeyRef = useRef('')
  useEffect(() => {
    const nextKey = getBackupRunKey(safeItems)
    if (nextKey !== lastSafeKeyRef.current) {
      lastSafeKeyRef.current = nextKey
      if (!debouncedQuery.trim()) {
        setSearchResults(safeItems)
        setServerSearchResults([])
      }
    }
  }, [safeItems, debouncedQuery])

  const pathname = usePathname()
  const router = useRouter()
  const clearUrl = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const handleRefreshFilters = useCallback(() => {
    // Cancel any ongoing search and timers
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort()
      searchAbortControllerRef.current = null
    }
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = null
    }

    resetFilters()
    setSelectedDisplayData([])
    setServerSearchResults([])
    setIsServerSearching(false)
    setSearchQuery('')
    clearUrl()
  }, [resetFilters, setSelectedDisplayData, clearUrl])

  const displayedItems = useMemo(() => {
    // If we have server search results, use those exclusively
    if (serverSearchResults.length > 0) {
      return serverSearchResults
    }

    // Otherwise use local search results filtered by sorted items
    if (!searchResults.length) return sortedItems
    const ids = new Set(searchResults.map(getBackupRunId))
    return sortedItems.filter((c) => ids.has(getBackupRunId(c)))
  }, [searchResults, serverSearchResults, sortedItems])

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <div className='relative'>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isServerSearching ? 'Searching...' : isPending ? 'Processing...' : 'Search backups...'}
            aria-label='Search backup runs...'
            icon={<Search className='w-4 h-4' />}
            iconPosition='left'
          />
          {isServerSearching && <div className='absolute -bottom-6 left-0 text-xs'>Searching...</div>}
          {debouncedQuery &&
            !isServerSearching &&
            // !isSearchFrozen &&
            searchResults.length === 0 &&
            serverSearchResults.length === 0 && (
              <div className='absolute -bottom-6 left-0 text-xs text-muted-foreground'>No results found</div>
            )}
        </div>
        <SortSelect options={sortingOptionsBackupRun} currentSort={params.sort} />
        <Button
          type='button'
          onClick={handleRefreshFilters}
          aria-label='Reset filters'
          title='Reset filters'
          className='gap-2'
        >
          <RotateCw className='h-4 w-4' />
          Refresh
        </Button>
      </div>
    </div>
  )

  const TableView = () => {
    return (
      <div>
        <DataTable
          data={displayedItems}
          columns={getBackupRunTableColumns()}
          hasMore={!isServerSearching && hasMore} // Freeze infinite scroll during server search
          isLoading={isLoading || isServerSearching}
          sentinelRef={!isServerSearching ? sentinelRef : undefined} // Disable sentinel during server search
        />
      </div>
    )
  }

  return (
    <div className={cn(className, '@container')}>
      <div className={cn('border-b', filtersOpen && 'pb-2')}>
        <div className={cn('mx-12 flex items-center min-h-28 py-6 ', filtersOpen && 'w-[calc(100%-6rem)] border-b')}>
          {renderControls()}
        </div>
      </div>
      <NotReadyMessage className='mx-12 my-6'>
        Welcome to the new ROR web! This site is currently under development, so feel free to look around, but do not
        expect finished functionality or that all data is present. The development team is working hard on delivering a
        complete product as quick as possible :)
      </NotReadyMessage>

      <section className='px-12 my-8'>
        <TableView />
      </section>
    </div>
  )
}

export default PageView
