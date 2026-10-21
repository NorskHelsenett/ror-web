import { AclV2 } from '@ror/js-api-client'

// Known access types, in display order. These columns are always shown.
// Any other access type returned by the API gets its own column after these, labelled with its raw name.
export const ACCESS_TYPE_LABELS: Record<string, string> = {
  'ror:read': 'Read',
  'kubernetes:logon': 'Login',
}

// Access types never shown in the table
const HIDDEN_ACCESS_TYPES = ['ror:create', 'ror:update']

// Internal system groups, hidden to keep the view clean
const HIDDEN_GROUP_SUFFIXES = ['@cluster.ror.system']

const isHiddenGroup = (group: string) => HIDDEN_GROUP_SUFFIXES.some((suffix) => group.endsWith(suffix))

const KNOWN_ACCESS_TYPES = Object.keys(ACCESS_TYPE_LABELS)

export const getAccessTypeLabel = (accessType: string) => ACCESS_TYPE_LABELS[accessType] ?? accessType

export type ResourceAccessGroup = {
  group: string
  // The access types this group has, e.g. ['ror:read', 'kubernetes:logon']
  access: string[]
  // Where the access is granted, e.g. "This resource" or "Workspace: abc"
  grantedOn: string[]
}

/**
 * Returns the access types to show as columns: all known types first, then any unknown ones found in the data.
 */
export const getAccessTypeColumns = (groups: ResourceAccessGroup[]): string[] => {
  const unknown = new Set(groups.flatMap((g) => g.access).filter((a) => !KNOWN_ACCESS_TYPES.includes(a)))
  return [...KNOWN_ACCESS_TYPES, ...[...unknown].sort()]
}

/**
 * Groups the raw access entries by group, skipping hidden access types and hidden system groups.
 */
export const groupAccessByGroup = (accessGroups: AclV2[]): ResourceAccessGroup[] => {
  const byGroup = new Map<string, ResourceAccessGroup>()

  for (const entry of accessGroups) {
    if (!entry.group || !entry.access) continue
    if (HIDDEN_ACCESS_TYPES.includes(entry.access) || isHiddenGroup(entry.group)) continue

    const current = byGroup.get(entry.group) ?? { group: entry.group, access: [], grantedOn: [] }
    if (!current.access.includes(entry.access)) current.access.push(entry.access)

    for (const p of entry.provenance ?? []) {
      const label = p.level === 0 ? 'This resource' : `${p.scope ?? 'Unknown'}: ${p.subject ?? 'unknown'}`
      if (!current.grantedOn.includes(label)) current.grantedOn.push(label)
    }

    byGroup.set(entry.group, current)
  }

  return [...byGroup.values()].sort((a, b) => a.group.localeCompare(b.group))
}
