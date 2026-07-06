'use server'

import { getRorApi } from '@/services/ror-api'
import { LoadMoreOpts } from '@/utils/load-more-options'
import { ClusterListViewItemRowType, DataCenter, WorkspaceListViewRowType } from '@ror/js-api-client'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value.trim())
}

function buildDatacenterNameMap(datacenters: DataCenter[]): Map<string, string> {
  const byUid = new Map<string, string>()

  for (const dc of datacenters) {
    const uid = dc.metadata?.uid ?? ''
    const name = dc.metadata?.name ?? ''
    if (uid && name) byUid.set(uid.toLowerCase(), name)
  }

  return byUid
}

export async function resolveWorkspaceDatacenterNames(
  workspaces: WorkspaceListViewRowType[]
): Promise<WorkspaceListViewRowType[]> {
  if (workspaces.length === 0) return workspaces

  const needsLookup = workspaces.some((ws) => {
    const candidate = ws.datacenterName?.fieldValue ?? ''
    return isUuid(candidate)
  })

  if (!needsLookup) return workspaces

  const api = await getRorApi()

  try {
    const datacentersResponse = await api.datacenter.list(new URLSearchParams())
    const datacenters = datacentersResponse?.resources ?? []
    const dcNamesByUid = buildDatacenterNameMap(datacenters)

    return workspaces.map((workspace) => {
      const candidate = workspace.datacenterName?.fieldValue ?? ''
      if (!isUuid(candidate)) return workspace

      const resolvedName = dcNamesByUid.get(candidate.toLowerCase())
      if (!resolvedName) return workspace

      return {
        ...workspace,
        datacenterName: {
          ...(workspace.datacenterName ?? {}),
          fieldValue: resolvedName,
        },
      }
    })
  } catch {
    return workspaces
  }
}

export async function loadMoreWorkspaces({ offset, limit, sort, order }: LoadMoreOpts) {
  const api = await getRorApi()
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (typeof sort === 'string' && sort.length > 0) params.set('sort', sort)
  if (typeof order === 'string' && order.length > 0) params.set('order', order)

  try {
    const res = await api.workspaceListView.getWorkspaceList(params)
    const items = await resolveWorkspaceDatacenterNames(res?.rows ?? [])
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
  workspace: WorkspaceListViewRowType
  clusters: ClusterListViewItemRowType[]
}

/**
 * Fetches all clusters and matches them to workspaces.
 * Returns workspaces with their associated clusters.
 */
export async function matchClustersToWorkspaces(
  workspaces: WorkspaceListViewRowType[]
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
