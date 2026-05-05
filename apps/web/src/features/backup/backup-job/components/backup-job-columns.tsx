'use client'

import { BackupJob } from '@ror/js-api-client'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTableColumnDef } from '@/components/ui/data-table'
import {
  getBackupJobId,
  getBackupJobLocation,
  getBackupJobSchedules,
  getBackupJobAllRunIds,
  getBackupJobActiveTargets,
  BackupActiveTarget,
  getBackupJobName,
  getBackupStatus,
  getLastBackupRun,
} from '@/features/vms/backup/utils/backup-job'
import Link from 'next/link'
import React, { useState } from 'react'
import { IdListTooltip } from '../../utils/active-targets-tooltip'
import { BackupJobStatus, BackupJobStatusType } from './backup-job-status'
import { CopyButton } from '@/components/ui/copy-button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Monitor, CheckCircle, XCircle, List } from 'lucide-react'
import { BackupRun } from '@ror/js-api-client'
import { formatDistance } from 'date-fns'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

const columnHelper = createColumnHelper<BackupJob>()

export const getCompactIdLabel = (id: string) => {
  if (id.length <= 20) return id
  return `${id.slice(0, 8)}...${id.slice(-6)}`
}

const toSingularUnit = (unit: string) => {
  const normalizedUnit = unit.trim().toLowerCase()
  if (normalizedUnit.endsWith('s')) {
    return normalizedUnit.slice(0, -1)
  }
  return normalizedUnit
}

const formatScheduleFrequency = (schedule: { frequency?: number | null; unit?: string | null }) => {
  const frequency = Number(schedule.frequency ?? 0)
  const unit = schedule.unit ?? ''

  if (!unit) {
    return 'Custom schedule'
  }

  const singularUnit = toSingularUnit(unit)
  if (frequency <= 1) {
    if (singularUnit === 'run') {
      return 'Every run'
    }
    return `Every ${singularUnit}`
  }

  return `Every ${frequency} ${singularUnit}s`
}

export const getBackupRunStatusIcon = (status: string | null | undefined) => {
  const normalizedStatus = (status || '').toLowerCase()
  if (normalizedStatus === 'failed') {
    return <XCircle className='w-4 h-4 text-red-500' />
  }
  if (normalizedStatus === 'succeeded' || normalizedStatus === 'completed') {
    return <CheckCircle className='w-4 h-4 text-green-500' />
  }

  return <QuestionMarkCircledIcon className='w-4 h-4 text-gray-500' />
}

export const getBackupRunStatusLabel = (status: string | null | undefined) => {
  const normalizedStatus = (status || '').toLowerCase()
  if (normalizedStatus === 'failed') return 'Failed'
  if (normalizedStatus === 'succeeded' || normalizedStatus === 'completed') return 'Succeeded'
  return 'Unknown'
}

export const getBackupRunStatusLabelClass = (status: string | null | undefined) => {
  const normalizedStatus = (status || '').toLowerCase()
  if (normalizedStatus === 'failed') return 'text-red-600'
  if (normalizedStatus === 'succeeded' || normalizedStatus === 'completed') return 'text-green-600'
  return 'text-gray-500'
}

const formatBytes = (bytes: number | null | undefined) => {
  if (bytes == null || Number.isNaN(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** exponent
  const precision = value >= 100 ? 0 : value >= 10 ? 1 : 2
  return `${value.toFixed(precision)} ${units[exponent]}`
}

export const showTargets = (targets: BackupActiveTarget[], backup: string) => {
  const [open, setIsOpen] = useState(false)
  const hasSizeData = targets.some(
    (target) =>
      target?.size?.sourceSize != null || target?.size?.logicalSize != null || target?.size?.physicalSize != null
  )

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className='inline-flex items-center gap-1 px-2 py-1 text-md justify-center hover:font-medium hover:text-blue-600'
      >
        <Monitor size={14} className='mr-2' />
        {targets.length}
      </button>
      <DialogContent className='bg-white dark:bg-gray-900 rounded-lg p-6'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            VMs included in backup
          </DialogTitle>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{backup}</p>
          {hasSizeData && (
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
              Size shown per VM: Source, Logical, and Physical.
            </p>
          )}
        </DialogHeader>
        <div className='space-y-2'>
          {targets.map((target, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-3 rounded-lg border border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/20 px-4 py-3 transition-colors hover:bg-blue-100 dark:hover:bg-blue-950/40'
            >
              <div className='flex items-center gap-3 min-w-0 flex-1'>
                <div className='flex-shrink-0 w-2 h-2 rounded-full bg-blue-500'></div>
                <div className='min-w-0 flex-1'>
                  <span className='font-mono text-sm text-gray-800 dark:text-gray-200 truncate block'>
                    {target.name || 'Unnamed target'}
                  </span>
                  {(target?.size?.sourceSize != null ||
                    target?.size?.logicalSize != null ||
                    target?.size?.physicalSize != null) && (
                    <div className='mt-1 flex flex-wrap gap-1.5'>
                      <span className='inline-flex items-center rounded-md bg-white/80 dark:bg-gray-800 px-1.5 py-0.5 text-[11px] text-gray-700 dark:text-gray-200'>
                        Src {formatBytes(target?.size?.sourceSize)}
                      </span>
                      <span className='inline-flex items-center rounded-md bg-white/80 dark:bg-gray-800 px-1.5 py-0.5 text-[11px] text-gray-700 dark:text-gray-200'>
                        Log {formatBytes(target?.size?.logicalSize)}
                      </span>
                      <span className='inline-flex items-center rounded-md bg-white/80 dark:bg-gray-800 px-1.5 py-0.5 text-[11px] text-gray-700 dark:text-gray-200'>
                        Phys {formatBytes(target?.size?.physicalSize)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <CopyButton
                value={target.name || ''}
                size='sm'
                className='bg-transparent p-0 border-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0'
              />
            </div>
          ))}
        </div>
        {targets.length === 0 && (
          <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-4'>No active targets</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export const getBackupJobTableColumns = (backupRuns: BackupRun[] = []): DataTableColumnDef<BackupJob>[] => {
  return [
    columnHelper.accessor(
      (row) => {
        const backupJobName = getBackupJobName(row)
        return backupJobName
      },
      {
        id: 'name',
        header: 'Name',
        enableSorting: true,
        sortingFn: 'text',
        size: 300,
        cell: (info) => {
          const name = info.getValue()
          return React.createElement(
            'div',
            {
              className: 'min-w-0 break-words font-mono text-sm',
            },
            name
          )
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupJobStatus = getBackupStatus(row)
        return backupJobStatus
      },
      {
        id: 'status',
        header: 'Status',
        enableSorting: true,
        sortingFn: 'text',
        size: 120,
        cell: (info) => {
          const jobStatus = info.getValue() as BackupJobStatusType
          return <BackupJobStatus status={jobStatus} />
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupJobId = getBackupJobId(row)
        return backupJobId
      },
      {
        id: 'id',
        header: 'Backup job ID',
        enableSorting: true,
        sortingFn: 'text',
        size: 225,
        cell: (info) => {
          const id = info.getValue() as string
          const compactId = getCompactIdLabel(id)

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='group inline-flex max-w-full items-center gap-1 rounded-full border border-border/70 bg-muted/30 px-2 py-1'>
                    <span className='max-w-[180px] truncate font-mono text-xs'>{compactId}</span>
                    <CopyButton
                      value={id}
                      size='sm'
                      className='bg-transparent p-0 border-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 hover:text-foreground'
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <span className='font-mono text-xs break-all'>{id}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        },
      }
    ),
    //Todo: Evalueate of this should be in the table??
    // columnHelper.accessor(
    //   (row) => {
    //     const source = getBackupJobSource(row)
    //     return source
    //   },
    //   {
    //     id: 'source',
    //     header: 'Source',
    //     enableSorting: true,
    //     sortingFn: 'text',
    //     size: 250,
    //     cell: (info) => {
    //       const source = info.getValue()
    //       return source
    //     },
    //   }
    // ),
    columnHelper.accessor(
      (row) => {
        const activeTargets = getBackupJobActiveTargets(row)
        return activeTargets
      },
      {
        id: 'targets',
        header: 'Targets',
        enableSorting: false,
        size: 105,
        cell: (info) => {
          const activeTargets = info.getValue()
          return showTargets(activeTargets, getBackupJobName(info.row.original))
        },
      }
    ),

    columnHelper.accessor(
      (row) => {
        const lastRunId = getLastBackupRun(row)
        if (!lastRunId) return null
        const run = backupRuns.find((r) => r?.backuprun?.id === lastRunId)
        return run?.backuprun?.status?.endTime ?? null
      },
      {
        id: 'lastBackupRun',
        header: 'Last run',
        enableSorting: true,
        sortingFn: 'alphanumeric',
        size: 200,
        cell: (info) => {
          const endTime = info.getValue() as string | null
          if (!endTime || endTime === 'No end time') {
            return <span className='text-gray-400 text-sm '>No backup runs</span>
          }
          const date = new Date(endTime)
          if (isNaN(date.getTime())) return <span className='text-gray-400 text-sm'>No backup runs</span>
          const relative = formatDistance(date, new Date(), { addSuffix: true })
          const lastRunId = getLastBackupRun(info.row.original)

          const status = backupRuns.find((s) => s?.backuprun?.id === lastRunId)?.backuprun?.status
            ?.backupDestinations?.[0]?.status
          const statusLabel = getBackupRunStatusLabel(status)
          const statusLabelClass = getBackupRunStatusLabelClass(status)
          return (
            <Link
              href={`/vms/backup/backup-runs?search=${lastRunId}&searchField=backuprun.id`}
              className='inline-flex flex-col w-40 rounded items-start gap-0.5 px-2 py-1 hover:text-blue-700 hover:bg-blue-50 transition-colors'
              title={date.toLocaleString()}
            >
              <span className='inline-flex items-center gap-1.5 text-sm'>
                {getBackupRunStatusIcon(status)}
                {relative}
              </span>
              <span className={`text-xs ${statusLabelClass}`}>Run {statusLabel.toLowerCase()}</span>
            </Link>
          )
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const location = getBackupJobLocation(row)
        return location
      },
      {
        id: 'location',
        header: 'Location',
        enableSorting: true,
        sortingFn: 'text',
        size: 100,
        cell: (info) => {
          const location = info.getValue()
          if (location == null || location === '') {
            return <span className='text-gray-400 text-sm'>N/A</span>
          }
          return <span className='text-sm'>{location}</span>
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const schedules = getBackupJobSchedules(row)
        return schedules
      },
      {
        id: 'schedules',
        header: 'Schedule',
        enableSorting: false,
        size: 200,
        cell: (info) => {
          const schedules = info.getValue()
          if (!schedules || schedules.length === 0) {
            return <span className='text-sm text-gray-400'>No schedules</span>
          }

          const scheduleLabels = [...new Set(schedules.map(formatScheduleFrequency))]
          return <span className='text-sm'>{scheduleLabels.join(', ')}</span>
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunIds = getBackupJobAllRunIds(row)
        return backupRunIds
      },
      {
        id: 'backupRunIds',
        header: 'Backup run IDs',
        enableSorting: false,
        size: 200,
        cell: (info) => {
          const backupRunIds = info.getValue()
          if (!backupRunIds || backupRunIds.length === 0) {
            return <span className='text-gray-400 text-sm'>No backup runs</span>
          }
          const backupJobId = getBackupJobId(info.row.original)
          return React.createElement(IdListTooltip, {
            ids: backupRunIds,
            label: 'Backup Run IDs',
            triggerElement: React.createElement(
              Link,
              {
                href: `/vms/backup/backup-runs?search=${backupJobId}&searchField=backuprun.status.backupjobid`,
                className:
                  'group inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700',
              },
              React.createElement(List, { size: 14, className: 'text-muted-foreground group-hover:text-blue-700' }),
              React.createElement('span', null, 'Runs'),
              React.createElement(
                'span',
                {
                  className:
                    'inline-flex min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-xs font-semibold text-blue-700',
                },
                String(backupRunIds.length)
              )
            ),
          })
        },
      }
    ),
  ].filter(Boolean) as DataTableColumnDef<BackupJob>[]
}
