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

  // Fetch VMs and backup data in parallel
  const [vmRes, backupJobsRes, backupRunsRes] = await Promise.all([
    api.virtualMachine.list(params),
    fetchBackupJobs(api, { page: 1, limit: 1000, order: 'asc' }).catch(() => ({ backupJobs: [] })),
    fetchBackupRuns(api, { page: 1, limit: 1000, order: 'asc' }).catch(() => ({ backupRuns: [] })),
  ])

  const vms: VirtualMachine[] | VMWithBackupStatus[] = vmRes?.resources ?? []
  const backupJobs = backupJobsRes.backupJobs || []
  const backupRuns = backupRunsRes.backupRuns || []

  // Enhance VMs with backup status
  const vmsWithBackup = mapBackupToVM(vms, backupJobs, backupRuns)

  return {
    items: vms,
    hasMore: vms.length === limit,
    nextOffset: vms.length === limit ? offset + limit : null,
  }
}
