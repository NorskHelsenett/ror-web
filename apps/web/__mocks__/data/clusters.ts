/**
 * clusters.ts - Mock data for Kubernetes clusters
 *
 * This file dynamically generates an array of mock Kubernetes clusters for use in local development and testing.
 * The data is used by MSW handlers to simulate paginated API responses (offset/limit).
 *
 * - Generates a fixed number of clusters with unique clusterId and metadata
 * - Used for infinite scroll, pagination, and frontend API testing
 * - No static cluster objects; all clusters are generated programmatically
 */
import { faker } from '@faker-js/faker'
import { machine } from 'os'
import { sub } from 'date-fns'

export const clustersVersion1 = Array.from({ length: 104 }, (_, i) => {
  const idx = i + 1
  return {
    clusterId: `mock-cluster-${idx}`,
    clusterName: `Mock Cluster ${idx}`,
    created: `2025-01-${String((idx % 28) + 1).padStart(2, '0')}T12:00:00Z`,
    environment: idx % 2 === 0 ? 'mgmt' : 'kurs',
    healthStatus: { health: idx % 3 },
    firstObserved: `2025-01-${String((idx % 28) + 1).padStart(2, '0')}T13:00:00Z`,
    lastObserved: `2025-08-${String((idx % 28) + 1).padStart(2, '0')}T14:00:00Z`,
    metadata: { project: { name: `Project ${idx}` } },
    metrics: {
      priceMonth: 1000 + idx,
      priceYear: 12000 + idx * 10,
      cpu: 2 + (idx % 8),
      memory: 8000000000 + idx * 1000000,
      cpuConsumed: 100 + idx,
      memoryConsumed: 2000000000 + idx * 100000,
      cpuPercentage: (idx * 2) % 100,
      memoryPercentage: (idx * 3) % 100,
      nodePoolCount: 1,
      nodeCount: 1 + (idx % 5),
      clusterCount: 1,
    },
    topology: {
      controlPlaneEndpoint: `10.0.${idx % 255}.${(idx * 2) % 255}:6443`,
      egressIp: `10.0.${(idx * 3) % 255}.${(idx * 4) % 255}`,
      controlPlane: {
        nodes: [
          {
            name: `mock-control-plane-${idx}`,
            role: 'control-plane',
            created: `2025-01-${String((idx % 28) + 1).padStart(2, '0')}T12:00:00Z`,
            osImage: 'Ubuntu 22.04.5 LTS',
            machineName: `mock-control-plane-${idx}`,
            metrics: {
              priceMonth: 0,
              priceYear: 0,
              cpu: 2,
              memory: 8000000000,
              cpuConsumed: 100,
              memoryConsumed: 2000000000,
              cpuPercentage: 10,
              memoryPercentage: 20,
              nodePoolCount: 0,
              nodeCount: 0,
              clusterCount: 0,
            },
            architecture: 'amd64',
            containerRuntimeVersion: 'containerd://1.7.25-1',
            kernelVersion: '5.15.0-1079-azure',
            kubeProxyVersion: 'v1.30.9',
            kubeletVersion: 'v1.30.9',
            operatingSystem: 'linux',
            machineClass: '',
          },
        ],
      },
    },
    versions: {
      nhnTooling: {
        version: '1.6.25',
        branch: '1.*',
        environment: idx % 2 === 0 ? 'dev' : 'test',
      },
      agent: {
        version: '0.1.749',
        sha: 'd529458a',
      },
      kubernetes: 'v1.28.7',
    },
    workspace: {
      name: `workspace-${idx}`,
      datacenter: {
        name: `dc-${idx}`,
        provider: 'tanzu',
        apiEndpoint: `api-${idx}.example.com`,
      },
    },
    ingresses: [],
    acl: { accessGroups: [`group-${idx}@example.com`] },
    id: `mock-id-${idx}`,
    identifier: `mock-cluster-${idx}`,
    clusterIdOld: '',
    workspaceId: `mock-workspace-id-${idx}`,
    updated: '0001-01-01T00:00:00Z',
    createdBy: '',
    splunkIndex: '',
    config: {
      versions: null,
      overrides: null,
      projectMetadata: {
        roles: null,
        billing: { workorder: '' },
        serviceTags: null,
      },
    },
    status: { state: '', phase: '', conditions: null },
  }
})

/**
 * Mock data for KubernetesClusters v2.
 */

// export const clustersVersion2 = {
//   resources: Array.from({ length: 104 }, (_, i) => {
//     const idx = i + 1
//     return {
//       kind: 'KubernetesCluster',
//       apiVersion: 'general.ror.internal/v1alpha1',
//       metadata: {
//         name: `Mock Cluster ${idx}`,
//         namespace: `workspace-${idx}`,
//         uid: `mock-uid-${idx}`,
//         creationTimestamp: `2025-01-${String((idx % 28) + 1).padStart(2, '0')}T12:00:00Z`,
//       },
//       rormeta: {
//         version: 'v2',
//         hash: `${10000000000000000000 + idx}`,
//         ownerref: {
//           scope: 'UNKNOWN',
//           subject: 'UNKNOWN',
//         },
//         action: 'Add',
//       },
//       kubernetescluster: {
//         spec: {
//           data: {
//             clusterId: `mock-cluster-${idx}`,
//             provider: 'tanzu',
//             datacenter: `dc-${idx}`,
//             region: 'oslo',
//             zone: '',
//             project: `Project ${idx}`,
//             workspace: `workspace-${idx}`,
//             workorder: '',
//             environment: idx % 2 === 0 ? 'mgmt' : 'kurs',
//           },
//           topology: {
//             version: 'v1.28.7',
//             controlplane: {
//               replicas: 1,
//               version: 'v1.28.7',
//               provider: 'tanzu',
//               machineClass: 'best-effort-medium',
//               metadata: {
//                 labels: null,
//                 annotations: null,
//               },
//               storage: null,
//             },
//             workers: {
//               nodePools: [
//                 {
//                   machineClass: 'best-effort-medium',
//                   provider: 'tanzu',
//                   version: 'v1.28.7',
//                   name: 'workers',
//                   replicas: 1 + (idx % 5),
//                   autoscaling: {
//                     enabled: false,
//                     minReplicas: 0,
//                     maxReplicas: 0,
//                     scalingRules: null,
//                   },
//                   metadata: {
//                     labels: null,
//                     annotations: null,
//                   },
//                 },
//               ],
//             },
//           },
//         },
//         status: {
//           state: {
//             cluster: {
//               externalId: `mock-id-${idx}`,
//               resources: {},
//               price: {
//                 monthly: 1000 + idx,
//                 yearly: 12000 + idx * 10,
//               },
//               controlplane: {
//                 status: 'Running',
//                 message: '',
//                 scale: 1,
//                 machineClass: 'best-effort-medium',
//                 resources: {},
//                 nodes: null,
//               },
//               nodepools: null,
//             },
//             versions: null,
//             endpoints: null,
//             egressIP: `10.0.${(idx * 3) % 255}.${(idx * 4) % 255}`,
//             lastUpdated: null,
//             lastUpdatedBy: '',
//             created: null,
//           },
//           phase: 'Running',
//           conditions: null,
//         },
//       },
//     }
//   }),
// }

export const clustersVersion2 = {
  resources: [
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'apt-sommer-9oz9',
            clusterUid: '50189a99-5b6b-4806-a8b2-c27de9b88328',
            datacenter: 'trd1cl02',
            environment: 'test',
            project: 'APT-Sommer',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10002056',
            workspace: 'trd1cl02-apt-sommer',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'apt-sommer-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.42',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'apt-sommer',
        namespace: 'trd1cl02-apt-sommer',
        uid: '50189a99-5b6b-4806-a8b2-c27de9b88328',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'apt-sommer-9oz9',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'avi-test-03-b01w',
            clusterUid: '79528c22-c8d2-4a0c-a16d-2a9af23845d6',
            datacenter: 'trd1',
            environment: 'test',
            project: 'Containerplattform',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: 'Intern',
            workspace: 'trd1-avi-system',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.29.4+vmware.3-fips.1',
            },
            version: 'v1.29.4',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'avi-test-03-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.29.4',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.6',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'avi-test-03',
        namespace: 'trd1-avi-system',
        uid: '79528c22-c8d2-4a0c-a16d-2a9af23845d6',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'avi-test-03-b01w',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'avi-test-04-qz6m',
            clusterUid: 'ac9f28f3-a6ae-4303-b037-1f8b40642499',
            datacenter: 'trd1cl02',
            environment: 'test',
            project: 'Containerplattform',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: 'Intern',
            workspace: 'trd1cl02-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.29.4+vmware.3-fips.1',
            },
            version: 'v1.29.4',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'avi-test-04-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.29.4',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.2',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'avi-test-04',
        namespace: 'trd1cl02-test',
        uid: 'ac9f28f3-a6ae-4303-b037-1f8b40642499',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'avi-test-04-qz6m',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'contracts-test-wpc7',
            clusterUid: '2b71be75-a031-4ab8-be4e-239f6be3f5e3',
            datacenter: 'osl1',
            environment: 'test',
            project: 'Contracts',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '50010-2',
            workspace: 'osl1-contracts',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'contracts-test-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.55',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'contracts-test',
        namespace: 'osl1-contracts',
        uid: '2b71be75-a031-4ab8-be4e-239f6be3f5e3',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'contracts-test-wpc7',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-amk-001-ca6v',
            clusterUid: '86948877-d9b2-4c78-bb5f-4f1c3b0e8e3a',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001854',
            workspace: 'trd1-amk',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-amk-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.39',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-amk-001',
        namespace: 'trd1-amk',
        uid: '86948877-d9b2-4c78-bb5f-4f1c3b0e8e3a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-amk-001-ca6v',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-amk-002-xi40',
            clusterUid: 'bcf6f0fd-992a-413e-8f6c-5e1d7d2a9119',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001854',
            workspace: 'osl1-amk',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-amk-002-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.13',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-amk-002',
        namespace: 'osl1-amk',
        uid: 'bcf6f0fd-992a-413e-8f6c-5e1d7d2a9119',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-amk-002-xi40',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-andre-111-51xq',
            clusterUid: 'eee32804-0e4e-417d-b5c5-3db697f3e40d',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'ROR By NHN',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: 'Intern',
            workspace: 'trd1cl02-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-andre-111-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.2',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-andre-111',
        namespace: 'trd1cl02-test',
        uid: 'eee32804-0e4e-417d-b5c5-3db697f3e40d',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-andre-111-51xq',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-anne-001-fyy9',
            clusterUid: 'efe7b75f-50db-48e4-99f9-d202bfc86de1',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Containerplattform',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: 'Intern',
            workspace: 'trd1cl02-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.1+vmware.1-fips',
            },
            version: 'v1.30.1',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-anne-001-workers-1',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.1',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.2',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-anne-001',
        namespace: 'trd1cl02-test',
        uid: 'efe7b75f-50db-48e4-99f9-d202bfc86de1',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-anne-001-fyy9',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-app-001-v9fw',
            clusterUid: 'cef63ac9-d920-4cf4-9b6d-865117ebea3e',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Appmarket',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '410500200',
            workspace: 'trd1-app',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-app-001-workers',
                  provider: 'tanzu',
                  replicas: 5,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -5,
                yearly: -60,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.59',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-app-001',
        namespace: 'trd1-app',
        uid: 'cef63ac9-d920-4cf4-9b6d-865117ebea3e',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-app-001-v9fw',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-hndevops-002-b82l',
            clusterUid: '0c5f7c02-b56f-4b67-9157-67c819189686',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsenorge',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001850',
            workspace: 'trd1cl02-hn-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-hndevops-002-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.13',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-hndevops-002',
        namespace: 'trd1cl02-hn-test',
        uid: '0c5f7c02-b56f-4b67-9157-67c819189686',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-hndevops-002-b82l',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-inn-002-hano',
            clusterUid: '3c8981eb-4307-41ea-a5b2-6b0f5964fadf',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Helsepersonell - Innrapportering',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001340',
            workspace: 'trd1-inn',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-inn-002-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.53',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-inn-002',
        namespace: 'trd1-inn',
        uid: '3c8981eb-4307-41ea-a5b2-6b0f5964fadf',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-inn-002-hano',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-inn-web-001-z6zz',
            clusterUid: '74860fbc-3d1e-45fd-a296-06da8f085c3e',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Innrapportering frontend',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '100001030',
            workspace: 'trd1-inn-web',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-inn-web-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.66',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-inn-web-001',
        namespace: 'trd1-inn-web',
        uid: '74860fbc-3d1e-45fd-a296-06da8f085c3e',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-inn-web-001-z6zz',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-jra-999-11yg',
            clusterUid: 'd7fe8f41-5a3e-4f8a-bf52-a2b6fdae1214',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Containerplattform',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: 'Intern',
            workspace: 'trd1cl02-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-jra-999-workers-1',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.2',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-jra-999',
        namespace: 'trd1cl02-test',
        uid: 'd7fe8f41-5a3e-4f8a-bf52-a2b6fdae1214',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-jra-999-11yg',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-kj-portal-001-pk2p',
            clusterUid: '41589ac7-0d0b-4603-a24f-e2cb98f27be6',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Kjernejournal',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001832',
            workspace: 'trd1cl02-team-kjernejournal-portal',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-kj-portal-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.50',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-kj-portal-001',
        namespace: 'trd1cl02-team-kjernejournal-portal',
        uid: '41589ac7-0d0b-4603-a24f-e2cb98f27be6',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-kj-portal-001-pk2p',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-komlink-001-sd27',
            clusterUid: '54ed5210-84bf-4546-b0d7-06b6a13751ca',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - Oversikt over kommunale tjenester',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001450',
            workspace: 'trd1cl02-komlink',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-komlink-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.47',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-komlink-001',
        namespace: 'trd1cl02-komlink',
        uid: '54ed5210-84bf-4546-b0d7-06b6a13751ca',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-komlink-001-sd27',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-komsat-001-zv16',
            clusterUid: 'b15c107d-cf85-46c0-9bbe-ae5356b7f477',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - VKP',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001821',
            workspace: 'trd1cl02-komsat',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-komsat-001-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.81',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-komsat-001',
        namespace: 'trd1cl02-komsat',
        uid: 'b15c107d-cf85-46c0-9bbe-ae5356b7f477',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-komsat-001-zv16',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-ncpeh-001-9snl',
            clusterUid: 'bfc150b2-a22d-47cf-92ba-a7fd77ad0a6a',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Helsepersonell - NCPeH',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001307',
            workspace: 'osl1-ncpeh',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-ncpeh-001-worker',
                  provider: 'tanzu',
                  replicas: 4,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -4,
                yearly: -48,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.15',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-ncpeh-001',
        namespace: 'osl1-ncpeh',
        uid: 'bfc150b2-a22d-47cf-92ba-a7fd77ad0a6a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-ncpeh-001-9snl',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-ncpehp-000-r8ev',
            clusterUid: '56922b74-2f50-487b-94ad-76f5562790d9',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Helsepersonell - NCPeH portaler',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001308',
            workspace: 'osl1-ncpehp',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-ncpehp-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.51',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-ncpehp-000',
        namespace: 'osl1-ncpehp',
        uid: '56922b74-2f50-487b-94ad-76f5562790d9',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-ncpehp-000-r8ev',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-osl-cpbck-001-z4v4',
            clusterUid: '0cdc63e5-a432-4717-be1e-0daeb43e7b82',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Crossplane/Backstage Poc',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '90000232',
            workspace: 'osl1-cpbck',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-osl-cpbck-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.60',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-osl-cpbck-001',
        namespace: 'osl1-cpbck',
        uid: '0cdc63e5-a432-4717-be1e-0daeb43e7b82',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-osl-cpbck-001-z4v4',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-osl-xcads-001-m976',
            clusterUid: 'da58f0c1-0739-4be5-a35e-ff9d9624df30',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Helsepersonell - Pasientens journaldokumenter',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001839',
            workspace: 'osl1-xcads',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-osl-xcads-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.57',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-osl-xcads-001',
        namespace: 'osl1-xcads',
        uid: 'da58f0c1-0739-4be5-a35e-ff9d9624df30',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-osl-xcads-001-m976',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-osl-xcais-001-hnvr',
            clusterUid: '30e1ea0e-a3de-43f0-9abf-1cfb19e6113f',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Helsepersonell - Pasientens journaldokumenter',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001839',
            workspace: 'osl1-xcais',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-osl-xcais-001-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.61',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-osl-xcais-001',
        namespace: 'osl1-xcais',
        uid: '30e1ea0e-a3de-43f0-9abf-1cfb19e6113f',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-osl-xcais-001-hnvr',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-par-001-shv8',
            clusterUid: '37de3ab8-2ae8-4d00-b95a-dbc15e23066a',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - Pasientens Rekvisisjoner',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001714',
            workspace: 'trd1cl02-par',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-par-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.77',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-par-001',
        namespace: 'trd1cl02-par',
        uid: '37de3ab8-2ae8-4d00-b95a-dbc15e23066a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-par-001-shv8',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-per-001-eme9',
            clusterUid: 'f82ed96b-3fa2-41a8-951e-3ce34392bcef',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Helsepersonell - Persontjenesten',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10000749',
            workspace: 'trd1-per-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-per-001-workers',
                  provider: 'tanzu',
                  replicas: 4,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -4,
                yearly: -48,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.18',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-per-001',
        namespace: 'trd1-per-test',
        uid: 'f82ed96b-3fa2-41a8-951e-3ce34392bcef',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-per-001-eme9',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-poc-001-wuey',
            clusterUid: '7659cb1c-cf1f-41b1-9f1a-8ece46debadc',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'ROR By NHN',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: 'Intern',
            workspace: 'osl1-pastrans',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-poc-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.37',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-poc-001',
        namespace: 'osl1-pastrans',
        uid: '7659cb1c-cf1f-41b1-9f1a-8ece46debadc',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-poc-001-wuey',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-pps-001-zulu',
            clusterUid: '458454f1-7fae-43b5-9ceb-12b738d0b947',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - Pasientens prøvesvar',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001462',
            workspace: 'trd1cl02-pps',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-pps-001-workers-1',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.26',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-pps-001',
        namespace: 'trd1cl02-pps',
        uid: '458454f1-7fae-43b5-9ceb-12b738d0b947',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-pps-001-zulu',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-pts-001-qs7i',
            clusterUid: 'ba0c1202-1300-4153-b1d8-68ea21bdde73',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Helsepersonell - Personvern og Tilgangsstyring',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001462',
            workspace: 'osl1-team-pts',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-pts-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.14',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-pts-001',
        namespace: 'osl1-team-pts',
        uid: 'ba0c1202-1300-4153-b1d8-68ea21bdde73',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-pts-001-qs7i',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-rahmi-123-v06x',
            clusterUid: 'b4996d08-666d-4b19-9cbd-2c212aceea3a',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'ROR By NHN',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: 'Intern',
            workspace: 'osl1-sky-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-rahmi-123-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.10',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-rahmi-123',
        namespace: 'osl1-sky-test',
        uid: 'b4996d08-666d-4b19-9cbd-2c212aceea3a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-rahmi-123-v06x',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-rfi-000-2vru',
            clusterUid: 'e9cd5341-ec61-4e4a-96c7-286ef4a7155a',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Reseptformidleren',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001038',
            workspace: 'osl1-rf-it',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-rfi-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.22',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-rfi-000',
        namespace: 'osl1-rf-it',
        uid: 'e9cd5341-ec61-4e4a-96c7-286ef4a7155a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-rfi-000-2vru',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-sapt-airag-001-jrge',
            clusterUid: '38748c41-6238-4967-aec2-af373a3eee56',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'APT-Sommer',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10002056',
            workspace: 'trd1cl02-apt-sommer',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-sapt-airag-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.42',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-sapt-airag-001',
        namespace: 'trd1cl02-apt-sommer',
        uid: '38748c41-6238-4967-aec2-af373a3eee56',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-sapt-airag-001-jrge',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-sb-001-9wvl',
            clusterUid: '35b3b1ef-1581-497c-bcd2-fd542f3d2a34',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - Selvbetjening',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10000775',
            workspace: 'trd1cl02-team-selvbetjening',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-sb-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.65',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-sb-001',
        namespace: 'trd1cl02-team-selvbetjening',
        uid: '35b3b1ef-1581-497c-bcd2-fd542f3d2a34',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-sb-001-9wvl',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-sfm-thla-001-ku2l',
            clusterUid: '466aabf0-324a-452f-8821-6a61ab66bea1',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Sentral Forskrivingsmodul',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001835',
            workspace: 'trd1cl02-sfm',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-sfm-thla-001-workers-2',
                  provider: 'tanzu',
                  replicas: 8,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -8,
                yearly: -96,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.3',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-sfm-thla-001',
        namespace: 'trd1cl02-sfm',
        uid: '466aabf0-324a-452f-8821-6a61ab66bea1',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-sfm-thla-001-ku2l',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-student-001-ddb1',
            clusterUid: '6f0b3a01-a39a-40f8-b0b9-03304cc86de8',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Pasientreiser',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '310209400',
            workspace: 'osl1-pastrans',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-student-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.37',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-student-001',
        namespace: 'osl1-pastrans',
        uid: '6f0b3a01-a39a-40f8-b0b9-03304cc86de8',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-student-001-ddb1',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-taa-000-jdti',
            clusterUid: '3a7276f2-b2d9-49bf-b618-0cb85e93471a',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - Auth og auth',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10000764',
            workspace: 'trd1cl02-taa',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-taa-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.48',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-taa-000',
        namespace: 'trd1cl02-taa',
        uid: '3a7276f2-b2d9-49bf-b618-0cb85e93471a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-taa-000-jdti',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-taa-002-hgu1',
            clusterUid: 'bac4c9e5-8ed8-41be-bda9-e46d816456fc',
            datacenter: 'osl1',
            environment: 'test',
            project: 'Helsepersonell - Auth og auth',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10000764',
            workspace: 'osl1-taa',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-taa-002-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.28',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-taa-002',
        namespace: 'osl1-taa',
        uid: 'bac4c9e5-8ed8-41be-bda9-e46d816456fc',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-taa-002-hgu1',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-tp-001-tv5r',
            clusterUid: 'd2cdd3f5-39ff-446b-baaa-c2cbfbd2c781',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Helsepersonell - Plattform',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001409',
            workspace: 'trd1-tp',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-tp-001-workers',
                  provider: 'tanzu',
                  replicas: 5,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -5,
                yearly: -60,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.34',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-tp-001',
        namespace: 'trd1-tp',
        uid: 'd2cdd3f5-39ff-446b-baaa-c2cbfbd2c781',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-tp-001-tv5r',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-tp-003-2jja',
            clusterUid: 'fcd7efcb-fca0-4df3-9ebe-f34a5bb2ec7d',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - Plattform',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001409',
            workspace: 'trd1cl02-tp',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-tp-003-workers',
                  provider: 'tanzu',
                  replicas: 9,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -9,
                yearly: -108,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.6',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-tp-003',
        namespace: 'trd1cl02-tp',
        uid: 'fcd7efcb-fca0-4df3-9ebe-f34a5bb2ec7d',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-tp-003-2jja',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-tp-004-xs6r',
            clusterUid: 'dc418fe6-36bd-4fc9-b0bb-1a0015ba147d',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'ROR By NHN',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001476',
            workspace: 'trd1cl02-tp',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-tp-004-workers',
                  provider: 'tanzu',
                  replicas: 4,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -4,
                yearly: -48,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.6',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-tp-004',
        namespace: 'trd1cl02-tp',
        uid: 'dc418fe6-36bd-4fc9-b0bb-1a0015ba147d',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-tp-004-xs6r',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-trd-ek-001-9kr9',
            clusterUid: '287aecc1-89c1-492b-9801-cfb0ce37682e',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Helsepersonell - Etterkontroll',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001899',
            workspace: 'trd1-ek',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-trd-ek-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.65',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-trd-ek-001',
        namespace: 'trd1-ek',
        uid: '287aecc1-89c1-492b-9801-cfb0ce37682e',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-trd-ek-001-9kr9',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-tu-001-oems',
            clusterUid: 'dffb2740-5a6b-4813-a20a-377966bfe675',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - Testunivers',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001471',
            workspace: 'trd1cl02-tu',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-tu-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.33',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-tu-001',
        namespace: 'trd1cl02-tu',
        uid: 'dffb2740-5a6b-4813-a20a-377966bfe675',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-tu-001-oems',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'd-vkp-001-01en',
            clusterUid: '05e5fb26-b602-4b08-b309-9e453d653ebc',
            datacenter: 'trd1cl02',
            environment: 'dev',
            project: 'Helsepersonell - VKP',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001821',
            workspace: 'trd1cl02-vkp',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'd-vkp-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.56',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'd-vkp-001',
        namespace: 'trd1cl02-vkp',
        uid: '05e5fb26-b602-4b08-b309-9e453d653ebc',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'd-vkp-001-01en',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'dsdi-melding-73qo',
            clusterUid: '0cfbed25-4410-46ce-8bcd-bbe62ee0af26',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Helsepersonell - Melding',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10000977',
            workspace: 'trd1-team-melding',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'dsdi-melding-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.12',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'dsdi-melding',
        namespace: 'trd1-team-melding',
        uid: '0cfbed25-4410-46ce-8bcd-bbe62ee0af26',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'dsdi-melding-73qo',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'et-ncpehp-000-w02z',
            clusterUid: '22f19824-f28d-4165-bfbe-5bcd0d0dc19a',
            datacenter: 'osl1',
            environment: 'test',
            project: 'Helsepersonell - NCPeH portaler',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001308',
            workspace: 'osl1-ncpehp',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'et-ncpehp-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.51',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'et-ncpehp-000',
        namespace: 'osl1-ncpehp',
        uid: '22f19824-f28d-4165-bfbe-5bcd0d0dc19a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'et-ncpehp-000-w02z',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'k-amk-001-pr4k',
            clusterUid: '764201c6-d0a2-4c31-b899-fd2a503313b3',
            datacenter: 'trd1',
            environment: 'kurs',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001854',
            workspace: 'trd1-amk',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'k-amk-001-workers',
                  provider: 'tanzu',
                  replicas: 4,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -4,
                yearly: -48,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.39',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'k-amk-001',
        namespace: 'trd1-amk',
        uid: '764201c6-d0a2-4c31-b899-fd2a503313b3',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'k-amk-001-pr4k',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'k-gis-001-mzcj',
            clusterUid: '63adc5d9-0ec8-42c0-b3ca-3b286d8a5e5f',
            datacenter: 'trd1',
            environment: 'kurs',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001853',
            workspace: 'trd1-amk',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'k-gis-001-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.39',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'k-gis-001',
        namespace: 'trd1-amk',
        uid: '63adc5d9-0ec8-42c0-b3ca-3b286d8a5e5f',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'k-gis-001-mzcj',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'kjernejournal-portal-test-t1g3',
            clusterUid: 'd43ef9a2-7459-41ab-9273-3f73eea99c97',
            datacenter: 'trd1',
            environment: 'test',
            project: 'Kjernejournal',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001832',
            workspace: 'trd1-team-kjernejournal-portal',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'kjernejournal-portal-test-workers',
                  provider: 'tanzu',
                  replicas: 5,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -5,
                yearly: -60,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.32',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'kjernejournal-portal-test',
        namespace: 'trd1-team-kjernejournal-portal',
        uid: 'd43ef9a2-7459-41ab-9273-3f73eea99c97',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'kjernejournal-portal-test-t1g3',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'kjernejournal-test-psox',
            clusterUid: '8a5a7a48-54d7-4a89-9b7b-0d95b064f0df',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Kjernejournal',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001832',
            workspace: 'trd1-team-kjernejournal-test',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'kjernejournal-test-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.24',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'kjernejournal-test',
        namespace: 'trd1-team-kjernejournal-test',
        uid: '8a5a7a48-54d7-4a89-9b7b-0d95b064f0df',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'kjernejournal-test-psox',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'mgmt-felles-0001-aoet',
            clusterUid: '4d412d93-0c63-42fd-a741-f03d8ccd4bf7',
            datacenter: 'trd1',
            environment: 'mgmt',
            project: 'Management Privat Sky',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: 'Intern',
            workspace: 'trd1-nhn-mgmt',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.28.7+vmware.1-fips.1',
            },
            version: 'v1.28.7',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'mgmt-felles-0001-workers',
                  provider: 'tanzu',
                  replicas: 6,
                  storage: null,
                  taint: null,
                  version: 'v1.28.7',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: 46092,
                yearly: 553104,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.10',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'mgmt-felles-0001',
        namespace: 'trd1-nhn-mgmt',
        uid: '4d412d93-0c63-42fd-a741-f03d8ccd4bf7',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'mgmt-felles-0001-aoet',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'mgmt-felles-0001-staging-zpvg',
            clusterUid: 'd06b0d3f-f0b0-4de5-ab47-2986dd653bc3',
            datacenter: 'trd1',
            environment: 'dev',
            project: 'Management Privat Sky',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: 'Intern',
            workspace: 'trd1-nhn-mgmt',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'mgmt-felles-0001-staging-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.10',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'mgmt-felles-0001-staging',
        namespace: 'trd1-nhn-mgmt',
        uid: 'd06b0d3f-f0b0-4de5-ab47-2986dd653bc3',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'mgmt-felles-0001-staging-zpvg',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'mgmt-felles-0002-gl3s',
            clusterUid: '144137d3-6d0b-4f80-a7b6-c680e36dbdf2',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Management Privat Sky',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: 'Intern',
            workspace: 'osl1-nhn-mgmt',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'mgmt-felles-0002-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.4',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'mgmt-felles-0002',
        namespace: 'osl1-nhn-mgmt',
        uid: '144137d3-6d0b-4f80-a7b6-c680e36dbdf2',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'mgmt-felles-0002-gl3s',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'mgmt-felles-0002-staging-8375',
            clusterUid: '7e425f31-b89f-4d0b-b3f1-e52275bd7295',
            datacenter: 'osl1',
            environment: 'dev',
            project: 'Management Privat Sky',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: 'Intern',
            workspace: 'osl1-nhn-mgmt',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'mgmt-felles-0002-staging-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.4',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'mgmt-felles-0002-staging',
        namespace: 'osl1-nhn-mgmt',
        uid: '7e425f31-b89f-4d0b-b3f1-e52275bd7295',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'mgmt-felles-0002-staging-8375',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'osl-kj-prod001-f32w',
            clusterUid: '9eb82260-99f0-42d5-b416-a87a5ade40c2',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Kjernejournal',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001832',
            workspace: 'osl1-kj-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'osl-kj-prod001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.39',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'osl-kj-prod001',
        namespace: 'osl1-kj-prod',
        uid: '9eb82260-99f0-42d5-b416-a87a5ade40c2',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'osl-kj-prod001-f32w',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'osl-kj-prod002-0a8y',
            clusterUid: 'aa18371e-7e13-4963-8973-402214e38d8a',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Kjernejournal',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001832',
            workspace: 'osl1-kj-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.31.4+vmware.1-fips',
            },
            version: 'v1.31.4',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'osl-kj-prod002-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.31.4',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.39',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'osl-kj-prod002',
        namespace: 'osl1-kj-prod',
        uid: 'aa18371e-7e13-4963-8973-402214e38d8a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'osl-kj-prod002-0a8y',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'osl-kj-qa001-9z88',
            clusterUid: '8cd138af-7b29-4e5f-b7fe-0d1e193a9192',
            datacenter: 'osl1',
            environment: 'qa',
            project: 'Kjernejournal',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001832',
            workspace: 'osl1-kj-qa',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'osl-kj-qa001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.38',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'osl-kj-qa001',
        namespace: 'osl1-kj-qa',
        uid: '8cd138af-7b29-4e5f-b7fe-0d1e193a9192',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'osl-kj-qa001-9z88',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'osl-kj-qa002-17vm',
            clusterUid: '8126501d-42a1-4ddb-b525-e360bb416c3a',
            datacenter: 'osl1',
            environment: 'qa',
            project: 'Kjernejournal',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001832',
            workspace: 'osl1-kj-qa',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 1,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'osl-kj-qa002-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.38',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'osl-kj-qa002',
        namespace: 'osl1-kj-qa',
        uid: '8126501d-42a1-4ddb-b525-e360bb416c3a',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'osl-kj-qa002-17vm',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-alert-000-aqai',
            clusterUid: 'cee0e7c4-d14a-4944-ad46-f77a836854b3',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Monitorering - OS',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: 'Intern',
            workspace: 'trd1-ops',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-alert-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.54',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-alert-000',
        namespace: 'trd1-ops',
        uid: 'cee0e7c4-d14a-4944-ad46-f77a836854b3',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-alert-000-aqai',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-amk-001-scjy',
            clusterUid: 'a7358d05-842c-4ded-b081-d5bb353e7332',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001854',
            workspace: 'trd1-amk-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-amk-001-workers',
                  provider: 'tanzu',
                  replicas: 8,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -8,
                yearly: -96,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.40',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-amk-001',
        namespace: 'trd1-amk-prod',
        uid: 'a7358d05-842c-4ded-b081-d5bb353e7332',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-amk-001-scjy',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-amk-002-x6jx',
            clusterUid: 'b0608835-5860-4cdf-b2a0-89f293914c18',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001854',
            workspace: 'osl1-amk-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-amk-002-workers',
                  provider: 'tanzu',
                  replicas: 8,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -8,
                yearly: -96,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.23',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-amk-002',
        namespace: 'osl1-amk-prod',
        uid: 'b0608835-5860-4cdf-b2a0-89f293914c18',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-amk-002-x6jx',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-amk-003-wla8',
            clusterUid: '970cfc18-c404-455f-89cf-15fcdbe3ceb4',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001854',
            workspace: 'trd1-amk-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-amk-003-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.40',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-amk-003',
        namespace: 'trd1-amk-prod',
        uid: '970cfc18-c404-455f-89cf-15fcdbe3ceb4',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-amk-003-wla8',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-bgs-001-xlv7',
            clusterUid: 'f9c057da-4571-45e3-9212-6c7ec44b2a0c',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Nexus til DHP',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001476',
            workspace: 'trd1-lda-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-bgs-001-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.47',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-bgs-001',
        namespace: 'trd1-lda-prod',
        uid: 'f9c057da-4571-45e3-9212-6c7ec44b2a0c',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-bgs-001-xlv7',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-cd-001-d67e',
            clusterUid: '0d3f4f53-f974-40fb-9590-721beaeade29',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Management Privat Sky',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: 'Intern',
            workspace: 'trd1-nhn-mgmt',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-cd-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.10',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-cd-001',
        namespace: 'trd1-nhn-mgmt',
        uid: '0d3f4f53-f974-40fb-9590-721beaeade29',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-cd-001-d67e',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-cry-mgmt-001-vmgw',
            clusterUid: 'c6159cd8-f816-4166-8192-a3a5789ccc56',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Kryptodrift',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '540200100',
            workspace: 'osl1-cry-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.31.4+vmware.1-fips',
            },
            version: 'v1.31.4',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-cry-mgmt-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.31.4',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.56',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-cry-mgmt-001',
        namespace: 'osl1-cry-prod',
        uid: 'c6159cd8-f816-4166-8192-a3a5789ccc56',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-cry-mgmt-001-vmgw',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-cry-obao-001-0cyy',
            clusterUid: '16628fd0-cd35-455e-8643-5f7240e38ada',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Kryptodrift',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '540200100',
            workspace: 'trd1cl02-cry-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.1+vmware.1-fips',
            },
            version: 'v1.30.1',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-cry-obao-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.1',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.72',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-cry-obao-001',
        namespace: 'trd1cl02-cry-prod',
        uid: '16628fd0-cd35-455e-8643-5f7240e38ada',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-cry-obao-001-0cyy',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-dd-001-aw1u',
            clusterUid: 'e1646785-1390-4006-afc3-1c55235860b9',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsepersonell - Pasientens journaldokumenter',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001839',
            workspace: 'trd1cl02-dd-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.28.7+vmware.1-fips.1',
            },
            version: 'v1.28.7',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-dd-001-workerz',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.28.7',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: 6924,
                yearly: 83088,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.36',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-dd-001',
        namespace: 'trd1cl02-dd-prod',
        uid: 'e1646785-1390-4006-afc3-1c55235860b9',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-dd-001-aw1u',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-dns-001-uvih',
            clusterUid: '63775305-8095-457b-8cf5-cacc8c67f124',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'APT - Kjerneplattformer',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '440600400',
            workspace: 'trd1cl02-ldp-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.28.7+vmware.1-fips.1',
            },
            version: 'v1.28.7',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-dns-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.28.7',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: 3597,
                yearly: 43164,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.64',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-dns-001',
        namespace: 'trd1cl02-ldp-prod',
        uid: '63775305-8095-457b-8cf5-cacc8c67f124',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-dns-001-uvih',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-dpt-001-524c',
            clusterUid: '1ff20c65-0c15-4c9e-bc12-6e554d2ca59e',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Dataprodukt',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001850',
            workspace: 'trd1cl02-hn-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-dpt-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.46',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-dpt-001',
        namespace: 'trd1cl02-hn-prod',
        uid: '1ff20c65-0c15-4c9e-bc12-6e554d2ca59e',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-dpt-001-524c',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-ds-001-3d2w',
            clusterUid: 'c147acc0-ac87-4f2d-abb4-aa074f70edf1',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Datashield',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '310206000',
            workspace: 'trd1-lda',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-ds-001-workers',
                  provider: 'tanzu',
                  replicas: 4,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -4,
                yearly: -48,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.26',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-ds-001',
        namespace: 'trd1-lda',
        uid: 'c147acc0-ac87-4f2d-abb4-aa074f70edf1',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ds-001-3d2w',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-edi-001-9rxa',
            clusterUid: '9aae8988-fe9c-46cd-a240-0c62d042fd71',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'EDI',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001837',
            workspace: 'trd1cl02-edi-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-edi-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.60',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-edi-001',
        namespace: 'trd1cl02-edi-prod',
        uid: '9aae8988-fe9c-46cd-a240-0c62d042fd71',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-edi-001-9rxa',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-fellesloggshp-001-kk9j',
            clusterUid: 'd1d5dfbd-9d2f-490d-babf-227467ca3944',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsepersonell - Etterkontroll',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001899',
            workspace: 'trd1cl02-shp-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-fellesloggshp-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.8',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-fellesloggshp-001',
        namespace: 'trd1cl02-shp-prod',
        uid: 'd1d5dfbd-9d2f-490d-babf-227467ca3944',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-fellesloggshp-001-kk9j',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-gdr-001-s3rl',
            clusterUid: '4d08f7c6-c42c-4b17-b2d9-66ff6eecee46',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsepersonell - Grunndata',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001828',
            workspace: 'trd1cl02-team-gdr-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-gdr-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.31',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-gdr-001',
        namespace: 'trd1cl02-team-gdr-prod',
        uid: '4d08f7c6-c42c-4b17-b2d9-66ff6eecee46',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-gdr-001-s3rl',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-gis-001-pxt3',
            clusterUid: '145ca13b-4988-4ea2-8aaf-1288cd261583',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001853',
            workspace: 'trd1-amk-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-gis-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.40',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-gis-001',
        namespace: 'trd1-amk-prod',
        uid: '145ca13b-4988-4ea2-8aaf-1288cd261583',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-gis-001-pxt3',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-gis-002-3xu7',
            clusterUid: '7a7d9d60-afe1-44d1-9691-e672849a31c5',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'AMK',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001853',
            workspace: 'osl1-amk-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-gis-002-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.23',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-gis-002',
        namespace: 'osl1-amk-prod',
        uid: '7a7d9d60-afe1-44d1-9691-e672849a31c5',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-gis-002-3xu7',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-git-002-k2ab',
            clusterUid: '5887f2b0-3799-4b6f-94f1-b2e0c3ceb8f2',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Management Privat Sky',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: 'Intern',
            workspace: 'trd1cl02-nhn-mgmt',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.28.7+vmware.1-fips.1',
            },
            version: 'v1.28.7',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-git-002-workers',
                  provider: 'tanzu',
                  replicas: 8,
                  storage: null,
                  taint: null,
                  version: 'v1.28.7',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: 61456,
                yearly: 737472,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.5',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-git-002',
        namespace: 'trd1cl02-nhn-mgmt',
        uid: '5887f2b0-3799-4b6f-94f1-b2e0c3ceb8f2',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-git-002-k2ab',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-hn-001-y6ks',
            clusterUid: '339e4591-b811-4bd8-b55f-a1e1382f81c8',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsenorge',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001850',
            workspace: 'trd1cl02-hn-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-hn-001-workers',
                  provider: 'tanzu',
                  replicas: 10,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -10,
                yearly: -120,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.46',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-hn-001',
        namespace: 'trd1cl02-hn-prod',
        uid: '339e4591-b811-4bd8-b55f-a1e1382f81c8',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-hn-001-y6ks',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-hn-vlt001-3e6i',
            clusterUid: 'f1858dd1-4a7f-437e-bd2c-0dc3ef0755df',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsenorge',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001850',
            workspace: 'trd1cl02-hn-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-hn-vlt001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.46',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-hn-vlt001',
        namespace: 'trd1cl02-hn-prod',
        uid: 'f1858dd1-4a7f-437e-bd2c-0dc3ef0755df',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-hn-vlt001-3e6i',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-inn-002-tn1p',
            clusterUid: '66adab52-c0f5-4c6b-952e-5fa9a29aa132',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Helsepersonell - Innrapportering',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '100001411',
            workspace: 'trd1-inn',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-inn-002-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.53',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-inn-002',
        namespace: 'trd1-inn',
        uid: '66adab52-c0f5-4c6b-952e-5fa9a29aa132',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-inn-002-tn1p',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-inn-web-001-gl14',
            clusterUid: 'f5fb2b06-9031-42d0-8d80-f46eb5036265',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Innrapportering frontend',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '100001030',
            workspace: 'trd1-inn-web',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-inn-web-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.66',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-inn-web-001',
        namespace: 'trd1-inn-web',
        uid: 'f5fb2b06-9031-42d0-8d80-f46eb5036265',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-inn-web-001-gl14',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-iss-001-6vne',
            clusterUid: 'd17e1a93-7c00-48e6-af88-3e1dcf5eb6e6',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Helsepersonell - Integrasjon og støttesystemer',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '10001389',
            workspace: 'trd1-internutv',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.29.4+vmware.3-fips.1',
            },
            version: 'v1.29.4',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-iss-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.29.4',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.14',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-iss-001',
        namespace: 'trd1-internutv',
        uid: 'd17e1a93-7c00-48e6-af88-3e1dcf5eb6e6',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-iss-001-6vne',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-jun2-001-onyd',
            clusterUid: '1f33232b-3f6f-4523-a0b6-f2a8bb7147e9',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Windowsapplikasjoner',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '50302-2',
            workspace: 'trd1-jun2-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-jun2-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.51',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-jun2-001',
        namespace: 'trd1-jun2-prod',
        uid: '1f33232b-3f6f-4523-a0b6-f2a8bb7147e9',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-jun2-001-onyd',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-kaf-001-wd0d',
            clusterUid: '74a23fda-6925-4a47-889e-ff0b63d4d6e1',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsepersonell - Integrasjon og støttesystemer',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001812',
            workspace: 'trd1cl02-kaf-int',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-kaf-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-kaf-001-workers-kafka',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -6,
                yearly: -72,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.53',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-kaf-001',
        namespace: 'trd1cl02-kaf-int',
        uid: '74a23fda-6925-4a47-889e-ff0b63d4d6e1',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-kaf-001-wd0d',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-kart-001-p0w1',
            clusterUid: '0c84aa5e-791a-47de-bb82-d147884c0602',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'GIS',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '380400100',
            workspace: 'trd1-gis-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-kart-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.61',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-kart-001',
        namespace: 'trd1-gis-prod',
        uid: '0c84aa5e-791a-47de-bb82-d147884c0602',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-kart-001-p0w1',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-komlink-001-e3w6',
            clusterUid: '18cebe54-f2e5-41be-a48d-cc15adb6e1ef',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsepersonell - Oversikt over kommunale tjenester',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001413',
            workspace: 'trd1cl02-komlink-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-komlink-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.69',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-komlink-001',
        namespace: 'trd1cl02-komlink-prod',
        uid: '18cebe54-f2e5-41be-a48d-cc15adb6e1ef',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-komlink-001-e3w6',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-komsat-001-j2tu',
            clusterUid: '3bebd49a-9541-467c-abf6-a9bac7f55d29',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Helsepersonell - VKP',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10002054',
            workspace: 'osl1-komsat-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-komsat-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.60',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-komsat-001',
        namespace: 'osl1-komsat-prod',
        uid: '3bebd49a-9541-467c-abf6-a9bac7f55d29',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-komsat-001-j2tu',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-lb-001-dhi0',
            clusterUid: '69d6659e-d860-4431-8309-80eda06da57e',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Lastbalansering',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '53010-2',
            workspace: 'trd1cl02-lb',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-lb-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.49',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-lb-001',
        namespace: 'trd1cl02-lb',
        uid: '69d6659e-d860-4431-8309-80eda06da57e',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-lb-001-dhi0',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-ldp-001-nfgq',
            clusterUid: '42097781-2e8a-416c-8d32-6006ec6ac668',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'APT - Kjerneplattformer',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '53011-1',
            workspace: 'trd1cl02-ldp-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-ldp-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.64',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-ldp-001',
        namespace: 'trd1cl02-ldp-prod',
        uid: '42097781-2e8a-416c-8d32-6006ec6ac668',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ldp-001-nfgq',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-mitt-nettverk-001-l40n',
            clusterUid: '79b68ad8-1b7f-4963-ab17-d1ce54a6c8eb',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Mitt-Nettverk',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '50010',
            workspace: 'osl1-mitt-nettverk-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-mitt-nettverk-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.53',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-mitt-nettverk-001',
        namespace: 'osl1-mitt-nettverk-prod',
        uid: '79b68ad8-1b7f-4963-ab17-d1ce54a6c8eb',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-mitt-nettverk-001-l40n',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-mrs-001-rv5m',
            clusterUid: 'ef177e4a-d02b-4fa8-9b33-1f1156835e72',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Medisinsk registreringssystem',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '310100100',
            workspace: 'trd1cl02-mrs-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-mrs-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.54',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-mrs-001',
        namespace: 'trd1cl02-mrs-prod',
        uid: 'ef177e4a-d02b-4fa8-9b33-1f1156835e72',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-mrs-001-rv5m',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-mtj-001-4fop',
            clusterUid: '33e5b34d-a72f-4aeb-bdab-3eca1cdb859f',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Windowsapplikasjoner',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001827',
            workspace: 'trd1cl02-mtj-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-mtj-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.10',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-mtj-001',
        namespace: 'trd1cl02-mtj-prod',
        uid: '33e5b34d-a72f-4aeb-bdab-3eca1cdb859f',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-mtj-001-4fop',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-nav-000-19ek',
            clusterUid: 'babc9cbc-d7df-42bc-82b7-e97b3109ab4c',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Helsepersonell - Pasientens prøvesvar',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001462',
            workspace: 'osl1-team-nav-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-nav-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.20',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-nav-000',
        namespace: 'osl1-team-nav-prod',
        uid: 'babc9cbc-d7df-42bc-82b7-e97b3109ab4c',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-nav-000-19ek',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-nav-001-b8hf',
            clusterUid: '6cf69bd6-f8cf-45c4-989f-a8ff222d1efe',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsepersonell - NAV',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10000975',
            workspace: 'trd1cl02-dhp-nav-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-nav-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-nav-001-workers-kafka',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -6,
                yearly: -72,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.29',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-nav-001',
        namespace: 'trd1cl02-dhp-nav-prod',
        uid: '6cf69bd6-f8cf-45c4-989f-a8ff222d1efe',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-nav-001-b8hf',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-nav-002-a1ow',
            clusterUid: 'fa7a9487-eb0f-489f-b33b-4f9bf76402d9',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Helsepersonell - NAV',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10000975',
            workspace: 'osl1-dhp-nav-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-nav-002-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-nav-002-workers-kafka',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -6,
                yearly: -72,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.47',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-nav-002',
        namespace: 'osl1-dhp-nav-prod',
        uid: 'fa7a9487-eb0f-489f-b33b-4f9bf76402d9',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-nav-002-a1ow',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-ncpeh-000-9vbq',
            clusterUid: '2ba1f090-4e07-4ee7-ad7d-11c417ea832e',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Helsepersonell - NCPeH',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001307',
            workspace: 'osl1-ncpeh-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-ncpeh-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.24',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-ncpeh-000',
        namespace: 'osl1-ncpeh-prod',
        uid: '2ba1f090-4e07-4ee7-ad7d-11c417ea832e',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ncpeh-000-9vbq',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-ncpehp-000-hh1z',
            clusterUid: 'e0cb9049-cfb6-4874-bd81-e43e79a688dc',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Helsepersonell - NCPeH portaler',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001308',
            workspace: 'osl1-ncpehp-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-ncpehp-000-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.52',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-ncpehp-000',
        namespace: 'osl1-ncpehp-prod',
        uid: 'e0cb9049-cfb6-4874-bd81-e43e79a688dc',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ncpehp-000-hh1z',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-ndl4-mon-001-dobj',
            clusterUid: 'c1b68937-5cb2-4332-a28e-4a510c26c97f',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Monitorering - NDL4',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001852',
            workspace: 'trd1cl02-mfp-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-ndl4-mon-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.14',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-ndl4-mon-001',
        namespace: 'trd1cl02-mfp-prod',
        uid: 'c1b68937-5cb2-4332-a28e-4a510c26c97f',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ndl4-mon-001-dobj',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-nn-001-1tm9',
            clusterUid: '9078b786-48e8-4ee4-9e38-dc50d61cc32c',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Nasjonalt Nett',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '640200200',
            workspace: 'trd1cl02-nn-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.28.7+vmware.1-fips.1',
            },
            version: 'v1.28.7',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-nn-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.28.7',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: 5961,
                yearly: 71532,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.68',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-nn-001',
        namespace: 'trd1cl02-nn-prod',
        uid: '9078b786-48e8-4ee4-9e38-dc50d61cc32c',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-nn-001-1tm9',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-oct-001-m8jn',
            clusterUid: '2c4763db-6cc1-4567-9d86-3d872970d0ba',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Octopus Deploy',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '61002-5',
            workspace: 'trd1cl02-oct-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.28.7+vmware.1-fips.1',
            },
            version: 'v1.28.7',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-oct-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.28.7',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: 8853,
                yearly: 106236,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.71',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-oct-001',
        namespace: 'trd1cl02-oct-prod',
        uid: '2c4763db-6cc1-4567-9d86-3d872970d0ba',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-oct-001-m8jn',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-ori-wiki000-n9bi',
            clusterUid: '6f0d6dbc-d482-44ee-b3fd-914711514bc7',
            datacenter: 'trd1',
            environment: 'prod',
            project: 'Orion',
            provider: 'tanzu',
            region: 'Trondelag',
            workorder: '310205800',
            workspace: 'trd1-ori-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.30.8+vmware.1-fips',
            },
            version: 'v1.30.8',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-ori-wiki000-workers',
                  provider: 'tanzu',
                  replicas: 2,
                  storage: null,
                  taint: null,
                  version: 'v1.30.8',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -2,
                yearly: -24,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.2.55',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-ori-wiki000',
        namespace: 'trd1-ori-prod',
        uid: '6f0d6dbc-d482-44ee-b3fd-914711514bc7',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ori-wiki000-n9bi',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-osl-xcads-001-j5c5',
            clusterUid: 'd3e069b3-2771-405c-b397-376835aa2f4f',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Helsepersonell - Pasientens journaldokumenter',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10001839',
            workspace: 'osl1-xcads-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-osl-xcads-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.58',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-osl-xcads-001',
        namespace: 'osl1-xcads-prod',
        uid: 'd3e069b3-2771-405c-b397-376835aa2f4f',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-osl-xcads-001-j5c5',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-oss-001-0noq',
            clusterUid: 'd82670c2-ab45-468d-bcd5-bd1f46d47445',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Operasjonssenteret',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '61001-1',
            workspace: 'trd1cl02-oss-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-oss-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.57',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-oss-001',
        namespace: 'trd1cl02-oss-prod',
        uid: 'd82670c2-ab45-468d-bcd5-bd1f46d47445',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-oss-001-0noq',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-par-001-g34u',
            clusterUid: '465fbde3-b12d-4f4c-aa07-4ee3d1b976a8',
            datacenter: 'trd1cl02',
            environment: 'prod',
            project: 'Helsepersonell - Pasientens Rekvisisjoner',
            provider: 'tanzu',
            region: 'Trøndelag',
            workorder: '10001714',
            workspace: 'trd1cl02-par-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-par-001-workers',
                  provider: 'tanzu',
                  replicas: 3,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -3,
                yearly: -36,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.104.78',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-par-001',
        namespace: 'trd1cl02-par-prod',
        uid: '465fbde3-b12d-4f4c-aa07-4ee3d1b976a8',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-par-001-g34u',
        },
        version: 'v2',
      },
    },
    {
      apiVersion: 'vitistack.io/v1alpha1',
      kind: 'KubernetesCluster',
      kubernetescluster: {
        spec: {
          data: {
            clusterId: 'p-per-201-pwc3',
            clusterUid: 'a587ab17-a4d9-4a09-9586-435df22bc30f',
            datacenter: 'osl1',
            environment: 'prod',
            project: 'Helsepersonell - Persontjenesten',
            provider: 'tanzu',
            region: 'Oslo',
            workorder: '10000749',
            workspace: 'osl1-per-prod',
            zone: '',
          },
          topology: {
            controlplane: {
              machineClass: '',
              metadata: {
                annotations: null,
                labels: null,
              },
              provider: 'tanzu',
              replicas: 3,
              storage: null,
              version: 'v1.32.0+vmware.6-fips',
            },
            version: 'v1.32.0',
            workers: {
              nodePools: [
                {
                  autoscaling: {
                    enabled: false,
                    maxReplicas: 0,
                    minReplicas: 0,
                    scalingRules: null,
                  },
                  machineClass: '',
                  metadata: {
                    annotations: null,
                    labels: null,
                  },
                  name: 'p-per-201-workers',
                  provider: 'tanzu',
                  replicas: 5,
                  storage: null,
                  taint: null,
                  version: 'v1.32.0',
                },
              ],
            },
          },
        },
        status: {
          conditions: null,
          phase: '',
          state: {
            cluster: {
              controlplane: {
                machineClass: '',
                message: '',
                nodes: null,
                resources: {},
                scale: 0,
                status: '',
              },
              externalId: '',
              nodepools: null,
              price: {
                monthly: -5,
                yearly: -60,
              },
              resources: {},
            },
            created: null,
            egressIP: '10.204.6.48',
            endpoints: null,
            lastUpdated: null,
            lastUpdatedBy: '',
            versions: null,
          },
        },
      },
      metadata: {
        name: 'p-per-201',
        namespace: 'osl1-per-prod',
        uid: 'a587ab17-a4d9-4a09-9586-435df22bc30f',
      },
      rormeta: {
        action: 'Add',
        ownerref: {
          scope: 'cluster',
          subject: 'p-per-201-pwc3',
        },
        version: 'v2',
      },
    },
  ],
}
