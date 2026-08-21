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

/** Cluster UID. */
export const getClusterUidView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.clusterUid)

/** Cluster ID. */
export const getClusterIdView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.clusterId)

/** Cluster display name. */
export const getClusterNameView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.clusterName)

/** Cloud provider. */
export const getProviderView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.provider)

/** Datacenter name. */
export const getDatacenterView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.datacenter)

/** Availability zone. */
export const getAZView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.availabilityZone)

/** Country. */
export const getCountryView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.country)

/** Region. */
export const getRegionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.region)

/** Workspace name. */
export const getWorkspaceView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.workspace)

/** Environment (e.g. prod/staging). */
export const getEnvironmentView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.environment)

/** CPU capacity spec, e.g. `'4'`. */
export const getResourcesCpuView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.resourcesCpu)

/** Memory capacity with unit, e.g. `'16Gi'`. */
export const getResourcesMemoryView = (cluster: ClusterListViewRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemory)

/** CPU used, in millicores with unit, e.g. `'500m'`. */
export const getResourcesCpuUsedMilliView = (cluster: ClusterListViewRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedMilli)

/** Memory used with unit, e.g. `'8Gi'`. */
export const getResourcesMemoryUsedView = (cluster: ClusterListViewRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemoryUsed)

/** CPU used, as a raw percentage number (no `%` suffix). */
export const getResourcesCpuUsedPercentNumberView = (cluster: ClusterListViewRowType): number | undefined =>
  fieldNum(cluster.resourcesCpuUsedPercent)

/** Memory used, as a raw percentage number (no `%` suffix). */
export const getResourcesMemoryUsedPercentNumberView = (cluster: ClusterListViewRowType): number | undefined =>
  fieldNum(cluster.resourcesMemoryUsedPercent)

/** CPU used percentage, formatted with its unit, e.g. `'45%'`. */
export const getResourcesCpuUsedPercentView = (cluster: ClusterListViewRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedPercent)

/** Memory used percentage, formatted with its unit, e.g. `'60%'`. */
export const getResourcesMemoryUsedPercentView = (cluster: ClusterListViewRowType): string =>
  fieldNumWithUnit(cluster.resourcesMemoryUsedPercent)

/** Node count. */
export const getNodesView = (cluster: ClusterListViewRowType): number | undefined => fieldNum(cluster.nodes)

/** Node pool count. */
export const getNodepoolsCountView = (cluster: ClusterListViewRowType): number | undefined =>
  fieldNum(cluster.nodepoolsCount)

/** Monthly price. */
export const getPriceMonthView = (cluster: ClusterListViewRowType): number | undefined => fieldNum(cluster.priceMonth)

/** Yearly price. */
export const getPriceYearView = (cluster: ClusterListViewRowType): number | undefined => fieldNum(cluster.priceYear)

/** ArgoCD URL. */
export const getArgocdUrlView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.argocdURL)

/** Grafana URL. */
export const getGrafanaUrlView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.grafanaURL)

/** ror agent version. */
export const getRorAgentVersionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.rorAgentVersion)

/** Kubernetes version. */
export const getKubernetesVersionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.kubernetesVersion)

/** NHN tooling version. */
export const getNhnToolVersionView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.nhnToolVersion)

/** Service ID. */
export const getServiceIdView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.serviceID)

/** Raw tags map. */
export const getTagsView = (cluster: ClusterListViewRowType): Record<string, unknown> | null | undefined =>
  cluster.tags?.fieldValue || undefined

/** Egress IP address. */
export const getEgressIPView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.egressIP)

/** Cluster status. */
export const getStatusView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.status)

/** Creation timestamp. */
export const getCreatedView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.created)

/** Last-seen timestamp. */
export const getLastSeenView = (cluster: ClusterListViewRowType): string => fieldStr(cluster.lastSeen)

/** Node pools list. */
export const getNodepoolsView = (cluster: ClusterListViewRowType): unknown[] => cluster.nodepools?.fieldValue ?? []

/** Pipe-joined cluster IDs, used as a memoization/dependency key. */
export const getClustersViewKey = (clusters: ClusterListViewRowType[] = []): string =>
  Array.isArray(clusters) ? clusters.map(getClusterIdView).join('|') : ''

/** `ror login` command for this cluster. */
export const getRorLoginView = (cluster: ClusterListViewRowType): string => `ror login ${getClusterIdView(cluster)}`

/** @see getClusterUidView */
export const getClusterUidViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.clusterUid)

/** @see getClusterIdView */
export const getClusterIdViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.clusterId)

/** @see getClusterNameView */
export const getClusterNameViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.clusterName)

/** @see getProviderView */
export const getProviderViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.provider)

/** @see getDatacenterView */
export const getDatacenterViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.datacenter)

/** @see getAZView */
export const getAZViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.availabilityZone)

/** @see getCountryView */
export const getCountryViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.country)

/** @see getRegionView */
export const getRegionViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.region)

/** @see getWorkspaceView */
export const getWorkspaceViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.workspace)

/** @see getEnvironmentView */
export const getEnvironmentViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.environment)

/** @see getResourcesCpuView */
export const getResourcesCpuViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.resourcesCpu)

/** @see getResourcesMemoryView */
export const getResourcesMemoryViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemory)

/** @see getResourcesCpuUsedMilliView */
export const getResourcesCpuUsedMilliViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedMilli)

/** @see getResourcesMemoryUsedView */
export const getResourcesMemoryUsedViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStrWithUnit(cluster.resourcesMemoryUsed)

/** @see getResourcesCpuUsedPercentNumberView */
export const getResourcesCpuUsedPercentNumberViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.resourcesCpuUsedPercent)

/** @see getResourcesMemoryUsedPercentNumberView */
export const getResourcesMemoryUsedPercentNumberViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.resourcesMemoryUsedPercent)

/** @see getResourcesCpuUsedPercentView */
export const getResourcesCpuUsedPercentViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldNumWithUnit(cluster.resourcesCpuUsedPercent)

/** @see getResourcesMemoryUsedPercentView */
export const getResourcesMemoryUsedPercentViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldNumWithUnit(cluster.resourcesMemoryUsedPercent)

/** @see getNodesView */
export const getNodesViewItem = (cluster: ClusterListViewItemRowType): number | undefined => fieldNum(cluster.nodes)

/** @see getNodepoolsCountView */
export const getNodepoolsCountViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.nodepoolsCount)

/** @see getPriceMonthView */
export const getPriceMonthViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.priceMonth)

/** @see getPriceYearView */
export const getPriceYearViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  fieldNum(cluster.priceYear)

/** @see getArgocdUrlView */
export const getArgocdUrlViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.argocdURL)

/** @see getGrafanaUrlView */
export const getGrafanaUrlViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.grafanaURL)

/** @see getRorAgentVersionView */
export const getRorAgentVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStr(cluster.rorAgentVersion)

/** @see getKubernetesVersionView */
export const getKubernetesVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStr(cluster.kubernetesVersion)

/** @see getNhnToolVersionView */
export const getNhnToolVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  fieldStr(cluster.nhnToolVersion)

/** @see getServiceIdView */
export const getServiceIdViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.serviceID)

/** @see getTagsView */
export const getTagsViewItem = (cluster: ClusterListViewItemRowType): Record<string, unknown> | null | undefined =>
  cluster.tags?.fieldValue || undefined

/** @see getEgressIPView */
export const getEgressIPViewItem = (cluster: ClusterListViewRowType): string => fieldStr(cluster.egressIP)

/** @see getStatusView */
export const getStatusViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.status)

/** @see getCreatedView */
export const getCreatedViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.created)

/** @see getLastSeenView */
export const getLastSeenViewItem = (cluster: ClusterListViewItemRowType): string => fieldStr(cluster.lastSeen)

/** @see getNodepoolsView */
export const getNodepoolsViewItem = (cluster: ClusterListViewItemRowType): unknown[] =>
  cluster.nodepools?.fieldValue ?? []

/** @see getClustersViewKey */
export const getClustersViewKeyItem = (clusters: ClusterListViewItemRowType[] = []): string =>
  Array.isArray(clusters) ? clusters.map(getClusterIdViewItem).join('|') : ''

/** @see getRorLoginView */
export const getRorLoginViewItem = (cluster: ClusterListViewItemRowType): string =>
  `ror login ${getClusterIdViewItem(cluster)}`

/**
 * Groups `clusters` by the value returned from `extractor` and counts how
 * many clusters fall into each group.
 *
 * @param clusters - The clusters to group and count.
 * @param extractor - Derives the grouping key from a cluster (e.g. its provider or status).
 * @returns A map from each distinct key to the number of clusters with that key.
 */
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

/** Cluster count providers */
export const getProviderViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getProviderView)

/** Cluster count datacenters */
export const getDatacenterViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getDatacenterView)

/** Cluster count availability zones */
export const getAZViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getAZView)

/** Cluster count countries */
export const getCountryViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getCountryView)

/** Cluster count regions */
export const getRegionViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getRegionView)

/** Cluster count workspaces */
export const getWorkspaceViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getWorkspaceView)

/** Cluster count environments */
export const getEnvironmentViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getEnvironmentView)

/** Cluster count kubernetes versions */
export const getKubernetesVersionViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getKubernetesVersionView)

/** Cluster count nhn tooling versions */
export const getNhnToolVersionViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getNhnToolVersionView)

/** Cluster count service IDs  */
export const getServiceIdViewCount = (clusters: ClusterListViewRowType[]): CountMap =>
  countBy(clusters, getServiceIdView)

/** Cluster count statuses */
export const getStatusViewCount = (clusters: ClusterListViewRowType[]): CountMap => countBy(clusters, getStatusView)
