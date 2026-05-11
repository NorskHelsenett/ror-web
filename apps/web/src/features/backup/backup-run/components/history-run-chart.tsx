'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BackupRun } from '@ror/js-api-client'
import { getBackupRunStartTime, getBackupRunStatusLocal } from '@/features/vms/backup/utils/backup-run'
import { subDays, startOfDay, format } from 'date-fns'
import type { BackupRunsHistoryPoint } from '@/features/vms/backup/services/backup-runs-history-cache'

interface HistoryRunChartProps {
  backupRuns: BackupRun[]
  historySummary?: BackupRunsHistoryPoint[]
}

export const HistoryRunChart = ({ backupRuns, historySummary }: HistoryRunChartProps) => {
  const generateDateRange = () => {
    const today = startOfDay(new Date())
    const dates: Date[] = []
    for (let i = 29; i >= 0; i--) {
      dates.push(subDays(today, i))
    }
    return dates
  }

  const getChartData = () => {
    const dateRange = generateDateRange()
    const dateMap = new Map<string, { successful: number; failed: number }>()

    dateRange.forEach((date) => {
      const dateKey = format(date, 'MMM dd')
      dateMap.set(dateKey, { successful: 0, failed: 0 })
    })

    // Count runs by date and status
    backupRuns.forEach((run) => {
      const startTime = getBackupRunStartTime(run)
      if (startTime && startTime !== 'No start time') {
        try {
          const runDate = startOfDay(new Date(startTime))
          const dateKey = format(runDate, 'MMM dd')
          const status = getBackupRunStatusLocal(run).toLowerCase()
          const counts = dateMap.get(dateKey)

          if (counts) {
            if (status === 'succeeded' || status === 'completed') {
              counts.successful += 1
            } else if (status === 'failed') {
              counts.failed += 1
            }
          }
        } catch {
          // Ignore invalid dates
        }
      }
    })
    return Array.from(dateMap.entries()).map(([date, counts]) => ({
      date,
      successful: counts.successful,
      failed: counts.failed,
    }))
  }

  const data = historySummary && historySummary.length > 0 ? historySummary : getChartData()

  return (
    <Card className='mx-10 mt-6 max-w-2xl'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>Runs Over Time (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent className='pt-0'>
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart data={data} margin={{ top: 5, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='var(--color-border)' />
            <XAxis dataKey='date' stroke='var(--color-muted-foreground)' style={{ fontSize: '12px' }} />
            <YAxis stroke='var(--color-muted-foreground)' style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'var(--color-foreground)', fontSize: '12px' }}
            />
            <Legend
              verticalAlign='bottom'
              content={({ payload }) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    paddingTop: '10px',
                  }}
                >
                  {(payload ?? []).map((entry, index) => (
                    <div
                      key={`${entry.value ?? 'item'}-${index}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '9999px',
                          backgroundColor: entry.color,
                          display: 'inline-block',
                        }}
                      />
                      <span style={{ color: 'var(--color-muted-foreground)', fontSize: '14px', lineHeight: 1 }}>
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            <Area
              type='monotone'
              dataKey='successful'
              stroke='#2db55f'
              fill='#2db55f'
              fillOpacity={0.1}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name='Succeeded'
            />
            <Area
              type='monotone'
              dataKey='failed'
              stroke='#d63636'
              fill='#d63636'
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              fillOpacity={0.1}
              name='Failed'
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
