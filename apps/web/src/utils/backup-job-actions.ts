'use server'

import { getRorApi } from '@/services/ror-api'
import type { BackupJob, BackupRun } from '@ror/js-api-client'
import { buildRegexSearchFilter } from '@/features/vms/utils/regex-search'
import { fetchBackupRunsForJobs } from '@/features/vms/backup/services/fetch-backupRuns-for-jobs'
import { LoadMoreOptsWithSearch } from './load-more-options'

export async function loadMoreBackupJobs({ offset, limit, sort, order, search, searchField }: LoadMoreOptsWithSearch) {
  const api = await getRorApi()

  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  const searchQuery = search?.trim() || undefined
  if (searchQuery) {
    const filters = buildRegexSearchFilter(searchQuery, 'backupjob.id', searchField)
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

export async function loadBackupRunsForJobs(jobs: BackupJob[]): Promise<BackupRun[]> {
  const api = await getRorApi()
  return fetchBackupRunsForJobs(api, jobs)
}
