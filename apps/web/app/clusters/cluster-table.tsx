'use client'
import { format } from 'date-fns'
import { convertBytes } from '@/utils/bytes'
import { createColumnHelper } from '@tanstack/react-table'
import type { Cluster } from '@ror/js-api-client'
import Link from 'next/link'
import { DataTable, DataTableColumnDef } from '@/components/common/data-table'
import { HealthStatus } from '@/components/common/health-status'

const columnHelper = createColumnHelper<Cluster>()

const dataTableColumns = [
  columnHelper.accessor('clusterName', {
    header: 'Name',
    cell: (info) => {
      const clusterName = info.getValue()
      const rowOriginal = info.row.original
      const clusterId = rowOriginal.clusterId
      return (
        <Link href={`/clusters/${clusterId}`} className='pr-2 text-(--r-link-primary) underline'>
          {clusterName}
        </Link>
      )
    },
  }),
  columnHelper.accessor('healthStatus.health', {
    header: 'Status',
    cell: (info) => {
      const value = info.getValue()
      return <HealthStatus status={value} />
    },
  }),
  columnHelper.accessor('metrics.cpuPercentage', {
    header: 'CPU',
    cell: (info) => {
      const cpuPercentage = info.getValue()
      const row = info.row.original
      const cpuCount = row.metrics.cpu
      return (
        <span>
          {cpuPercentage}% ({cpuCount} cores)
        </span>
      )
    },
  }),
  columnHelper.accessor('metrics.memoryPercentage', {
    header: 'Memory',
    cell: (info) => {
      const memoryPercentage = info.getValue()
      const bytes = info.row.original.metrics.memory
      const formattedBytes = convertBytes(bytes, { useBinaryUnits: true })
      return (
        <span>
          {memoryPercentage}% ({formattedBytes})
        </span>
      )
    },
  }),
  columnHelper.accessor('lastObserved', {
    header: 'Last heartbeat',
    cell: (info) => {
      const lastObserved = new Date(info.getValue())
      const formatted = format(lastObserved, 'dd LLL, yyyy - HH:mm:ss')
      return <span>{formatted}</span>
    },
  }),
  columnHelper.accessor('created', {
    header: 'Created at',
    cell: (info) => {
      const createdAt = format(info.getValue(), 'dd LLL, yyyy - HH:mm:ss')
      return <span>{createdAt}</span>
    },
  }),
  columnHelper.accessor((info) => info.versions?.nhnTooling.version ?? '', {
    header: 'Tooling',
    cell: (info) => {
      const version = info.getValue()
      return <span>{version}</span>
    },
  }),
  columnHelper.accessor((info) => info.metadata?.project?.name ?? '', {
    header: 'Project',
    cell: (info) => {
      const projectName = info.getValue()
      return <span>{projectName ?? '-'}</span>
    },
  }),
] satisfies DataTableColumnDef<Cluster>[]

interface ClusterTableProps<T> {
  data: T[]
}

export function ClustersTable<T extends Cluster>({ data }: ClusterTableProps<T>) {
  return (
    <div className='max-w-screen overflow-x-auto'>
      <DataTable data={data} columns={dataTableColumns} gridTemplateColumns={`repeat(8, minmax(max-content, 1fr))`} />
    </div>
  )
}
