/**
 * Backup Runs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Backup Runs page.
 * It handles authentication, data fetching, and rendering of the page layout.
 **/

import { normalizeParams } from '@/features/cluster/utils/normalize-params'
import { getRorApi } from '@/services/ror-api'
import { Metadata } from 'next'
import { fetchBackupRuns } from '@/features/vms/backup/services/fetch-backupRuns'
import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'

export const metadata: Metadata = {
  title: 'ROR - Backup Runs',
  description: 'View backup runs',
}

export const dynamic = 'force-dynamic'

export default async function BackupRunPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const api = await getRorApi()
  const sp = await searchParams
  const params = normalizeParams(sp)

  // Extract backupJobId from search parameters
  const backupJobId = typeof sp.backupJobId === 'string' ? sp.backupJobId : undefined

  const [fetchedBackupRuns] = await Promise.all([fetchBackupRuns(api, params)])

  const backupRuns = fetchedBackupRuns.backupRuns || []
  const backupRunId = sp?.backupRunId as string | undefined

  return (
    <div className='w-full flex flex-col'>
      <Header title='Backup runs' />
      <PageView backupRuns={backupRuns} params={params} backupJobId={backupJobId} backupRunId={backupRunId} />
    </div>
  )
}
