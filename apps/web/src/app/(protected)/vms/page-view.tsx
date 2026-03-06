/**
 * VMs Page View Component
 * FILE OVERVIEW:
 * ------------------------
 * Renders the main content of the Virtual Machines (VMs) page, including controls for searching, filtering, sorting, and toggling between grid and list views.
 * It also manages the state for selected display data, filters, and search results.
 *
 * Key Features:
 * - Search functionality to filter VMs based on user input.
 * - Multi-select dropdowns for choosing which VM attributes to display and for filtering VMs by specific criteria.
 * - Sorting options to order VMs by various attributes in ascending or descending order.
 * - Toggle switch to open/close the filter section.
 * - View switcher to toggle between grid and list views of VMs.
 * - Pagination support for navigating through large sets of VMs in list view.
 *
 * The component uses React hooks for state management and side effects, and it leverages Next.js navigation features for URL management.
 */

'use client'

import { Option } from '@/components/shadcn/multiselect'
import {
  getVmOperatingSystemId,
  getVmUniqueKey,
  getVmName,
  getVmVersion,
  getVmOperatingSystem,
  getVmPowerState,
  getVmHostName,
  PageViewProps,
  getVmFamily,
  getVmArchitecture,
  getVmToolVersion,
  getVmsKey,
  getTeamIdentifier,
  comparePowerState,
  getVmDiskSizes,
  getSpecMemory,
  getSpecCpuTotal,
  getLocation,
} from '@/features/vms/utils/vms'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { cn } from '@/utils/clsxm'
import { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { VMCard } from '@/features/vms/components/vm-card'
import { VMCardData } from '@/features/vms/types/vm-types'
import { displayDataOptions, sortingOptions } from '@/features/vms/config/page-view-options'
import { useDisplayData } from '@/hooks/use-display-data'
import { ResourceControls } from '@/components/ui/resource-controls'
import { exportVmsAsCSV, exportVmsAsExcel } from '@/features/vms/utils/export-helpers'
import { buildSortParams, buildToggledParams } from '@/utils/url-helpers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFilters } from '@/hooks/use-filters'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { DataTable } from '@/components/ui/data-table'
import { getVMTableColumns } from '@/features/vms/components/vm-columns'
import type { VirtualMachine } from '@ror/js-api-client'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { loadMoreVMs } from '@/utils/vms-actions'
import { VmFilterSection } from '@/features/vms/components/vm-filter-section'
import { getSpecificLocation } from '@/features/vms/hooks/use-vm-search'
import { buildVmSearchFilter } from '@/features/vms/utils/regex-search'

export const PageView = ({ className, vms, params }: PageViewProps) => {
  const filtersOpen = params.filterPanel === 'open'

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<VirtualMachine | VMWithBackupStatus>({
    initial: vms,
    sort: params.sort,
    pageSize: 50,
    getItemId: getVmUniqueKey,
    getItemsKey: getVmsKey,
    loadMore: async (offset, limit) => {
      const res = await loadMoreVMs({
        offset,
        limit,
        sort: params.sort,
        order: params.order,
        search: params.search,
        //filters: params.filters,
      })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  const safeItems = useMemo(
    () => items.filter((c) => getVmOperatingSystem(c) && typeof getVmOperatingSystem(c) === 'object'),
    [items]
  )

  const filterDefinitions = [
    { key: 'Power States', extractor: (vm: VirtualMachine | VMWithBackupStatus) => getVmPowerState(vm) },
    {
      key: 'Location',
      extractor: (vm: VirtualMachine | VMWithBackupStatus) => {
        const location = getLocation(vm)
        return location?.split(' ')[0]
      },
    },
    { key: 'Teams', extractor: (vm: VirtualMachine | VMWithBackupStatus) => getTeamIdentifier(vm) },
    {
      key: 'Backup',
      extractor: (vm: VirtualMachine | VMWithBackupStatus) => {
        if ('backupStatus' in vm) {
          const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
          if (backupStatus.hasBackupJob && backupStatus.hasBackupRun) return 'activeBackup'
          if (backupStatus.hasBackupRun) return 'historicalBackup'
          if (backupStatus.hasBackupJob) return 'configuredBackup'
          return 'noBackup'
        }
        return 'noBackup'
      },
    },
  ]
  const definitions: SortDefinition<VirtualMachine | VMWithBackupStatus>[] = [
    { key: 'hostName', extractor: (vm) => getVmHostName(vm) },
    { key: 'name', extractor: (vm) => getVmName(vm) },
    { key: 'id', extractor: (vm) => getVmOperatingSystemId(vm) },
    { key: 'family', extractor: (vm) => getVmFamily(vm) },
    { key: 'architecture', extractor: (vm) => getVmArchitecture(vm) },
    { key: 'version', extractor: (vm) => getVmVersion(vm) },
    { key: 'toolVersion', extractor: (vm) => getVmToolVersion(vm) },
    { key: 'powerState', extractor: getVmPowerState, compareFn: comparePowerState },
    { key: 'team', extractor: (vm) => getTeamIdentifier(vm) },
    { key: 'disk-usage', extractor: (vm) => getVmDiskSizes(vm).reduce((a, b) => a + b, 0) },
    { key: 'memory', extractor: (vm) => getSpecMemory(vm) },
    { key: 'cpu', extractor: (vm) => getSpecCpuTotal(vm) },
    {
      key: 'activeBackup',
      extractor: (vm) => {
        if ('backupStatus' in vm) {
          const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
          if (backupStatus.hasBackupJob && backupStatus.hasBackupRun) return 1 // Active backup
          if (backupStatus.hasBackupRun) return 2 // Historical backup
          if (backupStatus.hasBackupJob) return 3 // Configured backup
          return 4 // No backup
        }
        return 4 // No backup data
      },
      compareFn: (a, b) => {
        const getBackupPriority = (vm: VirtualMachine | VMWithBackupStatus) => {
          if ('backupStatus' in vm) {
            const backupStatus = vm.backupStatus as { hasBackupJob: boolean; hasBackupRun: boolean }
            if (backupStatus.hasBackupJob && backupStatus.hasBackupRun) return 1 // Active backup (highest priority)
            if (backupStatus.hasBackupRun) return 2 // Historical backup
            if (backupStatus.hasBackupJob) return 3 // Configured backup
            return 4 // No backup
          }
          return 4 // No backup data
        }

        return getBackupPriority(a) - getBackupPriority(b)
      },
    },
  ]
  const { selectedFilters, setSelectedFilters, filteredItems, resetFilters } = useFilters<
    VirtualMachine | VMWithBackupStatus
  >(safeItems, filterDefinitions)
  const { selectedDisplayData, setSelectedDisplayData } = useDisplayData<VMCardData>('vms')
  const [searchResults, setSearchResults] = useState<(VirtualMachine | VMWithBackupStatus)[]>(safeItems)

  const sortedItems = useSorting({ items: filteredItems, sortKey: params.sort, sortOrder: params.order, definitions })

  // useEffect(() => {
  //   setSearchResults(safeItems)
  // }, [vms])

  // Handler for display data changes
  const onDisplayChange = (selected: Option[]) => setSelectedDisplayData(selected.map((i) => i.value as VMCardData))

  const lastSafeKeyRef = useRef('')
  useEffect(() => {
    const nextKey = getVmsKey(safeItems)
    if (nextKey !== lastSafeKeyRef.current) {
      lastSafeKeyRef.current = nextKey
      setSearchResults((prev) => {
        const prevKey = getVmsKey(prev)
        const isSearching = prev.length != safeItems.length
        return isSearching || prevKey === nextKey ? prev : safeItems
      })
    }
  }, [safeItems])

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFiltersInUrl = useCallback(
    (searchQuery: string) => {
      const next = new URLSearchParams(searchParams.toString())
      const q = (searchQuery ?? '').trim()

      console.log('[VM search] query:', q)
      console.log('[VM search] filter param preview:', buildVmSearchFilter(q))

      if (q) next.set('search', q)
      else next.delete('search')

      next.delete('page')
      router.replace(`${pathname}?${next.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleSearchResultsChange = useCallback(
    (_results: (VirtualMachine | VMWithBackupStatus)[], searchQuery?: string) => {
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

  // ---------- Toggle/Sort params ----------
  const toggleParams = useMemo(() => buildToggledParams(params, 'filterPanel', 'open', 'vms').url, [params])
  const toggleSortParams = useMemo(() => buildSortParams(params, 'vms'), [params])

  // const displayedItems = useMemo(() => {
  //   const ids = new Set(searchResults.map(getVmUniqueKey))
  //   return sortedItems.filter((c) => ids.has(getVmUniqueKey(c)))
  // }, [sortedItems, searchResults])

  const displayedItems = sortedItems

  useEffect(() => {
    console.log('[PageView] params.search:', searchParams.get('search'))
    console.log('[PageView] vms received:', vms.length)
    console.log(
      '[PageView] vms names:',
      vms.map((vm) => vm?.virtualmachine?.spec?.name ?? vm?.metadata?.name)
    )
  }, [vms, searchParams])

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <ResourceControls
        safeItems={safeItems}
        searchText='Find VMs...'
        selectedDisplayData={selectedDisplayData}
        onDisplayChange={onDisplayChange}
        onSearchResultsChange={handleSearchResultsChange}
        displayDataOptions={displayDataOptions}
        params={params}
        toggleSortParams={toggleSortParams}
        filtersOpen={filtersOpen}
        toggleParams={toggleParams}
        handleRefreshFilters={handleRefreshFilters}
        domain='vms'
        sortingOptions={sortingOptions}
        searchKeys={['label', 'hostName', 'powerState', 'family', 'location']}
        mapItem={(vm) => ({
          ...vm,
          label: vm.metadata?.name ?? vm.virtualmachine?.spec?.name,
          hostName: getVmHostName(vm),
          powerState: getVmPowerState(vm),
          family: getVmFamily(vm),
          location: getLocation(vm),
          fullLocation: getSpecificLocation(getLocation(vm) || ''),
        })}
        getItemsKey={getVmsKey}
        exportAsCSV={exportVmsAsCSV}
        exportAsExcel={exportVmsAsExcel}
        allItems={items}
        filteredItems={filteredItems}
      />
    </div>
  )

  const GridView = () => {
    return (
      <div>
        <div className='flex flex-row flex-wrap gap-6'>
          {displayedItems.map((vm, vmIdx) => (
            <div key={getVmHostName(vm) || vmIdx}>
              <VMCard
                vm={vm}
                vmDisplayData={
                  selectedDisplayData.length > 0
                    ? selectedDisplayData
                    : displayDataOptions
                        .filter((opt) => !['version'].includes(opt.value))
                        .map((opt) => opt.value as VMCardData) || []
                }
              />
            </div>
          ))}
          <div ref={sentinelRef} className='h-px w-full' />
        </div>
        {isLoading && <div style={{ textAlign: 'center', padding: 16 }}>Loading...</div>}
        {!hasMore && <div style={{ textAlign: 'center', padding: 16, color: '#888' }}>All VMs are loaded.</div>}
      </div>
    )
  }

  const TableView = () => {
    return (
      <div>
        <DataTable
          data={displayedItems}
          columns={getVMTableColumns(selectedDisplayData)}
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
        <VmFilterSection
          filtersOpen={filtersOpen}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>

      <NotReadyMessage className='mx-12 my-6'>
        Welcome to the new ROR web! This site is currently under development, so feel free to look around, but do not
        expect finished functionality or that all data is present. The development team is working hard on delivering a
        complete product as quick as possible :)
      </NotReadyMessage>
      <section className='px-12 my-8'>{params.view === 'list' ? <TableView /> : <GridView />}</section>
    </div>
  )
}

export default PageView
