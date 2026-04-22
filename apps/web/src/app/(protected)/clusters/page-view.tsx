/**
 * Cluster Management Component
 *
 * FILE OVERVIEW
 * ----------------------
 * This file defines the main React component (`PageView`) responsible for displaying and managing Kubernetes clusters
 * in the ROR web application.
 *
 * Architecture:
 * - Logic is split into dedicated hooks:
 *   • useInfiniteClusters — handles incremental loading and scroll detection
 *   • useClusterFilters — manages filter state and derived filtered data
 *   • useClusterSorting — applies dynamic sorting logic
 *   • useDisplayData — controls which cluster fields are shown in the UI
 *
 * - Layout Components:
 *   • <ClusterControls /> — top toolbar for search, sort, export, and view toggling
 *   • <ClusterFilterSection /> — collapsible filter selection area
 *   • <ClustersTable /> / <ClusterCard /> — list and grid cluster displays
 *
 * Developer Notes:
 * - URL helpers (`buildToggledParams`, `buildSortParams`) standardize query parameter management
 * - All cluster-related UI logic is centralized in this component for maintainability
 */

'use client'
import { Option } from '@/components/shadcn/multiselect'
import { DataTable } from '@/components/ui/data-table'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { ClusterCard } from '@/features/cluster/components/cluster-card'
import { ClusterFilterSection } from '@/features/cluster/components/cluster-filter-section'
import { defaultDisplayData, displayDataOptions, sortingOptions } from '@/features/cluster/config/page-view-options'
import { useDisplayData } from '@/hooks/use-display-data'
import { ClusterCardDisplayData } from '@/features/cluster/types/display-data'
import {
  getClusterIdView,
  getClusterNameView,
  getClustersViewKey,
  getDatacenterView,
  getEnvironmentView,
  getNodesView,
  getPriceMonthView,
  getPriceYearView,
  getProviderView,
  getResourcesCpuView,
  getResourcesMemoryView,
  getWorkspaceView,
} from '@/features/cluster/utils/cluster'
import { cn } from '@/utils/clsxm'
import { loadMoreClusters } from '@/utils/cluster-actions'
import { buildSortParams, buildToggledParams } from '@/utils/url-helpers'
import type { ClusterListViewRowType } from '@ror/js-api-client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getClustersTableColumns } from '@/features/cluster/components/clusters-columns'
import { ResourceControls } from '@/components/ui/resource-controls'
import { exportClustersAsCSV, exportClustersAsExcel } from '@/features/cluster/utils/export-helpers'
import { Params } from '@/types/resources-page'
import { useFilters } from '@/hooks/use-filters'
import { SortDefinition, useSorting } from '@/hooks/use-sorting'
import { useClusterInfiniteLoader } from '@/features/cluster/hooks/use-cluster-infinite-loader'

/**
 * Props for the PageView component.
 *
 * @property {string} [className] - Optional CSS class name for custom styling.
 * @property {User} user - The current user object.
 * @property {ClusterListViewRowType[]} clusters - Array of Kubernetes clusters to display.
 * @property {Params} params - Route or query parameters relevant to the page view.
 */
interface PageViewProps {
  className?: string
  clusters: ClusterListViewRowType[]
  params: Params
}

/**
 * Renders the main page view for displaying Kubernetes clusters, including filtering, sorting, searching,
 * infinite loading, and display options (grid or table view).
 *
 * @param className - Optional CSS class name for the root container.
 * @param clusters - Initial list of Kubernetes clusters to display.
 * @param params - URL/query parameters controlling filters, sorting, and view mode.
 *
 * Features:
 * - Infinite loading of clusters with pagination.
 * - Filtering by environment, datacenter, and workspace.
 * - Sorting by various cluster properties (name, CPU, memory, nodes, price, etc.).
 * - Search functionality across clusters.
 * - Toggle between grid and table views.
 * - Export clusters as CSV or Excel.
 * - Displays a development notice message.
 *
 * @returns The rendered page view component.
 */
export const PageView = ({ className, clusters, params }: PageViewProps) => {
  // Filter state
  const filtersOpen = params.filters === 'open'

  // Infinite loading of clusters

  const { items, sentinelRef, isLoading, hasMore } = useClusterInfiniteLoader<ClusterListViewRowType>({
    initial: clusters,
    sort: params.sort,
    pageSize: 50,
    getItemId: getClusterIdView,
    getItemsKey: getClustersViewKey,
    loadMore: async (offset, limit) => {
      const res = await loadMoreClusters({ offset, limit, sort: params.sort })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  // Clusters valid after filtering and searching
  const safeItems = useMemo(() => items.filter((c) => c.clusterId?.fieldValue), [items])

  // Cluster filters, display data and search result
  const filterDefinitions = [
    { key: 'Environments', extractor: getEnvironmentView },
    { key: 'Datacenters', extractor: getDatacenterView },
    { key: 'Workspaces', extractor: getWorkspaceView },
  ]

  const definitions: SortDefinition<ClusterListViewRowType>[] = [
    { key: 'clusterName', extractor: getClusterNameView },
    { key: 'cpu', extractor: getResourcesCpuView },
    { key: 'memory', extractor: getResourcesMemoryView },
    {
      key: 'nodes',
      extractor: getNodesView,
    },
    { key: 'monthlyPrice', extractor: getPriceMonthView },
    { key: 'yearlyPrice', extractor: getPriceYearView },
    { key: 'datacenterName', extractor: getDatacenterView },
    { key: 'datacenterProvider', extractor: getProviderView },
    { key: 'environment', extractor: getEnvironmentView },
  ]

  const { selectedFilters, setSelectedFilters, filteredItems, resetFilters } = useFilters<ClusterListViewRowType>(
    safeItems,
    filterDefinitions
  )
  const { selectedDisplayData, setSelectedDisplayData } = useDisplayData<ClusterCardDisplayData>('clusters')
  const [searchResults, setSearchResults] = useState<ClusterListViewRowType[]>(safeItems)
  const sortedItems = useSorting({ items: filteredItems, sortKey: params.sort, sortOrder: params.order, definitions })

  // Handler for display data changes
  const onDisplayChange = (selected: Option[]) =>
    setSelectedDisplayData(selected.map((i) => i.value as ClusterCardDisplayData))

  // Sync safeItems -> searchResults only if content differs
  const lastSafeKeyRef = useRef('')
  useEffect(() => {
    const nextKey = getClustersViewKey(safeItems)
    if (nextKey !== lastSafeKeyRef.current) {
      lastSafeKeyRef.current = nextKey
      setSearchResults((prev) => {
        const prevKey = getClustersViewKey(prev)
        const isSearching = prev.length !== safeItems.length
        return isSearching || prevKey === nextKey ? prev : safeItems
      })
    }
  }, [safeItems])

  const pathname = usePathname()
  const router = useRouter()
  const clearUrl = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [router, pathname])

  const handleRefreshFilters = useCallback(() => {
    resetFilters()
    setSelectedDisplayData([])
    clearUrl()
  }, [resetFilters, setSelectedDisplayData, clearUrl])

  // Toggle/Sort params
  const toggleParams = useMemo(() => buildToggledParams(params, 'filters', 'open', 'clusters').url, [params])
  const toggleSortParams = useMemo(() => buildSortParams(params, 'clusters'), [params])

  const displayedItems = useMemo(() => {
    if (!searchResults?.length) return sortedItems
    const ids = new Set(searchResults.map(getClusterIdView))
    return sortedItems.filter((c) => ids.has(getClusterIdView(c)))
  }, [sortedItems, searchResults])

  const effectiveDisplayData = (
    selectedDisplayData?.length > 0 ? selectedDisplayData : defaultDisplayData
  ) as ClusterCardDisplayData[]

  const GridView = () => (
    <div>
      <div className='flex flex-row flex-wrap gap-6'>
        {displayedItems.map((cluster, idx) => (
          <div key={getClusterIdView(cluster) || idx}>
            <ClusterCard cluster={cluster} displayData={effectiveDisplayData} />
          </div>
        ))}
        <div ref={sentinelRef} className='h-px' />
      </div>
      {isLoading && <div style={{ textAlign: 'center', padding: 16 }}>Loading...</div>}
      {!hasMore && <div style={{ textAlign: 'center', padding: 16, color: '#888' }}>All clusters are loaded.</div>}
    </div>
  )

  const TableView = () => (
    <DataTable
      data={displayedItems}
      columns={getClustersTableColumns(effectiveDisplayData)}
      hasMore={hasMore}
      isLoading={isLoading}
      sentinelRef={sentinelRef}
    />
  )

  return (
    <div className={cn(className, '@container')}>
      <div className={cn('border-b', filtersOpen && 'pb-2')}>
        <div className={cn('mx-12 flex items-center min-h-28 py-6 ', filtersOpen && 'w-[calc(100%-6rem)] border-b')}>
          <ResourceControls
            safeItems={safeItems}
            searchText='Find clusters...'
            selectedDisplayData={selectedDisplayData}
            onDisplayChange={onDisplayChange}
            onSearchResultsChange={setSearchResults}
            displayDataOptions={displayDataOptions}
            params={params}
            toggleSortParams={toggleSortParams}
            filtersOpen={filtersOpen}
            toggleParams={toggleParams}
            handleRefreshFilters={handleRefreshFilters}
            domain='clusters'
            sortingOptions={sortingOptions}
            searchKeys={['label', 'datacenterName', 'datacenterProvider', 'environment']}
            mapItem={(cluster) => ({
              ...cluster,
              label: getClusterNameView(cluster),
              datacenterProvider: getProviderView(cluster),
              environment: getEnvironmentView(cluster),
            })}
            getItemsKey={getClustersViewKey}
            exportAsCSV={exportClustersAsCSV}
            exportAsExcel={exportClustersAsExcel}
            allItems={items}
            filteredItems={filteredItems}
          />
        </div>

        <ClusterFilterSection
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
