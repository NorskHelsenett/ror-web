/**
 * VMs Page Component
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that serves as the main entry point for the Virtual Machines (VMs) page.
 * It handles authentication, data fetching, and rendering of the page layout.
 */

import PageView from './page-view'
import { Header } from '@/components/layout/app-shell/header'
import { normalizeParams } from '@/features/vms/utils/normalize-params'
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

  //option that does not work
  const sp = await searchParams
  const params = normalizeParams(sp)

  // Extract only the properties needed for fetch functions
  const fetchParams = {
    page: params.page,
    limit: params.limit,
    ...(params.sort ? { sort: params.sort } : {}),
    order: params.order,
  }

  const [fetchedVms, fetchedBackupJobs, fetchedBackupRuns] = await Promise.all([
    fetchVms(api, fetchParams),
    fetchBackupJobs(api, fetchParams).catch(() => ({ backupJobs: [] })),
    fetchBackupRuns(api, fetchParams).catch(() => ({ backupRuns: [] })),
  ])

  const vms = fetchedVms.vms
  const backupJobs = fetchedBackupJobs.backupJobs || []
  const backupRuns = fetchedBackupRuns.backupRuns || []
  const vmsWithBackup = mapBackupToVM(vms, backupJobs, backupRuns)

  //option that works
  // const backupQueryParams = { page: 1, limit: 10000, order: 'asc' as const }
  // const [twofetchedVms, twofetchedBackupJobs, twofetchedBackupRuns] = await Promise.all([
  //   fetchVms(api, backupQueryParams),
  //   fetchBackupJobs(api, backupQueryParams).catch(() => ({ backupJobs: [] })),
  //   fetchBackupRuns(api, backupQueryParams).catch(() => ({ backupRuns: [] })),
  // ])

  // const twoVms = twofetchedVms.vms
  // const twobackupJobs = twofetchedBackupJobs.backupJobs || []
  // const twobackupRuns = twofetchedBackupRuns.backupRuns || []
  // const twoVmsWithBackup = mapBackupToVM(twoVms, twobackupJobs, twobackupRuns)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Virtual machines' />
      {/* <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2'> */}
      <PageView vms={vmsWithBackup} params={params} />
      {/* <PageView vms={twoVmsWithBackup} params={backupQueryParams} /> */}
      {/* </div> */}
    </div>
  )
}
