import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { KubernetesClusterSchema, type KubernetesClusterNodePoolType } from '../schemas/kubernetes-cluster'
import { ClusterSchema, ClustersResponseSchema } from '../schemas/kubernetes-cluster-v1'
import { z } from 'zod'

export interface Filter {
  field: string
  value: string
  matchMode: string
}

export interface FilterRequestOptions {
  limit?: number
  skip?: number
  sort?: {
    sortField: string
    sortOrder: number
  }[]
  filter?: Filter[]
}

export const createKubernetesClusterService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  /**
   * @deprecated use list instead
   */
  filter: async (options: FilterRequestOptions) => {
    const body = {
      limit: options?.limit ?? 25,
      skip: options?.skip ?? 0,
      sort: options?.sort ?? {},
      filter: options?.filter ?? [],
    }

    const response = await request({
      method: 'POST',
      path: '/v1/clusters/filter',
      body,
    })

    return validateResponse(response, ClustersResponseSchema)
  },
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'vitistack.io/v1alpha1')
    params.set('kind', 'KubernetesCluster')

    const responseSchema = z.object({
      resources: z.array(KubernetesClusterSchema),
    })

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })
    return validateResponse(response, responseSchema)
  },
  id: async (id: string) => {
    try {
      const response = await request({
        method: 'GET',
        path: `/v2/resources/uid/${id}`,
      })
      return validateResponse(response, KubernetesClusterSchema)
    } catch (error) {
      console.error('Error fetching cluster by ID:', error)
      throw error
    }
  },
  idV1: async (id: string) => {
    const response = await request({
      method: 'GET',
      path: `/v1/clusters/${id}`,
    })
    return validateResponse(response, ClusterSchema)
  },

  /**
   * Node pool API call
   */

  removeNodePool: async (id: string, poolName: string) => {
    const getRes = await request({
      method: 'GET',
      path: `/v2/resources/uid/${id}`,
    })
    const cluster = validateResponse(getRes, KubernetesClusterSchema)
    const nodePools = cluster.kubernetescluster?.spec?.topology?.workers?.nodePools
    if (Array.isArray(nodePools)) {
      cluster.kubernetescluster!.spec!.topology!.workers!.nodePools! = nodePools.filter(
        (pool) => pool.name !== poolName
      )
    }
    const res = await request({
      method: 'PUT',
      path: `/v2/resources/uid/${id}`,
      body: cluster,
    })

    return validateResponse(res, KubernetesClusterSchema)
  },
  createOrUpdateNodePools: async (id: string, nodePool: KubernetesClusterNodePoolType) => {
    if (!nodePool || !nodePool.name?.trim() || !nodePool.machineClass?.trim()) {
      throw new Error('Node pool must have name and machineType')
    }
    const getRes = await request({
      method: 'GET',
      path: `/v2/resources/uid/${id}`,
    })
    const cluster = validateResponse(getRes, KubernetesClusterSchema)
    const workers = cluster.kubernetescluster?.spec?.topology?.workers

    if (!workers) {
      throw new Error('Cluster does not have workers or nodePools defined')
    }
    const nodePools = workers.nodePools || []
    const index = nodePools.findIndex((pool) => pool.name === nodePool.name)

    if (index !== -1) {
      // Update existing node pool
      nodePools[index] = { ...nodePools[index], ...nodePool }
    } else {
      // Create new node pool
      nodePools.push(nodePool)
    }

    const res = await request({
      method: 'PUT',
      path: `/v2/resources/uid/${id}`,
      body: cluster,
    })

    return validateResponse(res, KubernetesClusterSchema)
  },
})
