import { AclV2 } from '@ror/js-api-client'

export const ROR_ACCESS_TYPES = ['ror:read', 'ror:create', 'ror:update'] as const
export type RorAccessType = (typeof ROR_ACCESS_TYPES)[number]

export type ResourceAccessGroup = {
  group: string
  access: Record<RorAccessType, boolean>
  // Where the access is granted, e.g. "This resource" or "Workspace: abc"
  grantedOn: string[]
}

const isRorAccessType = (access?: string | null): access is RorAccessType =>
  ROR_ACCESS_TYPES.includes(access as RorAccessType)

/**
 * Groups the raw access entries by group and keeps only ROR access types (drops e.g. "kubernetes:*").
 */
export const groupRorAccess = (accessGroups: AclV2[]): ResourceAccessGroup[] => {
  const byGroup = new Map<string, ResourceAccessGroup>()

  for (const entry of accessGroups) {
    if (!entry.group || !isRorAccessType(entry.access)) continue

    const current = byGroup.get(entry.group) ?? {
      group: entry.group,
      access: { 'ror:read': false, 'ror:create': false, 'ror:update': false },
      grantedOn: [],
    }
    current.access[entry.access] = true

    for (const p of entry.provenance ?? []) {
      const label = p.level === 0 ? 'This resource' : `${p.scope ?? 'Unknown'}: ${p.subject ?? 'unknown'}`
      if (!current.grantedOn.includes(label)) current.grantedOn.push(label)
    }

    byGroup.set(entry.group, current)
  }

  return [...byGroup.values()].sort((a, b) => a.group.localeCompare(b.group))
}
