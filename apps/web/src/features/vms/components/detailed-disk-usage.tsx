'use client'
import { BarChart, Bar, YAxis, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useVMContext } from '@/context/vm-context'
import { getVmDisks } from '../utils/vms'

export const DetailedDiskUsage = () => {
  const { vm } = useVMContext()
  const diskSizes = getVmDisks(vm)
  const chartData = diskSizes.map((disk) => {
    const size = disk.sizeBytes ? Number(disk.sizeBytes) / 1024 ** 3 : 0
    const usage = disk.usageBytes ? Number(disk.usageBytes) / 1024 ** 3 : 0
    const name = disk.name || disk.id || 'Unknown Disk'

    return {
      name,
      'Size (GB)': Number(size.toFixed(2)),
      'Usage (GB)': Number(usage.toFixed(2)),
      'Free (GB)': Number((size - usage).toFixed(2)),
    }
  })

  return (
    <div className='space-y-6'>
      <div>
        <ResponsiveContainer width='100%' height={400}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey='name' fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip
              formatter={(value, name) => [`${value} GB`, name]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--foreground)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey='Size (GB)' fill='#3b82f6' radius={[2, 2, 0, 0]} name='Total Size' />
            <Bar dataKey='Usage (GB)' fill='#f6795aff' radius={[2, 2, 0, 0]} name='Used Space' />
          </BarChart>
        </ResponsiveContainer>

        {/* Custom Legend with circles and smaller text */}
        <div className='flex justify-center items-center gap-6 mt-3'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full' style={{ backgroundColor: '#3b82f6' }}></div>
            <span className='text-xs text-muted-foreground'>Total Size</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full' style={{ backgroundColor: '#f6795aff' }}></div>
            <span className='text-xs text-muted-foreground'>Used Space</span>
          </div>
        </div>
      </div>
    </div>
  )
}
