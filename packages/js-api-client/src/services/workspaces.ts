import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { WorkspaceResponseSchema } from '../schemas/workspace'
import type { FilterRequestOptions } from '../types/filter'

export const createWorkspacesService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  /** List paginated workspace metrics from the v1 API. */
  list: async (options: FilterRequestOptions = {}) => {
    const response = await request({
      method: 'POST',
      path: '/v1/metrics/workspaces/filter',
      body: {
        filters: options.filter ?? [],
        globalFilter: '',
        limit: options.limit ?? 1000,
        skip: options.skip ?? 0,
        sort: options.sort?.length ? options.sort : [{ sortField: '_name', sortOrder: 1 }],
      },
    })

    return validateResponse(response, WorkspaceResponseSchema)
  },
})
