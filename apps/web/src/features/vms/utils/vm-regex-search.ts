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
  ])
}
