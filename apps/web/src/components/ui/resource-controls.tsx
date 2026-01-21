/*
 * FILE OVERVIEW:
 *
 * Reusable component that provides a set of controls for managing and interacting with a resource list,
 * including search, display options, sorting, filtering, refreshing, exporting, and view mode switching.
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { Button } from '@/components/shadcn/button'
import { ArrowDownWideNarrow, ArrowDownNarrowWide, Funnel, RotateCw, Download, Plus } from 'lucide-react'
import { SortSelect } from './sort-select'
import { TabsViewSwitcher } from './tabs-view-switcher'
import MultipleSelector, { Option } from '@/components/shadcn/multiselect'
import { ResourceSearch } from './resource-search'
import Link from 'next/link'
import { Toggle } from '../shadcn/toggle'

/**
 * Props for the ResourceControls component.
 *
 * @template T - The type of items being managed.
 * @property {T[]} safeItems - The list of items considered safe for display and manipulation.
 * @property {string} [searchText] - Optional search text used for filtering items.
 * @property {string[]} selectedDisplayData - The currently selected display data keys.
 * @property {(selected: Option[]) => void} onDisplayChange - Callback invoked when display options change.
 * @property {(results: T[]) => void} onSearchResultsChange - Callback invoked when search results change.
 * @property {Option[]} displayDataOptions - Available options for display data selection.
 * @property {() => void} handleRefreshFilters - Function to refresh filter options.
 * @property {string} toggleParams - Parameters used for toggling filters or sorting.
 * @property {{ url: string; isDesc: boolean } | null} toggleSortParams - Sorting parameters, including URL and sort direction.
 * @property {boolean} filtersOpen - Indicates whether the filters panel is open.
 * @property {{ sort?: string }} params - Additional parameters, such as sorting.
 * @property {string} domain - The domain or context for the resource controls.
 * @property {Option[]} sortingOptions - Available sorting options.
 * @property {string[]} searchKeys - Keys to use for searching within items.
 * @property {(item: T) => Record<string, unknown>} mapItem - Function to map an item to a displayable record.
 * @property {(items: T[]) => string} getItemsKey - Function to generate a unique key for a set of items.
 * @property {(items: T[], filename: string) => void} exportAsCSV - Function to export items as a CSV file.
 * @property {(items: T[], filename: string) => void} exportAsExcel - Function to export items as an Excel file.
 */
interface ResourceControlsProps<T> {
  safeItems: T[]
  searchText?: string
  selectedDisplayData: string[]
  onDisplayChange: (selected: Option[]) => void
  onSearchResultsChange: (results: T[]) => void
  displayDataOptions: Option[]
  handleRefreshFilters: () => void
  toggleParams: string
  toggleSortParams: { url: string; isDesc: boolean } | null
  filtersOpen: boolean
  params: { sort?: string }
  domain: string
  sortingOptions: Option[]
  searchKeys: string[]
  mapItem: (item: T) => Record<string, unknown>
  getItemsKey: (items: T[]) => string
  exportAsCSV: (items: T[], filename: string) => void
  exportAsExcel: (items: T[], filename: string) => void
  filteredItems: T[]
  allItems: T[]
}

/**
 * Renders a set of controls for managing and interacting with a resource list, including search, display options,
 * sorting, filtering, refreshing, exporting, and view mode switching.
 *
 * @template T - The type of the resource items.
 * @param safeItems - The array of resource items to display and interact with.
 * @param searchText - The current search text input value.
 * @param selectedDisplayData - The currently selected display data option values.
 * @param onDisplayChange - Callback invoked when the display data selection changes.
 * @param onSearchResultsChange - Callback invoked when the search results change.
 * @param displayDataOptions - The available options for display data selection.
 * @param handleRefreshFilters - Callback invoked to reset or refresh filters.
 * @param toggleParams - The URL or parameters used to toggle the filter panel.
 * @param toggleSortParams - Object containing sorting toggle information and URL.
 * @param filtersOpen - Boolean indicating whether the filters panel is open.
 * @param params - The current query parameters for sorting and filtering.
 * @param domain - The domain or resource type identifier (used for export filenames and view mode storage).
 * @param sortingOptions - The available sorting options.
 * @param searchKeys - The keys to use for searching within resource items.
 * @param mapItem - Function to map a resource item for display or search.
 * @param getItemsKey - Function to get a unique key for each resource item.
 * @param exportAsCSV - Function to export items as a CSV file.
 * @param exportAsExcel - Function to export items as an Excel file.
 *
 * @returns A React element containing the resource controls UI.
 */
export function ResourceControls<T>({
  safeItems,
  searchText,
  selectedDisplayData,
  onDisplayChange,
  onSearchResultsChange,
  displayDataOptions,
  handleRefreshFilters,
  toggleParams,
  toggleSortParams,
  filtersOpen,
  params,
  domain,
  sortingOptions,
  searchKeys,
  mapItem,
  getItemsKey,
  exportAsCSV,
  exportAsExcel,
  filteredItems,
  allItems,
}: ResourceControlsProps<T>) {
  return (
    <div className='flex flex-wrap items-center justify-between w-full gap-4 [@container(max-width:1000px)]:flex-col [@container(max-width:1000px)]:items-start [@container(max-width:1000px)]:gap-6'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-6'>
        <ResourceSearch<T>
          items={safeItems}
          onResultsChange={onSearchResultsChange}
          searchText={searchText}
          keys={searchKeys}
          mapItem={mapItem}
          getItemsKey={getItemsKey}
        />

        <MultipleSelector
          className='w-52'
          commandProps={{ label: 'Display data' }}
          value={displayDataOptions.filter((opt) => selectedDisplayData?.includes(opt.value))}
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
            <Button variant='outline' className='border-[var(--input)]'>
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

        {domain === 'clusters' && (
          <Link href={`/clusters/new-cluster`}>
            <Button>
              <Plus />
              Create Cluster
            </Button>
          </Link>
        )}

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
            <DropdownMenuItem onClick={() => exportAsCSV(filteredItems, `ror-${domain}-filtered.csv`)}>
              Export Filtered (CSV)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportAsExcel(filteredItems, `ror-${domain}-filtered.xlsx`)}>
              Export Filtered (Excel)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportAsCSV(allItems, `ror-${domain}-all.csv`)}>
              Export All (CSV)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportAsExcel(allItems, `ror-${domain}-all.xlsx`)}>
              Export All (Excel)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <TabsViewSwitcher storageKey={`${domain}:view-mode`} />
      </div>
    </div>
  )
}
