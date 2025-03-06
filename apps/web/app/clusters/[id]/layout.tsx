import { authGuard } from '@/app/auth-guard'
import { HealthStatus } from '@/components/common/health-status'
import { NavigationTabs } from '@/components/common/navigation-tabs'
import { rorApiClient } from '@/services/ror-api'
import { Tile } from '@ror/react/components/tile'
import { format, formatDistance } from 'date-fns'
import { ReactNode } from 'react'
import { ClusterPageBreadcrumbs } from './breadcrumbs'

interface ClusterPageLayoutProps {
  params: Promise<{
    id: string
  }>
  children: ReactNode
}

const createTabNavigationItems = (clusterId: string) => {
  return [
    {
      label: 'Details',
      href: `/clusters/${clusterId}`,
    },
    {
      label: 'Ingresses',
      href: `/clusters/${clusterId}/ingresses`,
    },
    {
      label: 'Policies',
      href: `/clusters/${clusterId}/policies`,
    },
    {
      label: 'Vulnerabilities',
      href: `/clusters/${clusterId}/vulnerabilities`,
    },
    {
      label: 'Compliance',
      href: `/clusters/${clusterId}/compliance`,
    },
    {
      label: 'About',
      href: `/clusters/${clusterId}/about`,
    },
    {
      label: 'Raw data',
      href: `/clusters/${clusterId}/raw-data`,
    },
  ]
}

export default async function ClusterPageLayout({ params, children }: ClusterPageLayoutProps) {
  const { id } = await params
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)
  const cluster = await client.clusters.get(id)

  const tabs = createTabNavigationItems(id)

  const lastHeartbeatDate = new Date(cluster.lastObserved)
  const lastHeartbeatDateString = format(lastHeartbeatDate, 'yyyy-MM-dd HH:mm:ss')
  const lastHeartbeatDistance = formatDistance(lastHeartbeatDate, new Date())

  return (
    <div>
      <Tile as='header' className='mb-4 min-h-40 rounded-none flex flex-col flex-start px-8 pt-8 md:pl-12'>
        <ClusterPageBreadcrumbs clusterId={cluster.clusterId} clusterName={cluster.clusterName} />
        <div className='flex items-center gap-8 mb-10'>
          <h1>{cluster.clusterName}</h1>
          <div className='flex flex-col gap-2'>
            <HealthStatus status={cluster.healthStatus.health} />
            <p className='text-sm text-(--r-text-secondary)'>
              Last heartbeat: {lastHeartbeatDateString} ({lastHeartbeatDistance} ago)
            </p>
          </div>
        </div>
        <NavigationTabs items={tabs} className='mt-auto -translate-x-4' />
      </Tile>
      <div className='pt-2 px-8 md:px-12 md:pt-8'>{children}</div>
    </div>
  )
}
