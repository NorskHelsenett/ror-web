import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbItem } from '@ror/react/components/breadcrumb'
import { CodeSnippet } from '@ror/react/components/code-snippet'
import { rorApiClient } from '@/services/ror-api'
import { authGuard } from '../auth-guard'
import { ClustersTable } from './cluster-table'

export const metadata: Metadata = {
  title: 'ROR (Beta) - Clusters',
  description: 'View clusters',
}

export default async function ClustersPage() {
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)
  const clustersResponse = await client.clusters.filter()

  return (
    <div className='p-10'>
      <header className='mb-8'>
        <Breadcrumb className='mb-2'>
          <BreadcrumbItem isCurrentPage>Clusters</BreadcrumbItem>
        </Breadcrumb>
        <h1>Clusters</h1>
      </header>

      <ClustersTable data={clustersResponse.data} />

      <div className='mt-10'>
        <CodeSnippet type='multi' hideCopyButton>
          {JSON.stringify(clustersResponse, null, 2)}
        </CodeSnippet>
      </div>
    </div>
  )
}
