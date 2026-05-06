'use client'

import { DataTableColumnDef } from '@/components/ui/data-table'
import {
  getBackupRunActiveTargets,
  getBackupRunEndTime,
  getBackupRunExpiryTime,
  getBackupRunId,
  getBackupRunMappedBackupJobId,
  getBackupRunStartTime,
  getBackupRunStatusLocal,
} from '@/features/vms/backup/utils/backup-run'
import { BackupRun } from '@ror/js-api-client'
import { createColumnHelper } from '@tanstack/react-table'
import { CopyButton } from '@/components/ui/copy-button'
import React from 'react'
import { formatDistance } from 'date-fns'
import {
  getBackupRunStatusIcon,
  getBackupRunStatusLabel,
  getBackupRunStatusLabelClass,
  ShowTargets,
  getCompactIdLabel,
} from '../../backup-job/components/backup-job-columns'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

const columnHelper = createColumnHelper<BackupRun>()

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'Europe/Oslo' })
  const day = date.toLocaleString('en-US', { day: '2-digit', timeZone: 'Europe/Oslo' })
  const time = date.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo' })
  return `${month} ${day}, ${time}`
}

const formatDuration = (start: Date, end: Date) => {
  const totalSeconds = Math.max(0, Math.floor((end.getTime() - start.getTime()) / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

const renderDateCell = (dateString: string | null | undefined) => {
  if (!dateString) return React.createElement('span', { className: 'text-gray-400' }, 'N/A')
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return React.createElement('span', { className: 'text-gray-400' }, 'Invalid date')
  const formatted = formatDateTime(dateString)
  const relative = formatDistance(date, new Date(), { addSuffix: true })
  return React.createElement(
    'div',
    { className: 'flex flex-col gap-0.5' },
    React.createElement('span', { className: 'text-sm' }, formatted),
    React.createElement('span', { className: 'text-xs text-muted-foreground' }, relative)
  )
}

export const getBackupRunTableColumns = (): DataTableColumnDef<BackupRun>[] => {
  return [
    columnHelper.accessor(
      (row) => {
        const backupRunId = getBackupRunId(row)
        return backupRunId
      },
      {
        id: 'id',
        header: 'ID',
        enableSorting: true,
        sortingFn: 'text',
        size: 225,
        cell: (info) => {
          const id = info.getValue()
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
    columnHelper.accessor(
      (row) => {
        const status = getBackupRunStatusLocal(row)
        return status
      },
      {
        id: 'status',
        header: 'Status',
        enableSorting: true,
        sortingFn: 'text',
        size: 150,
        cell: (info) => {
          const status = info.getValue()
          const statusLabel = getBackupRunStatusLabel(status)
          const statusLabelClass = getBackupRunStatusLabelClass(status)
          const StatusIcon = getBackupRunStatusIcon(status)

          return React.createElement(
            'div',
            {
              className: `inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${statusLabelClass}`,
            },
            StatusIcon,
            statusLabel
          )
        },
      }
    ),
    //Todo: Evalueate of this should be in the table??
    // columnHelper.accessor(
    //   (row) => {
    //     const backupRunSource = getBackupRunSource(row)
    //     return backupRunSource
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
        const backupRunStartTime = getBackupRunStartTime(row)
        return backupRunStartTime
      },
      {
        id: 'startTime',
        header: 'Start time',
        enableSorting: true,
        sortingFn: 'text',
        size: 175,
        cell: (info) => {
          const startTime = info.getValue()
          return renderDateCell(startTime)
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunStartTime = getBackupRunStartTime(row)
        return backupRunStartTime
      },
      {
        id: 'duration',
        header: 'Duration',
        enableSorting: true,
        sortingFn: 'text',
        size: 130,
        cell: (info) => {
          const startTime = info.getValue()
          const endTime = getBackupRunEndTime(info.row.original)
          if (!startTime || !endTime) return React.createElement('span', { className: 'text-gray-400' }, 'N/A')
          const startDate = new Date(startTime)
          const endDate = new Date(endTime)
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
            return React.createElement('span', { className: 'text-gray-400' }, 'Invalid date')
          const duration = formatDuration(startDate, endDate)
          return React.createElement('span', { className: 'text-md' }, duration)
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunActiveTargets = getBackupRunActiveTargets(row)
        return backupRunActiveTargets
      },
      {
        id: 'targets',
        header: 'Targets',
        enableSorting: false,
        size: 105,
        cell: (info) => {
          const activeTargets = info.getValue()
          return <ShowTargets targets={activeTargets} backup={getBackupRunId(info.row.original)} />
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const expiryTime = getBackupRunExpiryTime(row)
        if (!expiryTime || expiryTime === 'No expiry time') return null

        const expiryDate = new Date(expiryTime)
        if (isNaN(expiryDate.getTime())) return null

        return expiryTime
      },
      {
        id: 'expiresIn',
        header: 'Expires in',
        enableSorting: true,
        sortingFn: 'text',
        size: 150,
        cell: (info) => {
          const expiryTime = info.getValue()
          if (!expiryTime) {
            return <span className='text-gray-400 text-sm'>N/A</span>
          }

          const expiryDate = new Date(expiryTime)
          if (isNaN(expiryDate.getTime())) {
            return <span className='text-gray-400 text-sm'>N/A</span>
          }

          const now = new Date()
          const msDiff = expiryDate.getTime() - now.getTime()
          const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24))
          const dayLabel = dayDiff <= 0 ? 'Expired' : `${dayDiff} day${dayDiff === 1 ? '' : 's'}`
          const dateLabel = expiryDate.toLocaleDateString('nb-NO', { timeZone: 'Europe/Oslo' })

          return (
            <div className='flex flex-col leading-tight'>
              <span className='text-base'>{dayLabel}</span>
              <span className='text-xs text-muted-foreground'>{dateLabel}</span>
            </div>
          )
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunMappedBackupJobId = getBackupRunMappedBackupJobId(row)
        return backupRunMappedBackupJobId
      },
      {
        id: 'backupJobId',
        header: 'Backup job ID',
        enableSorting: true,
        sortingFn: 'text',
        size: 225,
        cell: (info) => {
          const backupJobId = info.getValue()
          const compactId = getCompactIdLabel(backupJobId)
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='group inline-flex max-w-full items-center gap-1 rounded-full border border-border/70 bg-muted/30 px-2 py-1'>
                    <span className='max-w-[180px] truncate font-mono text-xs'>{compactId}</span>
                    <CopyButton
                      value={backupJobId}
                      size='sm'
                      className='bg-transparent p-0 border-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 hover:text-foreground'
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <span className='font-mono text-xs break-all'>{backupJobId}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        },
      }
    ),
  ].filter(Boolean) as DataTableColumnDef<BackupRun>[]
}
