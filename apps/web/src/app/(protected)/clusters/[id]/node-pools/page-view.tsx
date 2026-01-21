/*
 * FILE OVERVIEW
 *
 * Server component that renders the node pools page view for a specific cluster.
 */

'use client'

import React, { useMemo } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/shadcn/button'
import { Plus } from 'lucide-react'
import { TableCell, TableRow } from '@ror/react/components/table/table'
import type { Node } from '@ror/js-api-client'
import { routes } from '@/config/routes'
import { useClusterContext } from '@/context/cluster-context'
import { getNodesInPool } from '@/utils/get-nodes-in-pool'
import { convertMemory } from '@/utils/bytes'
import {
  getNodeArchitecture,
  getNodeBootID,
  getNodeContainerRuntimeVersion,
  getNodeKernelVersion,
  getNodeKubeletVersion,
  getNodeKubeProxyVersion,
  getNodeOperatingSystem,
  getNodeMachineID,
  getNodeSystemUUID,
  getNodeOsImage,
  getNodePods,
  getNodeCpu,
  getNodeMemory,
  getNodeEphemeralStorage,
} from '@/features/cluster/utils/node'
import { nodePoolsColumns } from '@/features/cluster/components/node-pools-columns'
import Link from 'next/link'

interface PageViewProps {
  id: string
  initialNodes: Node[]
}

interface Nodepool {
  name: string
  machineClass: string
  nodeCount: string
  cores: number
  memory: string
  nodes: Node[]
  actions: React.ReactNode
}

const NodeCard = ({ node }: { node: Node }) => (
  <div className='rounded-lg border p-4 bg-[var(--r-layer)] dark:brightness-125 w-lg flex flex-col gap-2'>
    <h4 className='text-xl text-wrap font-semibold'>{node.metadata.name}</h4>
    <hr />
    {[
      ['CPU', getNodeCpu(node)],
      ['Ephemeral Storage', getNodeEphemeralStorage(node)],
      ['Memory', getNodeMemory(node)],
      ['Pods', getNodePods(node)],
      ['Architecture', getNodeArchitecture(node)],
      ['Boot ID', getNodeBootID(node)],
      ['Container Runtime', getNodeContainerRuntimeVersion(node)],
      ['Kernel Version', getNodeKernelVersion(node)],
      ['KubeProxy Version', getNodeKubeProxyVersion(node)],
      ['Kubelet Version', getNodeKubeletVersion(node)],
      ['Machine ID', getNodeMachineID(node)],
      ['Operating System', getNodeOperatingSystem(node)],
      ['OS Image', getNodeOsImage(node)],
      ['System UUID', getNodeSystemUUID(node)],
    ].map(([label, value]) => (
      <p key={label} className='flex items-center'>
        <span className='font-semibold'>{label}:&nbsp;</span>
        {value || '-'}
      </p>
    ))}
  </div>
)

/**
 * Renders the node pools page view for a specific cluster.
 *
 * Displays a list of node pools with their details, and allows users to create new node pools or edit existing ones.
 * Each node pool row can be expanded to show the nodes within the pool.
 *
 * @param {PageViewProps} props - The props for the PageView component.
 * @param {string} props.id - The cluster ID.
 * @param {Node[]} props.initialNodes - The initial list of nodes in the cluster.
 *
 * @returns {JSX.Element} The rendered node pools page view.
 */
export function PageView({ id, initialNodes }: PageViewProps) {
  const { cluster } = useClusterContext()

  const nodes = initialNodes

  const data = React.useMemo(() => {
    const statePools = cluster?.kubernetescluster?.status?.state?.cluster?.nodepools ?? []
    const specPools = cluster?.kubernetescluster?.spec?.topology?.workers?.nodePools ?? []

    return statePools.map((pool) => {
      const spec = specPools.find((s) => s?.name === pool?.name)
      const replicas = spec?.replicas ?? 0
      const nodesInPool = getNodesInPool(pool?.nodes, nodes, pool?.name ?? undefined)

      return {
        name: pool?.name ?? 'Data missing',
        machineClass: pool?.machineClass ?? '',
        nodeCount: `${pool?.scale ?? 0} / ${replicas}`,
        cores: Number(pool?.resources?.cpu?.capacity ?? 0),
        memory: convertMemory(pool?.resources?.memory?.capacity ?? '0'),
        nodes: nodesInPool,
        actions: <button className='text-blue-500 hover:underline'>Edit</button>,
      }
    })
  }, [cluster, nodes])

  const columns = useMemo(() => nodePoolsColumns(id), [id])

  return (
    <div>
      <Link href={routes.app.newNodePool.getHref(id)}>
        <Button asChild>
          <span className='flex items-center'>
            <Plus />
            Create nodepool
          </span>
        </Button>
      </Link>

      {data.length > 0 ? (
        <DataTable
          columns={columns}
          data={data}
          expandable
          renderExpandedRow={(row) => (
            <TableRow className='contents'>
              <TableCell colSpan={columns.length} className='p-0' style={{ gridColumn: '1 / -1' }}>
                <div className='w-full bg-[var(--r-layer)] brightness-102 dark:brightness-110 px-4 py-4'>
                  <div className='flex flex-wrap gap-4'>
                    {(row.original as Nodepool).nodes.map((node) => (
                      <NodeCard key={node.metadata.uid} node={node} />
                    ))}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        />
      ) : (
        <p>Cluster does not have node pools</p>
      )}
    </div>
  )
}
