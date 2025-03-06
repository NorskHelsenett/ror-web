import type { Metadata } from 'next'
import { CodeSnippet } from '@ror/react/components/code-snippet'
import { authGuard } from '@/app/auth-guard'
import { rorApiClient } from '@/services/ror-api'
import { ClusterMetadataCard } from './metadata-card'

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
    <div className=''>
      <ClusterMetadataCard cluster={cluster} />
      <div className='mt-10'>
        <CodeSnippet type='multi'>{JSON.stringify(cluster, null, 2)}</CodeSnippet>
      </div>
    </div>
  )
}
