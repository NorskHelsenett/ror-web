import { escapeRegExp } from '../../utils/vm-regex-search'

export function buildBackupSearchFilter(searchQuery: string, page: string, field?: string): string | undefined {
  const q = searchQuery.trim()
  if (!q) return undefined

  const safe = escapeRegExp(q)

  const searchField = page === 'backup-jobs' ? field || 'backupjob.id' : field || 'backuprun.id'

  return JSON.stringify([
    {
      field: searchField,
      value: `${safe}`,
      type: 'string',
      operator: 'regexp',
    },
  ])
}
