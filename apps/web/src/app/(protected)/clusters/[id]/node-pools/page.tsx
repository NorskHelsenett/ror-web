import type { Metadata } from 'next'
import { authGuard } from '@/features/auth/utils/auth-guard'
import { rorApiClient } from '@/services/ror-api'
import { PageView } from './page-view'
interface NodePoolsPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'ROR - Node pools',
  description: 'View and manage node pools',
}

interface Node {
  name: string
  role: string
  image: string
  architecture: string
  cpu: string
  memory: string
}

interface Nodepool {
  name: string
  machineClass: string
  nodeCount: number
  cores: number
  memory: number
  nodes: Node[]
  actions: React.ReactNode
}

const npNodes: Node[] = [
  {
    name: 'aclusterkind-np-1-pgmsg-cvjvs-l7nqq',
    role: 'worker',
    image: 'VMware Photon OS/Linux',
    architecture: 'amd64',
    cpu: '11% (224 mi / 2)',
    memory: '50% (3.91 GiB / 7.68 GiB)',
  },
  {
    name: 'aclusterkind-np-1-pgmsg-cvjvs-qlw82',
    role: 'worker',
    image: 'VMware Photon OS/Linux',
    architecture: 'amd64',
    cpu: '6% (133 mi / 2)',
    memory: '53% (4.11 GiB / 7.68 GiB)',
  },
]

const workerNodes: Node[] = [
  {
    name: 'aclusterkind-workers-taint-xzxdr-bgjrh-7g2jt',
    role: 'worker',
    image: 'VMware Photon OS/Linux',
    architecture: 'amd64',
    cpu: '5% (107 mi / 2)',
    memory: '31% (1.17 GiB / 3.74 GiB)',
  },
]

const NodepoolExamples: Nodepool[] = [
  {
    name: 'Np',
    machineClass: 'best-effort-medium',
    nodeCount: 2,
    cores: 4,
    memory: 15360000000,
    nodes: npNodes,
    actions: <button className='text-blue-500 hover:underline'>Edit</button>,
  },
  {
    name: 'Workers',
    machineClass: 'best-effort-small',
    nodeCount: 1,
    cores: 2,
    memory: 37400000000,
    nodes: workerNodes,
    actions: <button className='text-blue-500 hover:underline'>Edit</button>,
  },
]

export default async function NodePoolsPage({ params }: NodePoolsPageProps) {
  const { id } = await params
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)

  const response = await client.nodes.listByCluster(id)

  const nodes = response ?? []
  console.log('Nodes:', nodes) // TODO: remove when API call is implemented, needed to build

  return (
    <div>
      <PageView data={NodepoolExamples} id={id} />
    </div>
  )
}
