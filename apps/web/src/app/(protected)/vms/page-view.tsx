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
  getTeamName,
  getVmsKey,
  getTeamValue,
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
import { usePathname, useRouter } from 'next/navigation'
import { useFilters } from '@/hooks/use-filters'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { DataTable } from '@/components/ui/data-table'
import { getVMTableColumns } from '@/features/vms/components/vm-columns'
import type { VirtualMachine } from '@ror/js-api-client'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { loadMoreVMs } from '@/utils/vms-actions'
import { VmFilterSection } from '@/features/vms/components/vm-filter-section'

export const PageView = ({ className, vms, params }: PageViewProps) => {
  console.log('🔵 [VM PageView] Initial render:', {
    totalVmsReceived: vms?.length ?? 0,
    params,
    firstVmHostname: vms?.[0] ? getVmHostName(vms[0]) : 'No VMs',
    vmIds: vms?.slice(0, 3).map((vm) => getVmUniqueKey(vm)) ?? [],
  })

  const filtersOpen = params.filters === 'open'

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<VirtualMachine>({
    initial: vms,
    sort: params.sort,
    pageSize: 50,
    getItemId: getVmUniqueKey,
    getItemsKey: getVmsKey,
    loadMore: async (offset, limit) => {
      console.log('🔄 [VM PageView] Loading more VMs:', { offset, limit, sort: params.sort, order: params.order })
      const res = await loadMoreVMs({
        offset,
        limit,
        sort: params.sort,
        order: params.order,
      })
      console.log('✅ [VM PageView] Loaded additional VMs:', {
        newItemsCount: res.items?.length ?? 0,
        hasMore: res.hasMore,
        newItemIds: res.items?.slice(0, 3).map((vm) => getVmUniqueKey(vm)) ?? [],
      })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  //const sentinelRef = useRef<HTMLDivElement>(null)

  const safeItems = useMemo(() => {
    const filtered = items.filter((c) => getVmOperatingSystem(c) && typeof getVmOperatingSystem(c) === 'object')
    console.log('🛡️ [VM PageView] Safe items filtering:', {
      totalItems: items.length,
      safeItemsCount: filtered.length,
      filteredOut: items.length - filtered.length,
      safeItemIds: filtered.slice(0, 5).map((vm) => getVmUniqueKey(vm)),
    })
    if (items.length > 0 && filtered.length === 0) {
      console.warn('⚠️ [VM PageView] All VMs were filtered out! First item structure:', items[0])
    }
    return filtered
  }, [items])

  const filterDefinitions = [
    { key: 'Power States', extractor: (vm: VirtualMachine) => getVmPowerState(vm) },
    { key: 'Teams', extractor: (vm: VirtualMachine) => getTeamName(vm) || 'No Team' },
  ]
  const definitions: SortDefinition<VirtualMachine>[] = [
    { key: 'hostName', extractor: (vm) => getVmHostName(vm) },
    { key: 'name', extractor: (vm) => getVmName(vm) },
    { key: 'id', extractor: (vm) => getVmOperatingSystemId(vm) },
    { key: 'family', extractor: (vm) => getVmFamily(vm) },
    { key: 'architecture', extractor: (vm) => getVmArchitecture(vm) },
    { key: 'version', extractor: (vm) => getVmVersion(vm) },
    { key: 'toolVersion', extractor: (vm) => getVmToolVersion(vm) },
    { key: 'powerState', extractor: (vm) => getVmPowerState(vm) },
    { key: 'team', extractor: (vm) => getTeamValue(vm) },
  ]
  const { selectedFilters, setSelectedFilters, filteredItems, resetFilters } = useFilters<VirtualMachine>(
    safeItems,
    filterDefinitions
  )

  console.log('🔍 [VM PageView] Filtering applied:', {
    safeItemsCount: safeItems.length,
    selectedFilters,
    filteredItemsCount: filteredItems.length,
    filteredOut: safeItems.length - filteredItems.length,
    filteredItemIds: filteredItems.slice(0, 5).map((vm) => getVmUniqueKey(vm)),
  })

  const { selectedDisplayData, setSelectedDisplayData } = useDisplayData<VMCardData>('vms')
  const [searchResults, setSearchResults] = useState<VirtualMachine[]>(safeItems)
  const sortedItems = useSorting({ items: filteredItems, sortKey: params.sort, sortOrder: params.order, definitions })

  console.log('📊 [VM PageView] Sorting applied:', {
    filteredItemsCount: filteredItems.length,
    sortKey: params.sort,
    sortOrder: params.order,
    sortedItemsCount: sortedItems.length,
    sortedItemIds: sortedItems.slice(0, 5).map((vm) => getVmUniqueKey(vm)),
  })
  //const filterOptions = useMemo(() => generateFilterOptions(safeItems), [safeItems])

  // Handler for display data changes
  const onDisplayChange = (selected: Option[]) => setSelectedDisplayData(selected.map((i) => i.value as VMCardData))

  // sync safeItems → searchResults only if content differs
  //const idOf = useCallback((c: VirtualMachine) => getVmId(c) || '', [])

  //const idsKey = useCallback((arr: VirtualMachine[]) => arr.map(idOf).join('|'), [idOf])

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
  const clearUrl = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const handleRefreshFilters = useCallback(() => {
    resetFilters()
    setSelectedDisplayData([])
    clearUrl()
  }, [resetFilters, setSelectedDisplayData, clearUrl])

  // ---------- Toggle/Sort params ----------
  const toggleParams = useMemo(() => buildToggledParams(params, 'filters', 'open', 'vms').url, [params])
  const toggleSortParams = useMemo(() => buildSortParams(params, 'vms'), [params])

  const displayedItems = useMemo(() => {
    let result
    if (!searchResults?.length) {
      result = sortedItems
      console.log('🎯 [VM PageView] No search results, using sortedItems:', {
        sortedItemsCount: sortedItems.length,
        displayedCount: result.length,
      })
    } else {
      const ids = new Set(searchResults.map(getVmUniqueKey))
      result = sortedItems.filter((c) => ids.has(getVmUniqueKey(c)))
      console.log('🔎 [VM PageView] Search applied, filtering sortedItems:', {
        sortedItemsCount: sortedItems.length,
        searchResultsCount: searchResults.length,
        displayedCount: result.length,
        searchResultIds: searchResults.slice(0, 3).map((vm) => getVmUniqueKey(vm)),
        finalDisplayedIds: result.slice(0, 3).map((vm) => getVmUniqueKey(vm)),
      })
    }

    console.log('🎬 [VM PageView] Final displayed items:', {
      count: result.length,
      itemIds: result.slice(0, 5).map((vm) => getVmUniqueKey(vm)),
    })

    return result
  }, [sortedItems, searchResults])

  const renderControls = () => (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <ResourceControls
        safeItems={safeItems}
        searchText='Find VMs...'
        selectedDisplayData={selectedDisplayData}
        onDisplayChange={onDisplayChange}
        onSearchResultsChange={setSearchResults}
        displayDataOptions={displayDataOptions}
        params={params}
        toggleSortParams={toggleSortParams}
        filtersOpen={filtersOpen}
        toggleParams={toggleParams}
        handleRefreshFilters={handleRefreshFilters}
        domain='vms'
        sortingOptions={sortingOptions}
        searchKeys={['label', 'hostname', 'powerState', 'family']}
        mapItem={(vm) => ({
          ...vm,
          label: vm.metadata?.name ?? vm.virtualmachine?.spec?.name,
          hostName: getVmHostName(vm),
          powerState: getVmPowerState(vm),
          family: getVmFamily(vm),
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
    // Default view without team grouping
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
                    : displayDataOptions.map((opt) => opt.value as VMCardData) || []
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
