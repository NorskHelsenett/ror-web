'use client'

import { VirtualMachine } from '@ror/js-api-client'
import { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import { DotIcon } from 'lucide-react'
import { cn } from '@/utils/clsxm'
import {
  getVmPowerState,
  getTeamIdentifier,
  getLocation,
  getVmFamily,
  getStatusCpuUsage,
  getSpecCpuTotal,
  getSpecMemory,
  getStatusMemoryUsage,
  getVmDisks,
} from '@/features/vms/utils/vms'
import { ResourceBar } from '@/features/cluster/components/resource-bar'
import { formatBytes } from '@/features/vms/components/metrics-cell'
import { BackupStatusTableDisplay } from '@/features/vms/backup/components/backup-status-display'

const Dot = ({ status }: { status: string }) => (
  <span className='flex items-center justify-around size-5'>
    <span
      className={cn(
        'size-4 rounded-full opacity-75',
        status === 'poweredOn' ? 'bg-emerald-500' : status === 'poweredOff' ? 'bg-red-500' : 'bg-gray-500'
      )}
    />
    <span
      className={cn(
        'size-3 absolute z-10 rounded-full',
        status === 'poweredOn' ? 'bg-emerald-700' : status === 'poweredOff' ? 'bg-red-700' : 'bg-gray-700'
      )}
    />
  </span>
)

const DisplayedPowerState = ({ status, className }: { status: string; className?: string }) => {
  const label = status === 'poweredOn' ? 'Power on' : status === 'poweredOff' ? 'Power off' : 'Unknown'
  return <span className={className}>{label}</span>
}

export const FavoritedVm = ({ vm }: { vm: VMWithBackupStatus }) => {
  const powerState = getVmPowerState(vm)

  const cpuUsage = getStatusCpuUsage(vm) ?? 0
  const cpuTotal = getSpecCpuTotal(vm)

  const memorySizeBytes = getSpecMemory(vm)
  const memoryUsageBytes = getStatusMemoryUsage(vm) ?? 0
  const memoryPct = memorySizeBytes ? (memoryUsageBytes / memorySizeBytes) * 100 : 0

  const disks = getVmDisks(vm)
  const diskTotalBytes = disks.reduce((sum, d) => sum + (d.sizeBytes ?? 0), 0)
  const diskUsedBytes = disks.reduce((sum, d) => sum + (d.usageBytes ?? 0), 0)
  const diskPct = diskTotalBytes ? (diskUsedBytes / diskTotalBytes) * 100 : 0

  return (
    <div className='flex flex-col gap-2 min-w-86'>
      <div className='flex items-center'>
        <Dot status={powerState} />
        <DisplayedPowerState status={powerState} className='text-sm' />
        <DotIcon />
        <span className='text-sm truncate max-w-48'>{getTeamIdentifier(vm)}</span>
      </div>
      <div className='flex items-center gap-2 pl-1'>
        <span className='text-xs'>CPU</span>
        <ResourceBar
          capacity={cpuTotal != null ? `${cpuTotal} cores` : undefined}
          used={`${cpuUsage}%`}
          percentage={cpuUsage}
          showPercentage={false}
        />
        <span className='text-xs shrink-0 text-muted-foreground'>Mem</span>
        <ResourceBar
          capacity={memorySizeBytes != null ? formatBytes(memorySizeBytes) : undefined}
          used={formatBytes(memoryUsageBytes)}
          percentage={memoryPct}
          showPercentage={false}
        />
        <span className='text-xs shrink-0 text-muted-foreground'>Disk</span>
        <ResourceBar
          capacity={formatBytes(diskTotalBytes)}
          used={formatBytes(diskUsedBytes)}
          percentage={diskPct}
          showPercentage={false}
        />
      </div>
      <div className='flex items-center gap-2 pl-1 pt-1 border-t border-gray-700'>
        <span className='text-xs text-muted-foreground shrink-0'>Backup</span>
        <BackupStatusTableDisplay vm={vm} />
      </div>
    </div>
  )
}
