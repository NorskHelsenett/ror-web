import type { Metadata } from 'next'
import { authGuard } from '@/app/auth-guard'
import { rorApiClient } from '@/services/ror-api'
import { ClusterMetadataCard } from './metadata-card'
import { ClusterToolsCard } from './tools-card'

interface ClusterPageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: 'ROR (Beta) - Cluster',
  description: 'View and manage cluster details',
}

export default async function ClusterPage({ params }: ClusterPageProps) {
  const { id } = await params
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)
  const cluster = await client.clusters.get(id)

  return (
    <div className='grid grid-cols-6 gap-4'>
      <ClusterMetadataCard cluster={cluster} className='col-span-4' />
      <ClusterToolsCard cluster={cluster} user={session.user} />
    </div>
  )
}
