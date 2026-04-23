export const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function buildVmSearchFilter(searchQuery: string, field?: string): string | undefined {
  const q = searchQuery.trim()
  if (!q) return undefined

  const safe = escapeRegExp(q)
  const searchField = field || 'virtualmachine.spec.name'

  return JSON.stringify([
    {
      field: searchField,
      value: `${safe}`,
      type: 'string',
      operator: 'regexp',
    },
  ])
}
