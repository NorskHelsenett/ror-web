import type { RequestOptions } from '../../core/request'
import { validateResponse } from '../../core/validation'
import { ClusterListViewSchema } from '../../schemas/views/clusterlist'

export const createClusterListViewService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  getClusterList: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    const viewid = 'clusterlist'
    const response = await request({
      method: 'GET',
      path: `/v2/views/${viewid}`,
      params,
    })
    return validateResponse(response, ClusterListViewSchema)
  },
})
