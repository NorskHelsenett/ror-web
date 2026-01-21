import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { VMResourceResponseSchema } from '../schemas/vm'

export const createVirtualMachineService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'general.ror.internal/v1alpha1')
    params.set('kind', 'VirtualMachine')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, VMResourceResponseSchema)
  },
  id: async (id: string) => {
    try {
      const response = await request({
        method: 'GET',
        path: `/v2/resources/uid/${id}`,
      })
      return validateResponse(response, VMResourceResponseSchema)
    } catch (error) {
      console.log('Error fetching virtual machine by ID:', error)
      throw error
    }
  },
})
