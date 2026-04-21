import { escapeRegExp } from '../../utils/vm-regex-search'

export function buildBackupSearchFilter(searchQuery: string): string | undefined {
  const q = searchQuery.trim()
  if (!q) return undefined

  const safe = escapeRegExp(q)

  return JSON.stringify([
    {
      field: 'backupjob.id',
      value: `^${safe}`,
      type: 'string',
      operator: 'regexp',
    },
    {
      field: 'backupjob.status.resourceBackupJobSpec.name',
      value: `^${safe}`,
      type: 'string',
      operator: 'regexp',
    },
  ])
}
