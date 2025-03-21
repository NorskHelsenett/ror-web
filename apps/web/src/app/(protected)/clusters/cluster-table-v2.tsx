'use client'
import { createColumnHelper } from '@tanstack/react-table'
import type { ClusterV2 } from '@ror/js-api-client'
import Link from 'next/link'
import { DataTable } from '@/components/ui/data-table'
import type { DataTableColumnDef, DataTablePagination, DataTableSorting } from '@/components/ui/data-table'
import { HealthStatus } from '@/components/ui/health-status'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { localizeDate } from '@/utils/time-and-date'

const columnHelper = createColumnHelper<ClusterV2>()

const dataTableColumns = [
  columnHelper.accessor('metadata.name', {
    header: 'Name',
    enableSorting: true,
    cell: (info) => {
      const clusterName = info.getValue()
      const rowOriginal = info.row.original
      const clusterId = rowOriginal.kubernetescluster.spec.data.clusterId
      return (
        <Link href={`/clusters/${clusterId}`} className='pr-2 text-(--r-link-primary) underline'>
          {clusterName}
        </Link>
      )
    },
  }),
  columnHelper.accessor('kubernetescluster.status.phase', {
    header: 'Phase',
    enableSorting: false,
    cell: (info) => {
      const value = info.getValue()
      return <HealthStatus status={value} />
    },
  }),
  columnHelper.accessor(
    (cluster) => cluster.kubernetescluster.status.status.cluster.resources.find((r) => r.name === 'cpu'),
    {
      header: 'CPU',
      enableSorting: false,
      cell: (info) => {
        const row = info.row.original
        const resource = row.kubernetescluster.status.status.cluster.resources.find((r) => r.name === 'cpu')
        const cpuCount = resource?.allocated || 0
        const cpuUsage = resource?.usage || 0
        return (
          <span>
            {cpuUsage} ({cpuCount} cores)
          </span>
        )
      },
    }
  ),
  columnHelper.accessor(
    (cluster) => cluster.kubernetescluster.status.status.cluster.resources.find((r) => r.name === 'memory'),
    {
      header: 'Memory',
      enableSorting: false,
      cell: (info) => {
        const row = info.row.original
        const resource = row.kubernetescluster.status.status.cluster.resources.find((r) => r.name === 'memory')
        const allocated = resource?.allocated || 0
        const usage = resource?.usage || 0
        return (
          <span>
            {usage} ({allocated})
          </span>
        )
      },
    }
  ),
  columnHelper.accessor('kubernetescluster.status.status.created', {
    header: 'Created at',
    enableSorting: false,
    cell: (info) => {
      const createdAt = localizeDate(info.getValue())
      return <span>{createdAt}</span>
    },
  }),
  columnHelper.accessor('kubernetescluster.status.status.lastUpdated', {
    header: 'Last update',
    enableSorting: false,
    cell: (info) => {
      const createdAt = localizeDate(info.getValue())
      return <span>{createdAt}</span>
    },
  }),
  columnHelper.accessor(
    (cluster) => cluster.kubernetescluster.status.status.versions.find((r) => r.component === 'kubernetes'),
    {
      header: 'Kubernetes',
      enableSorting: false,
      cell: (info) => {
        const row = info.row.original
        const tool = row.kubernetescluster.status.status.versions.find((v) => v.component === 'kubernetes')

        if (!tool) {
          return <span>Missing…</span>
        }

        return <span>{tool.version}</span>
      },
    }
  ),
  columnHelper.accessor(
    (cluster) => cluster.kubernetescluster.status.status.versions.find((r) => r.component === 'nhntooling'),
    {
      header: 'NHN Tooling',
      enableSorting: false,
      cell: (info) => {
        const row = info.row.original
        const tool = row.kubernetescluster.status.status.versions.find((v) => v.component === 'nhntooling')

        if (!tool) {
          return <span>Missing…</span>
        }

        return <span>{tool.version}</span>
      },
    }
  ),
] satisfies DataTableColumnDef<ClusterV2>[]

interface ClusterTableV2Props<T> {
  data: T[]
  pagination: DataTablePagination
}

export function ClustersTableV2<T extends ClusterV2>({ data, pagination }: ClusterTableV2Props<T>) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()

  const updateSearchParams = useCallback(
    (newSearchParams: URLSearchParams) => {
      const url = '/clusters'
      if (newSearchParams.size > 0) {
        router.push(`${url}?${newSearchParams.toString()}`)
      }
    },
    [router]
  )

  const handleOnPaginationChange = useCallback(
    (state: DataTablePagination) => {
      const params = new URLSearchParams(currentSearchParams)
      params.set('page', (state.pageIndex + 1).toString())
      params.set('limit', state.pageSize.toString())
      updateSearchParams(params)
    },
    [currentSearchParams, updateSearchParams]
  )

  const handleOnSortChange = useCallback(
    (state: DataTableSorting) => {
      console.log('cluster-table handleOnSortChange -> state:', state)
      const params = new URLSearchParams(currentSearchParams)
      if (Array.isArray(state) && typeof state[0] === 'object') {
        params.set('sort', state[0].id)
        params.set('order', state[0].desc ? 'desc' : 'asc')
      } else if (Array.isArray(state) && state.length === 0) {
        params.delete('sort')
        params.delete('order')
      }
      updateSearchParams(params)
    },
    [currentSearchParams, updateSearchParams]
  )

  const sortByField = currentSearchParams.get('sort')
  const sortDirection = currentSearchParams.get('order')

  const sortState: DataTableSorting = sortByField
    ? [
        {
          id: sortByField,
          desc: sortDirection === 'desc',
        },
      ]
    : []

  return (
    <DataTable
      title='Clusters'
      subtitle='Data coming from the new v2/resources endpoint'
      data={data}
      totalCount={-1}
      pageCount={-1}
      columns={dataTableColumns}
      pagination={pagination}
      sorting={sortState}
      onSortingChange={handleOnSortChange}
      onPaginationChange={handleOnPaginationChange}
    />
  )
}
