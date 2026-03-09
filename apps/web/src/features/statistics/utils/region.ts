import { getRegion } from '@/features/cluster/utils/cluster'
import { KubernetesCluster } from '@ror/js-api-client'

export const findRegions = (clusters: KubernetesCluster[]) => {
  const regionCount: Record<string, number> = {}

  clusters.forEach((cluster) => {
    const regions = getRegion(cluster)

    regionCount[regions] = (regionCount[regions] || 0) + 1
  })

  return { regionCount }
}
