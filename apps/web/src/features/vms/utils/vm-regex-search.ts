export const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function buildVmSearchFilter(searchQuery: string): string | undefined {
  const q = searchQuery.trim()
  if (!q) return undefined

  const safe = escapeRegExp(q)

  return JSON.stringify([
    {
      field: 'virtualmachine.spec.name',
      value: `^${safe}`,
      type: 'string',
      operator: 'regexp',
    },
    // {
    //   field: 'virtualmachine.provider',
    //   value: `${safe}$`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // Regex for name
    // {
    //   field: 'virtualmachine.spec.name',
    //   value: `(^${safe}|${safe}$|${safe})`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // // Regex for tags (searches across both tag keys and values)
    // {
    //   field: 'virtualmachine.status.tags.team.value',
    //   value: `(^${safe}|${safe}$|${safe})`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // {
    //   field: 'virtualmachine.status.tags.team.description',
    //   value: `(^${safe}|${safe}$|${safe})`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // {
    //   field: 'virtualmachine.status.tags.service-id.value',
    //   value: `(^${safe}|${safe}$|${safe})`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
    // {
    //   field: 'virtualmachine.status.tags.service-id.description',
    //   value: `(^${safe}|${safe}$|${safe})`,
    //   type: 'string',
    //   operator: 'regexp',
    // },
  ])
}
