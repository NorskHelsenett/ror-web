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
import { FavoritedVm } from '@/features/dashboard/components/favorited-vm'
import { getVmUid } from '@/features/vms/utils/vms'

interface PageViewProps {
  overviewItems: OverviewItemsViewRowType[]
}

export const PageView = ({ overviewItems }: PageViewProps) => {
  const [favoritedClusters, setFavoritedClusters] = useState<ClusterListViewItemRowType[]>([])
  const [favoritedVms, setFavoritedVms] = useState<VirtualMachine[]>([])

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
      console.log('!!!')
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
      >
        <FavoritedVm vm={vm} />
      </FavoritedBox>
    ),
  }))

  return (
    <div className='w-full flex flex-col'>
      <Header title='My Dashboard' />
      <div className='mx-6 my-8'>
        <NotReadyMessage removable={false}>
          This page is still under construction. Currently the data is saved locally in the browser. This means that if
          you clear the cache of the site, your overview items will be set back to standard and favorited items will be
          erased.
        </NotReadyMessage>
        <OverviewSection allItems={overviewItems} />
        <DashboardSection title='Clusters' items={favoritedClusterBoxes} />
        <DashboardSection title='VMs' items={favoritedVmBoxes} />
      </div>
    </div>
  )
}
