import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { NamespaceResponseSchema } from '../schemas/namespace'

export const createNamespacesService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async () => {
    const params = new URLSearchParams()
    params.set('limit', '10000')
    params.set('kind', 'Namespace')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, NamespaceResponseSchema)
  },
})
