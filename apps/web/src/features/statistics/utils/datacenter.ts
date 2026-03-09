import { getDatacenter } from '@/features/cluster/utils/cluster'
import { KubernetesCluster } from '@ror/js-api-client'

export const findDatacenters = (clusters: KubernetesCluster[]) => {
  const datacenterCount: Record<string, number> = {}

  clusters.forEach((cluster) => {
    const datacenter = getDatacenter(cluster)

    datacenterCount[datacenter] = (datacenterCount[datacenter] || 0) + 1
  })

  return { datacenterCount }
}
