'use client'

import { useVMContext } from '@/context/vm-context'
import { BackupOverview } from '@/features/vms/backup/components'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'

export default function VMBackupPage() {
  const { vm } = useVMContext()
  const enhancedVM = vm as VMWithBackupStatus
  const hasBackupDataArrays = 'backupStatus' in enhancedVM && enhancedVM.backupStatus?.relatedBackupJobs !== undefined
  const relatedBackupJobs = enhancedVM.backupStatus?.relatedBackupJobs || []
  const relatedBackupRuns = enhancedVM.backupStatus?.relatedBackupRuns || []

  return (
    <div className='space-y-6'>
      {hasBackupDataArrays ? (
        <BackupOverview vm={enhancedVM} backupJobs={relatedBackupJobs} backupRuns={relatedBackupRuns} />
      ) : (
        <div className='p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center'>
              <svg
                className='w-5 h-5 text-amber-600 dark:text-amber-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-amber-900 dark:text-amber-100'>Backup Data Not Available</h3>
              <p className='text-amber-700 dark:text-amber-300'>
                Backup data is not available for this VM. Please ensure the VM has been processed with backup
                information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
