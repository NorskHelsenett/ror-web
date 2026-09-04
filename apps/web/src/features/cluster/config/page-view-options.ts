import { Option } from '@/components/shadcn/multiselect'
import { Environment, environmentValues } from '../types/environment'
import {
  getClusterNameView,
  getResourcesCpuView,
  getResourcesMemoryView,
  getNodesView,
  getPriceMonthView,
  getDatacenterView,
  getProviderView,
  getEnvironmentView,
  getStatusView,
  getNhnToolVersionView,
  getRorAgentVersionView,
  getKubernetesVersionView,
} from '../utils/cluster'
import { SortDefinition } from '@/hooks/use-sorting'
import { ClusterListViewRowType } from '@ror/js-api-client'
import { ValueLabel } from '@/types/value-label'

/**
 * An array of selectable options for displaying cluster-related data in the page view.
 * Each option includes a `value` used for internal identification and a `label` for user-facing display.
 *
 * @see Option
 */
export const displayDataOptions: Option[] = [
  { value: 'argocd', label: 'ArgoCD' },
  { value: 'grafana', label: 'Grafana' },
  { value: 'rorcli', label: 'ROR CLI' },
  { value: 'cpu', label: 'CPU usage' },
  { value: 'memory', label: 'Memory usage' },
  { value: 'nodes', label: 'Num of nodes' },
  { value: 'price', label: 'Price' },
  { value: 'agentVersion', label: 'ROR agent version' },
  { value: 'kubernetesVersion', label: 'Kubernetes version' },
  { value: 'toolingVersion', label: 'NHN tooling version' },
  { value: 'datacenterName', label: 'Datacenter name' },
  { value: 'datacenterProvider', label: 'Datacenter provider' },
  { value: 'environment', label: 'Environment' },
  { value: 'serviceId', label: 'Service ID' },
  { value: 'region', label: 'Region' },
  { value: 'az', label: 'Availability zone' },
  { value: 'workspace', label: 'Workspace' },
  { value: 'egressIP', label: 'Egress IP' },
]

const OPT_IN_FIELDS: string[] = ['serviceId', 'region', 'az']

export const defaultDisplayData = displayDataOptions.map((o) => o.value).filter((v) => !OPT_IN_FIELDS.includes(v))

/**
 * List of possible sorting IDs values for clusters.
 */
export const sortingIdValues = [
  'clusterName',
  'cpu',
  'memory',
  'nodes',
  'monthlyPrice',
  'datacenterName',
  'datacenterProvider',
  'environment',
  'status',
  'toolingVersion',
  'agentVersion',
  'kubernetesVersion',
] as const

/**
 * Represents the possible sorting IDs for a cluster.
 */
export type SortingIds = (typeof sortingIdValues)[number]

interface ClusterSortingValueLabel extends ValueLabel {
  value: SortingIds
}

interface ClusterOptionWithExtractor extends ClusterSortingValueLabel {
  extractor: (item: ClusterListViewRowType) => string | number | null | undefined
}

const sortingOptionsValueOptionsExtractors: ClusterOptionWithExtractor[] = [
  { value: 'clusterName', label: 'Cluster name', extractor: getClusterNameView },
  { value: 'cpu', label: 'CPU usage', extractor: getResourcesCpuView },
  { value: 'memory', label: 'Memory usage', extractor: getResourcesMemoryView },
  { value: 'nodes', label: 'Num of nodes', extractor: getNodesView },
  { value: 'monthlyPrice', label: 'Price', extractor: getPriceMonthView },
  { value: 'datacenterName', label: 'Datacenter', extractor: getDatacenterView },
  { value: 'datacenterProvider', label: 'Datacenter provider', extractor: getProviderView },
  { value: 'environment', label: 'Environment', extractor: getEnvironmentView },
  { value: 'status', label: 'Status', extractor: getStatusView },
  { value: 'toolingVersion', label: 'NHN tooling version', extractor: getNhnToolVersionView },
  { value: 'agentVersion', label: 'ROR agent version', extractor: getRorAgentVersionView },
  { value: 'kubernetesVersion', label: 'Kubernetes version', extractor: getKubernetesVersionView },
]

/**
 * An array of sorting options for cluster page views.
 * Each option includes a `value` used for sorting and a `label` for display.
 *
 * @see ClusterSortingValueLabel
 */
export const sortingOptions: ClusterSortingValueLabel[] = sortingOptionsValueOptionsExtractors.map((option) => ({
  value: option.value,
  label: option.label,
}))

export const sortingDefinitions: SortDefinition<ClusterListViewRowType>[] = sortingOptionsValueOptionsExtractors.map(
  (option) => ({ key: option.value, extractor: option.extractor })
)

/**
 * Converts an environment string to a human-readable label.
 *
 * If the environment is 'qa', returns 'QA'. Otherwise, capitalizes the first letter
 * and returns the rest of the string as-is.
 *
 * @param env - The environment string to convert.
 * @returns The formatted label for the environment.
 */
const toLabel = (env: Environment): string => {
  if (env === 'qa') return 'QA'
  return env.charAt(0).toUpperCase() + env.slice(1)
}

/**
 * An array of environment options for selection in the UI.
 * Each option contains a `value` representing the environment identifier,
 * and a `label` generated from the environment value for display purposes.
 *
 * @see Option
 * @see environmentValues
 * @see toLabel
 */
export const environments: Option[] = environmentValues.map((env) => ({
  value: env,
  label: toLabel(env),
}))

/**
 * An array of datacenter options used for selection in the cluster configuration page.
 * Each option contains a `value` representing the datacenter identifier and a `label` for display purposes.
 */
export const datacenters: Option[] = [
  { value: 'az1.central.no', label: 'az1.central.no' },
  { value: 'az1.south.test', label: 'az1.south.test' },
  { value: 'az1.west.no', label: 'az1.west.no' },
  { value: 'bgo.west.no', label: 'bgo.west.no' },
  { value: 'osl1', label: 'osl1' },
  { value: 'TalosDC TalosAZ', label: 'TalosDC TalosAZ' },
  { value: 'trd1', label: 'trd1' },
  { value: 'trd1cl02', label: 'trd1cl02' },
  { value: 'trd1 TalosAZ', label: 'trd1 TalosAZ' },
]

/**
 * An array of workspace options used for selection in the cluster configuration page.
 * Each option contains a `value` and a `label`, both representing the workspace identifier.
 */
export const workspaces: Option[] = [
  { value: 'trd1-amk-prod', label: 'trd1-amk-prod' },
  { value: 'trd1cl02-shp-prod', label: 'trd1cl02-shp-prod' },
  { value: 'trd1cl02-dcn', label: 'trd1cl02-dcn' },
  { value: 't-nhn', label: 't-nhn' },
  { value: 'trd1-amk', label: 'trd1-amk' },
  { value: 'trd1-app', label: 'trd1-app' },
  { value: 'trd1-team-kjernejournal-portal', label: 'trd1-team-kjernejournal-portal' },
]

/**
 * An array of filter option objects used for configuring page view filters.
 * Each option includes a label for display, a placeholder for input fields,
 * and a data source array for selectable values.
 */
export const filterOptions = [
  { label: 'Environments', placeholder: 'Set environments', data: environments },
  { label: 'Datacenters', placeholder: 'Set datacenters', data: datacenters },
  { label: 'Workspaces', placeholder: 'Set workspaces', data: workspaces },
]
