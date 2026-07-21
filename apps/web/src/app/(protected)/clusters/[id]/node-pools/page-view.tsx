'use client'

import { ResourceBar } from '@/components/ui/resource-bar'
import { useClusterContext } from '@/context/cluster-context'
import { Node, Nodepool } from '@/features/cluster/types/nodepool'
import { convertMemory } from '@/utils/bytes'
import { parseQuantity } from '@/utils/parse-quantity'
import React, { Fragment } from 'react'

/** Format cores to string, showing millicores for values < 1. */
function formatCores(cores: number): string {
  return cores < 1 ? `${(cores * 1000).toFixed(0)}m` : `${cores.toFixed(2)}`
}

const NodeCard = ({ node }: { node: Node }) => {
  // Safely parse quantity values with fallbacks
  const cpuCapacityCores = node.cpu.capacity ? parseQuantity(node.cpu.capacity) : 0
  const cpuAllocatedCores = node.cpu.allocated ? parseQuantity(node.cpu.allocated) : 0
  const cpuPercent = cpuCapacityCores > 0 ? (cpuAllocatedCores / cpuCapacityCores) * 100 : 0

  const memCapacityBytes = node.memory.capacity ? parseQuantity(node.memory.capacity) : 0
  const memAllocatedBytes = node.memory.allocated ? parseQuantity(node.memory.allocated) : 0
  const memPercent = memCapacityBytes > 0 ? (memAllocatedBytes / memCapacityBytes) * 100 : 0

  return (
    <div className='rounded-lg border p-4 bg-(--r-layer) w-116 flex flex-col gap-2'>
      <h4 className='text-xl text-wrap font-bold'>{node.name}</h4>

      <hr />

      <div className='grid grid-cols-2 gap-y-2 items-center'>
        <b>CPU</b>
        <ResourceBar
          capacity={`${node.cpu.capacity ?? 'N/A'} cores`}
          used={node.cpu.allocated ? formatCores(cpuAllocatedCores) : 'N/A'}
          percentage={node.cpu.capacity && node.cpu.allocated ? parseFloat(cpuPercent.toFixed(1)) : null}
        />

        <b>Memory</b>
        <ResourceBar
          capacity={node.memory.capacity ? convertMemory(node.memory.capacity) : 'N/A'}
          used={node.memory.allocated ? convertMemory(node.memory.allocated) : 'N/A'}
          percentage={node.memory.capacity && node.memory.allocated ? parseFloat(memPercent.toFixed(1)) : null}
        />

        <b>Architecture</b>
        <p>{node.architecture ?? 'N/A'}</p>

        <b>Kubernetes version</b>
        <p>{node.kubernetesVersion ?? 'N/A'}</p>
      </div>
    </div>
  )
}

/**
 * Renders the node pools page view for a specific cluster.
 *
 * Displays a list of node pools with their details, and allows users to create new node pools or edit existing ones.
 * Each node pool row can be expanded to show the nodes within the pool.
 *
 * @returns {JSX.Element} The rendered node pools page view.
 */
export function PageView() {
  const { cluster } = useClusterContext()

  const nodepools: Nodepool[] = cluster.nodepools?.fieldValue ?? []

  return (
    <div>
      {nodepools.map((pool, index) => {
        return (
          <Fragment key={index}>
            <h2>{pool.name}</h2>
            <div className='flex gap-4'>
              {pool.nodes.map((node, index) => (
                <NodeCard key={index} node={node} />
              ))}
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
