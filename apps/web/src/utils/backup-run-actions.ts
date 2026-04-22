'use server'

import { getRorApi } from '@/services/ror-api'
import { BackupRun } from '@ror/js-api-client'
import { buildBackupSearchFilter } from '@/features/vms/backup/utils/backup-regex-search'

type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc'; search?: string }

export async function loadMoreBackupRuns({ offset, limit, sort, order, search }: LoadMoreOpts) {
  const api = await getRorApi()

  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  const searchQuery = search?.trim() || undefined
  if (searchQuery) {
    const filters = buildBackupSearchFilter(searchQuery)
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
