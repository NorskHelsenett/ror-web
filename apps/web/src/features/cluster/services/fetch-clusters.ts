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

  console.log('📡 [fetchClusters] V2 API call parameters:', {
    limit: listParams.get('limit'),
    offset: listParams.get('offset'),
    sort: listParams.get('sort'),
    fullParams: listParams.toString(),
  })

  const v2 = api.kubernetesClusters.list(listParams)

  // v1
  const sortOptions = params.sort ? [{ sortField: params.sort, sortOrder: params.order === 'asc' ? 1 : -1 }] : []

  console.log('📡 [fetchClusters] V1 API call parameters:', {
    limit: params.limit,
    skip,
    sortOptions,
  })

  const v1 = api.kubernetesClusters.filter({ limit: params.limit, skip, sort: sortOptions })

  const [v2response, v1response] = await Promise.all([v2, v1])

  const v2Clusters = v2response?.resources ?? []
  const v1Clusters = v1response?.data ?? []

  console.log('✅ [fetchClusters] API responses received:', {
    v2ClustersCount: v2Clusters.length,
    v1ClustersCount: v1Clusters.length,
    v2HasResources: !!v2response?.resources,
    v1HasData: !!v1response?.data,
    v2FirstCluster: v2Clusters[0] ? (v2Clusters[0].metadata?.name ?? 'unnamed') : 'No V2 clusters',
    v1FirstCluster: v1Clusters[0] ? (v1Clusters[0].clusterName ?? 'unnamed') : 'No V1 clusters',
    v2Sample: v2Clusters.slice(0, 3).map((cluster) => ({
      name: cluster.metadata?.name,
      uid: cluster.metadata?.uid,
    })),
    v1Sample: v1Clusters.slice(0, 3).map((cluster) => ({
      name: cluster.clusterName,
      id: cluster.clusterId,
    })),
  })

  if (v2Clusters.length === 0 && v1Clusters.length === 0) {
    console.warn('⚠️ [fetchClusters] No clusters returned from either API. Raw responses:', {
      v2response,
      v1response,
    })
  }

  return {
    v2Clusters: v2Clusters,
    v1Clusters: v1Clusters,
  }
}
