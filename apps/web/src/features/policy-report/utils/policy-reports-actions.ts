'use server'

import { getRorApi } from '@/services/ror-api'
import { PolicyReport } from '@ror/js-api-client'
import { groupPolicyReportsByCluster, NamespaceGroup } from './policy-report'

type loadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }

export async function fetchClusterNamespaceGroups(clusterUid: string): Promise<NamespaceGroup[]> {
  const api = await getRorApi()
  try {
    const res = await api.policyReport.listByCluster(clusterUid)
    const reports = res?.resources ?? []
    const groups = groupPolicyReportsByCluster(reports, { result: 'all', severity: 'all', category: 'all' })
    return groups[0]?.namespaces ?? []
  } catch {
    return []
  }
}

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
