'use client'
import { Header } from '@/components/layout/app-shell/header'
import { DashboardSection } from '@/features/dashboard/components/dashboard-section'
import { FavoritedBox } from '@/features/dashboard/components/favorited-box'
import {
  FavoritedCluster,
  FavoritedClusterHeader,
  FavoritedClusterRow,
} from '@/features/dashboard/components/favorited-cluster'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { OverviewSection } from '@/features/dashboard/components/overview-section'
import { getFavoritedItems } from '@/features/dashboard/utils/dashboard-localstorage'
import { ClusterListViewItemRowType, OverviewItemsViewRowType, VirtualMachine } from '@ror/js-api-client'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { loadFavoritedClusters, loadFavoritedVms } from '@/features/dashboard/utils/favorited-item'
import { FavoritedVm, FavoritedVmHeader, FavoritedVmRow } from '@/features/dashboard/components/favorited-vm'
import { getVmUid } from '@/features/vms/utils/vms'
import { Check, LayoutGrid, LayoutList, Pencil } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import { DashboardSearch } from '@/features/dashboard/components/dashboard-search'
import { ReleaseCard } from '@/features/dashboard/components/release-card'
import { useRouter } from 'next/navigation'
import { routes } from '@/config/routes'
import { getClusterUidView } from '@/features/cluster/utils/cluster'
import { DashboardLayout } from '@/features/dashboard/components/dashboard-layout'
import { DashboardLoading } from '@/features/dashboard/components/dashboard-loading'
import { cn } from '@/utils/clsxm'
import { toast } from 'sonner'

interface PageViewProps {
  overviewItems: OverviewItemsViewRowType[]
}

function DashboardGreeting({ overviewItems }: PageViewProps) {
  const [now, setNow] = useState<Date | null>(null)
  const clusterOverview = overviewItems.find((item) => item.itemName?.fieldValue === 'Clusters')
  const vmOverview = overviewItems.find((item) => item.itemName?.fieldValue === 'VMs')
  const clusterErrors = clusterOverview?.redNumber?.fieldValue
  const clusterWarnings = clusterOverview?.yellowNumber?.fieldValue
  const vmsOff = vmOverview?.redNumber?.fieldValue
  const vmCounts = [vmOverview?.greenNumber?.fieldValue, vmOverview?.yellowNumber?.fieldValue, vmsOff]
  const vmTotal = vmCounts.every((count): count is number => count != null)
    ? vmCounts.reduce((total, count) => total + count, 0)
    : undefined
  const formatCount = (count: number) => count.toLocaleString('en-GB')
  const greeting = now
    ? now.getHours() < 12
      ? 'Good morning'
      : now.getHours() < 18
        ? 'Good afternoon'
        : 'Good evening'
    : null

  useLayoutEffect(() => {
    setNow(new Date())
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div>
      {now && (
        <p className='text-sm text-muted-foreground mb-2'>
          {greeting} · {now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      )}
      {clusterErrors != null && (
        <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight'>
          <span className={`inline overflow-visible${clusterErrors > 0 ? ' text-red-500' : ''}`}>
            {formatCount(clusterErrors)} {clusterErrors === 1 ? 'cluster' : 'clusters'}
          </span>{' '}
          {clusterErrors === 1 ? 'is' : 'are'} in error
        </h2>
      )}
      {clusterWarnings != null && vmsOff != null && vmTotal != null && (
        <p className='mt-3 text-sm sm:text-base text-muted-foreground'>
          {formatCount(clusterWarnings)} more have warnings, and {formatCount(vmsOff)} of your {formatCount(vmTotal)}{' '}
          VMs are switched off.
        </p>
      )}
    </div>
  )
}

export const PageView = ({ overviewItems }: PageViewProps) => {
  const router = useRouter()
  const [favoritedClusters, setFavoritedClusters] = useState<ClusterListViewItemRowType[]>([])
  const [favoritedVms, setFavoritedVms] = useState<VirtualMachine[]>([])
  const [view, setView] = useState<'card' | 'list'>('card')
  const [isEditing, setIsEditing] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const fetchFavorites = useCallback(async () => {
    try {
      const clusterUids = getFavoritedItems('cluster')
      const vmUids = getFavoritedItems('vms')
      const [clusters, vms] = await Promise.all([
        clusterUids.length ? loadFavoritedClusters(clusterUids) : [],
        vmUids.length ? loadFavoritedVms(vmUids) : [],
      ])
      setFavoritedClusters(clusters)
      setFavoritedVms(vms)
    } catch (error) {
      console.error('Failed to load dashboard favorites:', error)
      toast.error('Could not load your dashboard favorites. Please reload to try again.')
    }
  }, [])

  useEffect(() => {
    let active = true
    // Keep sections mounted behind the loader so their saved preferences hydrate too.
    fetchFavorites().then(() => {
      if (active) setIsReady(true)
    })
    return () => {
      active = false
    }
  }, [fetchFavorites])

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem('dashboardView')
      if (stored === 'card' || stored === 'list') {
        setView(stored)
      }
    } catch (error) {
      console.error('Failed to load dashboard view:', error)
      toast.error('Could not load your dashboard view preference. The default view is shown.')
    }
  }, [])

  function saveView(viewType: 'card' | 'list') {
    setView(viewType)
    localStorage.setItem('dashboardView', viewType)
  }

  const favoritedClusterBoxes = favoritedClusters.map((cluster) => ({
    nodeId: cluster.clusterUid?.fieldValue ?? globalThis.crypto.randomUUID(),
    node:
      view === 'list' ? (
        <FavoritedClusterRow cluster={cluster} onUnfavorite={fetchFavorites} />
      ) : (
        <FavoritedBox
          title={cluster.clusterName?.fieldValue || 'Unknown cluster'}
          domain='cluster'
          itemId={cluster.clusterUid?.fieldValue ?? globalThis.crypto.randomUUID()}
          isError={cluster.status?.fieldValue === 'error'}
          onUnfavorite={fetchFavorites}
          onClick={() => router.push(routes.app.cluster.getHref(getClusterUidView(cluster)))}
        >
          <FavoritedCluster cluster={cluster} />
        </FavoritedBox>
      ),
  }))

  const favoritedVmBoxes = favoritedVms.map((vm) => ({
    nodeId: getVmUid(vm),
    node: (
      <FavoritedBox
        title={vm.virtualmachine?.spec?.name || 'Unknown VM'}
        domain='vms'
        itemId={getVmUid(vm)}
        onUnfavorite={fetchFavorites}
        onClick={() => {
          localStorage.setItem('selectedVm', JSON.stringify(vm))
          router.push(routes.app.vm.getHref(getVmUid(vm)))
        }}
      >
        <FavoritedVm vm={vm} />
      </FavoritedBox>
    ),
  }))

  return (
    <>
      {!isReady && <DashboardLoading />}
      <div className={cn('w-full min-h-full flex-col bg-background', isReady ? 'flex' : 'hidden')}>
        <Header
          title='My dashboard'
          className='h-auto min-h-16 flex-wrap px-6 sm:px-12 [&_h1]:text-2xl sm:[&_h1]:text-xl md:[&_h1]:text-2xl'
          actions={
            <div className='flex items-center gap-3'>
              <div
                className='flex items-center gap-1 rounded-lg border border-subtle p-1'
                role='group'
                aria-label='Favorites view'
              >
                {(['list', 'card'] as const).map((viewType) => (
                  <Tooltip key={viewType}>
                    <TooltipTrigger asChild>
                      <button
                        type='button'
                        onClick={() => saveView(viewType)}
                        aria-label={viewType === 'list' ? 'List view' : 'Card view'}
                        aria-pressed={view === viewType}
                        className='flex size-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-pressed:border-action-blue-border aria-pressed:bg-action-blue aria-pressed:text-action-blue-foreground'
                      >
                        {viewType === 'list' ? <LayoutList className='size-4' /> : <LayoutGrid className='size-4' />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{viewType === 'list' ? 'List view' : 'Card view'}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? 'green' : 'default'}
                aria-pressed={isEditing}
              >
                {isEditing ? <Check /> : <Pencil />}
                {isEditing ? 'Done' : 'Customize dashboard'}
              </Button>
            </div>
          }
        />
        <div className='mx-6 my-4'>
          <div className='mx-7 pb-2'>
            <NotReadyMessage removable={true} storageKey='dashboardWelcomeMessageDismissed'>
              Welcome to the new ROR website! We are excited to launch this, and aware that some parts of the page is
              still not operational. In these places we have aimed at rerouting you to the old ROR website. If you
              prefer the old ROR website, you can find this in the sidebar to your left.
            </NotReadyMessage>
          </div>
          <DashboardLayout
            isEditing={isEditing}
            sections={{
              releases: (
                <ReleaseCard
                  view='dashboard'
                  className={isEditing ? 'p-0 [&_a.group]:mx-0 [&_a.group]:px-0' : undefined}
                />
              ),
              greeting: <DashboardGreeting overviewItems={overviewItems} />,
              search: <DashboardSearch onFavorite={fetchFavorites} />,
              overview: <OverviewSection allItems={overviewItems} isEditing={isEditing} />,
              clusters: (
                <DashboardSection
                  title='Favorite clusters'
                  listHeader={<FavoritedClusterHeader />}
                  items={favoritedClusterBoxes}
                  layout={view}
                />
              ),
              vms: (
                <div>
                  <h4 className='font-bold'>Favorite VMs</h4>
                  {view === 'card' ? (
                    <div className='flex gap-4 overflow-x-auto hide-scrollbar -mt-2.5 pt-2.5'>
                      {favoritedVmBoxes.length
                        ? favoritedVmBoxes.map((item) => (
                            <div key={item.nodeId} className='relative'>
                              {item.node}
                            </div>
                          ))
                        : 'No items present'}
                    </div>
                  ) : (
                    <div className='flex flex-col overflow-x-auto pt-2.5'>
                      <FavoritedVmHeader />
                      {favoritedVms.length
                        ? favoritedVms.map((vm) => (
                            <FavoritedVmRow key={getVmUid(vm)} vm={vm} onUnfavorite={fetchFavorites} />
                          ))
                        : 'No items present'}
                    </div>
                  )}
                </div>
              ),
            }}
          />
        </div>
      </div>
    </>
  )
}
