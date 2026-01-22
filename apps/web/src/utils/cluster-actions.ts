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

  const res = await api.kubernetesClusters.list(params)
  const items: KubernetesCluster[] = res?.resources ?? []

  const hasMore = items.length === limit
  const nextOffset = items.length === limit ? offset + limit : null

  return {
    items,
    hasMore,
    nextOffset,
  }
}
