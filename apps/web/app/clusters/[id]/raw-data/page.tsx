import { authGuard } from '@/app/auth-guard'
import { rorApiClient } from '@/services/ror-api'
import { CodeSnippet } from '@ror/react/components/code-snippet'

interface ClusterPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ClusterRawDataPage({ params }: ClusterPageProps) {
  const { id } = await params
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)
  const cluster = await client.clusters.get(id)

  return (
    <div className=''>
      <CodeSnippet type='multi' style={{ '--code-snippet-multi-max-height': '40rem' }}>
        {JSON.stringify(cluster, null, 2)}
      </CodeSnippet>
    </div>
  )
}
