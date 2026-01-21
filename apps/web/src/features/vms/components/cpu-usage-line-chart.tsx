'use client'

import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/shadcn/chart'
import {
  cpuUsageHistory,
  memoryUsageHistory,
  HistoryTimeRange,
  USAGE_HISTORY_CONFIGS,
  UsageHistory,
} from '../utils/usage-history'
import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/shadcn/button'
import { Activity, RotateCcw, Clock, MemoryStick } from 'lucide-react'
import { cn } from '@/utils/clsxm'
import { formatMemory } from './metrics-cell'

interface CpuUsageLineChartProps {
  vmId: string
  currentCpuUsage?: number
  cpuSize?: number
  className?: string
  height?: number
}

interface UsageLineChartProps {
  vmId: string
  type: 'cpu' | 'memory'
  currentUsage?: number
  maxCapacity?: number
  className?: string
  height?: number
}

const chartConfigs = {
  cpu: {
    cpuUsage: {
      label: 'CPU Usage',
      color: '#0c8aca',
    },
  },
  memory: {
    memoryUsage: {
      label: 'Memory Usage',
      color: '#8b5cf6',
    },
  },
} as const

const getChartConfig = (type: 'cpu' | 'memory') => {
  return chartConfigs[type]
}

const getUsageHistory = (type: 'cpu' | 'memory'): UsageHistory => {
  return type === 'cpu' ? cpuUsageHistory : memoryUsageHistory
}

const getUsageIcon = (type: 'cpu' | 'memory') => {
  return type === 'cpu' ? Activity : MemoryStick
}

const getUsageLabel = (type: 'cpu' | 'memory') => {
  return type === 'cpu' ? 'CPU Usage' : 'Memory Usage'
}

const timeRangeLabels = {
  hourly: { label: 'Last Hour', icon: Clock },
  daily: { label: 'Last 24 Hours', icon: Clock },
  weekly: { label: 'Last 7 Days', icon: Clock },
}

export const UsageLineChart = ({
  vmId,
  type = 'cpu',
  currentUsage,
  maxCapacity = 0,
  className,
  height = 600,
}: UsageLineChartProps) => {
  const [timeRange, setTimeRange] = useState<HistoryTimeRange>('daily')
  const [chartData, setChartData] = useState<ReturnType<typeof cpuUsageHistory.getChartData>>([])
  const [, setStats] = useState<ReturnType<typeof cpuUsageHistory.getStats>>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const usageHistory = getUsageHistory(type)
  const chartConfig = getChartConfig(type)
  const UsageIcon = getUsageIcon(type)
  const usageLabel = getUsageLabel(type)
  const unit = usageHistory.getUnit()

  const refreshData = useCallback(() => {
    setIsRefreshing(true)
    const data = usageHistory.getChartData(vmId, timeRange)
    const statistics = usageHistory.getStats(vmId, timeRange)
    setChartData(data)
    setStats(statistics)
    setTimeout(() => setIsRefreshing(false), 300)
  }, [vmId, timeRange, usageHistory])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  // Add current usage whenever it changes
  useEffect(() => {
    if (currentUsage !== undefined && currentUsage !== null && vmId) {
      usageHistory.addCurrentReading(vmId, currentUsage, timeRange)
      const data = usageHistory.getChartData(vmId, timeRange)
      const statistics = usageHistory.getStats(vmId, timeRange)
      setChartData(data)
      setStats(statistics)
    }
  }, [currentUsage, vmId, timeRange, type, usageHistory])

  const clearHistory = useCallback(() => {
    usageHistory.clearHistory(vmId)
    refreshData()
  }, [vmId, usageHistory, refreshData])

  const formatTooltipLabel = (label: string, payload: Array<{ payload?: { timestamp: string } }>) => {
    if (payload && payload.length > 0 && payload[0].payload) {
      const dataPoint = payload[0].payload
      return `${new Date(dataPoint.timestamp).toLocaleString('en-GB', { timeZone: 'Europe/Oslo' })}`
    }
    return label
  }

  const hasData = chartData.length > 0

  return (
    <div className={cn('space-y-2 ', className)}>
      {/* Header with controls */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 mb-2'>
          <UsageIcon className='h-4 w-4 text-blue-600' />
          <h3 className='text-lg font-medium'>{usageLabel}</h3>
          {isRefreshing && (
            <div className='animate-spin h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full' />
          )}
        </div>
        <div className='flex items-center gap-1'>
          <Button variant='outline' size='sm' onClick={refreshData} disabled={isRefreshing} className='h-7 px-2'>
            <RotateCcw className={cn('h-3 w-3', isRefreshing && 'animate-spin')} />
          </Button>
          <Button variant='outline' size='sm' onClick={clearHistory} className='h-7 px-2'>
            Clear
          </Button>
        </div>
      </div>

      {/* Time range selector */}
      <div className='flex gap-1 mb-5'>
        {(Object.keys(USAGE_HISTORY_CONFIGS) as HistoryTimeRange[]).map((range) => {
          const { label, icon: Icon } = timeRangeLabels[range]
          return (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size='sm'
              onClick={() => setTimeRange(range)}
              className='flex items-center gap-1 h-7 px-2 text-xs'
            >
              <Icon className='h-3 w-3' />
              {label}
            </Button>
          )
        })}
      </div>
      {/* Message to user about short lived data */}
      <p className='text-xs text-muted-foreground mt-1'>Data is temporarily stored in the browser web storage</p>

      {/* Chart */}
      {hasData ? (
        <ChartContainer config={chartConfig} className={`w-full`} style={{ height: Math.min(height, 600) }}>
          <ResponsiveContainer width='100%' height={Math.min(height, 600)}>
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 15,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray='1 1' />
              <XAxis
                dataKey='formattedTime'
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                fontSize={10}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                angle={timeRange === 'weekly' ? -45 : 0}
                textAnchor={timeRange === 'weekly' ? 'end' : 'middle'}
                height={timeRange === 'weekly' ? 40 : 30}
              />
              <YAxis
                tickLine={false}
                axisLine={true}
                fontSize={10}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, maxCapacity]}
                width={50}
                tickFormatter={(value) => {
                  if (type === 'memory') {
                    return formatMemory(Number(value))
                  }
                  return `${value} ${unit}`
                }}
                label={{
                  value: type === 'memory' ? '' : unit,
                  angle: -90,
                  position: 'insideLeft',
                  offset: 0,
                  fontSize: 10,
                }}
              />
              <Tooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => {
                      if (type === 'memory') {
                        return [`${formatMemory(Number(value))}`, '']
                      }
                      return [`${value}`, ` ${unit}`]
                    }}
                    labelFormatter={formatTooltipLabel}
                  />
                }
              />

              {/* Reference lines for warnings (customize based on type) */}
              {type === 'cpu' && (
                <>
                  <ReferenceLine y={maxCapacity * 0.8} stroke='#f59e0b' strokeDasharray='5 5' />
                  <ReferenceLine y={maxCapacity * 0.9} stroke='#ef4444' strokeDasharray='5 5' />
                </>
              )}
              {type === 'memory' && (
                <>
                  <ReferenceLine y={maxCapacity * 0.85} stroke='#f59e0b' strokeDasharray='5 5' />
                  <ReferenceLine y={maxCapacity * 0.95} stroke='#ef4444' strokeDasharray='5 5' />
                </>
              )}

              <Area
                type='monotone'
                dataKey={usageHistory.getDataKey()}
                stroke={`var(--color-${usageHistory.getDataKey()})`}
                fill={`var(--color-${usageHistory.getDataKey()})`}
                fillOpacity={0.1}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, stroke: `var(--color-${usageHistory.getDataKey()})`, strokeWidth: 1 }}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div className='flex flex-col items-center justify-center h-32 bg-gray-50 dark:bg-gray-800 rounded-lg'>
          <UsageIcon className='h-8 w-8 text-gray-400 mb-2' />
          <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'>No {usageLabel} History</h4>
          <p className='text-xs text-gray-500 text-center'>Data will appear once collected</p>
        </div>
      )}
    </div>
  )
}

// Wrapper component for backwards compatibility
export const CpuUsageLineChart = ({
  vmId,
  currentCpuUsage,
  cpuSize = 0,
  className,
  height = 600,
}: CpuUsageLineChartProps) => {
  return (
    <UsageLineChart
      vmId={vmId}
      type='cpu'
      currentUsage={currentCpuUsage}
      maxCapacity={cpuSize}
      className={className}
      height={height}
    />
  )
}

// Memory chart component using the generic chart
interface MemoryUsageLineChartProps {
  vmId: string
  currentMemoryUsage?: number
  memorySize?: number
  className?: string
  height?: number
}

export const MemoryUsageLineChart = ({
  vmId,
  currentMemoryUsage,
  memorySize = 0,
  className,
  height = 600,
}: MemoryUsageLineChartProps) => {
  return (
    <UsageLineChart
      vmId={vmId}
      type='memory'
      currentUsage={currentMemoryUsage}
      maxCapacity={memorySize}
      className={className}
      height={height}
    />
  )
}
