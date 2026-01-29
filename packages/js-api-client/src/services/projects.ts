import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { ProjectResponseSchema } from '../schemas/project'

export const createProjectService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async () => {
    const response = await request({
      method: 'POST',
      path: '/v1/projects/filter',
      body: {
        filters: [],
        globalFilter: '',
        limit: 0,
        skip: 0,
        sort: [],
      },
    })
    return validateResponse(response, ProjectResponseSchema)
  },
})
