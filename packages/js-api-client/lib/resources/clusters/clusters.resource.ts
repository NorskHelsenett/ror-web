import { createResource, type ResourceClient } from '../create-resource'
import { PaginationRequestParams, SortingRequestParams } from '../../types'
import { createPaginationSchema, PaginationResponse } from '../paginated-response.model'
import { Cluster, ClusterListItem, ClusterV2Model, ClusterV2ListModel } from './clusters.model'
import type { ClusterType, ClusterListItemType, ClusterV2Type, ClusterV2ListItemType } from './clusters.types'
import { ResourceKind } from '../../constants/resources'

interface FilterRequestOptions extends PaginationRequestParams {
  sort?: SortingRequestParams
}

export interface ClustersResource {
  filter: (options?: FilterRequestOptions) => Promise<PaginationResponse<ClusterListItemType>>
  get: <T extends boolean = false>(id: string, v2?: T) => Promise<T extends true ? ClusterV2Type : ClusterType>
  list: () => Promise<ClusterV2ListItemType>
}

export const createClustersResource = (client: ResourceClient): ClustersResource => {
  const resource = createResource(client)

  return {
    filter: async (options) => {
      const url = `/v1/clusters/filter`
      const response = await resource.post(url, {
        limit: options?.limit ?? 25,
        skip: options?.skip ?? 0,
        sort: options?.sort ?? {},
      })
      const schema = createPaginationSchema(ClusterListItem)
      const validatedData = schema.parse(response)
      return validatedData
    },
    get: async <T extends boolean = false>(
      id: string,
      v2?: T
    ): Promise<T extends true ? ClusterV2Type : ClusterType> => {
      if (v2) {
        const url = `/v2/resources/uid/${id}`
        const response = await resource.get(url)
        const parsed = ClusterV2Model.parse(response)
        return parsed as T extends true ? ClusterV2Type : ClusterType
      }

      const url = `/v1/clusters/${id}`
      const response = await resource.get(url)
      const parsed = Cluster.parse(response)
      return parsed as T extends true ? ClusterV2Type : ClusterType
    },
    list: async () => {
      const searchParams = new URLSearchParams()
      searchParams.set('ownerScope', 'cluster')
      searchParams.set('ownerSubject', 'ror scope: cluster')
      searchParams.set('apiversion', 'general.ror.internal/v1alpha1')
      searchParams.set('kind', ResourceKind.KubernetesCluster)
      // TODO: Add this line once MSW can pick up the request (problems with query not being matched)
      const encodedQueryString = Buffer.from(searchParams.toString()).toString('base64')
      const url = `/v2/resources`
      const response = await resource.get(url)
      return ClusterV2ListModel.parse(response)
    },
  }
}
