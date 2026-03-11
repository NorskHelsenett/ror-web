'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { VirtualMachineNetworks } from '@ror/js-api-client'

export const networksColumns: ColumnDef<VirtualMachineNetworks>[] = [
  {
    header: 'Id',
    accessorKey: 'id',
    size: 250,
  },
  {
    header: 'DNS',
    accessorKey: 'dns',
    size: 250,
  },
  {
    header: 'IPv4',
    accessorKey: 'ipv4',
    size: 250,
  },
  {
    header: 'IPv6',
    accessorKey: 'ipv6',
    size: 300,
  },
  {
    header: 'MAC',
    accessorKey: 'mac',
    size: 300,
  },
  {
    header: 'Gateway',
    accessorKey: 'gateway',
    size: 150,
  },
  {
    header: 'Mask',
    accessorKey: 'mask',
    size: 150,
  },
]
