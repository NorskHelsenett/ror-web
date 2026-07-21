import { Pill } from '@/components/shadcn/pill'
import { CopyButton } from '@ror/react'
import { ArrowDown, ArrowUp, ArrowUpDown, CopyIcon, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { createColumnHelper } from '@tanstack/react-table'
import copy from 'clipboard-copy'
import type { DataTableColumnDef } from '@/components/ui/data-table'
import type { ClusterListViewRowType } from '@ror/js-api-client'
import { routes } from '@/config/routes'
import { envColors } from '../utils/env-colors'
import type { ClusterCardDisplayData } from '../types/display-data'
import {
  getClusterNameView,
  getEnvironmentView,
  getNodepoolsCountView,
  getNodesView,
  getPriceMonthView,
  getPriceYearView,
  getRorAgentVersionView,
  getKubernetesVersionView,
  getNhnToolVersionView,
  getArgocdUrlView,
  getGrafanaUrlView,
  getRorLoginView,
  getProviderView,
  getClusterUidView,
  getServiceIdView,
  getRegionView,
  getCountryView,
  getAZView,
  getStatusView,
  getDatacenterView,
  getResourcesCpuUsedMilliView,
  getResourcesCpuUsedPercentNumberView,
  getResourcesCpuView,
  getResourcesMemoryUsedPercentNumberView,
  getResourcesMemoryUsedView,
  getResourcesMemoryView,
} from '../utils/cluster'
import { Button } from '@/components/shadcn/button'
import { HealthCircle } from './health-circle'
import { ResourceBar } from '@/components/ui/resource-bar'

const missingText = 'Missing ...'

const columnHelper = createColumnHelper<ClusterListViewRowType>()

/**
 * Generates the column definitions for the Kubernetes cluster data table.
 *
 * The columns displayed are dynamically determined based on the provided `selectedDisplayData`.
 *
 * @param selectedDisplayData - An array of display data identifiers specifying which columns to show.
 * @returns An array of column definitions for the data table, filtered according to the selection.
 */
export function getClustersTableColumns(
  selectedDisplayData?: ClusterCardDisplayData[]
): DataTableColumnDef<ClusterListViewRowType>[] {
  const isVisible = (id: ClusterCardDisplayData) =>
    !selectedDisplayData || selectedDisplayData.length === 0 || selectedDisplayData.includes(id)

  return [
    columnHelper.accessor(getClusterNameView, {
      id: 'clusterName',
      size: 150,
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Name
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
      cell: (info) => (
        <Link
          href={routes.app.cluster.getHref(getClusterUidView(info.row.original))}
          className='text-blue-600 dark:text-blue-500 underline'
        >
          {info.getValue() || missingText}
        </Link>
      ),
    }),
    columnHelper.accessor(getStatusView, {
      id: 'health',
      size: 112,
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : (
            <ArrowUpDown className='h-4 w-4' />
          )}
        </Button>
      ),
      enableSorting: true,
      cell: (info) => <HealthCircle className='size-12 mx-auto' healthCondition={info.getValue()} />,
    }),
    columnHelper.accessor(getEnvironmentView, {
      id: 'environment',
      size: 150,
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Environment
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
      cell: (info) => {
        const env = info.getValue()
        return (
          <Pill variant={envColors[(env as keyof typeof envColors) ?? missingText]} className='px-3 mx-auto'>
            {(env ?? missingText).charAt(0).toUpperCase() + (env ?? missingText).slice(1)}
          </Pill>
        )
      },
    }),
    isVisible('cpu') &&
      columnHelper.accessor(getResourcesCpuUsedPercentNumberView, {
        id: 'cpu',
        size: 124,
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
        cell: (info) => {
          const cluster = info.row.original
          return (
            <ResourceBar
              capacity={getResourcesCpuView(cluster) || missingText}
              used={getResourcesCpuUsedMilliView(cluster) || missingText}
              percentage={info.getValue()}
            />
          )
        },
      }),
    isVisible('memory') &&
      columnHelper.accessor(getResourcesMemoryUsedPercentNumberView, {
        id: 'memory',
        size: 124,
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
        cell: (info) => {
          const cluster = info.row.original
          return (
            <ResourceBar
              capacity={getResourcesMemoryView(cluster) || missingText}
              used={getResourcesMemoryUsedView(cluster) || missingText}
              percentage={info.getValue()}
            />
          )
        },
      }),
    // isVisible('gpu') &&
    //   columnHelper.accessor((row) => getClusterResource(row, 'gpu'), {
    //     id: 'gpu',
    //     size: 124,
    //     header: () => <p className='text-sm'>GPU</p>,
    //     cell: (info) => {
    //       const res = info.getValue()
    //       return (
    //         <span>
    //           {res.used || 0} ({res.capacity || 0} core{res.capacity && res.capacity === '1' ? '' : 's'})
    //         </span>
    //       )
    //     },
    //   }),
    // isVisible('disk') &&
    //   columnHelper.accessor((row) => getClusterResource(row, 'disk'), {
    //     id: 'disk',
    //     size: 124,
    //     header: () => <p className='text-sm'>Disk</p>,
    //     cell: (info) => {
    //       const res = info.getValue()
    //       return (
    //         <span>
    //           {res.used || 0} (of {res.capacity || 0})
    //         </span>
    //       )
    //     },
    //   }),
    isVisible('nodes') &&
      columnHelper.accessor(getNodepoolsCountView, {
        id: 'nodes',
        size: 128,
        header: () => <p className='text-sm'>Num of nodes</p>,
        enableSorting: false,
        cell: (info) => {
          const nodePools = info.getValue() || missingText
          const nodeAmount = getNodesView(info.row.original) || missingText
          return (
            <span>
              {nodeAmount} ({nodePools} pool{nodePools === 1 ? '' : 's'})
            </span>
          )
        },
      }),
    isVisible('price') &&
      columnHelper.accessor(getPriceMonthView, {
        id: 'price',
        size: 196,
        header: ({ column }) => (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Price (month/year)
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        ),
        enableSorting: true,
        cell: (info) => {
          const monthly = info.getValue()
          const yearly = getPriceYearView(info.row.original)
          return (
            <span>
              {monthly ? `${monthly} kr` : missingText}/{yearly ? `${yearly} kr` : missingText}
            </span>
          )
        },
      }),
    isVisible('agentVersion') &&
      columnHelper.accessor(getRorAgentVersionView, {
        id: 'agentVersion',
        size: 160,
        header: ({ column }) => (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Agent version
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        ),
        enableSorting: true,
        sortingFn: 'text',
        cell: (info) => <span>{info.getValue() || 'Missing ...'}</span>,
      }),
    isVisible('kubernetesVersion') &&
      columnHelper.accessor(getKubernetesVersionView, {
        id: 'kubernetesVersion',
        size: 198,
        header: ({ column }) => (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Kubernetes version
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        ),
        enableSorting: true,
        sortingFn: 'text',
        cell: (info) => <span>{info.getValue() || 'Missing ...'}</span>,
      }),
    isVisible('toolingVersion') &&
      columnHelper.accessor(getNhnToolVersionView, {
        id: 'toolingVersion',
        size: 156,
        header: ({ column }) => (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Tooling version
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        ),
        enableSorting: true,
        sortingFn: 'text',
        cell: (info) => <span>{info.getValue() || 'Missing ...'}</span>,
      }),
    isVisible('argocd') &&
      columnHelper.display({
        id: 'argocd',
        header: () => <p className='text-sm'>ArgoCD</p>,
        cell: (info) => {
          const argo = getArgocdUrlView(info.row.original)
          return argo ? (
            <a
              href={`${argo}`}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 text-blue-600 dark:text-blue-500'
            >
              ArgoCD <ExternalLink className='w-4 h-4' />
            </a>
          ) : (
            <span>{missingText}</span>
          )
        },
      }),
    isVisible('grafana') &&
      columnHelper.display({
        id: 'grafana',
        header: () => <p className='text-sm'>Grafana</p>,
        cell: (info) => {
          const grafana = getGrafanaUrlView(info.row.original)
          return grafana ? (
            <a
              href={`${grafana}`}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 text-blue-600 dark:text-blue-500'
            >
              Grafana <ExternalLink className='w-4 h-4' />
            </a>
          ) : (
            <span>{missingText}</span>
          )
        },
      }),
    isVisible('rorcli') &&
      columnHelper.display({
        id: 'rorcli',
        size: 88,
        header: () => <p className='text-sm'>ROR CLI</p>,
        cell: (info) => {
          const rorLoginUrl = getRorLoginView(info.row.original)
          return rorLoginUrl ? (
            <CopyButton onClick={() => copy(getRorLoginView(info.row.original))}>
              <CopyIcon />
            </CopyButton>
          ) : (
            <span>{missingText}</span>
          )
        },
      }),
    isVisible('datacenterName') &&
      columnHelper.accessor(getDatacenterView, {
        id: 'datacenterName',
        header: ({ column }) => {
          return (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
              Datacenter
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
        cell: (info) => <span>{info.getValue() || 'Unknown'}</span>,
      }),
    isVisible('datacenterProvider') &&
      columnHelper.accessor(getProviderView, {
        id: 'datacenterProvider',
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
        cell: (info) => <span>{info.getValue() || 'Unknown'}</span>,
      }),
    isVisible('serviceId') &&
      columnHelper.accessor(getServiceIdView, {
        id: 'serviceId',
        size: 160,
        header: () => <p className='text-sm'>Service ID</p>,
        cell: (info) => <span>{info.getValue() || missingText}</span>,
      }),
    isVisible('region') &&
      columnHelper.accessor(getRegionView, {
        id: 'region',
        size: 160,
        header: () => <p className='text-sm'>Region</p>,
        cell: (info) => {
          const region = info.getValue()
          const country = getCountryView(info.row.original)
          return <span>{region && country ? `${region} (${country})` : region || missingText}</span>
        },
      }),
    isVisible('az') &&
      columnHelper.accessor(getAZView, {
        id: 'az',
        size: 160,
        header: () => <p className='text-sm'>Availability zone</p>,
        cell: (info) => <span>{info.getValue() || missingText}</span>,
      }),
  ].filter(Boolean) as DataTableColumnDef<ClusterListViewRowType>[]
}
