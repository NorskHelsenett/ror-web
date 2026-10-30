'use client'

import { ClusterListViewItemRowType } from '@ror/js-api-client'
import { Copy, DotIcon } from 'lucide-react'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { toast } from 'sonner'
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
  getRorLoginViewItem,
} from '@/features/cluster/utils/cluster'

const Dot = ({ status }: { status: HealthStatus }) => (
  <span aria-hidden='true' className='relative flex shrink-0 items-center justify-center size-5'>
    <span
      className={cn(
        'absolute inset-0 rounded-full',
        status == 'ok' ? 'bg-emerald-500/15' : status == 'warning' ? 'bg-yellow-500/15' : 'bg-red-500/15'
      )}
    />
    <span
      className={cn(
        'relative size-2.5 rounded-full',
        status == 'ok' ? 'bg-emerald-500' : status == 'warning' ? 'bg-yellow-500' : 'bg-red-500'
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

const clusterRowGrid =
  'grid grid-cols-[minmax(160px,1.2fr)_minmax(140px,1fr)_minmax(140px,1fr)_280px_36px] min-w-[1000px] items-center gap-6 px-3'

export const FavoritedClusterHeader = () => (
  <div
    className={cn(
      clusterRowGrid,
      'py-3 border-b border-subtle text-xs uppercase tracking-widest text-muted-foreground'
    )}
  >
    <span>Cluster</span>
    <span>CPU</span>
    <span>Memory</span>
    <span>Quick links</span>
    <span className='sr-only'>Favorite</span>
  </div>
)

export const FavoritedClusterRow = ({
  cluster,
  onUnfavorite,
}: {
  cluster: ClusterListViewItemRowType
  onUnfavorite?: () => void
}) => {
  const router = useRouter()
  const isError = getStatusViewItem(cluster) === 'error'
  const status = getStatusViewItem(cluster) as HealthStatus
  const statusColor = status === 'ok' ? 'text-emerald-500' : status === 'warning' ? 'text-yellow-500' : 'text-red-500'

  return (
    <div
      onClick={() => router.push(routes.app.cluster.getHref(getClusterUidView(cluster)))}
      className={cn(
        clusterRowGrid,
        'py-4 border-b border-subtle transition-opacity cursor-pointer',
        isError && 'opacity-50'
      )}
    >
      <div className='flex items-center gap-3 min-w-0'>
        <Dot status={status} />
        <div className='min-w-0'>
          <p className='text-sm font-medium font-mono truncate'>{getClusterNameView(cluster) || 'Unknown cluster'}</p>
          <p className={`text-xs ${statusColor}`}>{displayedStatus(status)}</p>
        </div>
      </div>
      <div className='flex items-center min-w-0' aria-label='CPU usage'>
        <ResourceBar
          capacity={getResourcesCpuViewItem(cluster)}
          used={getResourcesCpuUsedMilliViewItem(cluster)}
          percentage={getResourcesCpuUsedPercentNumberViewItem(cluster)}
        />
      </div>
      <div className='flex items-center min-w-0' aria-label='Memory usage'>
        <ResourceBar
          capacity={getResourcesMemoryViewItem(cluster)}
          used={getResourcesMemoryUsedViewItem(cluster)}
          percentage={getResourcesMemoryUsedPercentNumberViewItem(cluster)}
        />
      </div>
      <div className='flex items-center gap-4'>
        <ExternalToolButton name='ArgoCD' type='argocd' appearance='text' url={getArgocdUrlViewItem(cluster)} />
        <ExternalToolButton name='Grafana' type='grafana' appearance='text' url={getGrafanaUrlViewItem(cluster)} />
        <button
          type='button'
          className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:underline whitespace-nowrap'
          onClick={async (event) => {
            event.stopPropagation()
            try {
              await copyToClipboard(getRorLoginViewItem(cluster))
              toast.info('ROR CLI command copied')
            } catch (error) {
              console.error('Failed to copy ROR CLI command:', error)
              toast.error('Failed to copy ROR CLI command')
            }
          }}
        >
          <Copy className='size-3.5' /> ROR CLI
        </button>
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
