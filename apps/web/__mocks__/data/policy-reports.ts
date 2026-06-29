const clusters = [
  { subject: '2607fdb0-da0a-4a97-9fb9-73127224533f', namespaces: ['kyverno', 'kube-system', 'monitoring', 'argocd'] },
  { subject: '17e03119-1801-4f11-9307-8f905fe4ac46', namespaces: ['default', 'cert-manager', 'ingress-nginx'] },
]

const resultVariants: Array<'pass' | 'fail'> = ['pass', 'fail']

const makeResults = (seed: number) => [
  {
    policy: 'disallow-default-namespace',
    message: "validation rule 'require-namespace' passed.",
    category: 'Multi-Tenancy',
    properties: { process: 'background scan' },
    severity: 'low',
    result: resultVariants[seed % 2],
    resources: null,
  },
  {
    policy: 'disallow-capabilities-strict',
    message: seed % 3 === 0 ? 'validation failure: Containers must drop `ALL` capabilities.' : 'rule passed',
    category: 'Pod Security Standards (Restricted)',
    properties: null,
    severity: 'medium',
    result: seed % 3 === 0 ? 'fail' : 'pass',
    resources: null,
  },
  {
    policy: 'disallow-host-namespaces',
    message: "validation rule 'autogen-host-namespaces' passed.",
    category: 'Pod Security Standards (Baseline)',
    properties: null,
    severity: 'high',
    result: 'fail',
    resources: null,
  },
  {
    policy: 'require-non-root-groups',
    message:
      seed % 4 === 0
        ? 'validation error: Running with root group IDs is disallowed.'
        : "rule 'check-runasgroup' passed.",
    category: 'Sample',
    properties: null,
    severity: 'medium',
    result: seed % 4 === 0 ? 'fail' : 'pass',
    resources: null,
  },
]

let reportIdx = 0
export const policyReports = {
  resources: clusters.flatMap((cluster) =>
    cluster.namespaces.flatMap((namespace) => {
      reportIdx++
      const seed = reportIdx
      const results = makeResults(seed)
      const pass = results.filter((r) => r.result === 'pass').length
      const fail = results.filter((r) => r.result === 'fail').length
      return {
        kind: 'PolicyReport',
        apiVersion: 'wgpolicyk8s.io/v1alpha2',
        metadata: {
          name: `report-${cluster.subject}-${namespace}`,
          namespace,
          uid: `uid-${seed}-${cluster.subject}`,
          resourceVersion: '334679103',
          generation: 1,
          creationTimestamp: '2026-06-18T10:48:58Z',
          labels: { 'app.kubernetes.io/managed-by': 'kyverno' },
          ownerReferences: [],
          managedFields: [
            {
              manager: 'reports-controller',
              operation: 'Update',
              apiVersion: 'wgpolicyk8s.io/v1alpha2',
              fieldsType: 'FieldsV1',
            },
          ],
        },
        rormeta: {
          version: 'v2',
          lastReported: '2026-06-18 10:49:06.013794851 +0000 UTC',
          internal: true,
          hash: `hash-${seed}`,
          ownerref: { scope: 'KubernetesCluster', subject: cluster.subject },
          action: 'Add',
        },
        policyreport: {
          results,
          summary: { error: 0, fail, pass, skip: 0, warn: 0 },
        },
      }
    })
  ),
}
