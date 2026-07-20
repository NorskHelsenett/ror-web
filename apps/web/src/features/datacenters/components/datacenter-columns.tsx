'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Globe, Server } from 'lucide-react'
import { DataCenter } from '@ror/js-api-client'
import { getCountryByName, getProviderColorClass, getRegionByName } from '../utils/helpers'

/**
 * Column definition for datacenter columns
 *
 * @returns Array of ColumnDef<Datacenter>
 */
export const datacenterColumns: ColumnDef<DataCenter>[] = [
  {
    id: 'datacenter',
    header: 'Datacenter',
    size: 300,
    accessorFn: (row) =>
      row.metadata.name ??
      row.datacenter.legacy?.name ??
      row.metadata.uid ??
      row.datacenter.legacy?.id ??
      'Unknown datacenter',
    cell: ({ row }) => {
      const uid = row.original.metadata.uid
      const name = row.original.metadata.name
      const provider = row.original.datacenter.legacy?.provider
      const id = row.original.datacenter.legacy?.id
      const primaryLabel = name ?? uid
      const subtitle = id && name && id !== name ? id : undefined

      return (
        <div className='flex items-center gap-3'>
          <div className={`${getProviderColorClass(provider)} rounded-lg p-2 shrink-0`}>
            <Server className='size-5 text-white' />
          </div>
          <div>
            <p className='font-semibold leading-tight'>{primaryLabel}</p>
            {subtitle && <p className='text-xs text-muted-foreground leading-tight'>{subtitle}</p>}
          </div>
        </div>
      )
    },
  },
  {
    id: 'provider',
    header: 'Provider',
    accessorFn: (row) => row.datacenter.legacy?.provider ?? '',
    cell: ({ row }) => {
      const provider = row.original.datacenter.legacy?.provider
      return (
        <div className='flex items-center gap-2'>
          <div className={`${getProviderColorClass(provider)} size-3 rounded-full shrink-0`} />
          <span>{provider || 'Unknown'}</span>
        </div>
      )
    },
  },
  {
    id: 'region',
    header: 'Region',
    size: 200,
    accessorFn: (row) => row.datacenter.legacy?.location?.region ?? '',
    cell: ({ row }) => {
      const region = row.original.datacenter.legacy?.location?.region
      const regionByName = getRegionByName(row.original.metadata.name)

      return (
        <div className='flex items-center gap-2'>
          <Globe className='size-4 text-muted-foreground shrink-0' />
          <span>{region || regionByName}</span>
        </div>
      )
    },
  },
  {
    id: 'country',
    header: 'Country',
    accessorFn: (row) => row.datacenter.legacy?.location?.country ?? '',
    cell: ({ row }) => {
      const country = row.original.datacenter.legacy?.location?.country
      const countryByName = getCountryByName(row.original.metadata.name)

      return <span>{country || countryByName}</span>
    },
  },
]
