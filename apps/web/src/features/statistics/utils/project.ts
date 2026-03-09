import { getProject } from '@/features/cluster/utils/cluster'
import { KubernetesCluster } from '@ror/js-api-client'

export const findProjects = (clusters: KubernetesCluster[]) => {
  const projectCount: Record<string, number> = {}

  clusters.forEach((cluster) => {
    const projects = getProject(cluster)

    projectCount[projects] = (projectCount[projects] || 0) + 1
  })

  return { projectCount }
}
