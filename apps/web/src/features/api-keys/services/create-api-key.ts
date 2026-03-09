'use server'

import { getRorApi } from '@/services/ror-api'
import { CreateApiKeyRequest } from '@ror/js-api-client'

export async function createApiKey({ name, ttl }: CreateApiKeyRequest) {
  const api = await getRorApi()
  const res = await api.apiKey.create({ name, ttl })
  return res
}
