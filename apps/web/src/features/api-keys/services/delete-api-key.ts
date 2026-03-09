'use server'

import { getRorApi } from '@/services/ror-api'

export async function deleteApiKey({ apikeyId }: { apikeyId: string }) {
  try {
    const api = await getRorApi()
    return await api.apiKey.delete(apikeyId)
  } catch {
    return false
  }
}
