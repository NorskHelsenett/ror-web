'use server'

import { getRorApi } from '@/services/ror-api'
import type { BackupJob } from '@ror/js-api-client'
import { buildBackupSearchFilter } from '@/features/vms/backup/utils/backup-regex-search'

type LoadMoreOpts = {
  offset: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  searchField?: string
}

export async function loadMoreBackupJobs({ offset, limit, sort, order, search, searchField }: LoadMoreOpts) {
  const api = await getRorApi()

  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  const searchQuery = search?.trim() || undefined
  if (searchQuery) {
    const filters = buildBackupSearchFilter(searchQuery, 'backup-jobs', searchField)
    if (filters) params.set('filters', filters)
  }

  const backupJobsRes = await api.backupJob.list(params)
  const backupJobs: BackupJob[] = backupJobsRes?.resources ?? []

  return {
    items: backupJobs,
    hasMore: backupJobs.length === limit,
    nextOffset: backupJobs.length === limit ? offset + limit : null,
  }
}
