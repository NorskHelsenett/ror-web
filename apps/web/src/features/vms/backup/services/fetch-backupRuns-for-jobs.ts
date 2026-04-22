import type { BackupJob, BackupRun } from '@ror/js-api-client'

const BACKUP_RUN_PAGE_SIZE = 500
const BACKUP_RUN_MAX_PAGES = 100

export async function fetchBackupRunsByIds(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  runIds: string[]
) {
  const wantedIds = new Set(runIds.filter(Boolean))
  if (!wantedIds.size) {
    return []
  }

  const fetchedRuns: BackupRun[] = []

  for (let page = 0; page < BACKUP_RUN_MAX_PAGES; page++) {
    const offset = page * BACKUP_RUN_PAGE_SIZE
    const params = new URLSearchParams()
    params.set('limit', String(BACKUP_RUN_PAGE_SIZE))
    params.set('offset', String(offset))
    params.set('order', 'desc')

    const backupRunsRes = await api.backupRun.list(params)
    const backupRuns: BackupRun[] = backupRunsRes?.resources ?? []

    for (const run of backupRuns) {
      const runId = run?.backuprun?.id
      if (runId && wantedIds.has(runId)) {
        fetchedRuns.push(run)
        wantedIds.delete(runId)
      }
    }

    if (!wantedIds.size || backupRuns.length < BACKUP_RUN_PAGE_SIZE) {
      break
    }
  }

  return fetchedRuns
}

export async function fetchBackupRunsForJobs(
  api: Awaited<ReturnType<typeof import('@/services/ror-api').getRorApi>>,
  backupJobs: BackupJob[]
) {
  if (!backupJobs.length) {
    return []
  }

  // Collect all unique backup run IDs from the jobs
  const runIdSet = new Set<string>()
  for (const job of backupJobs) {
    const runIds = job?.backupjob?.status?.backupRunIds ?? []
    for (const id of runIds) {
      runIdSet.add(id)
    }
  }

  if (!runIdSet.size) {
    return []
  }

  const allRunIds = Array.from(runIdSet)
  return fetchBackupRunsByIds(api, allRunIds)
}
