'use client'

import { ResourceBar } from '@/components/ui/resource-bar'
import { useClusterContext } from '@/context/cluster-context'
import { Node, Nodepool } from '@/features/cluster/types/nodepool'
import { convertMemory, formatCores } from '@/utils/bytes'
import { parseQuantity } from '@/utils/parse-quantity'
import React, { Fragment } from 'react'

const NodeCard = ({ node }: { node: Node }) => {
  const cpuCapacityCores = parseQuantity(node.cpu.capacity)
  const cpuAllocatedCores = parseQuantity(node.cpu.allocated)
  const cpuPercent = cpuCapacityCores > 0 ? (cpuAllocatedCores / cpuCapacityCores) * 100 : 0

  const memCapacityBytes = parseQuantity(node.memory.capacity)
  const memAllocatedBytes = parseQuantity(node.memory.allocated)
  const memPercent = memCapacityBytes > 0 ? (memAllocatedBytes / memCapacityBytes) * 100 : 0

  return (
    <div className='rounded-lg border p-4 bg-(--r-layer) w-116 flex flex-col gap-2'>
      <h4 className='text-xl text-wrap font-bold'>{node.name}</h4>

      <hr />

      <div className='grid grid-cols-2 gap-y-2 items-center'>
        <b>CPU</b>
        <ResourceBar
          capacity={`${node.cpu.capacity} cores`}
          used={formatCores(cpuAllocatedCores)}
          percentage={parseFloat(cpuPercent.toFixed(1))}
        />

        <b>Memory</b>
        <ResourceBar
          capacity={convertMemory(node.memory.capacity)}
          used={convertMemory(node.memory.allocated)}
          percentage={parseFloat(memPercent.toFixed(1))}
        />

        <b>Architecture</b>
        <p>{node.architecture}</p>

        <b>Kubernetes version</b>
        <p>{node.kubernetesVersion}</p>
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
