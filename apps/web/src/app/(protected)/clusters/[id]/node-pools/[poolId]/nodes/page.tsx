import { authGuard } from '@/features/auth/utils/auth-guard'
import { rorApiClient } from '@/services/ror-api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROR - Nodes',
  description: 'Nodes in a node pool',
}

interface NodesPageProps {
  params: Promise<{
    id: string
    poolId: string
  }>
}

export default async function NodesPage({ params }: NodesPageProps) {
  const { id, poolId } = await params
  // TODO: implement that you get the nodes of the nodepool from the API
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)

  const response = await client.nodes.listByCluster(id)
  const nodes = response ?? []
  console.log(nodes) // TODO: remove later, needed to build

  return (
    <div className=''>
      <h1>
        Nodes in node pool {poolId} in cluster {id}
      </h1>
      {/* TODO: Implement data table that displays the nodes */}
    </div>
  )
}
