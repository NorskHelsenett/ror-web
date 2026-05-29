'use server'

import { getRorApi } from '@/services/ror-api'
import { ClusterListViewItemRowType, VirtualMachine } from '@ror/js-api-client'

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

export async function loadFavoritedVms(uids: string[]): Promise<VirtualMachine[]> {
  const api = await getRorApi()
  const vms = await Promise.all(
    uids.map(async (uid) => {
      try {
        const res = await api.virtualMachine.list(new URLSearchParams({ uid }))
        return res?.resources?.[0] ?? null
      } catch (error) {
        console.error('Failed to fetch VM:', uid, error)
        return null
      }
    })
  )
  return vms.filter((vm): vm is VirtualMachine => Boolean(vm))
}
