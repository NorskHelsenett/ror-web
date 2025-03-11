import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbItem } from '@ror/react/components/breadcrumb'
import { CodeSnippet } from '@ror/react/components/code-snippet'
import { rorApiClient } from '@/services/ror-api'
import { authGuard } from '../auth-guard'
import { ClustersTable } from './cluster-table'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'ROR (Beta) - Clusters',
  description: 'View clusters',
}

export default async function ClustersPage() {
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)
  const clustersResponse = await client.clusters.filter()

  return (
    <Fragment>
      <header className='px-6 pt-6 mb-8'>
        <Breadcrumb className='mb-6'>
          <BreadcrumbItem isCurrentPage>Clusters</BreadcrumbItem>
        </Breadcrumb>
        <h1>Clusters</h1>
      </header>

      <section className='px-6'>
        <ClustersTable data={clustersResponse.data} />
      </section>

      <div className='mt-8 px-6'>
        <CodeSnippet type='multi' hideCopyButton>
          {JSON.stringify(clustersResponse, null, 2)}
        </CodeSnippet>
      </div>
    </Fragment>
  )
}
