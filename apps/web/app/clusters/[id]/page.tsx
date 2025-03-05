import { format, formatDistance } from 'date-fns'
import Link from 'next/link'
import { CodeSnippet } from '@ror/react/components/code-snippet'
import { Breadcrumb, BreadcrumbItem } from '@ror/react/components/breadcrumb'
import { authGuard } from '@/app/auth-guard'
import { HealthStatus } from '@/components/common/health-status'
import { rorApiClient } from '@/services/ror-api'

interface ClusterPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ClusterPage({ params }: ClusterPageProps) {
  const { id } = await params
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)
  const cluster = await client.clusters.get(id)

  const lastHeartbeatDate = new Date(cluster.lastObserved)
  const lastHeartbeatDateString = format(lastHeartbeatDate, 'yyyy-MM-dd HH:mm:ss')
  const lastHeartbeatDistance = formatDistance(lastHeartbeatDate, new Date())

  return (
    <div className='p-10'>
      <header className='mb-8'>
        <Breadcrumb noTrailingSlash className='mb-2'>
          <BreadcrumbItem asChild>
            <Link href='/clusters'>Clusters</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>{cluster.clusterName}</BreadcrumbItem>
        </Breadcrumb>
        <div className='flex items-center gap-8'>
          <h1>{cluster.clusterName}</h1>
          <div className='flex flex-col gap-2'>
            <HealthStatus status={cluster.healthStatus.health} />
            <p className='text-sm text-(--r-text-secondary)'>
              Last heartbeat: {lastHeartbeatDateString} ({lastHeartbeatDistance} ago)
            </p>
          </div>
        </div>
      </header>
      <div className='mt-10'>
        <CodeSnippet type='multi' hideCopyButton>
          {JSON.stringify(cluster, null, 2)}
        </CodeSnippet>
      </div>
    </div>
  )
}
