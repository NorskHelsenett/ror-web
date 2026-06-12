/*
 * Understanding function declaration line:
 * typeof import('@/services/ror-api').getRorApi:
 * - gets type of getRorApi function without importing directly
 * - sort of like type GetRorApiType = typeof getRorApi
 * ReturnType<typeof ...>
 * - typescript utility type that extracts return type of function
 * Awaited<ReturnType<...>>:
 * - getRorApi() returns promise, want resolved value type, that you get after await getRorApi()
 * - "The actual API client object that comes out of await getRorApi()"
 *
 * Would be the same as:
 * import { getRorApi } from '@/services/ror-api'
 *
 * type RorApi = Awaited<ReturnType<typeof getRorApi>>
 *
 * function fetchClusters(api: RorApi, params: { ... }) { ... }
 */

import { getRorApi } from '@/services/ror-api'
import { ClusterListViewItemRowType, KubernetesCluster } from '@ror/js-api-client'

/**
 * Fetches Kubernetes clusters from both v1 and v2 API endpoints in parallel.
 *
 * @param api - An instance of the ROR API client.
 * @param params - Parameters for pagination and sorting.
 * @param params.page - The current page number (1-based).
 * @param params.limit - The maximum number of clusters to fetch per page.
 * @param params.sort - (Optional) The field to sort by.
 * @param params.order - The sort order, either 'asc' or 'desc'.
 * @returns An object containing arrays of clusters from v2 (`v2Clusters`) and v1 (`v1Clusters`) endpoints.
 */
export async function fetchClusters(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  params: {
    page: number
    limit: number
    sort?: string
    order: 'asc' | 'desc'
  }
) {
  const skip = (params.page - 1) * params.limit

  // v2
  const listParams = new URLSearchParams()
  listParams.set('limit', String(params.limit))
  listParams.set('offset', String(skip))
  if (params.sort) listParams.set('sort', params.sort)
  const v2 = api.kubernetesClusters.list(listParams)

  // v1
  const sortOptions = params.sort ? [{ sortField: params.sort, sortOrder: params.order === 'asc' ? 1 : -1 }] : []
  const v1 = api.kubernetesClusters.filter({ limit: params.limit, skip, sort: sortOptions })

  const [v2response, v1response] = await Promise.all([v2, v1])

  return {
    v2Clusters: v2response?.resources ?? [],
    v1Clusters: v1response?.data ?? [],
  }
}

export async function fetchKubernetesCluster(id: string): Promise<KubernetesCluster> {
  const api = await getRorApi()
  const cluster = api.kubernetesClusters.id(id)
  return cluster
}

export async function fetchClusterViewItem(id: string): Promise<ClusterListViewItemRowType> {
  const api = await getRorApi()
  const cluster = api.clusterListItemView.getClusterListItem(id)
  return cluster
}
