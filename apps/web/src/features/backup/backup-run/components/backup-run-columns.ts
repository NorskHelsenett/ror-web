'use client'

import { DataTableColumnDef } from '@/components/ui/data-table'
import { BackupActiveTarget } from '@/features/vms/backup/utils/backup-job'
import {
  getBackupRunActiveTargets,
  getBackupRunEndTime,
  getBackupRunExpiryTime,
  getBackupRunId,
  getBackupRunMappedBackupJobId,
  getBackupRunSource,
  getBackupRunStartTime,
} from '@/features/vms/backup/utils/backup-run'
import { BackupRun } from '@ror/js-api-client'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { ActiveTargetsTooltip } from '@/features/backup/utils/active-targets-tooltip'
import { CopyButton } from '@/components/ui/copy-button'
import copy from 'clipboard-copy'

const columnHelper = createColumnHelper<BackupRun>()

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-GB', { timeZone: 'Europe/Oslo' })
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
        cell: (info) => {
          const id = info.getValue()
          const copyIdValue = (e?: React.MouseEvent) => {
            e?.preventDefault()
            void copy(id)
          }

          return React.createElement(
            'div',
            {
              className: 'min-w-0 break-words font-mono text-sm flex items-center gap-2',
            },
            id,
            React.createElement(CopyButton, { onClick: copyIdValue })
          )
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunSource = getBackupRunSource(row)
        return backupRunSource
      },
      {
        id: 'source',
        header: 'Source',
        enableSorting: true,
        sortingFn: 'text',
        cell: (info) => {
          const source = info.getValue()
          return source
        },
      }
    ),
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
        cell: (info) => {
          const startTime = info.getValue()
          return formatDateTime(startTime)
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunEndTime = getBackupRunEndTime(row)
        return backupRunEndTime
      },
      {
        id: 'endTime',
        header: 'End time',
        enableSorting: true,
        sortingFn: 'text',
        cell: (info) => {
          const endTime = info.getValue()
          return formatDateTime(endTime)
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunExpiryTime = getBackupRunExpiryTime(row)
        return backupRunExpiryTime
      },
      {
        id: 'expiryTime',
        header: 'Expiry time',
        enableSorting: true,
        sortingFn: 'text',
        cell: (info) => {
          const expiryTime = info.getValue()
          return formatDateTime(expiryTime)
        },
      }
    ),
    columnHelper.accessor(
      (row) => {
        const backupRunActiveTargets = getBackupRunActiveTargets(row)
        return backupRunActiveTargets
      },
      {
        id: 'activeTargets',
        header: 'Active targets',
        enableSorting: false,
        cell: (info) => {
          const activeTargets = info.getValue()
          const targetCount = activeTargets.length

          if (!activeTargets || targetCount === 0) {
            return 'No active targets'
          }
          return React.createElement(ActiveTargetsTooltip, {
            ids: activeTargets.map((t: BackupActiveTarget) => ({
              id: t.name || 'Unnamed target',
              //href: routes.app.vmBackup.getHref(t.name?.toLowerCase()),
            })),
          })
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
        cell: (info) => {
          const backupJobId = info.getValue()
          const copyIdValue = (e?: React.MouseEvent) => {
            e?.preventDefault()
            void copy(backupJobId)
          }

          return React.createElement(
            'div',
            {
              className: 'min-w-0 break-words font-mono text-sm flex items-center gap-2',
            },
            backupJobId,
            React.createElement(CopyButton, { onClick: copyIdValue })
          )
        },
      }
    ),
  ].filter(Boolean) as DataTableColumnDef<BackupRun>[]
}
