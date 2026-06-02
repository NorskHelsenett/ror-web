'use server'

import { getRorApi } from '@/services/ror-api'
import { buildRegexSearchFilter } from '@/features/vms/utils/regex-search'
import type { ClusterListViewRowType, VirtualMachine } from '@ror/js-api-client'

export async function fetchAllClustersForSearch(): Promise<ClusterListViewRowType[]> {
  const api = await getRorApi()
  const params = new URLSearchParams()
  params.set('limit', '500')
  params.set('offset', '0')
  try {
    const res = await api.clusterListView.getClusterList(params)
    return res.rows ?? []
  } catch {
    return []
  }
}

export async function searchVmsForDashboard(query: string, searchField: string): Promise<VirtualMachine[]> {
  const api = await getRorApi()
  const params = new URLSearchParams()
  params.set('limit', '20')
  params.set('offset', '0')

  const trimmed = query.trim()
  if (trimmed) {
    const filters = buildRegexSearchFilter(trimmed, 'virtualmachine.spec.name', searchField)
    if (filters) params.set('filters', filters)
  }

  try {
    const res = await api.virtualMachine.list(params)
    return res?.resources ?? []
  } catch {
    return []
  }
}
