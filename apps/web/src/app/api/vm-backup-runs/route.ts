import { getRorApi } from '@/services/ror-api'
import { fetchBackupRunsByIds, fetchBackupRunsForJobs } from '@/features/vms/backup/services/fetch-backupRuns-for-jobs'
import { authGuard } from '@/features/auth/utils/auth-guard'

export async function POST(request: Request) {
  await authGuard()
  try {
    const { backupJobs, runIds } = await request.json()

    const hasBackupJobs = Array.isArray(backupJobs)
    const hasRunIds = Array.isArray(runIds)

    if (!hasBackupJobs && !hasRunIds) {
      return Response.json({ backupRuns: [] }, { status: 400 })
    }

    const api = await getRorApi()
    const backupRuns = hasRunIds
      ? await fetchBackupRunsByIds(api, runIds)
      : await fetchBackupRunsForJobs(api, backupJobs)

    return Response.json({ backupRuns })
  } catch (error) {
    console.error('Error in backup runs API route:', error)
    return Response.json({ backupRuns: [], error: String(error) }, { status: 500 })
  }
}
