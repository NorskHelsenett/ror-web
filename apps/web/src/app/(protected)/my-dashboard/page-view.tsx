'use client'
import { Header } from '@/components/layout/app-shell/header'
import { DashboardSection } from '@/features/dashboard/components/dashboard-section'
import { FavoritedBox } from '@/features/dashboard/components/favorited-box'
import { FavoritedCluster } from '@/features/dashboard/components/favorited-cluster'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { OverviewSection } from '@/features/dashboard/components/overview-section'
import { getFavoritedItems } from '@/features/dashboard/utils/dashboard-localstorage'
import { ClusterListViewItemRowType, OverviewItemsViewRowType, VirtualMachine } from '@ror/js-api-client'
import { useCallback, useEffect, useState } from 'react'
import { loadFavoritedClusters, loadFavoritedVms } from '@/features/dashboard/utils/favorited-item'
import { FavoritedVm, FavoritedVmRow } from '@/features/dashboard/components/favorited-vm'
import { getVmUid } from '@/features/vms/utils/vms'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import { DashboardSearch } from '@/features/dashboard/components/dashboard-search'
import { useRouter } from 'next/navigation'
import { routes } from '@/config/routes'
import { getClusterUidView } from '@/features/cluster/utils/cluster'

interface PageViewProps {
  overviewItems: OverviewItemsViewRowType[]
}

export const PageView = ({ overviewItems }: PageViewProps) => {
  const router = useRouter()
  const [favoritedClusters, setFavoritedClusters] = useState<ClusterListViewItemRowType[]>([])
  const [favoritedVms, setFavoritedVms] = useState<VirtualMachine[]>([])
  const [vmView, setVmView] = useState<'card' | 'list'>('card')

  const fetchFavorites = useCallback(() => {
    const clusterUids = getFavoritedItems('cluster')
    if (!clusterUids.length) {
      setFavoritedClusters([])
    } else {
      loadFavoritedClusters(clusterUids).then(setFavoritedClusters)
    }

    const vmUids = getFavoritedItems('vms')
    if (!vmUids.length) {
      setFavoritedVms([])
    } else {
      loadFavoritedVms(vmUids).then(setFavoritedVms)
    }
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const favoritedClusterBoxes = favoritedClusters.map((cluster) => ({
    nodeId: cluster.clusterUid?.fieldValue ?? globalThis.crypto.randomUUID(),
    node: (
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
    <div className='w-full flex flex-col'>
      <Header title='My Dashboard' />
      <div className='mx-6 my-8'>
        <div className='mx-7'>
          <NotReadyMessage removable={false}>
            Welcome to the new ROR website! We are excited to launch this, and aware that some parts of the page is
            still not operational. In these places we have aimed at rerouting you to the old ROR website. If you prefer
            the old ROR website, you can find this in the sidebar to your left. Currently the data on this dashboard
            site is saved locally in the browser. This means that if you clear the cache of the site, your overview
            items will be set back to standard and favorited items will be erased.
          </NotReadyMessage>
        </div>
        <div className='mb-6 pt-5 max-w-2xl mx-7'>
          <DashboardSearch onFavorite={fetchFavorites} />
        </div>
        <OverviewSection allItems={overviewItems} />
        <DashboardSection title='Clusters' items={favoritedClusterBoxes} />
        <div className='mx-7'>
          <div className='flex justify-between items-center'>
            <h3>VMs</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setVmView((v) => (v === 'card' ? 'list' : 'card'))}
                  className='text-muted-foreground hover:text-foreground transition-colors p-1'
                  aria-label='Toggle VM view'
                >
                  {vmView === 'card' ? <LayoutList className='size-6' /> : <LayoutGrid className='size-6' />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{vmView === 'card' ? 'List-view' : 'Card-view'}</TooltipContent>
            </Tooltip>
          </div>
          {vmView === 'card' ? (
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
            <div className='flex flex-col gap-1 pt-2.5'>
              {favoritedVms.length
                ? favoritedVms.map((vm) => <FavoritedVmRow key={getVmUid(vm)} vm={vm} onUnfavorite={fetchFavorites} />)
                : 'No items present'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
