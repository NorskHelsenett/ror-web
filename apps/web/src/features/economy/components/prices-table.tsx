'use client'

import { DataTable } from '@/components/ui/data-table'
import { getPricesTableColumns } from './prices-columns'
import type { Price } from '@/types/prices'

interface PricesTableProps {
  data: Price[]
}

export function PricesTable({ data }: PricesTableProps) {
  return <DataTable columns={getPricesTableColumns()} data={data} />
}
