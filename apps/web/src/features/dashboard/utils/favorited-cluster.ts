'use server'
import { getRorApi } from '@/services/ror-api'
import { ClusterListViewItemRowType } from '@ror/js-api-client'

export async function loadFavoritedClusters(uids: string[]): Promise<ClusterListViewItemRowType[]> {
  const api = await getRorApi()
  const results: ClusterListViewItemRowType[] = []
  for (const uid of uids) {
    const res = await api.clusterListItemView.getClusterListItem(uid)
    const cluster = res.rows?.[0]
    if (cluster) results.push(cluster)
  }
  return results
}
