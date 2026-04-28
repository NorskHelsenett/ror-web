'use client'

import { ResourceRegexSearch } from '@/components/ui/resource-regex-search'
import { usePathname } from 'next/navigation'

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
  page = page ?? pageType

  const isBackupJobPage = page === 'backupjob'

  return (
    <ResourceRegexSearch
      fields={
        isBackupJobPage
          ? [
              { value: 'backupjob.id', label: 'ID', placeholderLabel: 'id' },
              {
                value: 'backupjob.status.resourcebackupjobspec.name',
                label: 'Name',
                placeholderLabel: 'name',
                // disabled: true,
              },
            ]
          : [
              { value: 'backuprun.id', label: 'ID', placeholderLabel: 'id' },
              {
                value: 'backuprun.status.backupjobid',
                label: 'Backup Job ID',
                placeholderLabel: 'backup job ID',
                // disabled: true,
              },
            ]
      }
      defaultField={isBackupJobPage ? 'backupjob.id' : 'backuprun.id'}
      searchEntityLabel={isBackupJobPage ? 'Backup Job' : 'Backup Run'}
      onFieldChange={onFieldChange}
      onQueryChange={onQueryChange}
    />
  )
}
