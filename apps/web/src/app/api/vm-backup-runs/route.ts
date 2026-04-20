import { getRorApi } from '@/services/ror-api'
import { fetchBackupRunsForJobs } from '@/features/vms/backup/services/fetch-backupRuns-for-jobs'
import type { BackupJob } from '@ror/js-api-client'

export async function POST(request: Request) {
  try {
    const { backupJobs } = await request.json()

    if (!backupJobs || !Array.isArray(backupJobs)) {
      return Response.json({ backupRuns: [] }, { status: 400 })
    }

    const api = await getRorApi()
    const backupRuns = await fetchBackupRunsForJobs(api, backupJobs)

    return Response.json({ backupRuns })
  } catch (error) {
    console.error('Error in backup runs API route:', error)
    return Response.json({ backupRuns: [], error: String(error) }, { status: 500 })
  }
}
