'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import type { PolicyReportFilters } from '../utils/policy-report'

export type ClusterGroupSortBy = 'name-asc' | 'name-desc' | 'failures-desc' | 'failures-asc'

interface PolicyReportFilterBarProps {
  filters: PolicyReportFilters
  onFilterChange: (filters: PolicyReportFilters) => void
  resultOptions: string[]
  categoryOptions: string[]
}

export const PolicyReportFilterBar = ({
  filters,
  onFilterChange,
  resultOptions,
  categoryOptions,
}: PolicyReportFilterBarProps) => {
  const set = (key: keyof PolicyReportFilters) => (value: string) => onFilterChange({ ...filters, [key]: value })

  return (
    <div className='flex flex-wrap items-center gap-3 mb-6'>
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
          <SelectItem value='low' className='capitalize'>
            low
          </SelectItem>
          <SelectItem value='medium' className='capitalize'>
            medium
          </SelectItem>
          <SelectItem value='high' className='capitalize'>
            high
          </SelectItem>
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
