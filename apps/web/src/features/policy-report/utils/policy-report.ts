import type { PolicyReport } from '@ror/js-api-client'
import type {
  ClusterGroup,
  NamespaceGroup,
  PolicyReportFilters,
  PolicyReportSummary,
  PolicyResultItem,
  PolicyGroup,
  NamespacePolicyGroup,
} from '../types/policy-report-types'

const emptySummary = (): PolicyReportSummary => ({ pass: 0, fail: 0, error: 0, warn: 0, skip: 0 })

const addToSummary = (acc: PolicyReportSummary, result: string) => {
  if (result === 'pass') acc.pass++
  else if (result === 'fail') acc.fail++
  else if (result === 'error') acc.error++
  else if (result === 'warn') acc.warn++
  else if (result === 'skip') acc.skip++
}

export const groupPolicyReportsByCluster = (
  reports: PolicyReport[],
  filters: PolicyReportFilters,
  clusterNameMap: Map<string, string> = new Map()
): ClusterGroup[] => {
  const clusterMap = new Map<string, Map<string, PolicyReportSummary>>()

  for (const report of reports) {
    const clusterUid = report.rormeta?.ownerref?.subject ?? 'unknown'
    const namespace = report.metadata?.namespace ?? 'unknown'
    const results = report.policyreport?.results ?? []

    if (!clusterMap.has(clusterUid)) clusterMap.set(clusterUid, new Map())
    const nsMap = clusterMap.get(clusterUid)!
    if (!nsMap.has(namespace)) nsMap.set(namespace, emptySummary())
    const nsSummary = nsMap.get(namespace)!

    for (const r of results) {
      if (!r.result) continue
      if (filters.result !== 'all' && r.result !== filters.result) continue
      if (filters.severity !== 'all' && (r.severity ?? '') !== filters.severity) continue
      if (filters.category !== 'all' && (r.category ?? '') !== filters.category) continue
      addToSummary(nsSummary, r.result)
    }
  }

  return Array.from(clusterMap.entries()).map(([clusterUid, nsMap]) => {
    const namespaces: NamespaceGroup[] = Array.from(nsMap.entries()).map(([namespace, summary]) => ({
      namespace,
      summary,
    }))
    const summary = namespaces.reduce((acc, ns) => {
      acc.pass += ns.summary.pass
      acc.fail += ns.summary.fail
      acc.error += ns.summary.error
      acc.warn += ns.summary.warn
      acc.skip += ns.summary.skip
      return acc
    }, emptySummary())
    return { clusterUid, clusterName: clusterNameMap.get(clusterUid) ?? clusterUid, namespaces, summary }
  })
}

export const getUniqueFilterValues = (reports: PolicyReport[], field: 'result' | 'severity' | 'category'): string[] => {
  const values = new Set<string>()
  for (const report of reports) {
    for (const r of report.policyreport?.results ?? []) {
      const val = r[field]
      if (val) values.add(val)
    }
  }
  return Array.from(values).sort()
}

export const getPolicyReportResults = (policyReport: PolicyReport) => {
  return policyReport.policyreport?.results ?? []
}

export const getPolicyReportSummary = (policyReport: PolicyReport) => {
  return policyReport.policyreport?.summary ?? {}
}

export const getPolicyReportLastReported = (policyReport: PolicyReport): string => {
  return policyReport.policyreport?.lastReported ?? ''
}

export const getPolicyReportUid = (policyReport: PolicyReport): string => {
  return policyReport.metadata?.uid ?? 'unknown-uid'
}

export const getPolicyReportKey = (policyReport: PolicyReport[] = []): string =>
  Array.isArray(policyReport) ? policyReport.map(getPolicyReportUid).join(',') : ''

export const groupByNamespaceAndPolicy = (reports: PolicyReport[]): NamespacePolicyGroup[] => {
  const nsMap = new Map<string, Map<string, PolicyResultItem[]>>()

  for (const report of reports) {
    const ns = report.metadata?.namespace ?? 'unknown'
    const results = report.policyreport?.results ?? []

    if (!nsMap.has(ns)) nsMap.set(ns, new Map())
    const policyMap = nsMap.get(ns)!

    for (const r of results) {
      const policyName = r.policy ?? 'unknown'
      if (!policyMap.has(policyName)) policyMap.set(policyName, [])
      policyMap.get(policyName)!.push({
        policy: r.policy ?? '',
        message: r.message ?? '',
        result: r.result ?? 'unknown',
        resources:
          r.resources?.map((res) => ({
            kind: res.kind ?? null,
            name: res.name ?? null,
            uid: res.uid ?? null,
            apiVersion: res.apiVersion ?? null,
          })) ?? null,
        properties: r.properties ?? null,
        category: r.category ?? '',
        severity: r.severity ?? '',
      })
    }
  }

  return Array.from(nsMap.entries()).map(([namespace, policyMap]) => {
    const policies: PolicyGroup[] = Array.from(policyMap.entries()).map(([policyName, results]) => {
      const pass = results.filter((r) => r.result === 'pass').length
      const fail = results.filter((r) => r.result === 'fail').length
      const firstResult = results[0]
      return {
        policyName,
        category: firstResult?.category ?? '',
        severity: firstResult?.severity ?? '',
        results,
        summary: { pass, fail },
      }
    })

    const summary = policies.reduce(
      (acc, p) => ({ pass: acc.pass + p.summary.pass, fail: acc.fail + p.summary.fail }),
      { pass: 0, fail: 0 }
    )

    return { namespace, summary, policies }
  })
}
