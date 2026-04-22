import { ClusterListViewItemRowType, ClusterListViewRowType, KubernetesCluster } from '@ror/js-api-client'
import type { HealthStatus } from '../types/health-status'
import { normalizeHealthStatus } from './health'
import { ResourceType } from '../types/resource'
import { Environment } from '../types/environment'

/**
 * Represents a raw condition object, typically used to describe the state or status of a resource.
 *
 * @property type - The type of the condition
 * @property status - The status of the condition
 * @property message - A human-readable message indicating details about the condition's status
 * @property reason - A brief reason for the condition's last transition
 * @property lastTransitionTime - The timestamp for when the condition last changed
 */
interface RawCondition {
  type?: string | null
  status?: string | null
  message?: string | null
  reason?: string | null
  lastTransitionTime?: string | null
}

/**
 * Represents a version with its name, version number, and branch.
 *
 * @property name - The name of the software or component.
 * @property version - The version identifier (e.g., semantic version).
 * @property branch - The source control branch associated with this version.
 */
interface Version {
  name: string
  version: string
  branch: string
}

/**
 * Represents the versions of various components within a cluster.
 *
 * @property agent - The version of the agent component.
 * @property kubernetes - The version of Kubernetes running in the cluster.
 * @property nhnTooling - The version of NHN tooling used in the cluster.
 */
interface ClusterVersions {
  agent: Version
  kubernetes: Version
  nhnTooling: Version
}

/**
 * Represents a tag associated with a service, containing a key-value pair and additional properties.
 *
 * @property key - The unique identifier for the tag.
 * @property value - The value associated with the tag key.
 * @property properties - A record of additional properties related to the tag, where each property is a key-value pair of strings.
 */
export interface ServiceTag {
  key: string
  value: string
  properties: Record<string, string>
}

/**
 * Retrieves the cluster ID from a given KubernetesCluster object.
 *
 * @param cluster - The KubernetesCluster object from which to extract the cluster ID.
 * @returns The cluster ID as a string, or 'Unknown Cluster' if the ID is not available.
 */
export const getClusterId = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.clusterId || 'Unknown Cluster'

/**
 * Retrieves the cluster UID from a given KubernetesCluster object.
 *
 * @param cluster - The KubernetesCluster object from which to extract the cluster ID.
 * @returns The cluster UID as a string, or 'Unknown Cluster' if the ID is not available.
 */
export const getClusterUid = (cluster: KubernetesCluster): string => cluster?.metadata.uid || 'Unknown Cluster'

/**
 * Retrieves the name of a Kubernetes cluster from the provided cluster object.
 *
 * @param cluster - The Kubernetes cluster object to extract the name from.
 * @returns The name of the cluster, or `'Unknown Cluster'` if not found.
 */
export const getClusterName = (cluster: KubernetesCluster): string =>
  cluster?.metadata?.name || cluster?.kubernetescluster?.spec?.data?.clusterId || 'Unknown Cluster'

/**
 * Represents a health condition that has been normalized to use a standardized health status.
 * Extends {@link RawCondition} and replaces the `status` property with a {@link HealthStatus}.
 *
 * @remarks
 * This interface is useful for ensuring that health conditions conform to a consistent status type
 * throughout the application.
 *
 * @see RawCondition
 * @see HealthStatus
 */
export interface NormalizedHealthCondition extends RawCondition {
  status: HealthStatus
}

/**
 * Extracts and normalizes the 'ready' condition from a list of cluster conditions.
 */
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

/**
 * Retrieves resource information for a specific type from a Kubernetes cluster.
 *
 * @param cluster - The Kubernetes cluster object containing resource data.
 * @param type - The type of resource to retrieve (e.g., CPU, memory).
 * @returns An object containing the resource's capacity, used amount, and usage percentage.
 *          If a property is unavailable, `capacity` and `used` will be `undefined`, and `percentage` will be `null`.
 */
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

/**
 * Retrieves the addresses of ArgoCD and Grafana from a Kubernetes cluster's endpoints.
 *
 * @param cluster - The KubernetesCluster object containing endpoint information.
 * @returns An object with the addresses of ArgoCD and Grafana if available, otherwise `undefined`.
 */
export function getTools(cluster: KubernetesCluster) {
  return {
    argo: cluster?.kubernetescluster?.status?.state?.endpoints?.find((endpoint) => endpoint.name === 'argocd')?.address,
    grafana: cluster?.kubernetescluster?.status?.state?.endpoints?.find((endpoint) => endpoint.name === 'grafana')
      ?.address,
  }
}

/**
 * Retrieves the monthly and yearly prices from a given Kubernetes cluster object.
 *
 * @param cluster - The KubernetesCluster object containing pricing information.
 * @returns An object with `monthly` and `yearly` properties representing the respective prices.
 */
export function getPrices(cluster: KubernetesCluster) {
  return {
    monthly: cluster?.kubernetescluster?.status?.state?.cluster?.price?.monthly || 0,
    yearly: cluster?.kubernetescluster?.status?.state?.cluster?.price?.yearly || 0,
  }
}

/**
 * Retrieves the last observed update date of a Kubernetes cluster's state.
 *
 * @param cluster - The KubernetesCluster object containing cluster information.
 * @returns The date of the last state update, or `null`/`undefined` if not available.
 */
export const getLastObserved = (cluster: KubernetesCluster): Date | null | undefined =>
  cluster?.kubernetescluster?.status?.state?.lastUpdated

/**
 * Retrieves the creation date of a Kubernetes cluster, if available.
 *
 * @param cluster - The KubernetesCluster object containing cluster details.
 * @returns The creation date as a `Date` object, or `null`/`undefined` if not present.
 */
export const getCreated = (cluster: KubernetesCluster): Date | null | undefined =>
  cluster?.kubernetescluster?.status?.state?.created

/**
 * Retrieves the environment value from a given Kubernetes cluster object.
 *
 * @param cluster - The Kubernetes cluster object containing environment information.
 * @returns The environment as an `Environment` type, or `'unknown'` if not specified.
 */
export const getEnvironment = (cluster: KubernetesCluster): Environment =>
  (cluster?.kubernetescluster?.spec?.data?.environment as Environment) ?? 'unknown'

/**
 * Retrieves the server URL for a given Kubernetes cluster by searching for the endpoint named 'datacenter'.
 *
 * @param cluster - The Kubernetes cluster object containing endpoint information.
 * @returns The address of the 'datacenter' endpoint if found; otherwise, returns the string '<missing>'.
 */
export const getServerUrl = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.status?.state?.endpoints?.find((endpoint) => endpoint.name === 'datacenter')?.address ||
  '<missing>'

/**
 * Generates a login command string for the specified Kubernetes cluster.
 *
 * @param cluster - The Kubernetes cluster object for which to generate the login command.
 * @returns A string containing the login command for the given cluster.
 */
export const getRorLogin = (cluster: KubernetesCluster): string => `ror login ${getClusterId(cluster)}`

/**
 * Generates a kubectl command string for logging into a vSphere Kubernetes cluster.
 *
 * @param cluster - The Kubernetes cluster object containing connection details.
 * @param userEmail - The email address of the user for authentication.
 * @returns The kubectl login command as a string, pre-filled with cluster and user information.
 */
export const getKubectlLogin = (cluster: KubernetesCluster, userEmail: string): string =>
  `kubectl vsphere login --server=${getServerUrl(cluster)} -u ${userEmail} --insecure-skip-tls-verify --tanzu-kubernetes-cluster-namespace ${cluster.kubernetescluster?.spec?.data?.workspace} --tanzu-kubernetes-cluster-name ${getClusterName(cluster)}`

/**
 * Determines whether a Kubernetes cluster has a highly available (HA) control plane.
 *
 * @param cluster - The KubernetesCluster object containing cluster specifications.
 * @returns 'Yes' if the control plane has more than one replica (HA), 'No' if only one replica (not HA),
 *          or an empty string if the replica count is undefined or zero.
 */
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
/**
 * Retrieves the version information (agent, Kubernetes, and NHN Tooling) for a given Kubernetes cluster.
 *
 * Extracts the versions for agent, Kubernetes, and NHN Tooling from the cluster's status.
 *
 * @param cluster - The Kubernetes cluster object containing version information.
 * @returns An object containing the agent, Kubernetes, and NHN Tooling versions.
 */
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

/**
 * Retrieves the control plane topology version from a Kubernetes cluster specification.
 * @param cluster - The Kubernetes cluster object containing spec and topology information.
 * @returns The control plane topology version string, or undefined if not available.
 */
export const getClusterSpecTopologyVersion = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.topology?.version || 'No topology version'

/**
 * Retrieves the Kubernetes control plane version from a cluster's topology specification.
 * @param cluster - The Kubernetes cluster object containing specification details
 * @returns The control plane version string, or undefined if the path doesn't exist
 */
export const getClusterSpecTopologyControlPlaneVersion = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.topology?.controlplane?.version || 'No topology control plane version'

/**
 * Retrieves the provider of a Kubernetes cluster.
 * @param cluster - The Kubernetes cluster object to extract the provider from.
 * @returns The provider string of the cluster, or undefined if the cluster or its data is not available.
 */
export const getClusterProvider = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.provider || 'No provider'

export const getRegion = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.region || 'No region'

export const getWorkorder = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.workorder || 'No workorder'

/**
 * Retrieves the project name from a given KubernetesCluster object.
 *
 * @param cluster - The KubernetesCluster object containing cluster information.
 * @returns The project name if available, otherwise returns 'No project assigned'.
 */
export const getProject = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.project || 'No project assigned'

/**
 * Retrieves the workspace name from a given Kubernetes cluster object.
 *
 * @param cluster - The KubernetesCluster object containing cluster details.
 * @returns The workspace name if available, otherwise returns 'No workspace assigned'.
 */
export const getWorkspace = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.workspace || 'No workspace assigned'

/**
 * Retrieves the datacenter name from a given Kubernetes cluster object.
 *
 * @param cluster - The Kubernetes cluster object to extract the datacenter from.
 * @returns The name of the datacenter if available, otherwise returns 'No data center assigned'.
 */
export const getDatacenter = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.datacenter || 'No data center assigned'

/**
 * Retrieves the provider name from a given Kubernetes cluster object.
 *
 * @param cluster - The KubernetesCluster object containing cluster details.
 * @returns The provider name if available, otherwise returns 'No provider assigned'.
 */
export const getProvider = (cluster: KubernetesCluster): string =>
  cluster?.kubernetescluster?.spec?.data?.provider || 'No provider assigned'

/**
 * Retrieves the list of service tags from the `rormeta` property of a given Kubernetes cluster.
 *
 * @param cluster - The Kubernetes cluster object containing the `rormeta` property.
 * @returns An array of `ServiceTag` objects, or an empty array if no tags are present.
 */
export const getRormetaTags = (cluster: KubernetesCluster): ServiceTag[] => cluster.rormeta.tags || []

/**
 * Retrieves the list of node pools from a given Kubernetes cluster object.
 *
 * @param cluster - The Kubernetes cluster object containing topology and node pool information.
 * @returns An array of node pools if available; otherwise, returns an empty array.
 */
export const getNodePools = (cluster: KubernetesCluster) =>
  cluster?.kubernetescluster?.spec?.topology?.workers?.nodePools || []

/**
 * Generates a unique key string for an array of Kubernetes clusters by concatenating their IDs.
 *
 * @param clusters - An array of `KubernetesCluster` objects.
 * @returns A string representing the concatenated cluster IDs, separated by a pipe (`|`).
 */
export const getClustersKey = (clusters: KubernetesCluster[] = []) =>
  Array.isArray(clusters) ? clusters.map(getClusterId).join('|') : ''

/**
 * Retrieves the namespace from the metadata of a given Kubernetes cluster.
 *
 * @param cluster - The Kubernetes cluster object containing metadata.
 * @returns The namespace string associated with the cluster.
 */
export const getClusterNamespace = (cluster: KubernetesCluster): string | undefined => cluster.metadata.namespace

/**
 * Retrieves the creation timestamp from the metadata of a Kubernetes cluster.
 *
 * @param cluster - The Kubernetes cluster object containing metadata.
 * @returns The creation timestamp of the cluster.
 */
export const getCreationTimestamp = (cluster: KubernetesCluster) => cluster.metadata.creationTimestamp

export const getClusterById = (id: string, clusters: KubernetesCluster[]): KubernetesCluster | null => {
  return clusters.find((cluster) => getClusterId(cluster) === id) || null
}

// VIEWS

export const getClusterUidView = (cluster: ClusterListViewRowType): string => cluster.clusterUid?.fieldValue || ''

export const getClusterIdView = (cluster: ClusterListViewRowType): string => cluster.clusterId?.fieldValue || ''

export const getClusterNameView = (cluster: ClusterListViewRowType): string => cluster.clusterName?.fieldValue || ''

export const getProviderView = (cluster: ClusterListViewRowType): string => cluster.provider?.fieldValue || ''

export const getDatacenterView = (cluster: ClusterListViewRowType): string => cluster.datacenter?.fieldValue || ''

export const getAZView = (cluster: ClusterListViewRowType): string => cluster.availabilityZone?.fieldValue || ''

export const getCountryView = (cluster: ClusterListViewRowType): string => cluster.country?.fieldValue || ''

export const getRegionView = (cluster: ClusterListViewRowType): string => cluster.region?.fieldValue || ''

export const getWorkspaceView = (cluster: ClusterListViewRowType): string => cluster.workspace?.fieldValue || ''

export const getEnvironmentView = (cluster: ClusterListViewRowType): string => cluster.environment?.fieldValue || ''

export const getResourcesCpuView = (cluster: ClusterListViewRowType): string => cluster.resourcesCpu?.fieldValue || ''

export const getResourcesMemoryView = (cluster: ClusterListViewRowType): string | '' =>
  (cluster.resourcesMemory?.fieldValue || '') + (cluster.resourcesMemory?.fieldUnit || '')

export const getResourcesCpuUsedMilliView = (cluster: ClusterListViewRowType): string | '' =>
  (cluster.resourcesCpuUsedMilli?.fieldValue || '') + (cluster.resourcesCpuUsedMilli?.fieldUnit || '')

export const getResourcesMemoryUsedView = (cluster: ClusterListViewRowType): string | '' =>
  (cluster.resourcesMemoryUsed?.fieldValue || '') + (cluster.resourcesMemoryUsed?.fieldUnit || '')

export const getResourcesCpuUsedPercentNumberView = (cluster: ClusterListViewRowType): number | undefined =>
  cluster.resourcesCpuUsedPercent?.fieldValue ?? undefined

export const getResourcesMemoryUsedPercentNumberView = (cluster: ClusterListViewRowType): number | undefined =>
  cluster.resourcesMemoryUsedPercent?.fieldValue ?? undefined

export const getResourcesCpuUsedPercentView = (cluster: ClusterListViewRowType): string | '' =>
  (cluster.resourcesCpuUsedPercent?.fieldValue || '') + (cluster.resourcesCpuUsedPercent?.fieldUnit || '')

export const getResourcesMemoryUsedPercentView = (cluster: ClusterListViewRowType): string | '' =>
  (cluster.resourcesMemoryUsedPercent?.fieldValue || '') + (cluster.resourcesMemoryUsedPercent?.fieldUnit || '')

export const getNodesView = (cluster: ClusterListViewRowType): number | undefined =>
  cluster.nodes?.fieldValue || undefined

export const getNodePoolsView = (cluster: ClusterListViewRowType): number | undefined =>
  cluster.nodePools?.fieldValue || undefined

export const getPriceMonthView = (cluster: ClusterListViewRowType): number | undefined =>
  cluster.priceMonth?.fieldValue || undefined

export const getPriceYearView = (cluster: ClusterListViewRowType): number | undefined =>
  cluster.priceYear?.fieldValue || undefined

export const getArgocdUrlView = (cluster: ClusterListViewRowType): string => cluster.argocdURL?.fieldValue || ''

export const getGrafanaUrlView = (cluster: ClusterListViewRowType): string => cluster.grafanaURL?.fieldValue || ''

export const getRorAgentVersionView = (cluster: ClusterListViewRowType): string =>
  cluster.rorAgentVersion?.fieldValue || ''

export const getKubernetesVersionView = (cluster: ClusterListViewRowType): string =>
  cluster.kubernetesVersion?.fieldValue || ''

export const getNhnToolVersionView = (cluster: ClusterListViewRowType): string =>
  cluster.nhnToolVersion?.fieldValue || ''

export const getServiceIdView = (cluster: ClusterListViewRowType): string => cluster.serviceID?.fieldValue || ''

export const getTagsView = (cluster: ClusterListViewRowType): Record<string, unknown> | null | undefined =>
  cluster.tags?.fieldValue || undefined

export const getStatusView = (cluster: ClusterListViewRowType): string => cluster.status?.fieldValue || ''

export const getCreatedView = (cluster: ClusterListViewRowType): string => cluster.created?.fieldValue || ''

export const getLastSeenView = (cluster: ClusterListViewRowType): string => cluster.lastSeen?.fieldValue || ''

export const getClustersViewKey = (clusters: ClusterListViewRowType[] = []): string =>
  Array.isArray(clusters) ? clusters.map(getClusterIdView).join('|') : ''

export const getRorLoginView = (cluster: ClusterListViewRowType): string => `ror login ${getClusterIdView(cluster)}`

export const getClusterUidViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.clusterUid?.fieldValue || ''

export const getClusterIdViewItem = (cluster: ClusterListViewItemRowType): string => cluster.clusterId?.fieldValue || ''

export const getClusterNameViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.clusterName?.fieldValue || ''

export const getProviderViewItem = (cluster: ClusterListViewItemRowType): string => cluster.provider?.fieldValue || ''

export const getDatacenterViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.datacenter?.fieldValue || ''

export const getAZViewItem = (cluster: ClusterListViewItemRowType): string => cluster.availabilityZone?.fieldValue || ''

export const getCountryViewItem = (cluster: ClusterListViewItemRowType): string => cluster.country?.fieldValue || ''

export const getRegionViewItem = (cluster: ClusterListViewItemRowType): string => cluster.region?.fieldValue || ''

export const getWorkspaceViewItem = (cluster: ClusterListViewItemRowType): string => cluster.workspace?.fieldValue || ''

export const getEnvironmentViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.environment?.fieldValue || ''

export const getResourcesCpuViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.resourcesCpu?.fieldValue || ''

export const getResourcesMemoryViewItem = (cluster: ClusterListViewItemRowType): string | '' =>
  (cluster.resourcesMemory?.fieldValue || '') + (cluster.resourcesMemory?.fieldUnit || '')

export const getResourcesCpuUsedMilliViewItem = (cluster: ClusterListViewItemRowType): string | '' =>
  (cluster.resourcesCpuUsedMilli?.fieldValue || '') + (cluster.resourcesCpuUsedMilli?.fieldUnit || '')

export const getResourcesMemoryUsedViewItem = (cluster: ClusterListViewItemRowType): string | '' =>
  (cluster.resourcesMemoryUsed?.fieldValue || '') + (cluster.resourcesMemoryUsed?.fieldUnit || '')

export const getResourcesCpuUsedPercentNumberViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  cluster.resourcesCpuUsedPercent?.fieldValue ?? undefined

export const getResourcesMemoryUsedPercentNumberViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  cluster.resourcesMemoryUsedPercent?.fieldValue ?? undefined

export const getResourcesCpuUsedPercentViewItem = (cluster: ClusterListViewItemRowType): string | '' =>
  (cluster.resourcesCpuUsedPercent?.fieldValue || '') + (cluster.resourcesCpuUsedPercent?.fieldUnit || '')

export const getResourcesMemoryUsedPercentViewItem = (cluster: ClusterListViewItemRowType): string | '' =>
  (cluster.resourcesMemoryUsedPercent?.fieldValue || '') + (cluster.resourcesMemoryUsedPercent?.fieldUnit || '')

export const getNodesViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  cluster.nodes?.fieldValue || undefined

export const getNodePoolsViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  cluster.nodePools?.fieldValue || undefined

export const getPriceMonthViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  cluster.priceMonth?.fieldValue || undefined

export const getPriceYearViewItem = (cluster: ClusterListViewItemRowType): number | undefined =>
  cluster.priceYear?.fieldValue || undefined

export const getArgocdUrlViewItem = (cluster: ClusterListViewItemRowType): string => cluster.argocdURL?.fieldValue || ''

export const getGrafanaUrlViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.grafanaURL?.fieldValue || ''

export const getRorAgentVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.rorAgentVersion?.fieldValue || ''

export const getKubernetesVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.kubernetesVersion?.fieldValue || ''

export const getNhnToolVersionViewItem = (cluster: ClusterListViewItemRowType): string =>
  cluster.nhnToolVersion?.fieldValue || ''

export const getServiceIdViewItem = (cluster: ClusterListViewItemRowType): string => cluster.serviceID?.fieldValue || ''

export const getTagsViewItem = (cluster: ClusterListViewItemRowType): Record<string, unknown> | null | undefined =>
  cluster.tags?.fieldValue || undefined

export const getStatusViewItem = (cluster: ClusterListViewItemRowType): string => cluster.status?.fieldValue || ''

export const getCreatedViewItem = (cluster: ClusterListViewItemRowType): string => cluster.created?.fieldValue || ''

export const getLastSeenViewItem = (cluster: ClusterListViewItemRowType): string => cluster.lastSeen?.fieldValue || ''

export const getClustersViewKeyItem = (clusters: ClusterListViewItemRowType[] = []): string =>
  Array.isArray(clusters) ? clusters.map(getClusterIdViewItem).join('|') : ''

export const getRorLoginViewItem = (cluster: ClusterListViewItemRowType): string =>
  `ror login ${getClusterIdViewItem(cluster)}`
