import {
  getClusterSpecTopologyControlPlaneVersion,
  getClusterSpecTopologyVersion,
  getVersions,
} from '@/features/cluster/utils/cluster'
import { KubernetesCluster } from '@ror/js-api-client'

export const findVersions = (clusters: KubernetesCluster[]) => {
  const topologyVersionCount: Record<string, number> = {}
  const topologyControlPlaneVersionCount: Record<string, number> = {}
  const kubernetesCount: Record<string, number> = {}
  const agentCount: Record<string, number> = {}
  const nhnToolingCount: Record<string, number> = {}

  clusters.forEach((cluster) => {
    const versions = getVersions(cluster)
    const topologyVersion = getClusterSpecTopologyVersion(cluster)
    const topologyControlPlaneVersion = getClusterSpecTopologyControlPlaneVersion(cluster)
    const kubeVersion = versions.kubernetes?.version
    const agentVersion = versions.agent?.version
    const nhnToolingVersion = versions.nhnTooling?.version

    topologyVersionCount[topologyVersion] = (topologyVersionCount[topologyVersion] || 0) + 1
    topologyControlPlaneVersionCount[topologyControlPlaneVersion] =
      (topologyControlPlaneVersionCount[topologyControlPlaneVersion] || 0) + 1
    kubernetesCount[kubeVersion] = (kubernetesCount[kubeVersion] || 0) + 1
    agentCount[agentVersion] = (agentCount[agentVersion] || 0) + 1
    nhnToolingCount[nhnToolingVersion] = (nhnToolingCount[nhnToolingVersion] || 0) + 1
  })

  return { topologyVersionCount, topologyControlPlaneVersionCount, kubernetesCount, agentCount, nhnToolingCount }
}
