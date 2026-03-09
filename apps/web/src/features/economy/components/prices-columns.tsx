/*
 * FILE OVERVIEW
 *
 * This file defines the column configuration for displaying price information in a table.
 * Each column specifies a header label and an accessor function to extract the corresponding value from a `Price` object.
 */

// 'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { Price } from '@/types/prices'
import {
  getPriceCpu,
  getPriceFrom,
  getPriceMachineClass,
  getPriceMemory,
  getPriceProvider,
  getPriceValue,
} from '../utils/price'
import { DataTableColumnDef } from '@/components/ui/data-table'
import { Button } from '@/components/shadcn/button'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

const columnHelper = createColumnHelper<Price>()

/**
 * Column definitions for displaying price information in a table.
 *
 * Each column is configured with a header label and an accessor function
 * that extracts the corresponding value from a `Price` object.
 */
export function getPricesTableColumns(): DataTableColumnDef<Price>[] {
  return [
    columnHelper.accessor(getPriceMachineClass, {
      id: 'machineClass',
      size: 256,
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Machine class
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        )
      },
      enableSorting: true,
      sortingFn: 'text',
    }),
    columnHelper.accessor((price) => getPriceValue(price), {
      id: 'pricePerNode',
      size: 164,
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Price per node
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        )
      },
      cell: ({ getValue }) => `${getValue()} nok`,
      enableSorting: true,
      sortingFn: 'basic',
    }),
    columnHelper.accessor(getPriceCpu, {
      id: 'cpu',
      size: 96,
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            CPU
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        )
      },
      enableSorting: true,
      sortingFn: 'basic',
    }),
    columnHelper.accessor(getPriceMemory, {
      id: 'memory',
      size: 120,
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Memory
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        )
      },
      enableSorting: true,
      sortingFn: 'basic',
    }),
    columnHelper.accessor(getPriceProvider, {
      id: 'provider',
      size: 124,
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Provider
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        )
      },
      enableSorting: true,
      sortingFn: 'text',
    }),
    columnHelper.accessor(
      (price) => {
        const raw = getPriceFrom(price)
        return raw ? new Date(raw) : null
      },
      {
        id: 'from',
        size: 108,
        header: ({ column }) => {
          return (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
              From
              {column.getIsSorted() === 'asc' ? (
                <ArrowDown className='h-4 w-4' />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowUp className='h-4 w-4' />
              ) : (
                <ArrowUpDown className='h-4 w-4' />
              )}
            </Button>
          )
        },
        enableSorting: true,
        sortingFn: 'datetime',
        cell: (info) => {
          const val = info.getValue<Date | null>()
          return val ? val.toLocaleDateString('nb-NO', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '—'
        },
      }
    ),
    columnHelper.accessor(
      (price) => {
        const raw = getPriceFrom(price)
        return raw ? new Date(raw) : null
      },
      {
        id: 'to',
        size: 116,
        header: ({ column }) => {
          return (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
              To
              {column.getIsSorted() === 'asc' ? (
                <ArrowDown className='h-4 w-4' />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowUp className='h-4 w-4' />
              ) : (
                <ArrowUpDown className='h-4 w-4' />
              )}
            </Button>
          )
        },
        enableSorting: true,
        sortingFn: 'datetime',
        cell: (info) => {
          const val = info.getValue<Date | null>()
          return val ? val.toLocaleDateString('nb-NO', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '—'
        },
      }
    ),
  ]
}
