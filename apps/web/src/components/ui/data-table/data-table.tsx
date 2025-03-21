'use client'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableTitle,
  TableSubtitle,
  TableContainer,
  TableSortHeader,
  TableHeader,
} from '@ror/react/components/table'
import type { TableProps } from '@ror/react/components/table'
import { Pagination } from '@ror/react/components/pagination'
import { SortDirection } from '@ror/react/utils/sorting'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef, Header, PaginationState, SortingState } from '@tanstack/react-table'
import { getItemRangeText } from './pagination'

/**
 * DataTableColumnDef is a type that represents a column definition for a DataTable.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableColumnDef<TData> = ColumnDef<TData, any>

export type DataTablePagination = PaginationState
export type DataTableSorting = SortingState

export interface DataTableProps<TData> extends Omit<TableProps, 'gridTemplateColumns'> {
  /**
   * Specify a title for the table
   */
  title?: string

  /**
   * Specify a subtitle for the table
   */
  subtitle?: string

  /**
   * The array of column defs to use for the table.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/table#columns)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/tables)
   */
  columns: ColumnDef<TData>[]

  /**
   * The data for the table to display.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/core/table#data)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/tables)
   */
  data: TData[]

  /**
   * Provide the number of total rows
   */
  totalCount: number

  /**
   * The current state of pagination
   */
  pagination: DataTablePagination

  /**
   * The callback when pagination changes
   */
  onPaginationChange: (state: DataTablePagination) => void

  /**
   * Provide the number of pages available for pagination
   */
  pageCount: number

  /**
   * Provide a custom set of different page sizes
   * e.g. [10, 25, 50, 100]
   */
  pageSizes?: number[]

  sorting: SortingState
  onSortingChange: (state: SortingState) => void
}

export function DataTable<TData>(props: DataTableProps<TData>) {
  const {
    cellPadding,
    title,
    subtitle,
    columns,
    data,
    totalCount,
    pagination,
    onPaginationChange,
    pageCount,
    pageSizes = [10, 25, 50, 100],
    sorting = [],
    onSortingChange,
  } = props

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    /**
     * The table needs information about the total number of rows and pages.
     * When we control the pagination manually
     */
    rowCount: totalCount,
    pageCount,

    /*
     * Control the pagination ourselves
     * This assumes that the data is already sorted and paginated.
     */
    manualPagination: true,

    /**
     * Trigger callback when pagination changes
     */
    onPaginationChange: (updater) => {
      const newValue = updater instanceof Function ? updater(props.pagination) : updater
      onPaginationChange(newValue)
    },

    enableSorting: true,
    onSortingChange: (updater) => {
      const newState = updater instanceof Function ? updater(props.sorting) : updater
      onSortingChange(newState)
    },

    /**
     * The controlled pagination state
     */
    state: {
      pagination,
      sorting,
    },
  })

  const handleOnPageSizeChange = (pageSize: number) => {
    /**
     * A page size change means we need to reset to the first page
     */
    table.resetPageIndex()
    table.setPageSize(pageSize)
  }

  const handleOnPaginationBackwards = () => {
    table.previousPage()
  }

  const handleOnPaginationForwards = () => {
    table.nextPage()
  }

  const getSortingOrder = <TData, TValue>(header: Header<TData, TValue>): SortDirection => {
    const direction = header.column.getIsSorted()

    if (direction === 'asc') {
      return SortDirection.ASC
    } else if (direction === 'desc') {
      return SortDirection.DESC
    }

    return SortDirection.NONE
  }

  // The current page in the pagination
  const currentPage = table.getState().pagination.pageIndex
  // The selected number of items to show per page
  const paginationPageSize = table.getState().pagination.pageSize

  // Generate a text representing the slice of items displayed including the total number of items
  // .e.g. "Showing 11-20 of 100 items"
  const itemRangeText = getItemRangeText({
    pageIndex: currentPage,
    pageSize: paginationPageSize,
    max: totalCount,
  })

  const numberOfColumns = table.getAllColumns().length.toString()
  const gridTemplateColumns = `repeat(${numberOfColumns}, minmax(max-content, 1fr))`

  return (
    <div>
      <TableContainer hasPagination>
        {title ? <TableTitle id='table-title'>{title}</TableTitle> : null}
        {subtitle ? <TableSubtitle id='table-subtitle'>{subtitle}</TableSubtitle> : null}
        <Table cellPadding={cellPadding} gridTemplateColumns={gridTemplateColumns}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const child = header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())

                  /**
                   * If the column is sortable, render the sortable th component
                   */
                  if (header.column.getCanSort()) {
                    /**
                     * Get the current sorting direction for the column
                     * It maps the value from @tanstack/react-table to the @ror/react SortDirection enum
                     */
                    const sortingDirection = getSortingOrder(header)

                    /**
                     * Callback handler for when sort direction is changed
                     */
                    const handleOnToggleSort = (_id: string, nextDirection: SortDirection) => {
                      if (nextDirection === SortDirection.NONE) {
                        header.column.clearSorting()
                      } else {
                        const isDescending = nextDirection === SortDirection.DESC
                        header.column.toggleSorting(isDescending)
                      }
                    }

                    return (
                      <TableSortHeader
                        key={header.id}
                        id={header.id}
                        colSpan={header.colSpan}
                        direction={sortingDirection}
                        onToggleSort={handleOnToggleSort}
                      >
                        {child}
                      </TableSortHeader>
                    )
                  }

                  return (
                    <TableHeader key={header.id} id={header.id} colSpan={header.colSpan}>
                      {child}
                    </TableHeader>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        pageSize={paginationPageSize}
        pageSizes={pageSizes}
        onPageSizeChange={handleOnPageSizeChange}
        itemRangeText={itemRangeText}
        backwardsDisabled={!table.getCanPreviousPage()}
        forwardsDisabled={!table.getCanNextPage()}
        onBackwards={handleOnPaginationBackwards}
        onForwards={handleOnPaginationForwards}
      />
    </div>
  )
}
