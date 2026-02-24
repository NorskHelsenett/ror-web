import { Pill } from '@/components/shadcn/pill'
import { CopyButton } from '@ror/react'
import { CopyIcon, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { createColumnHelper } from '@tanstack/react-table'
import copy from 'clipboard-copy'
import type { DataTableColumnDef } from '@/components/ui/data-table'
import type { KubernetesCluster } from '@ror/js-api-client'
import type { User } from 'next-auth'
import { routes } from '@/config/routes'
import { HealthStatus } from './health-status'
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
} from '../utils/cluster'

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
      header: 'Name',
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
    columnHelper.accessor(() => 1, {
      // TODO: `1` with real health data later
      id: 'health',
      header: 'Status',
      enableSorting: false,
      cell: (info) => <HealthStatus status={info.getValue()} />,
    }),
    columnHelper.accessor(getEnvironment, {
      id: 'environment',
      header: 'Environment',
      enableSorting: false,
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
        header: 'CPU',
        enableSorting: false,
        cell: (info) => {
          const res = info.getValue()
          return (
            <span>
              {res.used || 0} ({res.capacity || 0} core{res.capacity && res.capacity === '1' ? '' : 's'})
            </span>
          )
        },
      }),
    isVisible('memory') &&
      columnHelper.accessor((row) => getClusterResource(row, 'memory'), {
        id: 'memory',
        header: 'Memory',
        enableSorting: false,
        cell: (info) => {
          const res = info.getValue()
          return (
            <span>
              {res.used} ({res.capacity})
            </span>
          )
        },
      }),
    isVisible('gpu') &&
      columnHelper.accessor((row) => getClusterResource(row, 'gpu'), {
        id: 'gpu',
        header: 'GPU',
        enableSorting: false,
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
        header: 'Disk',
        enableSorting: false,
        cell: (info) => {
          const res = info.getValue()
          return (
            <span>
              {res.used} ({res.capacity})
            </span>
          )
        },
      }),
    isVisible('nodes') &&
      columnHelper.accessor(getNodePools, {
        id: 'nodes',
        header: 'Num of nodes',
        enableSorting: false,
        cell: (info) => {
          const nodePools = info.getValue()
          const nodeAmount = nodePools?.reduce((total, nodePool) => total + (nodePool.replicas || 0), 0) || 0
          return (
            <span>
              {nodeAmount} ({nodePools.length} node pool{nodePools.length === 1 ? '' : 's'})
            </span>
          )
        },
      }),
    isVisible('monthlyPrice') &&
      columnHelper.accessor(getPrices, {
        id: 'monthlyPrice',
        header: 'Monthly price',
        enableSorting: false,
        cell: (info) => <span>{info.getValue().monthly} kr</span>,
      }),
    isVisible('yearlyPrice') &&
      columnHelper.accessor(getPrices, {
        id: 'yearlyPrice',
        header: 'Yearly price',
        enableSorting: false,
        cell: (info) => <span>{info.getValue().yearly} kr</span>,
      }),
    isVisible('agentVersion') &&
      columnHelper.accessor(getVersions, {
        id: 'agentVersion',
        header: 'Agent version',
        enableSorting: false,
        cell: (info) => <span>{info.getValue().agent.version}</span>,
      }),
    isVisible('kubernetesVersion') &&
      columnHelper.accessor(getVersions, {
        id: 'kubernetesVersion',
        header: 'Kubernetes version',
        enableSorting: false,
        cell: (info) => <span>{info.getValue().kubernetes.version}</span>,
      }),
    isVisible('toolingVersion') &&
      columnHelper.accessor(getVersions, {
        id: 'toolingVersion',
        header: 'Tooling version',
        enableSorting: false,
        cell: (info) => <span>{info.getValue().nhnTooling.version}</span>,
      }),
    isVisible('argocd') &&
      columnHelper.display({
        id: 'argocd',
        header: 'ArgoCD',
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
        header: 'Grafana',
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
        header: 'ROR CLI',
        cell: (info) => (
          <CopyButton onClick={() => copy(getRorLogin(info.row.original))}>
            <CopyIcon />
          </CopyButton>
        ),
      }),
    isVisible('kubectl') &&
      columnHelper.display({
        id: 'kubectl',
        header: 'Kubectl',
        cell: (info) => (
          <CopyButton onClick={() => copy(getKubectlLogin(info.row.original, user?.email ?? ''))}>
            <CopyIcon />
          </CopyButton>
        ),
      }),
    isVisible('datacenterName') &&
      columnHelper.accessor(getDatacenter, {
        id: 'datacenterName',
        header: 'Datacenter',
        enableSorting: false,
        cell: (info) => <span>{info.getValue() || 'Unknown'}</span>,
      }),
    isVisible('datacenterProvider') &&
      columnHelper.accessor(getProvider, {
        id: 'datacenterProvider',
        header: 'Provider',
        enableSorting: false,
        cell: (info) => <span>{info.getValue() || 'Unknown'}</span>,
      }),
  ].filter(Boolean) as DataTableColumnDef<KubernetesCluster>[]
}
