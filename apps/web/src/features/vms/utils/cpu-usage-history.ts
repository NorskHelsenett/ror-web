import { format } from 'date-fns'

export interface CpuUsageDataPoint {
  timestamp: Date
  value: number
  vmId: string
}

export interface CpuHistoryConfig {
  maxDataPoints: number
  timeWindowMs: number
  granularityMs: number
}

// Default configurations for different time ranges
export const CPU_HISTORY_CONFIGS = {
  hourly: {
    maxDataPoints: 60,
    timeWindowMs: 60 * 60 * 1000,
    granularityMs: 60 * 1000,
  },
  daily: {
    maxDataPoints: 96,
    timeWindowMs: 24 * 60 * 60 * 1000,
    granularityMs: 15 * 60 * 1000,
  },
  weekly: {
    maxDataPoints: 168,
    timeWindowMs: 7 * 24 * 60 * 60 * 1000,
    granularityMs: 60 * 60 * 1000,
  },
} as const

export type CpuHistoryTimeRange = keyof typeof CPU_HISTORY_CONFIGS

class CpuUsageHistory {
  private getStorageKey(vmId: string): string {
    return `cpu-usage-history-${vmId}`
  }

  addReading(vmId: string, cpuUsage: number, timeRange: CpuHistoryTimeRange = 'daily'): void {
    const config = CPU_HISTORY_CONFIGS[timeRange]
    const now = new Date()

    try {
      const existingData = this.getHistory(vmId, timeRange)

      if (existingData.length > 0) {
        const lastReading = existingData[existingData.length - 1]
        const timeDiff = now.getTime() - new Date(lastReading.timestamp).getTime()

        if (timeDiff < config.granularityMs) {
          return
        }
      }

      const newDataPoint: CpuUsageDataPoint = {
        timestamp: now,
        value: cpuUsage,
        vmId,
      }

      const updatedData = [...existingData, newDataPoint]

      const cleanedData = this.cleanupData(updatedData, config)
      localStorage.setItem(this.getStorageKey(vmId), JSON.stringify(cleanedData))
    } catch (error) {
      console.warn('Failed to save CPU usage history:', error)
    }
  }

  addCurrentReading(vmId: string, cpuUsage: number, timeRange: CpuHistoryTimeRange = 'daily'): void {
    const config = CPU_HISTORY_CONFIGS[timeRange]
    const now = new Date()

    try {
      const existingData = this.getHistory(vmId, timeRange)
      if (existingData.length > 0) {
        const lastReading = existingData[existingData.length - 1]
        const timeDiff = now.getTime() - new Date(lastReading.timestamp).getTime()

        if (timeDiff < config.granularityMs) {
          existingData[existingData.length - 1] = {
            timestamp: now,
            value: cpuUsage,
            vmId,
          }
          const cleanedData = this.cleanupData(existingData, config)
          localStorage.setItem(this.getStorageKey(vmId), JSON.stringify(cleanedData))
          return
        }
      }

      const newDataPoint: CpuUsageDataPoint = {
        timestamp: now,
        value: cpuUsage,
        vmId,
      }

      const updatedData = [...existingData, newDataPoint]
      const cleanedData = this.cleanupData(updatedData, config)
      localStorage.setItem(this.getStorageKey(vmId), JSON.stringify(cleanedData))
    } catch (error) {
      console.warn('Failed to save current CPU usage:', error)
    }
  }

  getHistory(vmId: string, timeRange: CpuHistoryTimeRange = 'daily'): CpuUsageDataPoint[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(vmId))
      if (!stored) {
        return []
      }

      const data: CpuUsageDataPoint[] = JSON.parse(stored)
      const config = CPU_HISTORY_CONFIGS[timeRange]

      const now = new Date()
      const cutoffTime = now.getTime() - config.timeWindowMs

      return data
        .map((point) => ({
          ...point,
          timestamp: new Date(point.timestamp),
        }))
        .filter((point) => point.timestamp.getTime() > cutoffTime)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    } catch (error) {
      console.warn('Failed to load CPU usage history:', error)
      return []
    }
  }

  getChartData(
    vmId: string,
    timeRange: CpuHistoryTimeRange = 'daily'
  ): Array<{
    timestamp: string
    formattedTime: string
    cpuUsage: number
    rawTimestamp: Date
  }> {
    const history = this.getHistory(vmId, timeRange)

    return history.map((point) => ({
      timestamp: point.timestamp.toISOString(),
      formattedTime: this.formatTimeLabel(point.timestamp, timeRange),
      cpuUsage: point.value,
      rawTimestamp: point.timestamp,
    }))
  }

  clearHistory(vmId: string): void {
    localStorage.removeItem(this.getStorageKey(vmId))
  }

  getLatestReading(vmId: string, timeRange: CpuHistoryTimeRange = 'daily'): number | null {
    const history = this.getHistory(vmId, timeRange)
    return history.length > 0 ? history[history.length - 1].value : null
  }

  getStats(
    vmId: string,
    timeRange: CpuHistoryTimeRange = 'daily'
  ): {
    average: number
    min: number
    max: number
    count: number
  } | null {
    const history = this.getHistory(vmId, timeRange)

    if (history.length === 0) {
      return null
    }

    const values = history.map((h) => h.value)
    const average = values.reduce((sum, val) => sum + val, 0) / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)

    return {
      average: Math.round(average * 100) / 100,
      min,
      max,
      count: history.length,
    }
  }

  private cleanupData(data: CpuUsageDataPoint[], config: CpuHistoryConfig): CpuUsageDataPoint[] {
    const now = new Date()
    const cutoffTime = now.getTime() - config.timeWindowMs

    return data
      .filter((point) => new Date(point.timestamp).getTime() > cutoffTime)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-config.maxDataPoints)
  }

  private formatTimeLabel(timestamp: Date, timeRange: CpuHistoryTimeRange): string {
    switch (timeRange) {
      case 'hourly':
        return format(timestamp, 'HH:mm')
      case 'daily':
        return format(timestamp, 'HH:mm')
      case 'weekly':
        return format(timestamp, 'EEE HH:mm')
      default:
        return format(timestamp, 'HH:mm')
    }
  }
}

export const cpuUsageHistory = new CpuUsageHistory()
