'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import type { ClusterGroupSortBy } from './policy-report-filter-bar'

interface ClusterGroupSortProps {
  value: ClusterGroupSortBy
  onChange: (sort: ClusterGroupSortBy) => void
}

export function ClusterGroupSort({ value, onChange }: ClusterGroupSortProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as ClusterGroupSortBy)}>
      <SelectTrigger className='w-48'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='name-asc'>Name (A–Z)</SelectItem>
        <SelectItem value='name-desc'>Name (Z–A)</SelectItem>
        <SelectItem value='failures-desc'>Most failures</SelectItem>
        <SelectItem value='failures-asc'>Fewest failures</SelectItem>
      </SelectContent>
    </Select>
  )
}
