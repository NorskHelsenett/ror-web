'use client'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'

export function BackupSearchWithOptions({
  onFieldChange,
  onQueryChange,
  page,
}: {
  onFieldChange?: (field: string) => void
  onQueryChange?: (query: string) => void
  page?: string
}) {
  const pathname = usePathname()
  const pageType = pathname.includes('/backup-jobs') ? 'backupjob' : 'backuprun'
  const urlSearchParams = useSearchParams()
  const [query, setQuery] = useState(() => urlSearchParams.get('search') ?? '')
  const [backupSearchField, setBackupSearchField] = useState(
    () => urlSearchParams.get('searchField') ?? (pageType === 'backupjob' ? 'backupjob.id' : 'backuprun.id')
  )
  const debouncedQuery = useDebouncedValue(query, 120)
  const lastEmittedQueryRef = useRef<string | null>(null)
  page = page ?? pageType

  const backupJobFieldLabels: Record<string, string> = {
    'backupjob.id': 'id',
    'backupjob.status.resourceBackupJobSpec.name': 'name',
  }

  const backupRunFieldLabels: Record<string, string> = {
    'backuprun.id': 'id',
    'backuprun.status.backupJobId': 'backup job ID',
  }

  const placeholder = `Find by ${(page === 'backupjob' ? backupJobFieldLabels[backupSearchField] : backupRunFieldLabels[backupSearchField]) ?? 'id'}...`

  const handleFieldChange = (field: string) => {
    setBackupSearchField(field)
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
          aria-label={placeholder}
          placeholder={placeholder}
          icon={<Search className='w-4 h-4' />}
          iconPosition='left'
        />
      </div>
      <Select value={backupSearchField} onValueChange={handleFieldChange}>
        <SelectTrigger className='h-9 w-10 rounded-l-none border-l-0 px-0 justify-center'>
          <SelectValue>
            <span className='text-sm leading-none'></span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent align='end'>
          {page === 'backupjob' ? (
            <>
              <SelectItem value='backupjob.id'>ID</SelectItem>
              <SelectItem value='backupjob.status.resourceBackupJobSpec.name' disabled>
                Name
              </SelectItem>
            </>
          ) : (
            <>
              <SelectItem value='backuprun.id'>ID</SelectItem>
              <SelectItem value='backuprun.status.backupJobId' disabled>
                Backup Job ID
              </SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
