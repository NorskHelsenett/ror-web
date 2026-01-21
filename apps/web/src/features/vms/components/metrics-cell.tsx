import { useCallback, useMemo } from 'react'
import { getDiskColors } from '../utils/env-colors'
import type { MetricsData } from '../utils/vms'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatMemory(memory: string | number): string {
  if (typeof memory === 'number') {
    return formatBytes(memory)
  }

  const units = {
    Ki: 1024,
    Mi: 1024 * 1024,
    Gi: 1024 * 1024 * 1024,
    Ti: 1024 * 1024 * 1024 * 1024,
    K: 1000,
    M: 1000 * 1000,
    G: 1000 * 1000 * 1000,
    T: 1000 * 1000 * 1000 * 1000,
  }

  for (const [suffix, multiplier] of Object.entries(units)) {
    if (memory.endsWith(suffix)) {
      const value = parseFloat(memory.slice(0, -suffix.length))
      return formatBytes(value * multiplier)
    }
  }

  // If no unit, assume bytes
  const numValue = parseFloat(memory)
  if (!isNaN(numValue)) {
    return formatBytes(numValue)
  }

  return memory
}

const mergeDisks = (diskSizes?: number[], diskUsages?: number[]) => {
  if (!diskSizes) return []

  return diskSizes.map((size, idx) => ({
    diskSize: size,
    diskUsage: diskUsages ? diskUsages[idx] : undefined,
  }))
}

export function MetricCell({
  metrics,
  type = 'cpu',
  limitLabel = 'Limit',
  showPercentage = false,
}: {
  metrics?: MetricsData
  type: 'cpu' | 'memory' | 'disk'
  limitLabel?: string // e.g 'Size' or 'Limit'
  showPercentage?: boolean // Whether to show percentage in the display
}) {
  const diskData = useMemo(() => {
    if (type !== 'disk') return null
    if (metrics?.disks?.length) {
      return metrics.disks
    } else if (metrics?.diskSizes?.length) {
      return mergeDisks(metrics.diskSizes, metrics.diskUsages)
    } else if (metrics?.diskSize !== undefined) {
      return [
        {
          diskSize: metrics.diskSize,
          diskUsage: metrics.diskUsage || 0,
        },
      ]
    }
    return []
  }, [type, metrics])

  // Handle different data structures based on type
  const metricValue = useMemo(() => {
    if (type === 'cpu') return metrics?.cpuUsage || 0
    if (type === 'memory') return metrics?.memoryUsage || 0
    if (type === 'disk') {
      // Sum all disk usages for combined view
      return diskData?.reduce((sum, disk) => sum + (disk.diskUsage || 0), 0) || 0
    }
    return 0
  }, [type, metrics, diskData])

  const metricLimit = useMemo(() => {
    if (type === 'cpu') return metrics?.cpuLimit || metrics?.cpuSize
    if (type === 'memory') return metrics?.memorySizeBytes || metrics?.memoryLimit
    if (type === 'disk') {
      // Sum all disk sizes for combined view
      return diskData?.reduce((sum, disk) => sum + disk.diskSize, 0) || 0
    }
    return undefined
  }, [type, metrics, diskData])

  const metricRequest = useMemo(() => {
    if (type === 'cpu') return metrics?.cpuRequest
    if (type === 'memory') return metrics?.memoryRequest
    // No request concept for disk
    return undefined
  }, [type, metrics])

  const formatValue = useCallback(
    (val?: number) => {
      if (val === undefined || val === null) return '-'
      if (type === 'cpu') return `${val}m`
      if (type === 'disk') return formatBytes(val)
      return formatMemory(val)
    },
    [type]
  )

  return useMemo(() => {
    const percentage = metricLimit ? Math.min((metricValue / metricLimit) * 100, 100) : 0

    const requestPercentage = metricRequest && metricLimit ? Math.min((metricRequest / metricLimit) * 100, 100) : 0

    // Calculate free space for disk and memory types
    const freeSpace = (type === 'disk' || type === 'memory') && metricLimit ? metricLimit - metricValue : undefined

    const getProgressColor = () => {
      if (percentage > 90) return 'bg-red-500'
      if (percentage > 60) return 'bg-yellow-500'
      return 'bg-blue-500'
    }

    const getTooltipContent = () => {
      const sockets = metrics?.cpuSockets || 1
      const coresPerSocket = metrics?.cpuCoresPerSocket || (metricLimit ? Math.round(metricLimit / sockets) : 1)

      if (type === 'disk') {
        if (diskData && diskData.length > 1) {
          const colors = getDiskColors(diskData.length)
          return (
            <div className='text-sm space-y-2'>
              <div className='grid grid-cols-2 gap-x-3 gap-y-0.5 min-w-0 border-b border-border pb-2'>
                <span>
                  <strong>Total Usage:</strong>
                </span>
                <span className='text-right'>
                  <strong>{formatValue(metricValue)}</strong>
                </span>
                <span>
                  <strong>Total Size:</strong>
                </span>
                <span className='text-right'>
                  <strong>{formatValue(metricLimit)}</strong>
                </span>
                <span>
                  <strong>Free Space:</strong>
                </span>
                <span className='text-right'>
                  <strong>{formatValue(freeSpace)}</strong>
                </span>
              </div>
              <div className='space-y-1.5'>
                <div className='text-xs font-medium text-muted-foreground'>All Disks:</div>
                {diskData.map((disk, idx) => {
                  const diskFree = disk.diskSize - (disk.diskUsage || 0)
                  const diskPercentage = disk.diskSize > 0 ? ((disk.diskUsage || 0) / disk.diskSize) * 100 : 0
                  const diskId = 'id' in disk ? disk.id : undefined
                  const diskName = 'name' in disk ? disk.name : undefined
                  const diskMounted = 'isMounted' in disk ? disk.isMounted : undefined

                  return (
                    <div key={diskId || idx} className='grid grid-cols-[auto_1fr_auto] gap-x-2 items-center text-xs'>
                      <div className={`w-2 h-2 rounded-sm ${colors[idx]}`}></div>
                      <div className='truncate'>
                        {diskName || `Disk ${idx + 1}`}
                        {diskMounted !== undefined && (
                          <span
                            className={`ml-1 text-[10px] ${diskMounted ? 'text-green-600' : 'text-muted-foreground'}`}
                          >
                            {diskMounted ? '(mounted)' : '(unmounted)'}
                          </span>
                        )}
                      </div>
                      <div className='text-right space-y-0.5'>
                        <div>
                          {formatValue(disk.diskUsage)} / {formatValue(disk.diskSize)}
                        </div>
                        <div className='text-[10px] text-muted-foreground'>
                          {diskPercentage.toFixed(1)}% used, {formatValue(diskFree)} free
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        } else {
          return (
            <div className='text-sm grid grid-cols-2 gap-x-3 gap-y-0.5 min-w-0'>
              <span>Usage:</span>
              <span className='text-right'>{formatValue(metricValue)}</span>
              <span>Size:</span>
              <span className='text-right'>{formatValue(metricLimit)}</span>
              <span>Free space:</span>
              <span className='text-right'>{formatValue(freeSpace)}</span>
            </div>
          )
        }
      } else if (type === 'memory') {
        return (
          <div className='text-sm grid grid-cols-2 gap-x-3 gap-y-0.5 min-w-0'>
            <span>Usage:</span>
            <span className='text-right'>{formatValue(metricValue)}</span>
            <span>Size:</span>
            <span className='text-right'>{formatValue(metricLimit)}</span>
            <span>Free space:</span>
            <span className='text-right'>{formatValue(freeSpace)}</span>
          </div>
        )
      } else {
        return (
          <div className='text-sm grid grid-cols-2 gap-x-3 gap-y-0.5 min-w-0'>
            <span>
              <b>Total cores:</b>
            </span>
            <span className='text-right'>
              <b>{metricLimit || 0}</b>
            </span>
            <span>Sockets:</span>
            <span className='text-right'>{sockets}</span>
            <span>Cores per socket:</span>
            <span className='text-right'>{coresPerSocket}</span>
            <span>Usage:</span>
            <span className='text-right'>{formatValue(metricValue)}</span>
            <span>{limitLabel}:</span>
            <span className='text-right'>{formatValue(metricLimit)}</span>
          </div>
        )
      }
    }

    return (
      <div className='flex items-center justify-center gap-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='w-14 h-2 relative'>
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden'>
                {type === 'disk' && diskData && diskData.length > 1 && metricLimit ? (
                  <div className='flex h-full'>
                    {(() => {
                      const colors = getDiskColors(diskData.length)
                      return diskData.map((disk, idx) => {
                        const diskUsagePercentage = metricLimit > 0 ? ((disk.diskUsage || 0) / metricLimit) * 100 : 0
                        const segmentWidth = Math.max(diskUsagePercentage, diskUsagePercentage > 0 ? 0.5 : 0)

                        return (
                          <div
                            key={idx}
                            className={`h-full transition-all duration-300 ${colors[idx]}`}
                            style={{
                              width: `${segmentWidth}%`,
                              minWidth: diskUsagePercentage > 0 ? '1px' : '0px',
                            }}
                          />
                        )
                      })
                    })()}
                  </div>
                ) : (
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                    style={{
                      width: `${Math.max(percentage, percentage > 0 ? 2 : 0)}%`,
                      minWidth: percentage > 0 ? '2px' : '0px',
                    }}
                  />
                )}
              </div>
              {metricRequest && metricLimit && (
                <div
                  className='absolute -top-0.5 h-3 flex items-center justify-center'
                  style={{
                    left: `${requestPercentage}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className='w-0.5 h-3 bg-muted-foreground dark:bg-gray-400 rounded-sm shadow-sm'></div>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>{getTooltipContent()}</TooltipContent>
        </Tooltip>
        <span className='w-[10ch] text-right inline-block text-xs text-muted-foreground whitespace-nowrap tabular-nums'>
          {formatValue(metricValue)}
          {showPercentage && metricLimit && metricValue > 0 && (
            <span className='text-[10px] opacity-70'>({percentage.toFixed(0)}%)</span>
          )}
        </span>
      </div>
    )
  }, [
    metricLimit,
    metricValue,
    metricRequest,
    formatValue,
    limitLabel,
    type,
    showPercentage,
    diskData,
    metrics?.cpuCoresPerSocket,
    metrics?.cpuSockets,
  ])
}
