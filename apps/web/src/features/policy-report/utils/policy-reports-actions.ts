'use server'

import { getRorApi } from '@/services/ror-api'
import { PolicyReport } from '@ror/js-api-client'

type loadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }

export async function loadMorePolicyReports({ offset, limit, sort, order }: loadMoreOpts) {
  const api = await getRorApi()
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  try {
    const res = await api.policyReport.list(params)
    const items: PolicyReport[] = res?.resources ?? []
    return {
      items,
      hasMore: items.length === limit,
      nextOffset: items.length === limit ? offset + limit : null,
    }
  } catch {
    return { items: [], hasMore: false, nextOffset: null }
  }
}
