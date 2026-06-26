'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Globe, Server } from 'lucide-react'
import { DataCenter } from '@ror/js-api-client'

const providerColors: Record<string, string> = {
  tanzu: 'bg-violet-600',
  aks: 'bg-sky-500',
  talos: 'bg-orange-500',
  kind: 'bg-emerald-500',
}

function getProviderColorClass(provider: string | null | undefined): string {
  if (!provider) return 'bg-slate-500'
  return providerColors[provider.toLowerCase()] ?? 'bg-slate-500'
}

export const datacenterColumns: ColumnDef<DataCenter>[] = [
  {
    id: 'datacenter',
    header: 'Datacenter',
    size: 300,
    accessorFn: (row) => row.datacenter?.legacy?.name || row.datacenter?.legacy?.id || row.metadata?.name || '',
    cell: ({ row }) => {
      const legacy = row.original.datacenter?.legacy
      const id = legacy?.id
      const name = legacy?.name
      const provider = legacy?.provider
      const primaryLabel = name || id || row.original.metadata?.name
      const subtitle = id && name && id !== name ? id : undefined
      return (
        <div className='flex items-center gap-3'>
          <div className={`${getProviderColorClass(provider)} rounded-lg p-2 flex-shrink-0`}>
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
    accessorFn: (row) => row.datacenter?.legacy?.provider || '',
    cell: ({ row }) => {
      const provider = row.original.datacenter?.legacy?.provider
      return (
        <div className='flex items-center gap-2'>
          <div className={`${getProviderColorClass(provider)} size-3 rounded-full flex-shrink-0`} />
          <span>{provider}</span>
        </div>
      )
    },
  },
  {
    id: 'region',
    header: 'Region',
    size: 200,
    accessorFn: (row) => row.datacenter?.legacy?.location?.region || row.datacenter?.status?.location?.region || '',
    cell: ({ row }) => {
      const region =
        row.original.datacenter?.legacy?.location?.region || row.original.datacenter?.status?.location?.region
      return (
        <div className='flex items-center gap-2'>
          <Globe className='size-4 text-muted-foreground flex-shrink-0' />
          <span>{region}</span>
        </div>
      )
    },
  },
  {
    id: 'country',
    header: 'Country',
    accessorFn: (row) => row.datacenter?.legacy?.location?.country || row.datacenter?.status?.location?.country || '',
    cell: ({ row }) => {
      const country =
        row.original.datacenter?.legacy?.location?.country || row.original.datacenter?.status?.location?.country
      return <span>{country}</span>
    },
  },
]
