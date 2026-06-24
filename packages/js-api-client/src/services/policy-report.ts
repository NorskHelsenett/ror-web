import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { ResourcePolicyReportSchema } from '../schemas/policy-report'

export const createPolicyReportService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'wgpolicyk8s.io/v1alpha2')
    params.set('kind', 'PolicyReport')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, ResourcePolicyReportSchema)
  },
  listByCluster: async (clusterId: string) => {
    const params = new URLSearchParams()
    params.set('apiversion', 'wgpolicyk8s.io/v1alpha2')
    params.set('kind', 'PolicyReport')
    params.set('ownerScope', 'cluster')
    params.set('ownerSubject', clusterId)

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, ResourcePolicyReportSchema)
  },
  id: async (id: string) => {
    try {
      const response = await request({
        method: 'GET',
        path: `/v2/resources/uid/${id}`,
      })
      const normalized = Array.isArray(response) ? { resources: response } : response
      return validateResponse(normalized, ResourcePolicyReportSchema)
    } catch (error) {
      console.log('Error fetching policy report by ID:', error)
      throw error
    }
  },
})
