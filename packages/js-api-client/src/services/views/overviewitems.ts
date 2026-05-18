import type { RequestOptions } from '../../core/request'
import { validateResponse } from '../../core/validation'
import { OverviewItemsViewSchema } from '../../schemas/views/overviewitems'

export const createOverviewItemsViewService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  getOverviewItems: async () => {
    const params = new URLSearchParams()
    const viewid = 'overviewitemslist'
    const response = await request({
      method: 'GET',
      path: `/v2/views/${viewid}`,
      params,
    })
    return validateResponse(response, OverviewItemsViewSchema)
  },
})
