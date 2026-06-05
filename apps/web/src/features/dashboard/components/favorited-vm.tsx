'use client'

import { DotIcon } from 'lucide-react'
import { cn } from '@/utils/clsxm'
import {
  getVmPowerState,
  getTeamIdentifier,
  getStatusCpuUsage,
  getSpecCpuTotal,
  getSpecMemory,
  getStatusMemoryUsage,
  getVmDisks,
  getVmUid,
  getVmName,
} from '@/features/vms/utils/vms'
import { FavoriteStar } from '@/components/ui/favorite-star'
import { ResourceBar } from '@/components/ui/resource-bar'
import { formatBytes } from '@/features/vms/components/metrics-cell'
import { VirtualMachine } from '@ror/js-api-client'

const Dot = ({ status }: { status: string }) => (
  <span className='relative flex items-center justify-center size-5'>
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

export const FavoritedVmRow = ({ vm, onUnfavorite }: { vm: VirtualMachine; onUnfavorite?: () => void }) => {
  const powerState = getVmPowerState(vm)

  const cpuUsage = getStatusCpuUsage(vm) ?? 0
  const cpuTotal = getSpecCpuTotal(vm)
  const cpuPct = (cpuTotal ? (cpuUsage / cpuTotal) * 100 : 0).toFixed(2)

  const memorySizeBytes = getSpecMemory(vm)
  const memoryUsageBytes = getStatusMemoryUsage(vm) ?? 0
  const memoryPct = (memorySizeBytes ? (memoryUsageBytes / memorySizeBytes) * 100 : 0).toFixed(2)

  const disks = getVmDisks(vm)
  const diskTotalBytes = disks.reduce((sum, d) => sum + (d.sizeBytes ?? 0), 0)
  const diskUsedBytes = disks.reduce((sum, d) => sum + (d.usageBytes ?? 0), 0)
  const diskPct = (diskTotalBytes ? (diskUsedBytes / diskTotalBytes) * 100 : 0).toFixed(2)

  const isPoweredOff = powerState === 'poweredOff'

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-3 py-2 bg-(--r-layer) rounded-md transition-opacity',
        isPoweredOff && 'opacity-50'
      )}
    >
      <Dot status={powerState} />
      <div className={cn('flex flex-1 items-center gap-3 min-w-0', isPoweredOff && 'grayscale')}>
        <span className='text-sm truncate min-w-0 shrink'>{getVmName(vm)}</span>
        <DotIcon />
        <span className='flex-1 text-sm truncate min-w-0'>{getTeamIdentifier(vm)}</span>
        <div className='flex items-center gap-1.5'>
          <span className='text-xs text-muted-foreground w-6'>CPU</span>
          <div className='w-30'>
            <ResourceBar
              capacity={cpuTotal != null ? `${cpuTotal} cores` : undefined}
              used={`${cpuUsage} cores`}
              percentage={parseFloat(cpuPct)}
            />
          </div>
        </div>
        <DotIcon />
        <div className='flex items-center gap-1.5'>
          <span className='text-xs text-muted-foreground w-12 '>Memory</span>
          <div className='w-30'>
            <ResourceBar
              capacity={memorySizeBytes != null ? formatBytes(memorySizeBytes) : undefined}
              used={formatBytes(memoryUsageBytes)}
              percentage={parseFloat(memoryPct)}
            />
          </div>
        </div>
        <DotIcon />
        <div className='flex items-center gap-1.5'>
          <span className='text-xs text-muted-foreground w-7 '>Disk</span>
          <div className='w-30'>
            <ResourceBar
              capacity={formatBytes(diskTotalBytes)}
              used={formatBytes(diskUsedBytes)}
              percentage={parseFloat(diskPct)}
            />
          </div>
        </div>
      </div>
      <FavoriteStar domain='vms' itemId={getVmUid(vm)} scale='scale-50' onUnfavorite={onUnfavorite} />
    </div>
  )
}

export const FavoritedVm = ({ vm }: { vm: VirtualMachine }) => {
  const powerState = getVmPowerState(vm)

  const cpuUsage = getStatusCpuUsage(vm) ?? 0
  const cpuTotal = getSpecCpuTotal(vm)
  const cpuPct = (cpuTotal ? (cpuUsage / cpuTotal) * 100 : 0).toFixed(2)

  const memorySizeBytes = getSpecMemory(vm)
  const memoryUsageBytes = getStatusMemoryUsage(vm) ?? 0
  const memoryPct = (memorySizeBytes ? (memoryUsageBytes / memorySizeBytes) * 100 : 0).toFixed(2)

  const disks = getVmDisks(vm)
  const diskTotalBytes = disks.reduce((sum, d) => sum + (d.sizeBytes ?? 0), 0)
  const diskUsedBytes = disks.reduce((sum, d) => sum + (d.usageBytes ?? 0), 0)
  const diskPct = (diskTotalBytes ? (diskUsedBytes / diskTotalBytes) * 100 : 0).toFixed(2)

  const isPoweredOff = powerState === 'poweredOff'

  return (
    <div className={cn('flex flex-col gap-2 min-w-86 transition-opacity', isPoweredOff && 'opacity-75')}>
      <div className='flex items-center'>
        <Dot status={powerState} />
        <div className={cn('flex items-center min-w-0', isPoweredOff && 'grayscale')}>
          <DisplayedPowerState status={powerState} className='text-sm' />
          <DotIcon />
          <span className='text-sm truncate max-w-48'>{getTeamIdentifier(vm)}</span>
        </div>
      </div>
      <div className={cn('flex flex-col gap-1 pl-1', isPoweredOff && 'grayscale')}>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground w-7'>CPU</span>
          <ResourceBar
            capacity={cpuTotal != null ? `${cpuTotal} cores` : undefined}
            used={`${cpuUsage} cores`}
            percentage={parseFloat(cpuPct)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground w-7'>Mem</span>
          <ResourceBar
            capacity={memorySizeBytes != null ? formatBytes(memorySizeBytes) : undefined}
            used={formatBytes(memoryUsageBytes)}
            percentage={parseFloat(memoryPct)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground w-7 '>Disk</span>
          <ResourceBar
            capacity={formatBytes(diskTotalBytes)}
            used={formatBytes(diskUsedBytes)}
            percentage={parseFloat(diskPct)}
          />
        </div>
      </div>
    </div>
  )
}
