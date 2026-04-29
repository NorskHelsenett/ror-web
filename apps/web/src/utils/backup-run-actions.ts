'use server'

import { getRorApi } from '@/services/ror-api'
import { BackupRun } from '@ror/js-api-client'
import { buildRegexSearchFilter } from '@/features/vms/utils/regex-search'

type LoadMoreOpts = {
  offset: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  searchField?: string
}

export async function loadMoreBackupRuns({ offset, limit, sort, order, search, searchField }: LoadMoreOpts) {
  const api = await getRorApi()

  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  const searchQuery = search?.trim() || undefined
  if (searchQuery) {
    const filters = buildRegexSearchFilter(searchQuery, 'backuprun.id', searchField)
    if (filters) params.set('filters', filters)
  }

  const backupRunsRes = await api.backupRun.list(params)
  const backupRuns: BackupRun[] = backupRunsRes?.resources ?? []

  return {
    items: backupRuns,
    hasMore: backupRuns.length === limit,
    nextOffset: backupRuns.length === limit ? offset + limit : null,
  }
}
