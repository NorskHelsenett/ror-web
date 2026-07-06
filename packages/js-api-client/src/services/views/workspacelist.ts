import type { RequestOptions } from '../../core/request'
import { validateResponse } from '../../core/validation'
import { WorkspaceListViewSchema } from '../../schemas/views/workspacelist'

export const createWorkspaceListViewService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  getWorkspaceList: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    const viewid = 'workspacelist'
    const response = await request({
      method: 'GET',
      path: `/v2/views/${viewid}`,
      params,
    })
    return validateResponse(response, WorkspaceListViewSchema)
  },
})
