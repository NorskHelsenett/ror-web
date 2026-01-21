'use server'

import { getRorApi } from '@/services/ror-api'
import type { BackupJob } from '@ror/js-api-client'

type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }

export async function loadMoreBackupJobs({ offset, limit, sort, order }: LoadMoreOpts) {
  const api = await getRorApi()

  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  const backupJobsRes = await api.backupJob.list(params)
  const backupJobs: BackupJob[] = backupJobsRes?.resources ?? []

  return {
    items: backupJobs,
    hasMore: backupJobs.length === limit,
    nextOffset: backupJobs.length === limit ? offset + limit : null,
  }
}
