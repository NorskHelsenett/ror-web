'use client'

import { DataTable } from '@/components/ui/data-table'
import {
  PageViewProps,
  getBackupJobId,
  getBackupJobKey,
  getBackupJobLocation,
  getBackupJobSource,
  getBackupStatus,
} from '@/features/vms/backup/utils/backup-job'
import { useFilters } from '@/hooks/use-filters'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { loadMoreBackupJobs, loadBackupRunsForJobs } from '@/utils/backup-job-actions'
import { BackupJob, BackupRun } from '@ror/js-api-client'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { useDisplayData } from '@/hooks/use-display-data'
import type { BackupJobColumnsData } from '@/features/backup/backup-job/types/backup-job-types'
import { getBackupJobTableColumns } from '@/features/backup/backup-job/components/backup-job-columns'
import { cn } from '@/utils/clsxm'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { SortSelect } from '@/components/ui/sort-select'
import { sortingOptionsBackupJob } from '@/features/backup/config/page-view-options'
import { RotateCw } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { BackupSearchWithOptions } from '@/features/vms/backup/components/backup-search-with-options'
import { SummaryCards } from '@/features/backup/backup-job/components/summary-cards'

export const PageView = ({ className, backupJobs, backupRuns = [], params }: PageViewProps) => {
  const filtersOpen = params.filters === 'open'

  const pathname = usePathname()
  const router = useRouter()

  const [allBackupRuns, setAllBackupRuns] = useState<BackupRun[]>(backupRuns)

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

  const updateFiltersInUrl = useCallback(
    (searchQuery: string) => {
      const next = new URLSearchParams(searchParams.toString())
      const q = (searchQuery ?? '').trim()

      if (q) next.set('search', q)
      else next.delete('search')

      next.delete('page')
      router.replace(`${pathname}?${next.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const updateFieldInUrl = useCallback(
    (field: string) => {
      const next = new URLSearchParams(searchParams.toString())
      next.set('searchField', field)
      router.replace(`${pathname}?${next.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
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
  const totalJobs = backupJobs.length
  const activeJobs = backupJobs.filter((job) => getBackupStatus(job) === 'active').length
  const pausedJobs = backupJobs.filter((job) => getBackupStatus(job) === 'paused').length
  const inactiveJobs = backupJobs.filter((job) => getBackupStatus(job) === 'inactive').length
  const activeJobRatio = totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0
  const pausedJobRatio = totalJobs > 0 ? Math.round((pausedJobs / totalJobs) * 100) : 0
  const inactiveJobRatio = totalJobs > 0 ? Math.round((inactiveJobs / totalJobs) * 100) : 0

  const [summaryCardsVisible, setSummaryCardsVisible] = useState(false)

  useEffect(() => {
    const currentSearch = searchParams.get('search')?.trim()

    if (currentSearch && displayedItems && displayedItems.length > 0) {
      const jobsNeedingRuns = displayedItems.filter((job) => {
        const jobRunIds = job?.backupjob?.status?.backupRunIds ?? []
        return jobRunIds.length > 0 && jobRunIds.some((id) => !allBackupRuns.some((r) => r?.backuprun?.id === id))
      })

      if (jobsNeedingRuns.length > 0) {
        loadBackupRunsForJobs(jobsNeedingRuns)
          .then((newRuns) => {
            setAllBackupRuns((prev) => {
              const existingIds = new Set(prev.map((r) => r?.backuprun?.id))
              const uniqueNewRuns = newRuns.filter((r) => !existingIds.has(r?.backuprun?.id))
              return [...prev, ...uniqueNewRuns]
            })
          })
          .catch((err) => console.error('Failed to load backup runs for searched jobs:', err))
      }
    }
  }, [searchParams, displayedItems, allBackupRuns])

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <div className='relative'>
          <BackupSearchWithOptions
            onQueryChange={(query) => handleSearchResultsChange([], query)}
            onFieldChange={(field) => updateFieldInUrl(field)}
          />
        </div>
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
          columns={getBackupJobTableColumns(allBackupRuns)}
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

      {summaryCardsVisible && (
        <SummaryCards
          totalJobs={totalJobs}
          activeJobs={activeJobs}
          pausedJobs={pausedJobs}
          inactiveJobs={inactiveJobs}
          activeJobRatio={activeJobRatio}
          pausedJobRatio={pausedJobRatio}
          inactiveJobRatio={inactiveJobRatio}
        />
      )}

      <section className='px-12 my-8'>
        <TableView />
      </section>
    </div>
  )
}

export default PageView
