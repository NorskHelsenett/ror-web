'use server'

import { getRorApi } from '@/services/ror-api'
import type { KubernetesCluster } from '@ror/js-api-client'

type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }

export async function loadMoreClusters({ offset, limit, sort, order }: LoadMoreOpts) {
  console.log('🔄 [loadMoreClusters] Loading more clusters with params:', {
    offset,
    limit,
    sort,
    order,
    timestamp: new Date().toISOString(),
  })

  const api = await getRorApi()

  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  console.log('📡 [loadMoreClusters] Infinite load API parameters:', {
    limit: params.get('limit'),
    offset: params.get('offset'),
    sort: params.get('sort'),
    order: params.get('order'),
    fullParams: params.toString(),
  })

  const res = await api.kubernetesClusters.list(params)
  const items: KubernetesCluster[] = res?.resources ?? []

  const hasMore = items.length === limit
  const nextOffset = items.length === limit ? offset + limit : null

  console.log('✅ [loadMoreClusters] Infinite load response:', {
    itemsReceived: items.length,
    hasMore,
    nextOffset,
    expectedLimit: limit,
    itemsSample: items.slice(0, 3).map((cluster) => ({
      name: cluster.metadata?.name,
      uid: cluster.metadata?.uid,
    })),
  })

  if (items.length === 0) {
    console.warn('⚠️ [loadMoreClusters] No additional clusters returned. Raw response:', res)
  }

  return {
    items,
    hasMore,
    nextOffset,
  }
}
