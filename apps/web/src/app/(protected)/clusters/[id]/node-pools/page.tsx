/*
 * FILE OVERVIEW:
 *
 * Server component that fetches and displays the list of node pools for a specific Kubernetes cluster.
 * Renders the PageView component with fetched data.
 * Supports viewing and managing node pools within the cluster.
 */

import type { Metadata } from 'next'
import { PageView } from './page-view'

interface NodePoolsPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'ROR - Node pools',
  description: 'View and manage node pools',
}

// export default async function NodePoolsPage({ params }: NodePoolsPageProps) {
export default async function NodePoolsPage({}: NodePoolsPageProps) {
  // const { id } = await params
  // const api = await getRorApi()
  // const nodes = (await api.nodes.listByCluster(id))?.resources ?? []
  // return <PageView id={id} initialNodes={nodes} />
  return <PageView />
}
