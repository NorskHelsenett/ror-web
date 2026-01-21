'use client'

import { VirtualMachineDisks } from '@ror/js-api-client'
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

export const DiskProgressBars = ({ items }: { items: VirtualMachineDisks[] }) => {
  // Check for disks with less than 20% available space
  const lowSpaceDisks = items
    .filter((disk) => {
      const size = disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0
      const usage = disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0
      const percentUsed = size > 0 ? (usage / size) * 100 : 0
      return percentUsed > 80 && percentUsed <= 95
    })
    .map((disk) => {
      const size = disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0
      const usage = disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0
      const percentUsed = size > 0 ? (usage / size) * 100 : 0
      const name = disk.name || disk.id || 'Unknown Disk'
      return { name, percentUsed }
    })

  // Check for disks with less than 5% available space (critical)
  const criticalSpaceDisks = items
    .filter((disk) => {
      const size = disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0
      const usage = disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0
      const percentUsed = size > 0 ? (usage / size) * 100 : 0
      return percentUsed > 95
    })
    .map((disk) => {
      const size = disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0
      const usage = disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0
      const percentUsed = size > 0 ? (usage / size) * 100 : 0
      const freeSpace = size - usage
      const name = disk.name || disk.id || 'Unknown Disk'
      return { name, percentUsed, freeSpace }
    })

  return (
    <div className='border border-border rounded-lg p-4 bg-background mb-6'>
      <h3 className='text-lg font-semibold mb-4'>All disks usage</h3>

      {/* Critical Disk Space Warning (less than 5% free) */}
      {criticalSpaceDisks.length > 0 && (
        <div className='mb-4 pt-3 pb-2 rounded-lg'>
          <div className='flex items-start gap-2'>
            <AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0' />
            <div>
              <h4 className='font-semibold text-red-800 dark:text-red-200 text-sm'>Critical Disk Space Warning</h4>
              <p className='text-red-700 dark:text-red-300 text-xs mt-1'>
                The following disk{criticalSpaceDisks.length > 1 ? 's have' : ' has'} less than 5% free space remaining:
              </p>
              <ul className='mt-2 space-y-1'>
                {criticalSpaceDisks.map((disk, index) => (
                  <li key={`critical-${disk.name}-${index}`} className='text-red-700 dark:text-red-300 text-xs'>
                    • <strong>{disk.name}</strong>: {disk.percentUsed.toFixed(1)}% used ({disk.freeSpace.toFixed(1)} GB
                    free)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Low Disk Space Warning */}
      {lowSpaceDisks.length > 0 && (
        <div className='mb-4 pt-3 pb-2 rounded-lg'>
          <div className='flex items-start gap-2'>
            <AlertTriangle className='h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0' />
            <div>
              <h4 className='font-semibold text-yellow-800 dark:text-yellow-200 text-sm'>Low Disk Space Warning</h4>
              <p className='text-yellow-700 dark:text-yellow-300 text-xs mt-1'>
                The following disk{lowSpaceDisks.length > 1 ? 's have' : ' has'} more than 80% used:
              </p>
              <ul className='mt-2 space-y-1'>
                {lowSpaceDisks.map((disk, index) => (
                  <li key={`warning-${disk.name}-${index}`} className='text-yellow-700 dark:text-yellow-300 text-xs'>
                    • <strong>{disk.name}</strong>: {disk.percentUsed.toFixed(1)}% used
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* All Clear Status - when no warnings */}
      {criticalSpaceDisks.length === 0 && lowSpaceDisks.length === 0 && items.length > 0 && (
        <div className='mb-4 pt-3 pb-2 rounded-lg'>
          <div className='flex items-start gap-2'>
            <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0' />
            <div>
              <h4 className='font-semibold text-green-800 dark:text-green-200 text-sm'>Disk Space Status: Healthy</h4>
              <p className='text-green-700 dark:text-green-300 text-xs mt-1'>
                All disks have sufficient free space (less than 80% used). No action required.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Individual Disk Progress Bars */}

      <div className='space-y-4'>
        {items.map((disk, index) => {
          const size = disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0
          const usage = disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0
          const percentUsed = size > 0 ? (usage / size) * 100 : 0
          const name = disk.name || disk.id || `Disk ${index + 1}`

          // Determine color based on usage percentage
          let progressColor = 'bg-green-500'
          let bgColor = 'bg-green-100 dark:bg-green-900/20'

          if (percentUsed > 95) {
            progressColor = 'bg-red-500'
            bgColor = 'bg-red-100 dark:bg-red-900/20'
          } else if (percentUsed > 80) {
            progressColor = 'bg-yellow-500'
            bgColor = 'bg-yellow-100 dark:bg-yellow-900/20'
          }

          return (
            <Tooltip key={disk.id || `disk-${index}`}>
              <TooltipTrigger asChild>
                <div className={`p-4 rounded-lg border ${bgColor}`}>
                  <div className='flex justify-between items-center mb-2'>
                    <h4 className='font-medium text-sm'>{name}</h4>
                    <div className='text-xs text-muted-foreground'>
                      {usage.toFixed(1)} GB / {size.toFixed(1)} GB
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2'>
                    <div
                      className={`h-4 rounded-full ${progressColor} transition-all duration-300 ease-out flex items-center justify-end pr-2 cursor-pointer`}
                      style={{ width: `${Math.min(percentUsed, 100)}%` }}
                    >
                      {percentUsed > 15 && (
                        <span className='text-xs text-white font-medium'>{percentUsed.toFixed(1)}%</span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>Free: {(size - usage).toFixed(1)} GB</span>
                    <span>{percentUsed.toFixed(1)}% used</span>
                  </div>

                  {/* Usage indicator */}
                  {percentUsed > 95 && (
                    <div className='mt-2 flex items-center gap-1 text-xs text-red-600 dark:text-red-400'>
                      <AlertCircle className='h-3 w-3' />
                      <span>Critical: Less than 5% free space</span>
                    </div>
                  )}
                  {percentUsed > 80 && percentUsed <= 95 && (
                    <div className='mt-2 flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400'>
                      <AlertTriangle className='h-3 w-3' />
                      <span>Warning: Low disk space</span>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Used: {usage.toFixed(2)} GB / {size.toFixed(2)} GB ({percentUsed.toFixed(2)}%)
                </p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      {/* Summary Statistics */}
      {items.length > 1 && (
        <div className='mt-6 p-4 bg-muted/50 rounded-lg'>
          <h4 className='font-medium text-sm mb-3'>Summary</h4>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
            <div>
              <div className='text-xs text-muted-foreground mb-1'>Total Capacity</div>
              <div className='font-medium'>
                {items
                  .reduce((acc, disk) => acc + (disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0), 0)
                  .toFixed(1)}{' '}
                GB
              </div>
            </div>
            <div>
              <div className='text-xs text-muted-foreground mb-1'>Total Used</div>
              <div className='font-medium'>
                {items
                  .reduce((acc, disk) => acc + (disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0), 0)
                  .toFixed(1)}{' '}
                GB
              </div>
            </div>
            <div>
              <div className='text-xs text-muted-foreground mb-1'>Average Usage</div>
              <div className='font-medium'>
                {items.length > 0
                  ? (
                      items.reduce((acc, disk) => {
                        const size = disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0
                        const usage = disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0
                        return acc + (size > 0 ? (usage / size) * 100 : 0)
                      }, 0) / items.length
                    ).toFixed(1)
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
