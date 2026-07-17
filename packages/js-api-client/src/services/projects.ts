import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { ProjectResponseSchema } from '../schemas/project'

export const createProjectService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async () => {
    const response = await request({
      method: 'POST',
      path: '/v1/projects/filter',
      body: {
        filters: [
          {
            field: 'string',
            matchMode: 'unknown',
            value: 'string',
          },
        ],
        globalFilter: 'string',
        limit: 0,
        skip: 0,
        sort: [
          {
            sortField: 'string',
            sortOrder: 0,
          },
        ],
      },
    })
    return validateResponse(response, ProjectResponseSchema)
  },
})
