/**
 * VM Card Component
 *
 * FILE OVERVIEW:
 * ------------------------
 * This file defines a React component that displays a card view of a Virtual Machine (VM).
 * It includes various details about the VM, such as its name, hostname, ID, power state, and operating system information.
 * The card is styled based on the VM's power state and provides a link to the VM's detailed page.
 *
 */
'use client'

import * as React from 'react'

import { cn } from '@/utils/clsxm'
import Link from 'next/link'
import { vmCardPowerStatus } from '@/features/vms/utils/env-colors'
import {
  getTeamValue,
  getVmArchitecture,
  getVmFamily,
  getVmHostName,
  getVmOperatingSystemId,
  getVmName,
  getVmPowerState,
  getVmToolVersion,
  getVmVersion,
  VMCardProps,
  getTeamDescription,
  getSpecMemory,
  getStatusMemoryUsage,
  getStatusCpuUsage,
  getSpecCpuTotal,
  getSpecSockets,
  getSpecCoresPerSocket,
  getVmDisks,
} from '@/features/vms/utils/vms'
import { changePowerStateValues } from '../types/powerState'
import { BackupStatusDisplay } from '@/features/vms/backup/components'
import { Badge } from '@/components/shadcn/badge'
import { PowerStatusIcon } from './power-status-icon'
import { routes } from '@/config/routes'
import { MetricCell } from './metrics-cell'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn('bg-[var(--r-layer)] text-card-foreground flex flex-col rounded-xl py-6 shadow-sm', className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-header' className={cn('@container/card-header h-10', className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-title' className={cn('leading-none font-semibold', className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn('px-6', className)} {...props} />
}

const VMCard = ({ className, vm, vmDisplayData }: VMCardProps) => {
  const name = getVmName(vm)
  const id = getVmOperatingSystemId(vm)
  const family = getVmFamily(vm)
  const hostName = getVmHostName(vm)
  const version = getVmVersion(vm)
  const architecture = getVmArchitecture(vm)
  const toolVersion = getVmToolVersion(vm)
  const powerState = getVmPowerState(vm)

  const teamValue = getTeamValue(vm)
  const teamDescription = getTeamDescription(vm)

  const envColor = vmCardPowerStatus[powerState ?? 'undefined'] ?? vmCardPowerStatus['undefined']

  const Info = ({ label, value }: { label: string; value: string | number }) => {
    return (
      <div>
        <p className='font-bold'>{label}</p>
        <p>{value}</p>
      </div>
    )
  }

  const PowerState = () => {
    return vmDisplayData?.includes('powerState') ? (
      <div className='flex items-center gap-5'>
        <p className='font-bold'>Power</p>
        <Badge variant='outline' className='px-1.5 text-base-muted'>
          <PowerStatusIcon status={powerState} className='mr-2' />
          {changePowerStateValues[powerState ?? 'Undefined'].charAt(0).toUpperCase() +
            changePowerStateValues[powerState ?? 'Undefined'].slice(1)}
        </Badge>
      </div>
    ) : null
  }

  const teamFallback = () => {
    if (teamDescription == '') {
      return teamValue
    }
    return teamDescription
  }

  const MetricsSection = () => {
    const showCpu = vmDisplayData?.includes('cpu')
    const showMemory = vmDisplayData?.includes('memory')
    const showDiskUsage = vmDisplayData?.includes('disk-usage')

    if (!showCpu && !showMemory && !showDiskUsage) {
      return null
    }

    // Get CPU metrics
    const cpuUsage = getStatusCpuUsage(vm)
    const cpuTotal = getSpecCpuTotal(vm)
    const sockets = getSpecSockets(vm)
    const coresPerSocket = getSpecCoresPerSocket(vm)

    // Get Memory metrics
    const memorySizeBytes = getSpecMemory(vm)
    const memoryUsage = getStatusMemoryUsage(vm)

    // Get Disk metrics
    const disks = getVmDisks(vm)
    const diskData = disks.map((disk, idx) => ({
      id: disk.id || `disk-${idx}`,
      name: disk.name || `Disk ${idx + 1}`,
      diskSize: disk.sizeBytes || 0,
      diskUsage: disk.usageBytes || 0,
      isMounted: disk.isMounted || undefined,
    }))

    return (
      <div className='space-y-3'>
        <div className='grid gap-3'>
          {showCpu && (
            <div className='flex items-center justify-between'>
              <span className='font-bold'>CPU usage</span>
              <MetricCell
                type='cpu'
                limitLabel='Total'
                metrics={{
                  cpuUsage,
                  cpuLimit: cpuTotal,
                  cpuSockets: sockets,
                  cpuCoresPerSocket: coresPerSocket,
                }}
              />
            </div>
          )}
          {showMemory && (
            <div className='flex items-center justify-between'>
              <span className='font-bold'>Memory</span>
              <MetricCell
                type='memory'
                limitLabel='Size'
                metrics={{
                  memorySizeBytes,
                  memoryUsage,
                }}
              />
            </div>
          )}
          {showDiskUsage && diskData.length > 0 && (
            <div className='flex items-center justify-between'>
              <span className='font-bold'>Disks</span>
              <MetricCell
                type='disk'
                metrics={{
                  disks: diskData,
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={routes.app.vm.getHref(hostName?.toLowerCase())}
      onClick={() => localStorage.setItem('selectedVm', JSON.stringify(vm))}
    >
      <Card
        className={cn(
          'group w-sm min-w-64 pt-0 hover:bg-[#ededed] dark:hover:bg-neutral-800 hover:cursor-pointer @vm vm',
          className
        )}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && localStorage.setItem('selectedVm', JSON.stringify(vm))}
      >
        <CardHeader className='m-0 mb-4 p-0 w-full relative'>
          <CardTitle className={cn('text-sm rounded-t-xl px-6 py-2 flex', envColor[0], envColor[1])}>
            {hostName.toLowerCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className='text-sm flex flex-col gap-3 '>
          {vmDisplayData?.includes('team') && (
            <div>
              <div className='grid grid-cols-2 gap-4 mb-2'>
                <p className='font-bold'>Team</p>
                <p className='text-md'>{teamFallback()}</p>
              </div>
              <div className='border-b border-gray-700 mt-1'></div>
            </div>
          )}
          <section className='grid grid-cols-2 gap-4 '>
            {vmDisplayData?.includes('name') && <Info label='OS-version' value={name ?? 'N/A'} />}
            {vmDisplayData?.includes('id') && <Info label='ID' value={id ?? 'N/A'} />}
            {vmDisplayData?.includes('architecture') && <Info label='Architecture' value={architecture ?? 'N/A'} />}
            {vmDisplayData?.includes('family') && <Info label='Family' value={family ?? 'N/A'} />}
            {vmDisplayData?.includes('version') && <Info label='Version' value={version ?? 'N/A'} />}
            {vmDisplayData?.includes('toolVersion') && (
              <Info label='VMware Tools version' value={toolVersion ?? 'N/A'} />
            )}
          </section>
          <PowerState />
          <div className='border-b border-gray-700 mt-1'></div>
          <MetricsSection />
          <div className='border-b border-gray-700 mt-1 mb-2'></div>
          {vmDisplayData?.includes('activeBackup') && <BackupStatusDisplay vm={vm} />}
        </CardContent>
      </Card>
    </Link>
  )
}

export { VMCard }
