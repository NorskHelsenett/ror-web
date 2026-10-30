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
import { useRouter } from 'next/navigation'
import { routes } from '@/config/routes'

const Dot = ({ status }: { status: string }) => (
  <span aria-hidden='true' className='relative flex shrink-0 items-center justify-center size-5'>
    <span
      className={cn(
        'absolute inset-0 rounded-full',
        status === 'poweredOn' ? 'bg-emerald-500/15' : status === 'poweredOff' ? 'bg-red-500/15' : 'bg-gray-500/15'
      )}
    />
    <span
      className={cn(
        'relative size-2.5 rounded-full',
        status === 'poweredOn' ? 'bg-emerald-500' : status === 'poweredOff' ? 'bg-red-500' : 'bg-gray-500'
      )}
    />
  </span>
)

const DisplayedPowerState = ({ status, className }: { status: string; className?: string }) => {
  const label = status === 'poweredOn' ? 'Power on' : status === 'poweredOff' ? 'Power off' : 'Unknown'
  return <span className={className}>{label}</span>
}

const vmRowGrid =
  'grid grid-cols-[minmax(160px,1fr)_minmax(160px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)_36px] min-w-[1000px] items-center gap-6 px-3'

export const FavoritedVmHeader = () => (
  <div className={cn(vmRowGrid, 'py-3 border-b border-subtle text-xs uppercase tracking-widest text-muted-foreground')}>
    <span>VM</span>
    <span>Team</span>
    <span>CPU</span>
    <span>Memory</span>
    <span>Disk</span>
    <span className='sr-only'>Favorite</span>
  </div>
)

export const FavoritedVmRow = ({ vm, onUnfavorite }: { vm: VirtualMachine; onUnfavorite?: () => void }) => {
  const router = useRouter()
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
      onClick={() => {
        localStorage.setItem('selectedVm', JSON.stringify(vm))
        router.push(routes.app.vm.getHref(getVmUid(vm)))
      }}
      className={cn(
        vmRowGrid,
        'py-4 border-b border-subtle transition-opacity cursor-pointer',
        isPoweredOff && 'opacity-50'
      )}
    >
      <div className='flex items-center gap-3 min-w-0'>
        <Dot status={powerState} />
        <div className='min-w-0'>
          <p className='text-sm font-medium font-mono truncate'>{getVmName(vm)}</p>
          <DisplayedPowerState status={powerState} className='text-xs text-muted-foreground' />
        </div>
      </div>
      <span className='text-sm truncate'>{getTeamIdentifier(vm)}</span>
      <div className='flex items-center min-w-0' aria-label='CPU usage'>
        <ResourceBar
          capacity={cpuTotal != null ? `${cpuTotal} cores` : undefined}
          used={`${cpuUsage} cores`}
          percentage={parseFloat(cpuPct)}
        />
      </div>
      <div className='flex items-center min-w-0' aria-label='Memory usage'>
        <ResourceBar
          capacity={memorySizeBytes != null ? formatBytes(memorySizeBytes) : undefined}
          used={formatBytes(memoryUsageBytes)}
          percentage={parseFloat(memoryPct)}
        />
      </div>
      <div className='flex items-center min-w-0' aria-label='Disk usage'>
        <ResourceBar
          capacity={formatBytes(diskTotalBytes)}
          used={formatBytes(diskUsedBytes)}
          percentage={parseFloat(diskPct)}
        />
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
