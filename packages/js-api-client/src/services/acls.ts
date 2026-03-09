import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { AclResponseSchema } from '../schemas/acl'

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

export const createAclService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  filter: async (options: FilterRequestOptions) => {
    const body = {
      limit: options?.limit ?? 25,
      skip: options?.skip ?? 0,
      sort: options?.sort ?? {},
      filter: options?.filter ?? [],
    }

    const response = await request({
      method: 'POST',
      path: '/v1/acl/filter',
      body,
    })

    return validateResponse(response, AclResponseSchema)
  },

  getByName: async (name: string) => {
    const body = {
      filters: [
        {
          field: 'group',
          matchMode: 'equals',
          value: name,
        },
      ],
    }

    const response = await request({
      method: 'POST',
      path: '/v1/acl/filter',
      body,
    })

    return validateResponse(response, AclResponseSchema)
  },
})
