import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { DatacenterResponseSchema } from '../schemas/datacenter'

export const createDatacentersService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (urlParams: URLSearchParams) => {
    const params = new URLSearchParams(urlParams)
    params.set('apiversion', 'vitistack.io/v1alpha1')
    params.set('kind', 'Datacenter')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, DatacenterResponseSchema)
  },
})
