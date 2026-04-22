import type { RequestOptions } from '../../core/request'
import { validateResponse } from '../../core/validation'
import { ClusterListItemViewSchema } from '../../schemas/views/clusterlistitem'

export const createClusterListItemViewService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  getClusterListItem: async (id: string) => {
    const viewid = 'clusterlistitem'
    const idFilter = `filter=clusterUid=${id}`
    const response = await request({
      method: 'GET',
      path: `/v2/views/${viewid}?${idFilter}`,
    })
    return validateResponse(response, ClusterListItemViewSchema)
  },
})
