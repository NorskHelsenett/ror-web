import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { DeploymentResponseSchema, DeploymentSchema } from '../schemas/deployment'

export const createDeploymentService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'vitistack.io/v1alpha1')
    params.set('kind', 'Deployment')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, DeploymentResponseSchema)
  },
  byId: async (id: string) => {
    const response = await request({
      method: 'GET',
      path: `/v2/resources/uuid/${id}`,
    })

    return validateResponse(response, DeploymentSchema)
  },
  listByCluster: async (clusterId: string) => {
    const params = new URLSearchParams()
    params.set('kind', 'Deployment')
    params.set('apiversion', 'vitistack.io/v1alpha1')
    params.set('ownerScope', 'cluster')
    params.set('ownerSubject', clusterId)

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, DeploymentSchema)
  },
})
