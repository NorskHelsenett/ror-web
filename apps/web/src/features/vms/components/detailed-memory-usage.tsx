'use client'

import { useVMContext } from '@/context/vm-context'
import { getSpecMemory, getStatusMemoryUsage, getVmUniqueKey } from '../utils/vms'
import { MemoryUsageLineChart } from './cpu-usage-line-chart'
import { Card, CardContent } from '@/components/shadcn/card'

export const DetailedMemoryUsage = () => {
  const { vm } = useVMContext()
  const currentMemoryUsage = getStatusMemoryUsage(vm)
  const vmId = getVmUniqueKey(vm)

  if (!vm) {
    return (
      <Card>
        <CardContent>
          <div className='text-center text-gray-500 py-8'>No VM data available</div>
        </CardContent>
      </Card>
    )
  }

  const memorySize = getSpecMemory(vm)

  return (
    <div className='space-y-6'>
      <Card className='bg-slate-50 dark:bg-slate-900/50'>
        <CardContent className='p-4 pt-0'>
          <MemoryUsageLineChart
            vmId={vmId}
            currentMemoryUsage={currentMemoryUsage}
            memorySize={memorySize}
            height={350}
          />
        </CardContent>
      </Card>
    </div>
  )
}
