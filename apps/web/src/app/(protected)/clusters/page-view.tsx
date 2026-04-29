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
  getArgocdUrlViewItem,
  getClusterIdView,
  getClusterNameView,
  getClustersViewKey,
  getDatacenterView,
  getEnvironmentView,
  getGrafanaUrlView,
  getGrafanaUrlViewItem,
  getLastSeenView,
  getNodesView,
  getPriceMonthView,
  getPriceYearView,
  getProviderView,
  getResourcesCpuUsedMilliViewItem,
  getResourcesCpuUsedPercentNumberView,
  getResourcesCpuUsedPercentNumberViewItem,
  getResourcesCpuView,
  getResourcesCpuViewItem,
  getResourcesMemoryUsedPercentNumberViewItem,
  getResourcesMemoryUsedViewItem,
  getResourcesMemoryView,
  getResourcesMemoryViewItem,
  getRorLoginViewItem,
  getStatusView,
  getWorkspaceView,
} from '@/features/cluster/utils/cluster'
import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
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
import { DashboardBox } from '@/features/dashboard/components/DashboardBox'
import { Notification, NotificationBox } from '@/features/dashboard/components/NotificationBox'
import { OverviewBox, OverviewItem } from '@/features/dashboard/components/OverviewBox'
import { FavoritedBox } from '@/features/dashboard/components/FavoritedBox'
import { HealthStatus } from '@/features/cluster/types/health-status'
import { Copy, DotIcon } from 'lucide-react'
import { ResourceBar } from '@/features/cluster/components/resource-bar'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { Button } from '@/components/shadcn/button'
import { ExternalToolButton } from '@/features/cluster/components/external-tool-button'
import { RorCliButton } from '@/features/cluster/components/ror-cli-button'

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

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<ClusterListViewRowType>({
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

  const notificationTest1: Notification = {
    title: {
      fieldValue: 'Test notification 1',
    },
    description: {
      fieldValue: 'This is a test description 1',
    },
    criticality: {
      fieldValue: 'negative',
    },
  }

  const notificationTest2: Notification = {
    title: {
      fieldValue: 'Test notification 2',
    },
    description: {
      fieldValue: 'This is a test description 2',
    },
    criticality: {
      fieldValue: 'neutral',
    },
  }

  const notificationTest3: Notification = {
    title: {
      fieldValue: 'Test notification 3',
    },
    description: {
      fieldValue: 'This is a test description 3',
    },
    criticality: {
      fieldValue: 'positive',
    },
  }

  const overviewTest1: OverviewItem = {
    title: {
      fieldValue: 'Clusters',
    },
    greenItemTitle: {
      fieldValue: 'Green item title 1',
    },
    greenItemNumber: {
      fieldValue: 1,
    },
    yellowItemTitle: {
      fieldValue: 'Yellow item title 1',
    },
    yellowItemNumber: {
      fieldValue: 11,
    },
    redItemTitle: {
      fieldValue: 'Red item title 1',
    },
    redItemNumber: {
      fieldValue: 111,
    },
  }

  const overviewTest2: OverviewItem = {
    title: {
      fieldValue: 'VMs',
    },
    greenItemTitle: {
      fieldValue: 'Green item title 2',
    },
    greenItemNumber: {
      fieldValue: 2,
    },
    yellowItemTitle: {
      fieldValue: 'Yellow item title 2',
    },
    yellowItemNumber: {
      fieldValue: 22,
    },
    redItemTitle: {
      fieldValue: 'Red item title 2',
    },
    redItemNumber: {
      fieldValue: 222,
    },
  }

  const overviewTest3: OverviewItem = {
    title: {
      fieldValue: 'Vulnerabilities',
    },
    greenItemTitle: {
      fieldValue: 'Green item title 3',
    },
    greenItemNumber: {
      fieldValue: 3,
    },
    yellowItemTitle: {
      fieldValue: 'Yellow item title 3',
    },
    yellowItemNumber: {
      fieldValue: 33,
    },
    redItemTitle: {
      fieldValue: 'Red item title 3',
    },
    redItemNumber: {
      fieldValue: 333,
    },
  }

  const favorited1: ClusterListViewRowType = {
    argocdURL: {
      fieldValue: 'https://argo.bgo-mgmt-001.talos-bgo.sky.nhn.no',
    },
    availabilityZone: {
      fieldValue: 'bgo',
    },
    clusterId: {
      fieldValue: '68dfa1cab4c8fa1490291fb5',
    },
    clusterName: {
      fieldValue: 'bgo-mgmt-001',
    },
    clusterUid: {
      fieldValue: '2607fdb0-da0a-4a97-9fb9-73127224533f',
    },
    country: {
      fieldValue: 'no',
    },
    created: {
      fieldValue: '2025-10-13T19:13:58Z',
    },
    datacenter: {
      fieldValue: 'bgo.west.no',
    },
    environment: {
      fieldValue: 'mgmt',
    },
    grafanaURL: {
      fieldValue: 'https://grafana.bgo-mgmt-001.talos-bgo.sky.nhn.no',
    },
    kubernetesVersion: {
      fieldValue: 'v1.35.0',
    },
    lastSeen: {
      fieldValue: '2026-04-07T10:27:32.928Z',
    },
    nhnToolVersion: {
      fieldValue: 'v1.8.0',
    },
    nodePools: {
      fieldValue: 1,
    },
    nodes: {
      fieldValue: 3,
    },
    priceMonth: {
      fieldValue: 15078,
    },
    priceYear: {
      fieldValue: 180936,
    },
    provider: {
      fieldValue: 'talos',
    },
    region: {
      fieldValue: 'west',
    },
    resourcesCpu: {
      fieldValue: '36',
    },
    resourcesCpuUsedMilli: {
      fieldValue: 5607,
      fieldUnit: 'm',
    },
    resourcesCpuUsedPercent: {
      fieldValue: 16.67,
      fieldUnit: '%',
    },
    resourcesMemory: {
      fieldValue: '150',
      fieldUnit: ' Gi',
    },
    resourcesMemoryUsed: {
      fieldValue: '30',
      fieldUnit: ' Gi',
    },
    resourcesMemoryUsedPercent: {
      fieldValue: 19.83,
      fieldUnit: '%',
    },
    rorAgentVersion: {
      fieldValue: 'v2.2.0',
    },
    status: {
      fieldValue: 'ok',
    },
    workspace: {
      fieldValue: 'bgo-mgmt',
    },
  }

  const favorited2: ClusterListViewRowType = {
    argocdURL: {
      fieldValue: 'https://argo.t-per-et-401.t-per.sky.nhn.no',
    },
    availabilityZone: {
      fieldValue: 'bgo',
    },
    clusterId: {
      fieldValue: '8875ca15-abed-46f3-8c0f-8a73a2423baa',
    },
    clusterName: {
      fieldValue: 't-per-et-401',
    },
    clusterUid: {
      fieldValue: '21fca0d4-051b-46cf-8b16-e77ce974ffb1',
    },
    country: {
      fieldValue: 'no',
    },
    created: {
      fieldValue: '2025-10-09T21:27:23Z',
    },
    datacenter: {
      fieldValue: 'bgo.west.no',
    },
    environment: {
      fieldValue: 'test',
    },
    grafanaURL: {
      fieldValue: 'https://grafana.t-per-et-401.t-per.sky.nhn.no',
    },
    kubernetesVersion: {
      fieldValue: 'v1.34.1',
    },
    lastSeen: {
      fieldValue: '2026-04-07T10:27:25.595Z',
    },
    nhnToolVersion: {
      fieldValue: 'v1.9.16',
    },
    nodePools: {
      fieldValue: 1,
    },
    nodes: {
      fieldValue: 3,
    },
    priceMonth: {
      fieldValue: 8407,
    },
    priceYear: {
      fieldValue: 100884,
    },
    provider: {
      fieldValue: 'talos',
    },
    region: {
      fieldValue: 'west',
    },
    resourcesCpu: {
      fieldValue: '24',
    },
    resourcesCpuUsedMilli: {
      fieldValue: 4534,
      fieldUnit: 'm',
    },
    resourcesCpuUsedPercent: {
      fieldValue: 20.83,
      fieldUnit: '%',
    },
    resourcesMemory: {
      fieldValue: '65',
      fieldUnit: ' Gi',
    },
    resourcesMemoryUsed: {
      fieldValue: '29',
      fieldUnit: ' Gi',
    },
    resourcesMemoryUsedPercent: {
      fieldValue: 44.04,
      fieldUnit: '%',
    },
    rorAgentVersion: {
      fieldValue: 'v2.2.0',
    },
    status: {
      fieldValue: 'ok',
    },
    workspace: {
      fieldValue: 't-per',
    },
  }

  const favorited3: ClusterListViewRowType = {
    argocdURL: {
      fieldValue: 'https://argo.d-amk-003.vitistack-amk-3sad.sky.nhn.no',
    },
    availabilityZone: {
      fieldValue: 'az1',
    },
    clusterId: {
      fieldValue: 'd-amk-003-gsax',
    },
    clusterName: {
      fieldValue: 'd-amk-003',
    },
    clusterUid: {
      fieldValue: '17e03119-1801-4f11-9307-8f905fe4ac46',
    },
    country: {
      fieldValue: 'no',
    },
    created: {
      fieldValue: '2026-02-27T08:52:18Z',
    },
    datacenter: {
      fieldValue: 'az1.central.no',
    },
    environment: {
      fieldValue: 'test',
    },
    grafanaURL: {
      fieldValue: 'https://grafana.d-amk-003.vitistack-amk-3sad.sky.nhn.no',
    },
    kubernetesVersion: {
      fieldValue: 'v1.35.0',
    },
    lastSeen: {
      fieldValue: '2026-04-07T10:27:56.08Z',
    },
    nhnToolVersion: {
      fieldValue: 'v1.9.16',
    },
    nodePools: {
      fieldValue: 1,
    },
    nodes: {
      fieldValue: 3,
    },
    priceMonth: {
      fieldValue: 7257,
    },
    priceYear: {
      fieldValue: 87084,
    },
    provider: {
      fieldValue: 'talos',
    },
    region: {
      fieldValue: 'central',
    },
    resourcesCpu: {
      fieldValue: '18',
    },
    resourcesCpuUsedMilli: {
      fieldValue: 5094,
      fieldUnit: 'm',
    },
    resourcesCpuUsedPercent: {
      fieldValue: 33.33,
      fieldUnit: '%',
    },
    resourcesMemory: {
      fieldValue: '70',
      fieldUnit: ' Gi',
    },
    resourcesMemoryUsed: {
      fieldValue: '38',
      fieldUnit: ' Gi',
    },
    resourcesMemoryUsedPercent: {
      fieldValue: 54.64,
      fieldUnit: '%',
    },
    rorAgentVersion: {
      fieldValue: 'v2.2.0',
    },
    status: {
      fieldValue: 'ok',
    },
    workspace: {
      fieldValue: 'vitistack-amk-3sad',
    },
  }

  const Dot = ({ status }: { status: HealthStatus }) => (
    <span className={cn('flex items-center justify-around size-7', className)}>
      <span
        className={cn(
          'size-5 rounded-full opacity-75',
          status == 'ok' ? 'bg-emerald-500' : status == 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        )}
      ></span>
      <span
        className={cn(
          'size-4 absolute z-10 rounded-full ',
          status == 'ok' ? 'bg-emerald-700' : status == 'warning' ? 'bg-yellow-700' : 'bg-red-700'
        )}
      ></span>
    </span>
  )

  const displayedStatus = (status: HealthStatus) => {
    if (status === 'ok') {
      return 'Healthy'
    } else if (status === 'warning') {
      return 'Warning'
    } else if (status === 'error') {
      return 'Error'
    } else {
      return 'Unknown'
    }
  }

  const getDaysHoursMinutes = (ms: number): string => {
    let secs = Math.floor(ms / 1000)
    let mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)

    secs = secs % 60
    mins = mins % 60

    const hoursString = hours !== 0 ? hours + ' hours, ' : ''
    const minsString = mins !== 0 ? mins + ' min ago' : ''
    const secsString = secs !== 0 && mins === 0 ? secs + ' sec ago' : ''

    return hoursString + minsString + secsString
  }

  const syncedText = (lastSeen: string) => {
    const lastSeenDate = new Date(lastSeen)
    const now = new Date()
    const diff = now.getTime() - lastSeenDate.getTime()
    return 'synced ' + getDaysHoursMinutes(diff)
  }

  const FavoritedCluster = ({ cluster }: ClusterListViewRowType) => {
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex items-center'>
          <Dot status={getStatusView(cluster) as ClusterListViewRowType} />
          {displayedStatus(getStatusView(cluster) as ClusterListViewRowType)} <DotIcon />{' '}
          {syncedText(getLastSeenView(cluster))}
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-sm'>CPU</p>
          <ResourceBar
            capacity={getResourcesCpuViewItem(cluster)}
            used={getResourcesCpuUsedMilliViewItem(cluster)}
            percentage={getResourcesCpuUsedPercentNumberViewItem(cluster)}
            showPercentage={false}
          />
          <DotIcon className='-mx-2' />
          <p className='text-sm'>Memory</p>
          <ResourceBar
            capacity={getResourcesMemoryViewItem(cluster)}
            used={getResourcesMemoryUsedViewItem(cluster)}
            percentage={getResourcesMemoryUsedPercentNumberViewItem(cluster)}
            showPercentage={false}
          />
        </div>
        <div className='flex justify-between'>
          <ExternalToolButton name='ArgoCD' type='argocd' url={getArgocdUrlViewItem(cluster)} />
          <ExternalToolButton name='Grafana' type='grafana' url={getGrafanaUrlViewItem(cluster)} />
          <RorCliButton cluster={cluster} />
        </div>
      </div>
    )
  }

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

      <div className='p-4'>
        <div className='flex gap-8 w-fit'>
          <NotificationBox notification={notificationTest1} />
          <NotificationBox notification={notificationTest2} />
          <NotificationBox notification={notificationTest3} />
        </div>

        <br />

        <div className='flex gap-8 w-fit'>
          <OverviewBox item={overviewTest1} />
          <OverviewBox item={overviewTest2} />
          <OverviewBox item={overviewTest3} />
        </div>

        <br />

        <div className='flex gap-8 w-fit'>
          <FavoritedBox title={getClusterNameView(favorited1)}>
            <FavoritedCluster cluster={favorited1} />
          </FavoritedBox>
          <FavoritedBox title={getClusterNameView(favorited2)}>
            <FavoritedCluster cluster={favorited2} />
          </FavoritedBox>
          <FavoritedBox title={getClusterNameView(favorited3)} isError>
            <FavoritedCluster cluster={favorited3} />
          </FavoritedBox>
        </div>
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
