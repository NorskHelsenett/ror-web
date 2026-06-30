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
import { loadMoreBackupJobs, loadBackupRunsForJobs } from '@/utils/backup-job-actions'
import { BackupJob, BackupRun } from '@ror/js-api-client'
import { useCallback, useMemo, useState, useEffect, useRef, useTransition } from 'react'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { useDisplayData } from '@/hooks/use-display-data'
import type { BackupJobColumnsData } from '@/features/backup/backup-job/types/backup-job-types'
import { getBackupJobTableColumns } from '@/features/backup/backup-job/components/backup-job-columns'
import { cn } from '@/utils/clsxm'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { SortSelect } from '@/components/ui/sort-select'
import { sortingOptionsBackupJob } from '@/features/backup/config/page-view-options'
import { Loader2, RotateCw } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { BackupSearchWithOptions } from '@/features/vms/backup/components/backup-search-with-options'
import { SummaryCards } from '@/features/backup/backup-job/components/summary-cards'
import { useBackupJobsSummaryHydration } from '@/features/vms/backup/services/backup-jobs-summary-cache'

export const PageView = ({ className, backupJobs, backupRuns = [], params }: PageViewProps) => {
  const filtersOpen = params.filters === 'open'

  const pathname = usePathname()
  const router = useRouter()
  const [isSearchNavigationPending, startSearchTransition] = useTransition()

  const [allBackupRuns, setAllBackupRuns] = useState<BackupRun[]>(backupRuns)
  const [isLoadingRunsForSearch, setIsLoadingRunsForSearch] = useState(false)
  const attemptedMissingRunIdsRef = useRef<Set<string>>(new Set())
  const summary = useBackupJobsSummaryHydration()

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<BackupJob>({
    initial: backupJobs,
    sort: params.sort,
    pageSize: 50,
    getItemId: getBackupJobId,
    getItemsKey: getBackupJobKey,
    loadMore: async (offset, limit) => {
      const urlParams = new URLSearchParams(window.location.search)
      const currentSearch = urlParams.get('search')?.trim() || undefined
      const currentSearchField = urlParams.get('searchField') || 'backupjob.id'
      const res = await loadMoreBackupJobs({
        offset,
        limit,
        sort: params.sort,
        order: params.order,
        search: currentSearch,
        searchField: currentSearchField,
      })

      if (res.items && res.items.length > 0) {
        const newRuns = await loadBackupRunsForJobs(res.items)
        setAllBackupRuns((prev) => {
          const existingIds = new Set(prev.map((r) => r?.backuprun?.id))
          const uniqueNewRuns = newRuns.filter((r) => !existingIds.has(r?.backuprun?.id))
          return [...prev, ...uniqueNewRuns]
        })
      }

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
  const sortedItems = useSorting({ items: filteredItems, sortKey: params.sort, sortOrder: params.order, definitions })
  const searchParams = useSearchParams()
  const currentSearchQuery = searchParams.get('search')?.trim() ?? ''
  const existingRunIds = useMemo(
    () => new Set(allBackupRuns.map((run) => run?.backuprun?.id).filter(Boolean)),
    [allBackupRuns]
  )

  const updateFiltersInUrl = useCallback(
    (searchQuery: string) => {
      const next = new URLSearchParams(searchParams.toString())
      const q = (searchQuery ?? '').trim()

      if (q) next.set('search', q)
      else next.delete('search')

      next.delete('page')
      startSearchTransition(() => {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false })
      })
    },
    [pathname, router, searchParams, startSearchTransition]
  )

  const updateFieldInUrl = useCallback(
    (field: string) => {
      const next = new URLSearchParams(searchParams.toString())
      next.set('searchField', field)
      startSearchTransition(() => {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false })
      })
    },
    [pathname, router, searchParams, startSearchTransition]
  )

  const handleSearchResultsChange = useCallback(
    (_results: BackupJob[], searchQuery?: string) => {
      if (typeof searchQuery === 'string') {
        updateFiltersInUrl(searchQuery)
      }
    },
    [updateFiltersInUrl]
  )

  const clearUrl = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const handleRefreshFilters = useCallback(() => {
    resetFilters()
    setSelectedDisplayData([])
    clearUrl()
  }, [resetFilters, setSelectedDisplayData, clearUrl])

  const displayedItems = sortedItems

  const [summaryCardsVisible, setSummaryCardsVisible] = useState(false)

  useEffect(() => {
    attemptedMissingRunIdsRef.current.clear()
    setIsLoadingRunsForSearch(false)
  }, [currentSearchQuery])

  useEffect(() => {
    if (!currentSearchQuery || !displayedItems || displayedItems.length === 0) {
      setIsLoadingRunsForSearch(false)
      return
    }

    const missingRunIds = new Set<string>()
    for (const job of displayedItems) {
      const jobRunIds = job?.backupjob?.status?.backupRunIds ?? []
      for (const runId of jobRunIds) {
        if (!runId || existingRunIds.has(runId) || attemptedMissingRunIdsRef.current.has(runId)) continue
        missingRunIds.add(runId)
      }
    }

    if (!missingRunIds.size) {
      setIsLoadingRunsForSearch(false)
      return
    }

    const jobsNeedingRuns = displayedItems.filter((job) => {
      const jobRunIds = job?.backupjob?.status?.backupRunIds ?? []
      return jobRunIds.some((runId) => missingRunIds.has(runId))
    })

    for (const runId of missingRunIds) {
      attemptedMissingRunIdsRef.current.add(runId)
    }

    setIsLoadingRunsForSearch(true)
    loadBackupRunsForJobs(jobsNeedingRuns)
      .then((newRuns) => {
        setAllBackupRuns((prev) => {
          const existingIds = new Set(prev.map((run) => run?.backuprun?.id))
          const uniqueNewRuns = newRuns.filter((run) => !existingIds.has(run?.backuprun?.id))
          return [...prev, ...uniqueNewRuns]
        })
      })
      .catch((err) => console.error('Failed to load backup runs for searched jobs:', err))
      .finally(() => setIsLoadingRunsForSearch(false))
  }, [currentSearchQuery, displayedItems, existingRunIds])

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <div className='relative'>
          <BackupSearchWithOptions
            onQueryChange={(query) => handleSearchResultsChange([], query)}
            onFieldChange={(field) => updateFieldInUrl(field)}
          />
        </div>
        {(isSearchNavigationPending || isLoadingRunsForSearch) && (
          <div className='inline-flex items-center gap-2 text-sm text-muted-foreground'>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>Loading search...</span>
          </div>
        )}
        <SortSelect options={sortingOptionsBackupJob} currentSort={params.sort} />
        <Button
          variant='outline'
          aria-label={summaryCardsVisible ? 'Hide summary cards' : 'Show summary cards'}
          title={summaryCardsVisible ? 'Hide summary cards' : 'Show summary cards'}
          className='gap-2'
          onClick={() => setSummaryCardsVisible(!summaryCardsVisible)}
        >
          {summaryCardsVisible ? 'Hide' : 'Show'} summary cards
        </Button>
        <Button
          type='button'
          onClick={handleRefreshFilters}
          aria-label='Reset filters'
          title='Reset filters'
          className='gap-4 flex flex-row '
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
          columns={getBackupJobTableColumns(allBackupRuns, isLoadingRunsForSearch)}
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
      {summaryCardsVisible && (
        <SummaryCards
          totalJobs={summary.totalJobs}
          activeJobs={summary.activeJobs}
          pausedJobs={summary.pausedJobs}
          inactiveJobs={summary.inactiveJobs}
          activeJobRatio={summary.activeJobRatio}
          pausedJobRatio={summary.pausedJobRatio}
          inactiveJobRatio={summary.inactiveJobRatio}
        />
      )}

      <section className='px-12 my-8'>
        <TableView />
      </section>
    </div>
  )
}

export default PageView
