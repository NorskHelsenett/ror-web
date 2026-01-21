import { format } from 'date-fns'

export interface UsageDataPoint {
  timestamp: Date
  value: number
  vmId: string
}

export interface UsageHistoryConfig {
  maxDataPoints: number
  timeWindowMs: number
  granularityMs: number
}

// Default configurations for different time ranges
export const USAGE_HISTORY_CONFIGS = {
  hourly: {
    maxDataPoints: 60,
    timeWindowMs: 60 * 60 * 1000,
    granularityMs: 60 * 1000, // 1 minute
  },
  daily: {
    maxDataPoints: 1440, // 24 hours * 60 minutes
    timeWindowMs: 24 * 60 * 60 * 1000,
    granularityMs: 60 * 1000, // 1 minute
  },
  weekly: {
    maxDataPoints: 10080, // 7 days * 24 hours * 60 minutes
    timeWindowMs: 7 * 24 * 60 * 60 * 1000,
    granularityMs: 60 * 1000, // 1 minute
  },
} as const

export type HistoryTimeRange = keyof typeof USAGE_HISTORY_CONFIGS

export interface UsageHistoryOptions {
  type: 'cpu' | 'memory'
  unit: string // 'cores', 'GB', 'MB', etc.
  dataKey: string // 'cpuUsage', 'memoryUsage'
}

class UsageHistory {
  private type: string
  private unit: string
  private dataKey: string

  constructor(options: UsageHistoryOptions) {
    this.type = options.type
    this.unit = options.unit
    this.dataKey = options.dataKey
  }

  private getStorageKey(vmId: string): string {
    return `${this.type}-usage-history-${vmId}`
  }

  addReading(vmId: string, usage: number, timeRange: HistoryTimeRange = 'daily'): void {
    const config = USAGE_HISTORY_CONFIGS[timeRange]
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

      const newDataPoint: UsageDataPoint = {
        timestamp: now,
        value: usage,
        vmId,
      }

      const updatedData = [...existingData, newDataPoint]
      const cleanedData = this.cleanupData(updatedData, config)
      localStorage.setItem(this.getStorageKey(vmId), JSON.stringify(cleanedData))
    } catch (error) {
      console.warn(`Failed to save ${this.type} usage history:`, error)
    }
  }

  addCurrentReading(vmId: string, usage: number, timeRange: HistoryTimeRange = 'daily'): void {
    const config = USAGE_HISTORY_CONFIGS[timeRange]
    const now = new Date()

    try {
      const existingData = this.getHistory(vmId, timeRange)
      if (existingData.length > 0) {
        const lastReading = existingData[existingData.length - 1]
        const timeDiff = now.getTime() - new Date(lastReading.timestamp).getTime()

        if (timeDiff < config.granularityMs) {
          existingData[existingData.length - 1] = {
            timestamp: now,
            value: usage,
            vmId,
          }
          const cleanedData = this.cleanupData(existingData, config)
          localStorage.setItem(this.getStorageKey(vmId), JSON.stringify(cleanedData))
          return
        }
      }

      const newDataPoint: UsageDataPoint = {
        timestamp: now,
        value: usage,
        vmId,
      }

      const updatedData = [...existingData, newDataPoint]
      const cleanedData = this.cleanupData(updatedData, config)
      localStorage.setItem(this.getStorageKey(vmId), JSON.stringify(cleanedData))
    } catch (error) {
      console.warn(`Failed to save current ${this.type} usage:`, error)
    }
  }

  getHistory(vmId: string, timeRange: HistoryTimeRange = 'daily'): UsageDataPoint[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(vmId))
      if (!stored) {
        return []
      }

      const data: UsageDataPoint[] = JSON.parse(stored)
      const config = USAGE_HISTORY_CONFIGS[timeRange]

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
      console.warn(`Failed to load ${this.type} usage history:`, error)
      return []
    }
  }

  getChartData(
    vmId: string,
    timeRange: HistoryTimeRange = 'daily'
  ): Array<{
    timestamp: string
    formattedTime: string
    [key: string]: string | number | Date // This allows for dynamic data keys
    rawTimestamp: Date
  }> {
    const history = this.getHistory(vmId, timeRange)

    return history.map((point) => ({
      timestamp: point.timestamp.toISOString(),
      formattedTime: this.formatTimeLabel(point.timestamp, timeRange),
      [this.dataKey]: point.value,
      rawTimestamp: point.timestamp,
    }))
  }

  clearHistory(vmId: string): void {
    localStorage.removeItem(this.getStorageKey(vmId))
  }

  getLatestReading(vmId: string, timeRange: HistoryTimeRange = 'daily'): number | null {
    const history = this.getHistory(vmId, timeRange)
    return history.length > 0 ? history[history.length - 1].value : null
  }

  getStats(
    vmId: string,
    timeRange: HistoryTimeRange = 'daily'
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

  private cleanupData(data: UsageDataPoint[], config: UsageHistoryConfig): UsageDataPoint[] {
    const now = new Date()
    const cutoffTime = now.getTime() - config.timeWindowMs

    return data
      .filter((point) => new Date(point.timestamp).getTime() > cutoffTime)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-config.maxDataPoints)
  }

  private formatTimeLabel(timestamp: Date, timeRange: HistoryTimeRange): string {
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

  // Getter methods for component configuration
  getType(): string {
    return this.type
  }

  getUnit(): string {
    return this.unit
  }

  getDataKey(): string {
    return this.dataKey
  }
}

// Factory functions for specific usage types
export const cpuUsageHistory = new UsageHistory({
  type: 'cpu',
  unit: 'cores',
  dataKey: 'cpuUsage',
})

export const memoryUsageHistory = new UsageHistory({
  type: 'memory',
  unit: 'GB',
  dataKey: 'memoryUsage',
})

// Export the class for custom instances if needed
export { UsageHistory }

// Re-export types with backwards compatibility
export type CpuHistoryTimeRange = HistoryTimeRange
export const CPU_HISTORY_CONFIGS = USAGE_HISTORY_CONFIGS
