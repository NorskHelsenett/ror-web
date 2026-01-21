/**
 * VMs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Virtual Machines (VMs) page.
 * It handles authentication, data fetching, and rendering of the page layout.
 */

import PageView from './page-view'
import { Header } from '@/components/layout/app-shell/header'
import { normalizeParams } from '@/features/cluster/utils/normalize-params'
import { fetchVms } from '@/features/vms/services/fetch-vms'
import { fetchBackupJobs } from '@/features/vms/backup/services/fetch-backupJobs'
import { fetchBackupRuns } from '@/features/vms/backup/services/fetch-backupRuns'
import { mapBackupToVM } from '@/features/vms/backup/utils/map-backup-to-vm'
import { getRorApi } from '@/services/ror-api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROR - VM',
  description: 'View virtual machines',
}

export const dynamic = 'force-dynamic'

export default async function VMPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const api = await getRorApi()

  const sp = await searchParams
  const params = normalizeParams(sp)

  const [fetchedVms, fetchedBackupJobs, fetchedBackupRuns] = await Promise.all([
    fetchVms(api, params),
    fetchBackupJobs(api, params).catch(() => ({ backupJobs: [] })),
    fetchBackupRuns(api, params).catch(() => ({ backupRuns: [] })),
  ])

  const vms = fetchedVms.vms
  const backupJobs = fetchedBackupJobs.backupJobs || []
  const backupRuns = fetchedBackupRuns.backupRuns || []

  const vmsWithBackup = mapBackupToVM(vms, backupJobs, backupRuns)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Virtual machines' />
      <PageView vms={vmsWithBackup} params={params} />
    </div>
  )
}
