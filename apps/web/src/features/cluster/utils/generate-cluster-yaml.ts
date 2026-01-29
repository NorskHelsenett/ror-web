import type { CreateClusterForm } from '../types/create-cluster'
import { convertToVitiMachineClass, renderTagsYaml } from '../config/create-cluster-helpers'

const s = (v: unknown) => (v == null ? '' : String(v))

export function buildClusterYaml(v: CreateClusterForm) {
  const name = s(v.name)
  const region = s(v.region)
  const network = s(v.network)
  const environment = s(v.environment)
  const project = s(v.project)
  const provider = s(v.provider)

  const cp = v.cp ?? 1
  const wpName = s(v.wpName)
  const wpNumber = v.wpNumber ?? 1
  const wpClass = v.wpClass
  const tags = Array.isArray(v.tags) ? v.tags : []

  return `
apiVersion: vitistack.io/v1alpha1
kind: KubernetesCluster
metadata:
  name: ${name || ''}-4y8e
  annotations:
    vitistack.io/networknamespace: ${network || ''}
${renderTagsYaml(tags)}
spec:
  data:
    clusterUid: 5d6da5d8-9a10-4a65-8db9-6aa1027d4b4d
    clusterId: ${name || ''}-4y8e
    provider: ${provider || ''}
    environment: ${environment || ''}
    datacenter: ${region || ''}
    project: ${project || ''}
    region: ${region || ''}
    workorder: "simple-workorder" 
    zone: "az1" 
    workspace: ${network || ''} 
  topology:
    version: "1.34.1"
    controlplane:
      replicas: ${cp || 1}
      version: "1.34.1"
      machineClass: small
      provider: kubevirt 
      storage: 
        - class: "standard"
          path: "/var/lib/vitistack/kubevirt"
          size: "20Gi"
      metadata:
        annotations:
          environment: ${environment || ''}
          region: ${region || ''}
        labels:
          environment: ${environment || ''}
          region: ${region || ''}
    workers:
      nodePools:
        - name: ${wpName || ''}
          taint: []
          version: "1.34.1"
          replicas: ${wpNumber || '1'}
          machineClass: ${convertToVitiMachineClass(wpClass) || 'medium'}
          autoscaling:
            enabled: false
            minReplicas: 1
            maxReplicas: 5
            scalingRules:
              - "cpu"
          metadata:
            annotations:
              environment: ${environment || ''}
              region: ${region || ''}
            labels:
              environment: ${environment || ''}
              region: ${region || ''}
          provider: kubevirt
          storage:
            - class: "standard"
              path: "/var/lib/vitistack/kubevirt"
              size: "20Gi"
    `.trim()
}
