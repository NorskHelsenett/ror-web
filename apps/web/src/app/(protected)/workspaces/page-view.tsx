'use client'

import { useInfiniteLoader } from '@/hooks/use-infinite-loader'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useSearch } from '@/hooks/use-search'
import { cn } from '@/utils/clsxm'
import { Params } from '@/types/resources-page'
import { WorkspaceListViewsRowType } from '@ror/js-api-client'
import {
  getWorkspaceDatacenterNameView,
  getWorkspaceDefaultMachineClassView,
  getWorkspaceDefaultStorageClassView,
  getWorkspaceKey,
  getWorkspaceNameView,
  getWorkspaceUidView,
  getWorkspaceClustersView,
} from '@/features/workspace/utils/workspace'
import { loadMoreWorkspaces, WorkspaceWithClusters } from '@/features/workspace/utils/workspace-actions'
import { useMemo, useState } from 'react'
import { WorkspaceRowCard } from '@/features/workspace/components/workspace-row-card'
import { Input } from '@/components/shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { Toggle } from '@/components/shadcn/toggle'
import { Funnel, Search } from 'lucide-react'

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
  workspaces: WorkspaceListViewsRowType[]
  workspacesWithClusters: WorkspaceWithClusters[]
  params: Params
}

type WorkspaceSortBy =
  | 'name-asc'
  | 'name-desc'
  | 'datacenter-asc'
  | 'datacenter-desc'
  | 'storage-asc'
  | 'storage-desc'
  | 'machine-asc'
  | 'machine-desc'
  | 'clusters-desc'
  | 'clusters-asc'

interface WorkspaceFilters {
  datacenter: string
  storageClass: string
  machineClass: string
}

const defaultFilters: WorkspaceFilters = {
  datacenter: 'all',
  storageClass: 'all',
  machineClass: 'all',
}

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b))
}

function workspaceClusterCount(workspace: WorkspaceListViewsRowType): number {
  const raw = getWorkspaceClustersView(workspace)
  const parsed = Number.parseInt(raw, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

/**
 * @param className - Optional CSS class name for the root container.
 * @param workspaces - Initial list of Workspaces to display.
 * @param params
 *
 * @returns The rendered page view component.
 */
export const PageView = ({ className, workspaces, workspacesWithClusters, params }: PageViewProps) => {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<WorkspaceSortBy>('name-asc')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<WorkspaceFilters>(defaultFilters)
  const debouncedQuery = useDebouncedValue(query, 120)

  const { items, sentinelRef, isLoading, hasMore } = useInfiniteLoader<WorkspaceListViewsRowType>({
    initial: workspaces,
    sort: params.sort,
    pageSize: 50,
    getItemId: getWorkspaceUidView,
    getItemsKey: getWorkspaceKey,
    loadMore: async (offset, limit) => {
      const res = await loadMoreWorkspaces({ offset, limit, sort: params.sort })
      return { items: res.items ?? [], hasMore: res.hasMore }
    },
  })

  const safeItems = useMemo(() => items.filter((c) => c.workspaceUid), [items])

  const datacenterOptions = useMemo(
    () => uniqueValues(safeItems.map((w) => getWorkspaceDatacenterNameView(w))),
    [safeItems]
  )
  const storageClassOptions = useMemo(
    () => uniqueValues(safeItems.map((w) => getWorkspaceDefaultStorageClassView(w))),
    [safeItems]
  )
  const machineClassOptions = useMemo(
    () => uniqueValues(safeItems.map((w) => getWorkspaceDefaultMachineClassView(w))),
    [safeItems]
  )

  const filteredItems = useMemo(
    () =>
      safeItems.filter((workspace) => {
        const datacenter = getWorkspaceDatacenterNameView(workspace)
        const storageClass = getWorkspaceDefaultStorageClassView(workspace)
        const machineClass = getWorkspaceDefaultMachineClassView(workspace)

        if (filters.datacenter !== 'all' && datacenter !== filters.datacenter) return false
        if (filters.storageClass !== 'all' && storageClass !== filters.storageClass) return false
        if (filters.machineClass !== 'all' && machineClass !== filters.machineClass) return false
        return true
      }),
    [safeItems, filters]
  )

  const searchedItems = useSearch(filteredItems, debouncedQuery, {
    threshold: 0.3,
    keys: ['workspaceName', 'datacenterName', 'defaultStorageClass', 'defaultMachineClass'],
    mapItem: (workspace) => ({
      workspaceName: getWorkspaceNameView(workspace),
      datacenterName: getWorkspaceDatacenterNameView(workspace),
      defaultStorageClass: getWorkspaceDefaultStorageClassView(workspace),
      defaultMachineClass: getWorkspaceDefaultMachineClassView(workspace),
    }),
  })

  const visibleItems = useMemo(() => {
    const copy = [...searchedItems]
    switch (sortBy) {
      case 'name-asc':
        return copy.sort((a, b) => getWorkspaceNameView(a).localeCompare(getWorkspaceNameView(b)))
      case 'name-desc':
        return copy.sort((a, b) => getWorkspaceNameView(b).localeCompare(getWorkspaceNameView(a)))
      case 'datacenter-asc':
        return copy.sort((a, b) => getWorkspaceDatacenterNameView(a).localeCompare(getWorkspaceDatacenterNameView(b)))
      case 'datacenter-desc':
        return copy.sort((a, b) => getWorkspaceDatacenterNameView(b).localeCompare(getWorkspaceDatacenterNameView(a)))
      case 'storage-asc':
        return copy.sort((a, b) =>
          getWorkspaceDefaultStorageClassView(a).localeCompare(getWorkspaceDefaultStorageClassView(b))
        )
      case 'storage-desc':
        return copy.sort((a, b) =>
          getWorkspaceDefaultStorageClassView(b).localeCompare(getWorkspaceDefaultStorageClassView(a))
        )
      case 'machine-asc':
        return copy.sort((a, b) =>
          getWorkspaceDefaultMachineClassView(a).localeCompare(getWorkspaceDefaultMachineClassView(b))
        )
      case 'machine-desc':
        return copy.sort((a, b) =>
          getWorkspaceDefaultMachineClassView(b).localeCompare(getWorkspaceDefaultMachineClassView(a))
        )
      case 'clusters-desc':
        return copy.sort((a, b) => workspaceClusterCount(b) - workspaceClusterCount(a))
      case 'clusters-asc':
        return copy.sort((a, b) => workspaceClusterCount(a) - workspaceClusterCount(b))
    }
  }, [searchedItems, sortBy])

  return (
    <div className={cn(className, '@container')}>
      <div className='mb-6 flex flex-wrap items-center gap-3'>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label='Search workspaces'
          placeholder='Find workspaces...'
          icon={<Search className='w-4 h-4' />}
          iconPosition='left'
          className='min-w-72'
        />

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as WorkspaceSortBy)}>
          <SelectTrigger className='w-56'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='name-asc'>Name (A-Z)</SelectItem>
            <SelectItem value='name-desc'>Name (Z-A)</SelectItem>
            <SelectItem value='datacenter-asc'>Datacenter (A-Z)</SelectItem>
            <SelectItem value='datacenter-desc'>Datacenter (Z-A)</SelectItem>
            <SelectItem value='storage-asc'>Storage class (A-Z)</SelectItem>
            <SelectItem value='storage-desc'>Storage class (Z-A)</SelectItem>
            <SelectItem value='machine-asc'>Machine class (A-Z)</SelectItem>
            <SelectItem value='machine-desc'>Machine class (Z-A)</SelectItem>
            <SelectItem value='clusters-desc'>Most clusters</SelectItem>
            <SelectItem value='clusters-asc'>Fewest clusters</SelectItem>
          </SelectContent>
        </Select>

        <Toggle
          pressed={filtersOpen}
          onPressedChange={setFiltersOpen}
          variant='outline'
          aria-label={filtersOpen ? 'Close filters' : 'Open filters'}
        >
          <Funnel aria-hidden className='-mr-1' />
          {filtersOpen ? 'Close' : 'Open'} filters
        </Toggle>
      </div>

      {filtersOpen && (
        <div className='mb-6 flex flex-wrap items-center gap-3'>
          <Select
            value={filters.datacenter}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, datacenter: value }))}
          >
            <SelectTrigger className='w-52'>
              <SelectValue placeholder='All datacenters' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All datacenters</SelectItem>
              {datacenterOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.storageClass}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, storageClass: value }))}
          >
            <SelectTrigger className='w-56'>
              <SelectValue placeholder='All storage classes' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All storage classes</SelectItem>
              {storageClassOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.machineClass}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, machineClass: value }))}
          >
            <SelectTrigger className='w-56'>
              <SelectValue placeholder='All machine classes' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All machine classes</SelectItem>
              {machineClassOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className='flex flex-col gap-4'>
        {visibleItems.map((group, index) => {
          const key = getWorkspaceUidView(group) || `workspace-${index}`
          return (
            <WorkspaceRowCard
              key={key}
              group={group}
              workspaceWithClusters={workspacesWithClusters.find(
                (wsc) => wsc.workspace.workspaceUid?.fieldValue === group.workspaceUid?.fieldValue
              )}
            />
          )
        })}
      </div>
      {hasMore && <div ref={sentinelRef} className='h-8' />}
      {isLoading && <p className='text-sm text-muted-foreground text-center py-4'>Loading…</p>}
    </div>
  )
}
