'use server'

import { getRorApi } from '@/services/ror-api'
import type { VirtualMachine } from '@ror/js-api-client'
import { fetchBackupJobs } from '@/features/vms/backup/services/fetch-backupJobs'
import { fetchBackupRuns } from '@/features/vms/backup/services/fetch-backupRuns'
import { mapBackupToVM } from '@/features/vms/backup/utils/map-backup-to-vm'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'

type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }

export async function loadMoreVMs({ offset, limit, sort, order }: LoadMoreOpts) {
  const api = await getRorApi()

  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  if (sort) params.set('sort', sort)
  if (order) params.set('order', order)

  // Only fetch VMs - backup data should be fetched once and passed from client
  const vmRes = await api.virtualMachine.list(params)
  const vms: VirtualMachine[] = vmRes?.resources ?? []

  return {
    items: vms,
    hasMore: vms.length === limit,
    nextOffset: vms.length === limit ? offset + limit : null,
  }
}

// New action: Fetch all backup data once
export async function fetchAllBackupData() {
  const api = await getRorApi()

  const [backupJobsRes, backupRunsRes] = await Promise.all([
    fetchBackupJobs(api, { page: 1, limit: 10000, order: 'asc' }).catch(() => ({ backupJobs: [] })),
    fetchBackupRuns(api, { page: 1, limit: 10000, order: 'asc' }).catch(() => ({ backupRuns: [] })),
  ])

  return {
    backupJobs: backupJobsRes.backupJobs || [],
    backupRuns: backupRunsRes.backupRuns || [],
  }
}
