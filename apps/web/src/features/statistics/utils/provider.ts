import { getClusterProvider } from '@/features/cluster/utils/cluster'
import { KubernetesCluster } from '@ror/js-api-client'

export const findProviders = (clusters: KubernetesCluster[]) => {
  const providerCount: Record<string, number> = {}

  clusters.forEach((cluster) => {
    const providers = getClusterProvider(cluster)

    providerCount[providers] = (providerCount[providers] || 0) + 1
  })

  return { providerCount }
}
