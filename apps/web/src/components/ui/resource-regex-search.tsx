'use client'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Input } from '@/components/shadcn/input'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { cn } from '@/utils/clsxm'

export interface RegexSearchFieldOption {
  value: string
  label: string
  placeholderLabel?: string
  disabled?: boolean
}

export interface ResourceRegexSearchProps {
  fields: RegexSearchFieldOption[]
  defaultField: string
  searchEntityLabel?: string
  onFieldChange?: (field: string) => void
  onQueryChange?: (query: string) => void
  className?: string
}

export function ResourceRegexSearch({
  fields,
  defaultField,
  searchEntityLabel,
  onFieldChange,
  onQueryChange,
  className,
}: ResourceRegexSearchProps) {
  const urlSearchParams = useSearchParams()
  const [query, setQuery] = useState(() => urlSearchParams.get('search') ?? '')
  const [searchField, setSearchField] = useState(() => urlSearchParams.get('searchField') ?? defaultField)
  const debouncedQuery = useDebouncedValue(query, 120)
  const lastEmittedQueryRef = useRef<string | null>(null)

  const selectedField = useMemo(() => fields.find((field) => field.value === searchField), [fields, searchField])

  const placeholderTarget = selectedField?.placeholderLabel ?? selectedField?.label?.toLowerCase() ?? 'id'
  const prefix = searchEntityLabel ? `Find ${searchEntityLabel} by` : 'Find by'
  const placeholder = `${prefix} ${placeholderTarget}...`

  const handleFieldChange = (field: string) => {
    setSearchField(field)
    onFieldChange?.(field)
  }

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim()

    const emitQuery = () => {
      if (lastEmittedQueryRef.current === trimmedQuery) return
      lastEmittedQueryRef.current = trimmedQuery
      onQueryChange?.(trimmedQuery)
    }

    if (!trimmedQuery) {
      const timeoutId = window.setTimeout(emitQuery, 500)
      return () => window.clearTimeout(timeoutId)
    }

    emitQuery()
  }, [debouncedQuery, onQueryChange])

  return (
    <div className={cn('flex max-w-xs', className)}>
      <div className='flex-1 min-w-0'>
        <Input
          className='w-full rounded-r-none border-r-0'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={placeholder}
          placeholder={placeholder}
          icon={<Search className='w-4 h-4' />}
          iconPosition='left'
        />
      </div>

      <Select value={searchField} onValueChange={handleFieldChange}>
        <SelectTrigger className='h-9 w-10 rounded-l-none border-l-0 px-0 justify-center'>
          <SelectValue>
            <span className='text-sm leading-none'></span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent align='end'>
          {fields.map((field) => (
            <SelectItem key={field.value} value={field.value} disabled={field.disabled}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
