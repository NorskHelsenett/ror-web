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
  TableHeader,
} from '@ror/react/components/table'
import type { TableProps } from '@ror/react/components/table'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, PaginationState, Row } from '@tanstack/react-table'
import { Fragment, useId, useState } from 'react'

/**
 * DataTableColumnDef is a type that represents a column definition for a DataTable.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableColumnDef<TData> = ColumnDef<TData, any>

export type DataTablePagination = PaginationState

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
   * If true, table will be expandable
   * @default false
   */
  expandable?: boolean

  renderExpandedRow?: (row: Row<TData>) => React.ReactNode
  hasMore?: boolean
  isLoading?: boolean
  sentinelRef?: React.RefObject<HTMLDivElement>
}

export function DataTable<TData>(props: DataTableProps<TData>) {
  const { cellPadding, title, subtitle, columns = [], data = [], expandable = false } = props

  const [sorting, setSorting] = useState<SortingState>([])

  const tableTitleId = useId()
  const tableSubtitleId = useId()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => expandable,
  })

  const numberOfColumns = table.getAllColumns().length ?? 0
  const gridTemplateColumns =
    table
      .getVisibleLeafColumns()
      .map((col) => `${col.getSize()}px`)
      .join(' ') ?? ''
  const gridTemplateColumnsExpandable =
    numberOfColumns <= 1
      ? numberOfColumns === 1
        ? '32px'
        : ''
      : `32px repeat(${numberOfColumns - 1}, minmax(120px, auto))`

  const hasTitleOrSubtitle = title || subtitle

  return (
    <Fragment>
      <TableContainer hasPagination>
        {hasTitleOrSubtitle ? (
          <div className='r-table__masthead'>
            {title && <TableTitle id={tableTitleId}>{title}</TableTitle>}
            {subtitle && <TableSubtitle id={tableSubtitleId}>{subtitle}</TableSubtitle>}
          </div>
        ) : null}

        <Table
          cellPadding={cellPadding}
          gridTemplateColumns={expandable ? gridTemplateColumnsExpandable : gridTemplateColumns}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const child = header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())

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
              <Fragment key={row.id}>
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && props.renderExpandedRow?.(row)}
              </Fragment>
            ))}
            <TableRow style={{ display: props.hasMore ? undefined : 'none' }}>
              <TableCell colSpan={numberOfColumns}>
                <div ref={props.sentinelRef} className='h-4' />
              </TableCell>
            </TableRow>

            {props.isLoading && (
              <TableRow>
                <TableCell colSpan={numberOfColumns} className='text-center py-3'>
                  Loading more...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}
