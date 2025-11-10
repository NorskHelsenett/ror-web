'use server'

import { getRorApi } from '@/services/ror-api'
import type { VirtualMachine } from '@ror/js-api-client'

type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }

export async function loadMoreVMs({ offset, limit, sort, order }: LoadMoreOpts) {
  console.log('🔄 [loadMoreVMs] Loading more VMs with params:', {
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

  console.log('📡 [loadMoreVMs] Infinite load API parameters:', {
    limit: params.get('limit'),
    offset: params.get('offset'),
    sort: params.get('sort'),
    order: params.get('order'),
    fullParams: params.toString(),
  })

  const res = await api.virtualMachine.list(params)
  const items: VirtualMachine[] = res?.resources ?? []

  const hasMore = items.length === limit
  const nextOffset = items.length === limit ? offset + limit : null

  console.log('✅ [loadMoreVMs] Infinite load response:', {
    itemsReceived: items.length,
    hasMore,
    nextOffset,
    expectedLimit: limit,
    itemsSample: items.slice(0, 3).map((vm) => ({
      name: vm.metadata?.name,
      hostname: vm.virtualmachine?.status?.operatingSystem?.hostName,
      uid: vm.metadata?.uid,
    })),
  })

  if (items.length === 0) {
    console.warn('⚠️ [loadMoreVMs] No additional VMs returned. Raw response:', res)
  }

  return {
    items,
    hasMore,
    nextOffset,
  }
}
