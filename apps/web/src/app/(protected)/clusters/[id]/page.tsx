/*
 * FILE OVERVIEW:
 *
 * Server component that fetches and displays details for a specific Kubernetes cluster
 * identified by its ID from the URL. Renders the ClusterDetails component.
 */

import type { Metadata } from 'next'
import { ClusterDetails } from '@/features/cluster/components/cluster-details'
import { fetchResourceAccessGroups } from '@/features/acls/services/fetch-resource-access-groups'

export const metadata: Metadata = {
  title: 'ROR - Cluster',
  description: 'View and manage cluster details',
}

export default async function ClusterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const accessGroups = await fetchResourceAccessGroups('KubernetesCluster', id)

  return (
    <div className='@container'>
      <ClusterDetails accessGroups={accessGroups} />
    </div>
  )
}
