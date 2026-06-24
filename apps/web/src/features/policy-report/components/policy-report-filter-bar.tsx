'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import type { PolicyReportFilters } from '../utils/policy-report'

interface PolicyReportFilterBarProps {
  filters: PolicyReportFilters
  onFilterChange: (filters: PolicyReportFilters) => void
  resultOptions: string[]
  severityOptions: string[]
  categoryOptions: string[]
}

export const PolicyReportFilterBar = ({
  filters,
  onFilterChange,
  resultOptions,
  severityOptions,
  categoryOptions,
}: PolicyReportFilterBarProps) => {
  const set = (key: keyof PolicyReportFilters) => (value: string) => onFilterChange({ ...filters, [key]: value })

  return (
    <div className='flex flex-wrap items-center gap-3 mb-6'>
      <span className='text-sm text-muted-foreground font-medium'>Filter:</span>

      <Select value={filters.result} onValueChange={set('result')}>
        <SelectTrigger className='w-40'>
          <SelectValue placeholder='All results' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All results</SelectItem>
          {resultOptions.map((opt) => (
            <SelectItem key={opt} value={opt} className='capitalize'>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.severity} onValueChange={set('severity')}>
        <SelectTrigger className='w-44'>
          <SelectValue placeholder='All severities' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All severities</SelectItem>
          {severityOptions.map((opt) => (
            <SelectItem key={opt} value={opt} className='capitalize'>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={set('category')}>
        <SelectTrigger className='w-52'>
          <SelectValue placeholder='All categories' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All categories</SelectItem>
          {categoryOptions.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
