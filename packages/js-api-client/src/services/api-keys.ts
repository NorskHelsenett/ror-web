import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import {
  ApiKeyListResponseSchema,
  CreateApiKeyRequestSchema,
  CreateApiKeyResponseSchema,
  DeleteApiKeyResponseSchema,
} from '../schemas/api-key'
import type { CreateApiKeyRequest } from '../types/entities'

export const createApiKeyService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  /**
   * Create/Renew API key for current user (v2)
   * Returns token + expires.
   */
  create: async (input: CreateApiKeyRequest) => {
    const parsed = CreateApiKeyRequestSchema.parse(input)

    const response = await request({
      method: 'POST',
      path: '/v2/self/apikeys',
      body: parsed,
    })

    return validateResponse(response, CreateApiKeyResponseSchema)
  },

  /**
   * Delete API key for current user (v2)
   */
  delete: async (apikeyId: string) => {
    const response = await request({
      method: 'DELETE',
      path: `/v2/self/apikeys/${apikeyId}`,
    })

    return validateResponse(response, DeleteApiKeyResponseSchema)
  },

  /**
   * List current user's API keys (v1 self filter)
   */
  list: async () => {
    const response = await request({
      method: 'POST',
      path: '/v1/users/self/apikeys/filter',
      body: {
        filters: [],
        globalFilter: '',
        limit: 0,
        skip: 0,
        sort: [],
      },
    })

    return validateResponse(response, ApiKeyListResponseSchema)
  },
})
