/**
 * Backup Status Display Components
 *
 * This file contains components and logic for displaying backup status information
 * in VM cards and other UI elements. It handles the visual representation of
 * active, historical, and missing backup states.
 */

import { cn } from '@/utils/clsxm'
import { useActiveBackupStatus, useBackupStatus } from '@/features/vms/backup/hooks/useBackupStatus'
import type { VirtualMachine } from '@ror/js-api-client'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import { Pill } from '@/components/shadcn/pill'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

type VMTableRow = VirtualMachine | VMWithBackupStatus

interface BackupStatusDisplayProps {
  vm: VMTableRow
  className?: string
}

interface BackupInfoItemProps {
  icon: 'started' | 'ended' | 'expires'
  label: string
  value: string
}

const BackupInfoItem = ({ icon, label, value }: BackupInfoItemProps) => {
  const iconColors = {
    started: 'bg-green-400',
    ended: 'bg-blue-400',
    expires: 'bg-orange-400',
  }

  return (
    <div className='flex items-center justify-between'>
      <span className='text-gray-500 flex items-center'>
        <span className={cn('w-2 h-2 rounded-full mr-2', iconColors[icon])}></span>
        {label}
      </span>
      <span className='font-medium'>{value}</span>
    </div>
  )
}

const NoBackupDisplay = () => (
  <div className='mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50'>
    <h5 className='font-semibold text-sm text-gray-700 dark:text-gray-300 tracking-wide '>Backup status</h5>
    <div className='flex items-center justify-center'>
      <div className='text-center space-y-2'>
        <div className='w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto'>
          <svg
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3a2 2 0 01-2 2H9a2 2 0 01-2-2H4'
            />
          </svg>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400 font-medium'>No backup</p>
      </div>
    </div>
  </div>
)

const NoBackupTableDisplay = () => (
  <div>
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <Pill className='bg-gray-100 text-gray-800 border-gray-200 cursor-pointer'>No backup</Pill>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className='text-xs'>No backup data available</div>
      </TooltipContent>
    </Tooltip>
  </div>
)

export const BackupStatusTableDisplay = ({ vm }: BackupStatusDisplayProps) => {
  const backupStatus = useBackupStatus(vm)
  const activeBackupStatus = useActiveBackupStatus(vm)
  const isActive = activeBackupStatus.hasActiveBackup
  const isHistorical = activeBackupStatus.hasHistoricalBackup
  const isConfigured = activeBackupStatus.hasConfiguredBackup

  // If no backup data is loaded, show no backup display
  if (!backupStatus.isDataLoaded) {
    return <NoBackupTableDisplay />
  }

  // If no backup job and no backup runs, show no backup display
  if (!backupStatus.hasBackupJob && !backupStatus.hasBackupRun) {
    return <NoBackupTableDisplay />
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', { timeZone: 'Europe/Oslo' })
  }

  const tooltipContent = (
    <div className='space-y-1 text-xs'>
      {backupStatus.lastBackupInfo ? (
        <>
          <div>
            <strong>Started:</strong>{' '}
            {backupStatus.lastBackupInfo.startTime ? formatDateTime(backupStatus.lastBackupInfo.startTime) : 'N/A'}
          </div>
          <div>
            <strong>Ended:</strong>{' '}
            {backupStatus.lastBackupInfo.endTime ? formatDateTime(backupStatus.lastBackupInfo.endTime) : 'N/A'}
          </div>
          <div>
            <strong>Expires:</strong>{' '}
            {backupStatus.lastBackupInfo.expiryTime ? formatDateTime(backupStatus.lastBackupInfo.expiryTime) : 'N/A'}
          </div>
        </>
      ) : isConfigured ? (
        <div>Backup job configured - no runs executed yet</div>
      ) : (
        <div>No backup run data available</div>
      )}
    </div>
  )

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            {isConfigured ? (
              <Pill className='bg-blue-100 text-blue-800 border-blue-200 cursor-pointer'>Configured</Pill>
            ) : isActive ? (
              <Pill className='bg-green-100 text-green-800 dark:text-green-500 cursor-pointer'>Active</Pill>
            ) : isHistorical ? (
              <Pill className='bg-orange-100 text-orange-800 border-orange-200 cursor-pointer'>Historical</Pill>
            ) : (
              <Pill className='bg-gray-100 text-gray-800 border-gray-200 cursor-pointer'>No backup</Pill>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </div>
  )
}

export const BackupStatusDisplay = ({ vm, className }: BackupStatusDisplayProps) => {
  const activeBackupStatus = useActiveBackupStatus(vm)
  const backupStatus = useBackupStatus(vm)

  // If no backup data is loaded, show no backup display
  if (!backupStatus.isDataLoaded) {
    return <NoBackupDisplay />
  }

  // If no backup job and no backup runs, show no backup display
  if (!backupStatus.hasBackupJob && !backupStatus.hasBackupRun) {
    return <NoBackupDisplay />
  }

  const isActive = activeBackupStatus.hasActiveBackup
  const isHistorical = activeBackupStatus.hasHistoricalBackup
  const isConfigured = activeBackupStatus.hasConfiguredBackup

  const containerStyles = cn(
    'mt-4 p-3 rounded-md relative overflow-hidden',
    isConfigured
      ? 'border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20'
      : isActive
        ? 'border-2 border-green-400 bg-green-50 dark:bg-green-900/20'
        : isHistorical
          ? 'border-2 border-orange-400 bg-orange-50 dark:bg-orange-900/20'
          : 'border border-gray-200 dark:border-gray-700',
    className
  )

  const titleStyles = cn(
    'font-semibold text-sm mb-2 tracking-wide flex items-center',
    isConfigured
      ? 'text-blue-700 dark:text-blue-300'
      : isActive
        ? 'text-green-700 dark:text-green-300'
        : isHistorical
          ? 'text-orange-700 dark:text-orange-300'
          : 'text-gray-700 dark:text-gray-300'
  )

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', { timeZone: 'Europe/Oslo' })
  }

  return (
    <div className={containerStyles}>
      {isActive && (
        <div className='absolute top-0 right-0 bg-green-400 text-white text-xs px-2 py-1 rounded-bl-md font-medium'>
          ACTIVE
        </div>
      )}
      {isHistorical && (
        <div className='absolute top-0 right-0 bg-orange-400 text-white text-xs px-2 py-1 rounded-bl-md font-medium'>
          HISTORICAL
        </div>
      )}
      {isConfigured && (
        <div className='absolute top-0 right-0 bg-blue-400 text-white text-xs px-2 py-1 rounded-bl-md font-medium'>
          CONFIGURED
        </div>
      )}

      <h5 className={titleStyles}>
        {isConfigured && <span className='w-2 h-2 bg-blue-400 rounded-full mr-2'></span>}
        {isActive && !isConfigured && <span className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></span>}
        {isHistorical && <span className='w-2 h-2 bg-orange-400 rounded-full mr-2'></span>}
        {isConfigured && !backupStatus.hasBackupRun ? 'Backup configured' : 'Last backup'}
      </h5>

      <div className='grid grid-cols-1 gap-2 text-xs'>
        {backupStatus.lastBackupInfo ? (
          <>
            <BackupInfoItem
              icon='started'
              label='Run started'
              value={
                backupStatus.lastBackupInfo.startTime ? formatDateTime(backupStatus.lastBackupInfo.startTime) : 'N/A'
              }
            />
            <BackupInfoItem
              icon='ended'
              label='Run ended'
              value={backupStatus.lastBackupInfo.endTime ? formatDateTime(backupStatus.lastBackupInfo.endTime) : 'N/A'}
            />
            <BackupInfoItem
              icon='expires'
              label='Run expires'
              value={
                backupStatus.lastBackupInfo.expiryTime ? formatDateTime(backupStatus.lastBackupInfo.expiryTime) : 'N/A'
              }
            />
          </>
        ) : isConfigured ? (
          <div className='text-center py-2'>
            <p className='text-sm text-blue-700 dark:text-blue-300 font-medium'>Backup job configured</p>
            <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>No backup runs executed yet</p>
          </div>
        ) : (
          <div className='text-center py-2'>
            <p className='text-sm text-gray-500'>No backup data available</p>
          </div>
        )}
      </div>
    </div>
  )
}
