'use client'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Search } from 'lucide-react'
import { Input } from '@/components/shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { useEffect, useRef, useState } from 'react'

export function VmSearchWithOptions({
  onFieldChange,
  onQueryChange,
}: {
  onFieldChange?: (field: string) => void
  onQueryChange?: (query: string) => void
}) {
  const [query, setQuery] = useState('')
  const [vmSearchField, setVmSearchField] = useState('virtualmachine.spec.name')
  const debouncedQuery = useDebouncedValue(query, 120)
  const lastEmittedQueryRef = useRef<string | null>(null)

  const vmFieldLabels: Record<string, string> = {
    'virtualmachine.spec.name': 'name',
    'virtualmachine.provider': 'provider',
    // 'virtualmachine.status.tags.team.value': 'team',
    'virtualmachine.status.tags.team.description': 'team',
    'virtualmachine.status.tags.serviceId.value': 'service ID',
    // 'virtualmachine.status.tags.serviceId.description': 'service-id',
  }

  const vmPlaceholder = `Find VM by ${vmFieldLabels[vmSearchField] ?? 'name'}...`

  const handleFieldChange = (field: string) => {
    setVmSearchField(field)
    onFieldChange?.(field)
  }

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim()

    const emitQuery = () => {
      if (lastEmittedQueryRef.current === trimmedQuery) return
      lastEmittedQueryRef.current = trimmedQuery
      onQueryChange?.(trimmedQuery)
    }

    // Delay clear-search emits slightly so quick keystrokes don't trigger repeated empty requests.
    if (!trimmedQuery) {
      const timeoutId = window.setTimeout(emitQuery, 500)
      return () => window.clearTimeout(timeoutId)
    }

    emitQuery()
  }, [debouncedQuery, onQueryChange])

  return (
    <div className='flex max-w-xs'>
      <div className='flex-1 min-w-0'>
        <Input
          className='w-full rounded-r-none border-r-0'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={vmPlaceholder}
          placeholder={vmPlaceholder}
          icon={<Search className='w-4 h-4' />}
          iconPosition='left'
        />
      </div>

      <Select value={vmSearchField} onValueChange={handleFieldChange}>
        <SelectTrigger className='h-9 w-10 rounded-l-none border-l-0 px-0 justify-center'>
          <SelectValue>
            <span className='text-sm leading-none'></span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent align='end'>
          <SelectItem value='virtualmachine.spec.name'>Name</SelectItem>
          <SelectItem value='virtualmachine.provider'>Provider</SelectItem>
          {/* <SelectItem value='virtualmachine.status.tags.team.value'>Team</SelectItem> */}
          <SelectItem value='virtualmachine.status.tags.team.description'>Team</SelectItem>
          <SelectItem value='virtualmachine.status.tags.service-id.value'>Service-id</SelectItem>
          {/* <SelectItem value='virtualmachine.status.tags.serviceId.description'>Service name</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  )
}
