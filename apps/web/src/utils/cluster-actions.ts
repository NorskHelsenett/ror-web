'use server'

import { getRorApi } from '@/services/ror-api'
import type { KubernetesCluster } from '@ror/js-api-client'

type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }

export async function loadMoreClusters({ offset, limit, sort, order }: LoadMoreOpts) {
  const api = await getRorApi()
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  try {
    const res = await api.kubernetesClusters.list(params)
    const items: KubernetesCluster[] = res?.resources ?? []
    return {
      items,
      hasMore: items.length === limit,
      nextOffset: items.length === limit ? offset + limit : null,
    }
  } catch {
    return { items: [], hasMore: false, nextOffset: null }
  }
}
