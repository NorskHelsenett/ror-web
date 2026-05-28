'use client'
import { Header } from '@/components/layout/app-shell/header'
import { DashboardSection } from '@/features/dashboard/components/dashboard-section'
import { FavoritedBox } from '@/features/dashboard/components/favorited-box'
import { FavoritedCluster } from '@/features/dashboard/components/favorited-cluster'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { OverviewSection } from '@/features/dashboard/components/overview-section'
import { getFavoritedItems } from '@/features/dashboard/utils/dashboard-localstorage'
import { ClusterListViewItemRowType, OverviewItemsViewRowType } from '@ror/js-api-client'
import { useCallback, useEffect, useState } from 'react'
import { loadFavoritedClusters } from '@/features/dashboard/utils/favorited-cluster'

interface PageViewProps {
  overviewItems: OverviewItemsViewRowType[]
}

export const PageView = ({ overviewItems }: PageViewProps) => {
  const [favoritedClusters, setFavoritedClusters] = useState<ClusterListViewItemRowType[]>([])

  const fetchFavorites = useCallback(() => {
    const uids = getFavoritedItems('cluster')
    if (!uids.length) {
      setFavoritedClusters([])
      return
    }
    loadFavoritedClusters(uids).then(setFavoritedClusters)
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
        <DashboardSection title='VMs' />
      </div>
    </div>
  )
}
