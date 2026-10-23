/**
 * Mock data for GET /v2/acl/lookup/{scope}/{subject}
 *
 * Includes "kubernetes:logon" entries, shown in the "Login" column of the Access card.
 */

type AclLookupProvenance = { scope: string; subject: string; level: number }
type AclLookupAccessGroup = { access: string; group: string; provenance: AclLookupProvenance[] }

const workspaceSubject = 'workspace-mock-01'
const datacenterSubject = 'datacenter-mock-trd1'

const createDefaultAccessGroups = (clusterUid: string): AclLookupAccessGroup[] => {
  const onCluster = { scope: 'KubernetesCluster', subject: clusterUid, level: 0 }
  const onWorkspace = { scope: 'Workspace', subject: workspaceSubject, level: 1 }
  const onDatacenter = { scope: 'Datacenter', subject: datacenterSubject, level: 2 }

  return [
    { access: 'ror:read', group: 'ror-admins@ror.dev', provenance: [onDatacenter] },
    { access: 'ror:create', group: 'ror-admins@ror.dev', provenance: [onDatacenter] },
    { access: 'ror:update', group: 'ror-admins@ror.dev', provenance: [onDatacenter] },
    { access: 'ror:read', group: 'team-platform@ror.dev', provenance: [onCluster, onWorkspace] },
    { access: 'ror:update', group: 'team-platform@ror.dev', provenance: [onCluster] },
    { access: 'ror:read', group: 'team-developers@ror.dev', provenance: [onWorkspace] },
    { access: 'ror:read', group: 'security-auditors@ror.dev', provenance: [onDatacenter] },
    { access: 'kubernetes:logon', group: 'team-platform@ror.dev', provenance: [onCluster] },
    { access: 'kubernetes:logon', group: 'team-developers@ror.dev', provenance: [onWorkspace] },
    // Not in ACCESS_TYPE_LABELS -> should get its own column with the raw name as header
    { access: 'kubernetes:admin', group: 'team-platform@ror.dev', provenance: [onCluster] },
    // Ends with "@cluster.ror.system" -> should be hidden
    { access: 'ror:read', group: `${clusterUid}@cluster.ror.system`, provenance: [onCluster] },
    { access: 'ror:update', group: `${clusterUid}@cluster.ror.system`, provenance: [onCluster] },
    // Only hidden access types (create/update) -> should be hidden
    { access: 'ror:update', group: 'team-deployers@ror.dev', provenance: [onWorkspace] },
  ]
}

// Many groups with varied access, to test scrolling in the Access card
const createManyAccessGroups = (clusterUid: string, count = 40): AclLookupAccessGroup[] => {
  const teams = ['platform', 'developers', 'security', 'ops', 'data', 'frontend', 'backend', 'qa', 'support', 'infra']
  const provenances = [
    { scope: 'KubernetesCluster', subject: clusterUid, level: 0 },
    { scope: 'Workspace', subject: workspaceSubject, level: 1 },
    { scope: 'Datacenter', subject: datacenterSubject, level: 2 },
  ]

  return Array.from({ length: count }, (_, i) => {
    const group = `team-${teams[i % teams.length]}-${String(i + 1).padStart(2, '0')}@ror.dev`
    const provenance = [provenances[i % provenances.length]]
    const entries: AclLookupAccessGroup[] = [{ access: 'ror:read', group, provenance }]
    if (i % 2 === 0) entries.push({ access: 'ror:update', group, provenance })
    if (i % 3 === 0) entries.push({ access: 'ror:create', group, provenance })
    if (i % 4 === 0) entries.push({ access: 'kubernetes:logon', group, provenance })
    return entries
  }).flat()
}

// Clusters with specific access setups. Any other cluster gets the default set above.
const customAccessGroups: Record<string, AclLookupAccessGroup[]> = {
  // 40 groups -> the Access card table should scroll with sticky headers
  '5a327eac-9dbc-42dc-89e4-3a2a2c45dd6e': createManyAccessGroups('5a327eac-9dbc-42dc-89e4-3a2a2c45dd6e'),
  // Only kubernetes login, no ROR access -> one row with only "Login" checked
  '21fca0d4-051b-46cf-8b16-e77ce974ffb1': [
    {
      access: 'kubernetes:logon',
      group: 'team-k8s-only@ror.dev',
      provenance: [{ scope: 'KubernetesCluster', subject: '21fca0d4-051b-46cf-8b16-e77ce974ffb1', level: 0 }],
    },
  ],
  // No access groups at all
  '49384256-386c-4eba-bccc-ee9939abf648': [],
}

export const getMockAclLookup = (scope: string, subject: string) => ({
  scope,
  subject,
  accessGroups: customAccessGroups[subject] ?? createDefaultAccessGroups(subject),
})
