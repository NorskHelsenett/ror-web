'use server'

import { getRorApi } from '@/services/ror-api'
import { BackupRun } from '@ror/js-api-client'
import {
  getBackupRunId,
  getBackupRunSource,
  getBackupRunMappedBackupJobId,
} from '@/features/vms/backup/utils/backup-run'

const SEARCH_PAGE_SIZE = 500
const MAX_SEARCH_PAGES = 40

const getPageParams = (offset: number, limit: number) => {
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  params.set('order', 'desc')
  return params
}

export async function searchBackupRunById(id: string): Promise<BackupRun | null> {
  try {
    const api = await getRorApi()

    for (let page = 0; page < MAX_SEARCH_PAGES; page++) {
      const offset = page * SEARCH_PAGE_SIZE
      const params = getPageParams(offset, SEARCH_PAGE_SIZE)

      const backupRunsRes = await api.backupRun.list(params)
      const backupRuns: BackupRun[] = backupRunsRes?.resources ?? []

      const found = backupRuns.find(
        (run) => getBackupRunId(run) === id || getBackupRunMappedBackupJobId(run) === id || run.metadata?.uid === id
      )

      if (found) {
        return found
      }

      if (backupRuns.length < SEARCH_PAGE_SIZE) {
        break
      }
    }

    return null
  } catch (error) {
    console.error('Error searching for backup run:', error)
    return null
  }
}

export async function searchBackupRunsByQuery(query: string, limit: number = 50): Promise<BackupRun[]> {
  try {
    const api = await getRorApi()

    const queryLower = query.toLowerCase()
    const matches: BackupRun[] = []

    for (let page = 0; page < MAX_SEARCH_PAGES; page++) {
      const offset = page * SEARCH_PAGE_SIZE
      const params = getPageParams(offset, SEARCH_PAGE_SIZE)

      const backupRunsRes = await api.backupRun.list(params)
      const backupRuns: BackupRun[] = backupRunsRes?.resources ?? []

      for (const run of backupRuns) {
        const id = getBackupRunId(run).toLowerCase()
        const source = getBackupRunSource(run).toLowerCase()
        const backupJobId = getBackupRunMappedBackupJobId(run).toLowerCase()

        if (id.includes(queryLower) || source.includes(queryLower) || backupJobId.includes(queryLower)) {
          matches.push(run)
          if (matches.length >= limit) {
            return matches
          }
        }
      }

      if (backupRuns.length < SEARCH_PAGE_SIZE) {
        break
      }
    }

    return matches
  } catch (error) {
    console.error('Error searching backup runs:', error)
    return []
  }
}
