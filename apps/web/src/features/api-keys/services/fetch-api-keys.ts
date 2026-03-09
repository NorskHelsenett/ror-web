'use server'

import { getRorApi } from '@/services/ror-api'

export async function fetchApiKeys() {
  const api = await getRorApi()
  const res = await api.apiKey.list()

  return {
    apiKeys: res.data ?? [],
  }
}
