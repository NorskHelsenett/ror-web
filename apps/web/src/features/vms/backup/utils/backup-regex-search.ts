import { escapeRegExp } from '../../utils/vm-regex-search'

export function buildBackupSearchFilter(searchQuery: string): string | undefined {
  const q = searchQuery.trim()
  if (!q) return undefined

  const safe = escapeRegExp(q)

  return JSON.stringify([
    // BackupJob searchable fields
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

    //BackupRun searchable fields
    {
      field: 'backuprun.id',
      value: `^${safe}`,
      type: 'string',
      operator: 'regexp',
    },
    {
      field: 'backuprun.source',
      value: `^${safe}`,
      type: 'string',
      operator: 'regexp',
    },
    {
      field: 'backuprun.status.backupRunId',
      value: `^${safe}`,
      type: 'string',
      operator: 'regexp',
    },
  ])
}
