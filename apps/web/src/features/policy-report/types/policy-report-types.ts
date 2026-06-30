export type PolicyReportSummary = {
  pass: number
  fail: number
  error: number
  warn: number
  skip: number
}

export type NamespaceGroup = {
  namespace: string
  summary: PolicyReportSummary
}

export type ClusterGroup = {
  clusterUid: string
  clusterName: string
  namespaces: NamespaceGroup[]
  summary: PolicyReportSummary
}

export type PolicyResultItem = {
  policy: string
  message: string
  result: string
  resources: Array<{
    kind?: string | null
    name?: string | null
    uid?: string | null
    apiVersion?: string | null
  }> | null
  properties: Record<string, string> | null
  category: string
  severity: string
}

export type PolicyGroup = {
  policyName: string
  category: string
  severity: string
  results: PolicyResultItem[]
  summary: { pass: number; fail: number }
}

export type NamespacePolicyGroup = {
  namespace: string
  summary: { pass: number; fail: number }
  policies: PolicyGroup[]
}

export type PolicyReportFilters = {
  result: string
  severity: string
  category: string
}
