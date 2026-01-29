'use client'

import { Button } from '@/components/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import MultipleSelector, { Option } from '@/components/shadcn/multiselect'
import { Toggle } from '@/components/shadcn/toggle'
import { SortSelect } from '@/components/ui/sort-select'
import { TabsViewSwitcher } from '@/components/ui/tabs-view-switcher'
import { displayDataOptions, sortingOptions } from '@/features/cluster/config/page-view-options'
import { ClusterCardDisplayData } from '@/features/cluster/types/display-data'
import { ClusterSearch } from '@/features/cluster/components/cluster-search'
import { exportClustersAsCSV, exportClustersAsExcel } from '@/features/cluster/utils/export-helpers'
import type { KubernetesCluster } from '@ror/js-api-client'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, Download, Funnel, RotateCw } from 'lucide-react'
import Link from 'next/link'

/**
 * Props for the ClusterControls component.
 *
 * @property safeItems - Array of KubernetesCluster objects considered safe for display.
 * @property selectedDisplayData - Array of ClusterCardDisplayData representing currently selected clusters.
 * @property onDisplayChange - Callback invoked when the display selection changes, receiving the selected options.
 * @property onSearchResultsChange - Callback invoked when search results change, receiving the resulting clusters.
 * @property handleRefreshFilters - Function to refresh the applied filters.
 * @property toggleParams - String representing parameters for toggling cluster display.
 * @property toggleSortParams - Object containing sorting URL and direction, or null if not set.
 * @property filtersOpen - Boolean indicating whether the filters panel is open.
 * @property params - Object containing optional sorting parameter.
 */
interface ClusterControlsProps {
  safeItems: KubernetesCluster[]
  selectedDisplayData: ClusterCardDisplayData[]
  onDisplayChange: (selected: Option[]) => void
  onSearchResultsChange: (results: KubernetesCluster[]) => void
  handleRefreshFilters: () => void
  toggleParams: string
  toggleSortParams: { url: string; isDesc: boolean } | null
  filtersOpen: boolean
  params: {
    sort?: string
  }
}

/**
 * Renders a set of controls for managing cluster data display, sorting, filtering, searching, and exporting.
 *
 * @param safeItems - The list of cluster items that are safe to display and export.
 * @param selectedDisplayData - The currently selected display data options for cluster cards.
 * @param onDisplayChange - Callback invoked when the display data selection changes.
 * @param onSearchResultsChange - Callback invoked when the search results change.
 * @param handleRefreshFilters - Callback to reset all filters to their default state.
 * @param toggleParams - URL or parameters used to toggle the filter panel.
 * @param toggleSortParams - Object containing URL and sorting direction for toggling sort order.
 * @param filtersOpen - Boolean indicating whether the filter panel is open.
 * @param params - Current parameters for sorting and filtering clusters.
 */
export const ClusterControls = ({
  safeItems,
  selectedDisplayData,
  onDisplayChange,
  onSearchResultsChange,
  handleRefreshFilters,
  toggleParams,
  toggleSortParams,
  filtersOpen,
  params,
}: ClusterControlsProps) => {
  return (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <ClusterSearch items={safeItems} onResultsChange={onSearchResultsChange} />

        <MultipleSelector
          className='w-52'
          commandProps={{ label: 'Display data' }}
          value={displayDataOptions.filter((opt) => selectedDisplayData?.includes(opt.value as ClusterCardDisplayData))}
          onChange={onDisplayChange}
          defaultOptions={displayDataOptions}
          placeholder='Set display data'
          hideClearAllButton
          hidePlaceholderWhenSelected
          emptyIndicator={<p className='text-center text-sm'>No results found</p>}
        />

        <SortSelect options={sortingOptions} currentSort={params.sort} />

        {toggleSortParams && (
          <Link href={toggleSortParams.url}>
            <Button variant='outline' className='border-(--input)'>
              {toggleSortParams.isDesc ? (
                <span className='flex gap-1 items-center'>
                  <ArrowDownWideNarrow className='w-4 h-4' />
                  DESC
                </span>
              ) : (
                <span className='flex gap-1 items-center'>
                  <ArrowDownNarrowWide className='w-4 h-4' />
                  ASC
                </span>
              )}
            </Button>
          </Link>
        )}

        <Toggle
          asChild
          pressed={filtersOpen}
          variant='outline'
          className='[@container(max-width:1000px)]:hidden'
          aria-label='Open filters'
        >
          <Link href={toggleParams}>
            <Funnel aria-hidden='true' />
          </Link>
        </Toggle>
      </div>

      <div className='flex flex-row gap-4'>
        <Toggle
          asChild
          pressed={filtersOpen}
          variant='outline'
          className='[@container(min-width:1001px)]:hidden'
          aria-label='Open filters'
        >
          <Link href={toggleParams}>
            <Funnel aria-hidden='true' />
          </Link>
        </Toggle>

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Download />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => exportClustersAsCSV(safeItems, 'ror-clusters-filtered.csv')}>
              Export Filtered (CSV)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportClustersAsExcel(safeItems, 'ror-clusters-filtered.xlsx')}>
              Export Filtered (Excel)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportClustersAsCSV(safeItems, 'ror-clusters-all.csv')}>
              Export All (CSV)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportClustersAsExcel(safeItems, 'ror-clusters-all.xlsx')}>
              Export All (Excel)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <TabsViewSwitcher storageKey='clusters:view-mode' />
      </div>
    </div>
  )
}
