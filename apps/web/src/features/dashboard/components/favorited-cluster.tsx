'use client'

import { ClusterListViewItemRowType } from '@ror/js-api-client'
import { DotIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { routes } from '@/config/routes'
import { FavoriteStar } from '@/components/ui/favorite-star'
import { cn } from '@/utils/clsxm'
import { HealthStatus } from '@/features/cluster/types/health-status'
import { ExternalToolButton } from '@/features/cluster/components/external-tool-button'
import { ResourceBar } from '@/components/ui/resource-bar'
import { RorCliButton } from '@/features/cluster/components/ror-cli-button'
import {
  getLastSeenViewItem,
  getResourcesCpuViewItem,
  getResourcesCpuUsedMilliViewItem,
  getResourcesCpuUsedPercentNumberViewItem,
  getResourcesMemoryViewItem,
  getResourcesMemoryUsedViewItem,
  getResourcesMemoryUsedPercentNumberViewItem,
  getArgocdUrlViewItem,
  getGrafanaUrlViewItem,
  getStatusViewItem,
  getClusterUidView,
  getClusterNameView,
} from '@/features/cluster/utils/cluster'

const Dot = ({ status }: { status: HealthStatus }) => (
  <span className={'flex items-center justify-around size-5'}>
    <span
      className={cn(
        'size-4 rounded-full opacity-75',
        status == 'ok' ? 'bg-emerald-500' : status == 'warning' ? 'bg-yellow-500' : 'bg-red-500'
      )}
    />
    <span
      className={cn(
        'size-3 absolute z-10 rounded-full',
        status == 'ok' ? 'bg-emerald-700' : status == 'warning' ? 'bg-yellow-700' : 'bg-red-700'
      )}
    />
  </span>
)

const displayedStatus = (status: HealthStatus) => {
  if (status === 'ok') {
    return 'Healthy'
  } else if (status === 'warning') {
    return 'Warning'
  } else if (status === 'error') {
    return 'Error'
  } else {
    return 'Unknown'
  }
}

const getDaysHoursMinutes = (ms: number): string => {
  let secs = Math.floor(ms / 1000)
  let mins = Math.floor(secs / 60)
  const hours = Math.floor(mins / 60)

  secs = secs % 60
  mins = mins % 60

  const hoursString = hours !== 0 ? hours + ' hours, ' : ''
  const minsString = mins !== 0 ? mins + ' min ago' : ''
  const secsString = secs !== 0 && mins === 0 ? secs + ' sec ago' : ''

  return hoursString + minsString + secsString
}

const syncedText = (lastSeen: string) => {
  const lastSeenDate = new Date(lastSeen)
  const now = new Date()
  const diff = now.getTime() - lastSeenDate.getTime()
  return 'synced ' + getDaysHoursMinutes(diff)
}

export const FavoritedClusterRow = ({
  cluster,
  onUnfavorite,
}: {
  cluster: ClusterListViewItemRowType
  onUnfavorite?: () => void
}) => {
  const router = useRouter()
  const isError = getStatusViewItem(cluster) === 'error'

  return (
    <div
      onClick={() => router.push(routes.app.cluster.getHref(getClusterUidView(cluster)))}
      className={cn(
        'flex items-center gap-3 px-3 py-2 bg-(--r-layer) rounded-md transition-opacity cursor-pointer',
        isError && 'opacity-50'
      )}
    >
      <Dot status={getStatusViewItem(cluster) as HealthStatus} />
      <span className='text-sm font-medium truncate w-44 shrink-0'>
        {getClusterNameView(cluster) || 'Unknown cluster'}
      </span>
      <DotIcon />
      <span className='text-sm w-16 shrink-0'>{displayedStatus(getStatusViewItem(cluster) as HealthStatus)}</span>
      <DotIcon />
      <div className='flex gap-2 shrink-0'>
        <ExternalToolButton name='ArgoCD' type='argocd' size='sm' url={getArgocdUrlViewItem(cluster)} />
        <ExternalToolButton name='Grafana' type='grafana' size='sm' url={getGrafanaUrlViewItem(cluster)} />
        <RorCliButton cluster={cluster} size='sm' />
      </div>
      <DotIcon />
      <div className='flex items-center gap-2 flex-1 min-w-0 max-w-sm'>
        <p className='text-sm w-8 shrink-0'>CPU</p>
        <ResourceBar
          capacity={getResourcesCpuViewItem(cluster)}
          used={getResourcesCpuUsedMilliViewItem(cluster)}
          percentage={getResourcesCpuUsedPercentNumberViewItem(cluster)}
          showPercentage={false}
        />
      </div>
      <DotIcon />
      <div className='flex items-center gap-2 flex-1 min-w-0 max-w-sm'>
        <p className='text-sm w-14 shrink-0'>Memory</p>
        <ResourceBar
          capacity={getResourcesMemoryViewItem(cluster)}
          used={getResourcesMemoryUsedViewItem(cluster)}
          percentage={getResourcesMemoryUsedPercentNumberViewItem(cluster)}
          showPercentage={false}
        />
      </div>
      <div className='ml-auto shrink-0'>
        <FavoriteStar
          domain='cluster'
          itemId={getClusterUidView(cluster)}
          scale='scale-50'
          onUnfavorite={onUnfavorite}
        />
      </div>
    </div>
  )
}

export const FavoritedCluster = ({ cluster }: { cluster: ClusterListViewItemRowType }) => (
  <div className='flex flex-col gap-2 min-w-86'>
    <div className='flex items-center'>
      <Dot status={getStatusViewItem(cluster) as HealthStatus} />
      {displayedStatus(getStatusViewItem(cluster) as HealthStatus)} <DotIcon />{' '}
      {syncedText(getLastSeenViewItem(cluster))}
    </div>
    <div className='flex items-center gap-2'>
      <p className='text-sm'>CPU</p>
      <ResourceBar
        capacity={getResourcesCpuViewItem(cluster)}
        used={getResourcesCpuUsedMilliViewItem(cluster)}
        percentage={getResourcesCpuUsedPercentNumberViewItem(cluster)}
        showPercentage={false}
      />
      <DotIcon className='-mx-2' />
      <p className='text-sm'>Memory</p>
      <ResourceBar
        capacity={getResourcesMemoryViewItem(cluster)}
        used={getResourcesMemoryUsedViewItem(cluster)}
        percentage={getResourcesMemoryUsedPercentNumberViewItem(cluster)}
        showPercentage={false}
      />
    </div>
    <div className='flex justify-start gap-2'>
      <ExternalToolButton name='ArgoCD' type='argocd' url={getArgocdUrlViewItem(cluster)} />
      <ExternalToolButton name='Grafana' type='grafana' url={getGrafanaUrlViewItem(cluster)} />
      <RorCliButton cluster={cluster} />
    </div>
  </div>
)
