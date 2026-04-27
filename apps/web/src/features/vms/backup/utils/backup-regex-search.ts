import { escapeRegExp } from '../../utils/vm-regex-search'

export function buildBackupSearchFilter(searchQuery: string, page: string, field?: string): string | undefined {
  const q = searchQuery.trim()
  if (!q) return undefined

  const safe = escapeRegExp(q)

  const searchField = page === 'backup-jobs' ? field || 'backupjob.id' : field || 'backuprun.id'

  console.log('Building backup search filter with query:', searchQuery, 'and field:', searchField)

  return JSON.stringify([
    // BackupJob searchable fields
    {
      field: searchField,
      value: `${safe}`,
      type: 'string',
      operator: 'regexp',
    },
    // {
    //   field: 'backupjob.id',
    //   value: `^${safe}`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // {
    //   field: 'backupjob.status.resourceBackupJobSpec.name',
    //   value: `^${safe}`,
    //   type: 'string',
    //   operator: 'regexp',
    // },

    // //BackupRun searchable fields
    // {
    //   field: 'backuprun.id',
    //   value: `^${safe}`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // {
    //   field: 'backuprun.source',
    //   value: `^${safe}`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // {
    //   field: 'backuprun.status.backupRunId',
    //   value: `^${safe}`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
  ])
}
