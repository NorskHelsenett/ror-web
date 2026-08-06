'use client'

import { DataTable } from '@/components/ui/data-table'
import type { VirtualMachineDisks } from '@ror/js-api-client'
import { disksColumns } from '../components/disks-columns'

export const DisksTable = ({ items }: { items: VirtualMachineDisks[] }) => (
  <DataTable<VirtualMachineDisks> columns={disksColumns} data={items} resizable storageKey='disks-table-columns-size' />
)
