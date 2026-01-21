'use client'

import { DataTable } from '@/components/ui/data-table'
import {
  PageViewProps,
  getBackupJobId,
  getBackupJobKey,
  getBackupJobLocation,
  getBackupJobSource,
} from '@/features/vms/backup/utils/backup-job'
import { useFilters } from '@/hooks/use-filters'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { loadMoreBackupJobs } from '@/utils/backup-job-actions'
import { searchBackupJobById, searchBackupJobsByQuery } from '@/utils/backup-job-search-actions'
import { BackupJob } from '@ror/js-api-client'
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { useDisplayData } from '@/hooks/use-display-data'
import type { BackupJobColumnsData } from '@/features/backup/backup-job/types/backup-job-types'
import { getBackupJobTableColumns } from '@/features/backup/backup-job/components/backup-job-columns'
import { cn } from '@/utils/clsxm'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { SortSelect } from '@/components/ui/sort-select'
import { sortingOptionsBackupJob } from '@/features/backup/config/page-view-options'
import { Input } from '@/components/shadcn/input'
import { RotateCw, Search } from 'lucide-react'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Button } from '@/components/shadcn/button'

export const PageView = ({ className, backupJobs, params }: PageViewProps) => {
  const filtersOpen = params.filters === 'open'
  const [isPending, startTransition] = useTransition()

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<BackupJob>({
    initial: backupJobs,
    sort: params.sort,
    pageSize: 50,
    getItemId: getBackupJobId,
    getItemsKey: getBackupJobKey,
    loadMore: async (offset, limit) => {
      const res = await loadMoreBackupJobs({
        offset,
        limit,
        sort: params.sort,
        order: params.order,
      })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  const safeItems = useMemo(() => items.filter((c) => getBackupJobId(c)), [items])

  const filterDefinitions = [
    { key: 'location', extractor: (backupJobs: BackupJob) => getBackupJobLocation(backupJobs) },
    { key: 'source', extractor: (backupJobs: BackupJob) => getBackupJobSource(backupJobs) },
  ]

  const definitions: SortDefinition<BackupJob>[] = [
    { key: 'source', extractor: (item) => getBackupJobSource(item) },
    { key: 'location', extractor: (item) => getBackupJobLocation(item) },
  ]

  const { filteredItems, resetFilters } = useFilters<BackupJob>(safeItems, filterDefinitions)
  const { setSelectedDisplayData } = useDisplayData<BackupJobColumnsData>('backup-jobs')
  const [searchResults, setSearchResults] = useState<BackupJob[]>(safeItems)
  const [serverSearchResults, setServerSearchResults] = useState<BackupJob[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebouncedValue(searchQuery, 120)
  const sortedItems = useSorting({ items: filteredItems, sortKey: params.sort, sortOrder: params.order, definitions })

  // Enhanced search handler with server-side fallback
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults(safeItems)
      setServerSearchResults([])
      return
    }

    const trimmedQuery = debouncedQuery.trim()

    // First, try exact ID match in loaded data
    const exactIdMatch = safeItems.filter((item) => getBackupJobId(item) === trimmedQuery)

    if (exactIdMatch.length > 0) {
      setSearchResults(exactIdMatch)
      setServerSearchResults([])
      return
    }

    // If no exact ID match, do fuzzy search in loaded data
    const fuzzyMatches = safeItems.filter((item) => {
      const id = getBackupJobId(item).toLowerCase()
      const source = getBackupJobSource(item).toLowerCase()
      const location = getBackupJobLocation(item).toLowerCase()
      const queryLower = trimmedQuery.toLowerCase()

      return id.includes(queryLower) || source.includes(queryLower) || location.includes(queryLower)
    })

    if (fuzzyMatches.length > 0) {
      setSearchResults(fuzzyMatches)
      setServerSearchResults([])
      return
    }

    // If no local matches found, search on the server
    startTransition(async () => {
      try {
        // Try exact ID search first
        const exactResult = await searchBackupJobById(trimmedQuery)
        if (exactResult) {
          setServerSearchResults([exactResult])
          setSearchResults([])
          return
        }

        // Fall back to general query search
        const queryResults = await searchBackupJobsByQuery(trimmedQuery, 50)
        setServerSearchResults(queryResults)
        setSearchResults([])
      } catch (error) {
        console.error('Server search failed:', error)
        setServerSearchResults([])
        setSearchResults([])
      }
    })
  }, [debouncedQuery, safeItems])

  const lastSafeKeyRef = useRef('')
  useEffect(() => {
    const nextKey = getBackupJobKey(safeItems)
    if (nextKey !== lastSafeKeyRef.current) {
      lastSafeKeyRef.current = nextKey
      // Only update search results if no active search query
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
    resetFilters()
    setSelectedDisplayData([])
    setServerSearchResults([])
    clearUrl()
  }, [resetFilters, setSelectedDisplayData, clearUrl])

  const displayedItems = useMemo(() => {
    // If we have server search results, use those exclusively
    if (serverSearchResults.length > 0) {
      return serverSearchResults
    }

    // Otherwise use local search results filtered by sorted items
    if (!searchResults?.length) return sortedItems
    const ids = new Set(searchResults.map(getBackupJobId))
    return sortedItems.filter((c) => ids.has(getBackupJobId(c)))
  }, [searchResults, serverSearchResults, sortedItems])

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <div className='relative'>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label='Search backup jobs...'
            placeholder={isPending ? 'Searching...' : 'Search backup jobs...'}
            icon={<Search className='w-4 h-4' />}
            iconPosition='left'
          />
        </div>
        <SortSelect options={sortingOptionsBackupJob} currentSort={params.sort} />
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
          columns={getBackupJobTableColumns()}
          hasMore={hasMore}
          isLoading={isLoading}
          sentinelRef={sentinelRef}
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
