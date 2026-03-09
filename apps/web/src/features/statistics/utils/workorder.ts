import { getWorkorder } from '@/features/cluster/utils/cluster'
import { KubernetesCluster } from '@ror/js-api-client'

export const findWorkorders = (clusters: KubernetesCluster[]) => {
  const workorderCount: Record<string, number> = {}

  clusters.forEach((cluster) => {
    const workorders = getWorkorder(cluster)

    workorderCount[workorders] = (workorderCount[workorders] || 0) + 1
  })

  return { workorderCount }
}
