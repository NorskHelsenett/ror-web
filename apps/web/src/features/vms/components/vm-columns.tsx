'use client'

import type { VirtualMachine } from '@ror/js-api-client'
import type { DataTableColumnDef } from '@/components/ui/data-table'
import Link from 'next/link'
import { VMColumnsData } from '@/features/vms/types/vm-types'
import { createColumnHelper } from '@tanstack/react-table'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import { getVMActiveBackupStatus } from '@/features/vms/backup/hooks/useBackupStatus'
import {
  getSpecCoresPerSocket,
  getSpecCpuTotal,
  getSpecMemory,
  getSpecSockets,
  getStatusCpuUsage,
  getStatusMemoryUsage,
  getTeamIdentifier,
  getVmArchitecture,
  getVmDisks,
  getVmHostName,
  getVmOperatingSystemId,
  getVmPowerState,
  getVmToolVersion,
  getVmVersion,
  getVmFamily,
} from '../utils/vms'
import { changePowerStateValues } from '../types/powerState'
import { PowerStatusIcon } from './power-status-icon'
import { Badge } from '@/components/shadcn/badge'
import { MetricCell } from './metrics-cell'
import { VersionLogoWithTooltip } from '../utils/versions-logo'
import { BackupStatusTableDisplay } from '../backup/components/backup-status-display'
import { routes } from '@/config/routes'

// Union type to handle both regular VMs and VMs with backup status
type VMTableRow = VirtualMachine | VMWithBackupStatus

const columnHelper = createColumnHelper<VMTableRow>()

export const getVMTableColumns = (selectedDisplayData?: VMColumnsData[]): DataTableColumnDef<VMTableRow>[] => {
  const showAllVMs = !selectedDisplayData || selectedDisplayData.length === 0
  const isVisible = (data: VMColumnsData) => {
    if (data === 'id' || data === 'architecture' || data == 'version') {
      return selectedDisplayData?.includes(data) ?? false
    }
    return showAllVMs || selectedDisplayData.includes(data)
  }

  return [
    columnHelper.accessor((row) => getVmHostName(row) ?? 'Unnamed VM', {
      id: 'hostName',
      header: 'Hostname',
      enableSorting: true,
      sortingFn: 'text',
      cell: (info) => {
        const hostname = String(info.getValue() ?? '')
        const vm = info.row.original
        const vmHostName = getVmHostName(vm) || ''
        return (
          <Link
            href={routes.app.vm.getHref(vmHostName.toLowerCase())}
            className='pr-2 text-blue-600 dark:text-blue-500 underline'
            onClick={() => localStorage.setItem('selectedVm', JSON.stringify(vm))}
          >
            {hostname.toLowerCase()}
          </Link>
        )
      },
    }),
    isVisible('id') &&
      columnHelper.accessor(
        (row) => {
          const osID = getVmOperatingSystemId(row)
          return osID
        },
        {
          id: 'id',
          header: 'ID',
          enableSorting: true,
          sortingFn: 'text',
          cell: (info) => {
            const osID = info.getValue()
            return <span>{osID}</span>
          },
        }
      ),

    isVisible('team') &&
      columnHelper.accessor(
        (row) => {
          const teamIdentifier = getTeamIdentifier(row)
          return teamIdentifier
        },
        {
          id: 'team',
          header: 'Team',
          enableSorting: true,
          sortingFn: 'text',
          cell: (info) => {
            const teamIdentifier = info.getValue()
            return <span>{teamIdentifier}</span>
          },
        }
      ),
    isVisible('powerState') &&
      columnHelper.accessor((row) => getVmPowerState(row) ?? '', {
        id: 'powerState',
        header: 'Power',
        enableSorting: false,
        cell: (info) => {
          const osID = changePowerStateValues[info.getValue()]
          return (
            <Badge variant='outline' className='px-1.5 text-base-muted'>
              <PowerStatusIcon status={info.getValue()} className='mr-2' />
              {(osID ?? 'Undefined').charAt(0).toUpperCase() + (osID ?? 'Undefined').slice(1)}
            </Badge>
          )
        },
      }),

    isVisible('disk-usage') &&
      columnHelper.accessor((row) => getVmDisks(row), {
        id: 'disk-usage',
        header: 'Disks usage',
        enableSorting: false,
        cell: (info) => {
          const disks = info.getValue()
          const diskData = disks.map((disk, idx) => ({
            id: disk.id || `disk-${idx}`,
            name: disk.name || `Disk ${idx + 1}`,
            diskSize: disk.sizeBytes || 0,
            diskUsage: disk.usageBytes || 0,
            isMounted: disk.isMounted || undefined,
          }))

          return (
            <MetricCell
              type='disk'
              metrics={{
                disks: diskData,
              }}
            />
          )
        },
      }),
    isVisible('memory') &&
      columnHelper.accessor((row) => getSpecMemory(row), {
        id: 'memory',
        header: 'Memory',
        enableSorting: false,
        cell: (info) => {
          const memorySizeBytes = info.getValue()
          const memoryUsage = getStatusMemoryUsage(info.row.original)
          return (
            <MetricCell
              type='memory'
              limitLabel='Size'
              metrics={{
                memorySizeBytes,
                memoryUsage,
              }}
            />
          )
        },
      }),
    isVisible('cpu') &&
      columnHelper.accessor((row) => getStatusCpuUsage(row), {
        id: 'cpu',
        header: 'CPU',
        enableSorting: false,
        cell: (info) => {
          const cpuUsage = info.getValue()
          const cpuTotal = getSpecCpuTotal(info.row.original)
          const sockets = getSpecSockets(info.row.original)
          const coresPerSocket = getSpecCoresPerSocket(info.row.original)
          return (
            <MetricCell
              type='cpu'
              limitLabel='Capacity'
              metrics={{
                cpuUsage,
                cpuLimit: cpuTotal,
                cpuSockets: sockets,
                cpuCoresPerSocket: coresPerSocket,
              }}
            />
          )
        },
      }),
    isVisible('version') &&
      columnHelper.accessor((row) => getVmVersion(row), {
        id: 'version',
        header: 'Version',
        enableSorting: false,
        cell: (info) => {
          const version = info.getValue()
          return <span>{version}</span>
        },
      }),
    isVisible('architecture') &&
      columnHelper.accessor((row) => getVmArchitecture(row), {
        id: 'architecture',
        header: 'Architecture',
        enableSorting: false,
        cell: (info) => {
          const architecture = info.getValue()
          return <span>{architecture}</span>
        },
      }),
    isVisible('toolVersion') &&
      columnHelper.accessor((row) => getVmToolVersion(row), {
        id: 'toolVersion',
        header: 'VMware Tools version',
        enableSorting: false,
        cell: (info) => {
          const toolVersion = info.getValue()
          return <span>{toolVersion}</span>
        },
      }),
    isVisible('family') &&
      columnHelper.accessor(
        (row) => {
          const osName = getVmFamily(row)
          return osName
        },
        {
          id: 'family',
          header: 'Family',
          enableSorting: true,
          sortingFn: 'text',
          cell: (info) => {
            const name = info.getValue()
            return <VersionLogoWithTooltip version={name} />
          },
        }
      ),
    isVisible('activeBackup') &&
      columnHelper.accessor((row) => getVMActiveBackupStatus(row), {
        id: 'activeBackup',
        header: 'Backup',
        enableSorting: true,
        cell: (info) => {
          return <BackupStatusTableDisplay vm={info.row.original} />
        },
      }),
  ].filter(Boolean) as DataTableColumnDef<VMTableRow>[]
}
