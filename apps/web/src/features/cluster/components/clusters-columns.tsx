import { Pill } from '@/components/shadcn/pill'
import { CopyButton } from '@ror/react'
import { ArrowDown, ArrowUp, ArrowUpDown, CopyIcon, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { createColumnHelper } from '@tanstack/react-table'
import copy from 'clipboard-copy'
import type { DataTableColumnDef } from '@/components/ui/data-table'
import type { KubernetesCluster } from '@ror/js-api-client'
import type { User } from 'next-auth'
import { routes } from '@/config/routes'
import { envColors } from '../utils/env-colors'
import type { ClusterCardDisplayData } from '../types/display-data'
import {
  getClusterId,
  getClusterName,
  getClusterResource,
  getTools,
  getPrices,
  getRorLogin,
  getKubectlLogin,
  getEnvironment,
  getNodePools,
  getVersions,
  getDatacenter,
  getProvider,
  getClusterById,
  getClusterUid,
  getHealthCondition,
} from '../utils/cluster'
import { Button } from '@/components/shadcn/button'
import { HealthCircle } from './health-circle'

const columnHelper = createColumnHelper<KubernetesCluster>()

/**
 * Generates the column definitions for the Kubernetes cluster data table.
 *
 * The columns displayed are dynamically determined based on the provided `selectedDisplayData`.
 *
 * @param user - The current user
 * @param selectedDisplayData - An array of display data identifiers specifying which columns to show.
 * @returns An array of column definitions for the data table, filtered according to the selection.
 */
export function getClustersTableColumns(
  clusters: KubernetesCluster[],
  user?: User,
  selectedDisplayData?: ClusterCardDisplayData[]
): DataTableColumnDef<KubernetesCluster>[] {
  const showAll = !selectedDisplayData || selectedDisplayData.length === 0
  const isVisible = (id: ClusterCardDisplayData) => showAll || selectedDisplayData.includes(id)

  return [
    columnHelper.accessor(getClusterName, {
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
          href={routes.app.cluster.getHref(getClusterUid(info.row.original))}
          className='text-blue-600 dark:text-blue-500 underline'
          onClick={() =>
            localStorage.setItem(
              'selectedCluster',
              JSON.stringify(getClusterById(getClusterId(info.row.original), clusters))
            )
          }
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor(getHealthCondition, {
      id: 'health',
      size: 80,
      header: () => <p className='text-sm'>Status</p>,
      cell: (info) => <HealthCircle className='w-12 h-12 scale-90' healthCondition={info.getValue()} />,
    }),
    columnHelper.accessor(getEnvironment, {
      id: 'environment',
      size: 152,
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
          <Pill variant={envColors[(env as keyof typeof envColors) ?? 'undefined']} className='px-3'>
            {(env ?? 'Undefined').charAt(0).toUpperCase() + (env ?? 'Undefined').slice(1)}
          </Pill>
        )
      },
    }),
    isVisible('cpu') &&
      columnHelper.accessor((row) => getClusterResource(row, 'cpu'), {
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
          const res = info.getValue()
          return (
            <span>
              {res.used || 0} (of {res.capacity || 0})
            </span>
          )
        },
      }),
    isVisible('memory') &&
      columnHelper.accessor((row) => getClusterResource(row, 'memory'), {
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
          const res = info.getValue()
          return (
            <span>
              {res.used || 0} (of {res.capacity || 0})
            </span>
          )
        },
      }),
    isVisible('gpu') &&
      columnHelper.accessor((row) => getClusterResource(row, 'gpu'), {
        id: 'gpu',
        size: 124,
        header: () => <p className='text-sm'>GPU</p>,
        cell: (info) => {
          const res = info.getValue()
          return (
            <span>
              {res.used || 0} ({res.capacity || 0} core{res.capacity && res.capacity === '1' ? '' : 's'})
            </span>
          )
        },
      }),
    isVisible('disk') &&
      columnHelper.accessor((row) => getClusterResource(row, 'disk'), {
        id: 'disk',
        size: 124,
        header: () => <p className='text-sm'>Disk</p>,
        cell: (info) => {
          const res = info.getValue()
          return (
            <span>
              {res.used || 0} (of {res.capacity || 0})
            </span>
          )
        },
      }),
    isVisible('nodes') &&
      columnHelper.accessor(getNodePools, {
        id: 'nodes',
        size: 160,
        header: () => <p className='text-sm'>Num of nodes</p>,
        enableSorting: false,
        cell: (info) => {
          const nodePools = info.getValue()
          const nodeAmount = nodePools?.reduce((total, nodePool) => total + (nodePool.replicas || 0), 0) || 0
          return (
            <span>
              {nodeAmount} ({nodePools.length} pool{nodePools.length === 1 ? '' : 's'})
            </span>
          )
        },
      }),
    (isVisible('monthlyPrice') || isVisible('yearlyPrice')) &&
      columnHelper.accessor(getPrices, {
        id: 'monthlyPrice',
        size: 196,
        header: ({ column }) => (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Price
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
        cell: (info) => {
          const { monthly, yearly } = info.getValue()
          return (
            <span>
              Monthly: {monthly} kr
              <br />
              Yearly: {yearly} kr
            </span>
          )
        },
      }),
    isVisible('agentVersion') &&
      columnHelper.accessor(getVersions, {
        id: 'agentVersion',
        size: 156,
        header: () => <p className='text-sm'>Agent version</p>,
        cell: (info) => <span>{info.getValue().agent.version}</span>,
      }),
    isVisible('kubernetesVersion') &&
      columnHelper.accessor(getVersions, {
        id: 'kubernetesVersion',
        size: 168,
        header: () => <p className='text-sm'>Kubernetes version</p>,
        cell: (info) => <span>{info.getValue().kubernetes.version}</span>,
      }),
    isVisible('toolingVersion') &&
      columnHelper.accessor(getVersions, {
        id: 'toolingVersion',
        size: 156,
        header: () => <p className='text-sm'>Tooling version</p>,
        cell: (info) => <span>{info.getValue().nhnTooling.version}</span>,
      }),
    isVisible('argocd') &&
      columnHelper.display({
        id: 'argocd',
        header: () => <p className='text-sm'>ArgoCD</p>,
        cell: (info) => {
          const { argo } = getTools(info.row.original)
          return argo ? (
            <a
              href={`https://${argo}`}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 text-blue-600 dark:text-blue-500'
            >
              ArgoCD <ExternalLink className='w-4 h-4' />
            </a>
          ) : (
            'Missing…'
          )
        },
      }),
    isVisible('grafana') &&
      columnHelper.display({
        id: 'grafana',
        header: () => <p className='text-sm'>Grafana</p>,
        cell: (info) => {
          const { grafana } = getTools(info.row.original)
          return grafana ? (
            <a
              href={`https://${grafana}`}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 text-blue-600 dark:text-blue-500'
            >
              Grafana <ExternalLink className='w-4 h-4' />
            </a>
          ) : (
            'Missing…'
          )
        },
      }),
    isVisible('rorcli') &&
      columnHelper.display({
        id: 'rorcli',
        header: () => <p className='text-sm'>ROR CLI</p>,
        cell: (info) => (
          <CopyButton onClick={() => copy(getRorLogin(info.row.original))}>
            <CopyIcon />
          </CopyButton>
        ),
      }),
    isVisible('kubectl') &&
      columnHelper.display({
        id: 'kubectl',
        header: () => <p className='text-sm'>Kubectl</p>,
        cell: (info) => (
          <CopyButton onClick={() => copy(getKubectlLogin(info.row.original, user?.email ?? ''))}>
            <CopyIcon />
          </CopyButton>
        ),
      }),
    isVisible('datacenterName') &&
      columnHelper.accessor(getDatacenter, {
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
      columnHelper.accessor(getProvider, {
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
  ].filter(Boolean) as DataTableColumnDef<KubernetesCluster>[]
}
