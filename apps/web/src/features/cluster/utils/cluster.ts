import { ClusterListViewItemRowType, ClusterListViewRowType, KubernetesCluster } from '@ror/js-api-client'
import type { HealthStatus } from '../types/health-status'
import { normalizeHealthStatus } from './health'
import { ResourceType } from '../types/resource'
import { Environment } from '../types/environment'

/** Represents a raw condition object, typically used to describe the state or status of a resource. */
interface RawCondition {
  type?: string | null
  status?: string | null
  message?: string | null
  reason?: string | null
  lastTransitionTime?: string | null
}

/** Represents a version with its name, version number, and branch. */
interface Version {
  name: string
  version: string
  branch: string
}

/** Represents the versions of various components within a cluster. */
interface ClusterVersions {
  agent: Version
  kubernetes: Version
  nhnTooling: Version
}

/** Represents a tag associated with a service, containing a key-value pair and additional properties. */
export interface ServiceTag {
  key: string
  value: string
  properties: Record<string, string>
}

/** Represents a string, number map for the count of cluster elements  */
export type CountMap = Map<string, number>

/** Falls back to `'Unknown Cluster'` if the ID is missing. */
export const getClusterId = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.clusterId || 'Unknown Cluster'

/** Falls back to `'Unknown Cluster'` if the UID is missing. */
export const getClusterUid = (cluster: KubernetesCluster): string => cluster?.metadata.uid || 'Unknown Cluster'

/** Falls back to `'Unknown Cluster'` if the name is missing. */
export const getClusterName = (cluster: KubernetesCluster): string =>
  cluster?.metadata?.name || cluster?.kubernetescluster?.spec?.data?.clusterId || 'Unknown Cluster'

/** Normalized 'ready' condition, with `status` mapped to `HealthStatus`. */
export interface NormalizedHealthCondition extends RawCondition {
  status: HealthStatus
}

/** Extracts and normalizes the 'ready' condition, if present. */
export function getHealthCondition(
  cluster: KubernetesCluster | null | undefined
): NormalizedHealthCondition | undefined {
  const rawCondition = cluster?.kubernetescluster?.status?.conditions?.find((condition) => condition?.type === 'ready')

  if (!rawCondition) return undefined

  return {
    ...rawCondition,
    status: normalizeHealthStatus(rawCondition.status),
  }
}

/** Retrieves resource information for a specific type from a Kubernetes cluster. */
export function getClusterResource(
  cluster: KubernetesCluster,
  type: ResourceType
): { capacity?: string; used?: string; percentage?: number | null } {
  const resource = cluster?.kubernetescluster?.status?.state?.cluster?.resources?.[type]
  return {
    capacity: resource?.capacity ?? undefined,
    used: resource?.used ?? undefined,
    percentage: resource?.percentage ?? null,
  }
}

/** Get ArgoCD and Grafana endpoints */
export function getTools(cluster: KubernetesCluster) {
  return {
    argo: cluster?.kubernetescluster?.status?.state?.endpoints?.find((endpoint) => endpoint.name === 'argocd')?.address,
    grafana: cluster?.kubernetescluster?.status?.state?.endpoints?.find((endpoint) => endpoint.name === 'grafana')
      ?.address,
  }
}

/** Get monthly and yearly prices */
export function getPrices(cluster: KubernetesCluster) {
  return {
    monthly: cluster?.kubernetescluster?.status?.state?.cluster?.price?.monthly || 0,
    yearly: cluster?.kubernetescluster?.status?.state?.cluster?.price?.yearly || 0,
  }
}

/** Retrieves the last observed update date of a Kubernetes cluster's state. */
export const getLastObserved = (cluster: KubernetesCluster): Date | null | undefined =>
  cluster?.kubernetescluster?.status?.state?.lastUpdated

/** Retrieves the creation date of a Kubernetes cluster, if available. */
export const getCreated = (cluster: KubernetesCluster): Date | null | undefined =>
  cluster?.kubernetescluster?.status?.state?.created

/** Retrieves the environment value from a given Kubernetes cluster object. */
export const getEnvironment = (cluster: KubernetesCluster): Environment =>
  (cluster?.kubernetescluster?.spec?.data?.environment as Environment) ?? 'unknown'

/** Retrieves the server URL for a given Kubernetes cluster by searching for the endpoint named 'datacenter'. */
export const getServerUrl = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.status?.state?.endpoints?.find((endpoint) => endpoint.name === 'datacenter')?.address ||
  '<missing>'

/** Generates a login command string for the specified Kubernetes cluster. */
export const getRorLogin = (cluster: KubernetesCluster): string => `ror login ${getClusterId(cluster)}`

/**
 * Generates a kubectl command string for logging into a vSphere Kubernetes cluster  */
export const getKubectlLogin = (cluster: KubernetesCluster, userEmail: string): string =>
  `kubectl vsphere login --server=${getServerUrl(cluster)} -u ${userEmail} --insecure-skip-tls-verify --tanzu-kubernetes-cluster-namespace ${cluster.kubernetescluster?.spec?.data?.workspace} --tanzu-kubernetes-cluster-name ${getClusterName(cluster)}`

/** 'Yes' if HA (>1 control-plane replica), 'No' if exactly 1, '' if unknown. */
export function getHaClusterPlaneValue(cluster: KubernetesCluster) {
  const nodeNum = cluster?.kubernetescluster?.spec?.topology?.controlplane?.replicas ?? 0
  if (nodeNum > 1) {
    return 'Yes'
  } else if (nodeNum === 1) {
    return 'No'
  } else {
    return ''
  }
}

/** Get ror agent version, kubernetes version and nhn tooling version */
export function getVersions(cluster: KubernetesCluster): ClusterVersions {
  const versions = cluster?.kubernetescluster?.status?.state?.versions || []

  const findOrDefault = (key: string, displayName: string): Version => {
    const found = versions.find((v) => v.name === key)

    return {
      name: found?.name ?? displayName,
      version: found?.version ?? 'Version missing',
      branch: found?.branch ?? '',
    }
  }

  return {
    agent: findOrDefault('agent', 'Agent'),
    kubernetes: findOrDefault('kubernetes', 'Kubernetes'),
    nhnTooling: findOrDefault('nhnTooling', 'NHN Tooling'),
  }
}

/** Retrieves the control plane topology version from a Kubernetes cluster specification. */
export const getClusterSpecTopologyVersion = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.topology?.version || 'No topology version'

/** Retrieves the Kubernetes control plane version from a cluster's topology specification. */
export const getClusterSpecTopologyControlPlaneVersion = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.topology?.controlplane?.version || 'No topology control plane version'

/** Retrieves the region of a Kubernetes cluster */
export const getRegion = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.region || 'No region'

/** Retrieves the workorder of a Kubernetes cluster */
export const getWorkorder = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.workorder || 'No workorder'

/** Retrieves the project name from a given KubernetesCluster object. */
export const getProject = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.project || 'No project assigned'

/** Retrieves the workspace name from a given Kubernetes cluster object. */
export const getWorkspace = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.workspace || 'No workspace assigned'

/** Retrieves the datacenter name from a given Kubernetes cluster object. */
export const getDatacenter = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.datacenter || 'No data center assigned'

/** Retrieves the provider name from a given Kubernetes cluster object. */
export const getProvider = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.provider || 'No provider assigned'

/** Retrieves the list of service tags from the `rormeta` property of a given Kubernetes cluster. */
export const getRormetaTags = (cluster: KubernetesCluster): ServiceTag[] => cluster.rormeta.tags || []

/** Retrieves the list of node pools from a given Kubernetes cluster object. */
export const getNodePools = (cluster: KubernetesCluster) =>
  cluster?.kubernetescluster?.spec?.topology?.workers?.nodePools || []

/** Generates a unique key string for an array of Kubernetes clusters by concatenating their IDs. */
export const getClustersKey = (clusters: KubernetesCluster[] = []) =>
  Array.isArray(clusters) ? clusters.map(getClusterId).join('|') : ''

/** Retrieves the namespace from the metadata of a given Kubernetes cluster. */
export const getClusterNamespace = (cluster: KubernetesCluster): string | undefined => cluster.metadata.namespace

/** Retrieves the creation timestamp from the metadata of a Kubernetes cluster. */
export const getCreationTimestamp = (cluster: KubernetesCluster) => cluster.metadata.creationTimestamp

/** Retrieves a KubernetesCluster based on ClusterId */
export const getClusterById = (id: string, clusters: KubernetesCluster[]): KubernetesCluster | null => {
  return clusters.find((cluster) => getClusterId(cluster) === id) || null
}

// VIEWS

type WithValue<T> = { fieldValue?: T | null } | null | undefined
type WithValueAndUnit<T> = { fieldValue?: T | null; fieldUnit?: unknown } | null | undefined

/** Unwraps a string field, defaulting to `''` */
const fieldStr = (field: WithValue<string>): string => field?.fieldValue ?? ''

/** Unwraps a string field and appends its unit, defaulting to `''`. */
const fieldStrWithUnit = (field: WithValueAndUnit<string>): string =>
  (field?.fieldValue ?? '') + (typeof field?.fieldUnit === 'string' ? field.fieldUnit : '')

/** Unwraps a numeric field, preserving `0` */
const fieldNum = (field: WithValue<number>): number | undefined => field?.fieldValue ?? undefined

/** Unwraps a numeric field and appends its unit as a string, defaulting to `''` */
const fieldNumWithUnit = (field: WithValueAndUnit<number>): string =>
  (field?.fieldValue ?? '') + (typeof field?.fieldUnit === 'string' ? field.fieldUnit : '')

export const getClusterUidView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.clusterUid)

export const getClusterIdView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.clusterId)

export const getClusterNameView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.clusterName)

export const getProviderView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.provider)

export const getDatacenterView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.datacenter)

export const getAZView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.availabilityZone)

export const getCountryView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.country)

export const getRegionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.region)

export const getWorkspaceView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.workspace)

export const getEnvironmentView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.environment)

export const getResourcesCpuView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.resourcesCpu)

export const getResourcesMemoryView = (cluster: ClusterListViewRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemory)

export const getResourcesCpuUsedMilliView = (cluster: ClusterListViewRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedMilli)

export const getResourcesMemoryUsedView = (cluster: ClusterListViewRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemoryUsed)

export const getResourcesCpuUsedPercentNumberView = (cluster: ClusterListViewRowType): number | undefined =>
  fieldNum(cluster.resourcesCpuUsedPercent)

export const getResourcesMemoryUsedPercentNumberView = (cluster: ClusterListViewRowType): number | undefined =>
  fieldNum(cluster.resourcesMemoryUsedPercent)

export const getResourcesCpuUsedPercentView = (cluster: ClusterListViewRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedPercent)

export const getResourcesMemoryUsedPercentView = (cluster: ClusterListViewRowType): string =>
  fieldNumWithUnit(cluster.resourcesMemoryUsedPercent)

export const getNodesView = (cluster: ClusterListViewRowType): number | undefined => fieldNum(cluster.nodes)

export const getNodepoolsCountView = (cluster: ClusterListViewRowType): number | undefined =>
  fieldNum(cluster.nodepoolsCount)

export const getPriceMonthView = (cluster: ClusterListViewRowType): number | undefined => fieldNum(cluster.priceMonth)

export const getPriceYearView = (cluster: ClusterListViewRowType): number | undefined => fieldNum(cluster.priceYear)

export const getArgocdUrlView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.argocdURL)

export const getGrafanaUrlView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.grafanaURL)

export const getRorAgentVersionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.rorAgentVersion)

export const getKubernetesVersionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.kubernetesVersion)

export const getNhnToolVersionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.nhnToolVersion)

export const getServiceIdView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.serviceID)

export const getTagsView = (cluster: ClusterListViewRowType): Record<string, unknown> | null | undefined =>
  cluster.tags?.fieldValue || undefined

export const getStatusView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.status)

export const getCreatedView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.created)

export const getLastSeenView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.lastSeen)

export const getNodepoolsView = (cluster: ClusterListViewRowType): unknown[] => cluster.nodepools?.fieldValue ?? []

export const getClustersViewKey = (clusters: ClusterListViewRowType[] = []): string =>
  Array.isArray(clusters) ? clusters.map(getClusterIdView).join('|') : ''

export const getRorLoginView = (cluster: ClusterListViewRowType): string => `ror login ${getClusterIdView(cluster)}`

export const getClusterUidViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.clusterUid)

export const getClusterIdViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.clusterId)

export const getClusterNameViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.clusterName)

export const getProviderViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.provider)

export const getDatacenterViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.datacenter)

export const getAZViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.availabilityZone)

export const getCountryViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.country)

export const getRegionViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.region)

export const getWorkspaceViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.workspace)

export const getEnvironmentViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.environment)

export const getResourcesCpuViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.resourcesCpu)

export const getResourcesMemoryViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemory)

export const getResourcesCpuUsedMilliViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedMilli)

export const getResourcesMemoryUsedViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemoryUsed)

export const getResourcesCpuUsedPercentNumberViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.resourcesCpuUsedPercent)

export const getResourcesMemoryUsedPercentNumberViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.resourcesMemoryUsedPercent)

export const getResourcesCpuUsedPercentViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedPercent)

export const getResourcesMemoryUsedPercentViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldNumWithUnit(cluster.resourcesMemoryUsedPercent)

export const getNodesViewItem = (cluster: ClusterListViewItemRowType): number | undefined => fieldNum(cluster.nodes)

export const getNodepoolsCountViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.nodepoolsCount)

export const getPriceMonthViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.priceMonth)

export const getPriceYearViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.priceYear)

export const getArgocdUrlViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.argocdURL)

export const getGrafanaUrlViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.grafanaURL)

export const getRorAgentVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStr(cluster.rorAgentVersion)

export const getKubernetesVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStr(cluster.kubernetesVersion)

export const getNhnToolVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStr(cluster.nhnToolVersion)

export const getServiceIdViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.serviceID)

export const getTagsViewItem = (cluster: ClusterListViewItemRowType): Record<string, unknown> | null | undefined =>
  cluster.tags?.fieldValue || undefined

export const getStatusViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.status)

export const getCreatedViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.created)

export const getLastSeenViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.lastSeen)

export const getNodepoolsViewItem = (cluster: ClusterListViewItemRowType): unknown[] =>
  cluster.nodepools?.fieldValue ?? []

export const getClustersViewKeyItem = (clusters: ClusterListViewItemRowType[] = []): string =>
  Array.isArray(clusters) ? clusters.map(getClusterIdViewItem).join('|') : ''

export const getRorLoginViewItem = (cluster: ClusterListViewItemRowType): string =>
  `ror login ${getClusterIdViewItem(cluster)}`

export const countBy = (
  clusters: ClusterListViewRowType[],
  extractor: (cluster: ClusterListViewRowType) => string
): CountMap => {
  const count = new Map<string, number>()
  for (const cluster of clusters) {
    const key = extractor(cluster)
    count.set(key, (count.get(key) ?? 0) + 1)
  }
  return count
}

export const getProviderViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getProviderView)

export const getDatacenterViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getDatacenterView)

export const getAZViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getAZView)

export const getCountryViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getCountryView)

export const getRegionViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getRegionView)

export const getWorkspaceViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getWorkspaceView)

export const getEnvironmentViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getEnvironmentView)

export const getKubernetesVersionViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getKubernetesVersionView)

export const getNhnToolVersionViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getNhnToolVersionView)

export const getServiceIdViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getServiceIdView)

export const getStatusViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getStatusView)
