import { getEnvironment } from '@/features/cluster/utils/cluster'
import { KubernetesCluster } from '@ror/js-api-client'

export const findEnvironments = (clusters: KubernetesCluster[]) => {
  const environmentCount: Record<string, number> = {}

  clusters.forEach((cluster) => {
    const environments = getEnvironment(cluster)

    environmentCount[environments] = (environmentCount[environments] || 0) + 1
  })

  return { environmentCount }
}
