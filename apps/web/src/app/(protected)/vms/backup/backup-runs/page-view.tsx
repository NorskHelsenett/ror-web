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
import { useDisplayData } from '@/hooks/use-display-data'
import { useFilters } from '@/hooks/use-filters'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { loadMoreBackupRuns } from '@/utils/backup-run-actions'
import { BackupRun } from '@ror/js-api-client'
import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RotateCw } from 'lucide-react'
import { SortSelect } from '@/components/ui/sort-select'
import { sortingOptionsBackupRun } from '@/features/backup/config/page-view-options'
import { Button } from '@/components/shadcn/button'
import { DataTable } from '@/components/ui/data-table'
import { getBackupRunTableColumns } from '@/features/backup/backup-run/components/backup-run-columns'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { cn } from '@/utils/clsxm'
import { BackupRunColumnsData } from '@/features/backup/backup-run/types/backup-run-types'
import { BackupSearchWithOptions } from '@/features/vms/backup/components/backup-search-with-options'
import { HistoryRunChart } from '@/features/backup/backup-run/components/history-run-chart'

export const PageView = ({ className, backupRuns, params }: PageViewProps) => {
  const filtersOpen = params.filters === 'open'

  const router = useRouter()
  const pathname = usePathname()

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<BackupRun>({
    initial: backupRuns,
    sort: params.sort,
    pageSize: 50,
    getItemId: getBackupRunId,
    getItemsKey: getBackupRunKey,
    loadMore: async (offset, limit) => {
      const currentSearch = new URLSearchParams(window.location.search).get('search')?.trim() || undefined
      const currentSearchField = new URLSearchParams(window.location.search).get('searchField') || 'backuprun.id'
      const res = await loadMoreBackupRuns({
        offset,
        limit,
        sort: params.sort,
        order: params.order,
        search: currentSearch,
        searchField: currentSearchField,
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
    (_results: BackupRun[], searchQuery?: string) => {
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

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <div className='relative'>
          <BackupSearchWithOptions
            onQueryChange={(query) => handleSearchResultsChange([], query)}
            onFieldChange={(field) => updateFieldInUrl(field)}
          />
        </div>
        <SortSelect options={sortingOptionsBackupRun} currentSort={params.sort} />
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

      {summaryCardsVisible && <HistoryRunChart backupRuns={backupRuns} />}

      <section className='px-12 my-8'>
        <TableView />
      </section>
    </div>
  )
}

export default PageView
