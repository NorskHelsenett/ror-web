'use client'

import { DataTable } from '@/components/ui/data-table'
import type { VirtualMachineNetworks } from '@ror/js-api-client'
import { networksColumns } from '../components/networks-columns'

export const NetworksTable = ({ items }: { items: VirtualMachineNetworks[] }) => (
  <DataTable<VirtualMachineNetworks>
    columns={networksColumns}
    data={items}
    resizable
    storageKey='networks-table-columns-size'
  />
)
