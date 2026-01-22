'use client'

import { useVMContext } from '@/context/vm-context'
import { getStatusCpuUsage, getSpecCpuTotal, getVmExternalId } from '../utils/vms'
import { CpuUsageLineChart } from './cpu-usage-line-chart'
import { Card, CardContent } from '@/components/shadcn/card'

export const DetailedCPUUsage = () => {
  const { vm } = useVMContext()
  const currentCpuUsage = getStatusCpuUsage(vm)
  const vmId = getVmExternalId(vm)

  if (!vm) {
    return (
      <Card>
        <CardContent>
          <div className='text-center text-gray-500 py-8'>No VM data available</div>
        </CardContent>
      </Card>
    )
  }

  const cpuSize = getSpecCpuTotal(vm)

  return (
    <div className='space-y-6'>
      <Card className='bg-slate-50 dark:bg-slate-900/50'>
        <CardContent className='p-4 pt-0'>
          <CpuUsageLineChart vmId={vmId} currentCpuUsage={currentCpuUsage} cpuSize={cpuSize} height={350} />
        </CardContent>
      </Card>
    </div>
  )
}
