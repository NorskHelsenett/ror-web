import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { DaemonSetResponseSchema, DaemonSetSchema } from '../schemas/daemon-set'

export const createDaemonSetService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'vitistack.io/v1alpha1')
    params.set('kind', 'DaemonSet')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, DaemonSetResponseSchema)
  },
  byId: async (id: string) => {
    const response = await request({
      method: 'GET',
      path: `/v2/resources/uuid/${id}`,
    })

    return validateResponse(response, DaemonSetSchema)
  },
})
