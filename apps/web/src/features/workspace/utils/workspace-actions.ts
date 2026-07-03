'use server'

import { getRorApi } from '@/services/ror-api'
import { LoadMoreOpts } from '@/utils/load-more-options'
import { ClusterListViewItemRowType, WorkspaceListViewsRowType } from '@ror/js-api-client'

// export async function fetchWorkspaces(clusterUid: string): Promise<WorkspaceListViewsRowType[]> {
//   const api = await getRorApi()
//   try {
//     const res = await api.workspaceListView.getWorkspaceList(new URLSearchParams())
//     return res?.resources ?? []
//   } catch {
//     return []
//   }
// }

export async function loadMoreWorkspaces({ offset, limit, sort, order }: LoadMoreOpts) {
  const api = await getRorApi()
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (typeof sort === 'string' && sort.length > 0) params.set('sort', sort)
  if (typeof order === 'string' && order.length > 0) params.set('order', order)

  try {
    const res = await api.workspaceListView.getWorkspaceList(params)
    const items: WorkspaceListViewsRowType[] = res?.rows ?? []
    return {
      items,
      hasMore: items.length === limit,
      nextOffset: items.length === limit ? offset + limit : null,
    }
  } catch {
    return { items: [], hasMore: false, nextOffset: null }
  }
}

/**
 * Maps workspaces to their associated clusters
 */
export interface WorkspaceWithClusters {
  workspace: WorkspaceListViewsRowType
  clusters: ClusterListViewItemRowType[]
}

/**
 * Fetches all clusters and matches them to workspaces.
 * Returns workspaces with their associated clusters.
 */
export async function matchClustersToWorkspaces(
  workspaces: WorkspaceListViewsRowType[]
): Promise<WorkspaceWithClusters[]> {
  const api = await getRorApi()

  try {
    // Fetch all clusters
    const params = new URLSearchParams()
    const clusterListRes = await api.clusterListView.getClusterList(params)
    const clusters: ClusterListViewItemRowType[] = clusterListRes?.rows ?? []

    // Initialize result with all workspaces
    const result: WorkspaceWithClusters[] = workspaces.map((ws) => ({
      workspace: ws,
      clusters: [],
    }))

    // Match clusters to workspaces by comparing workspace field
    clusters.forEach((cluster) => {
      const clusterWorkspace = cluster.workspace?.fieldValue?.toLowerCase() || ''
      const workspaceEntry = result.find(
        (entry) => entry.workspace.workspaceName?.fieldValue?.toLowerCase() === clusterWorkspace
      )

      if (workspaceEntry) {
        workspaceEntry.clusters.push(cluster)
      }
    })

    return result
  } catch (error) {
    console.error('Error matching clusters to workspaces:', error)
    // Return workspaces with empty clusters on error
    return workspaces.map((ws) => ({
      workspace: ws,
      clusters: [],
    }))
  }
}
