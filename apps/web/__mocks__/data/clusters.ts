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
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: '68dfa1cab4c8fa1490291fb5',
        uid: '2607fdb0-da0a-4a97-9fb9-73127224533f',
        creationTimestamp: '2026-03-13T14:56:50Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:46.266074653 +0000 UTC m=+54300.217240999',
        hash: '3647786341745907602',
        ownerref: {
          scope: 'cluster',
          subject: 'bgo-mgmt-001-86xj',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: '68dfa1cab4c8fa1490291fb5',
            clusterName: 'bgo-mgmt-001',
            kubernetesProvider: 'talos',
            az: 'bgo',
            region: 'west',
            country: 'no',
            workspaceId: 'bgo-mgmt',
            environment: 'mgmt',
            datacenter: 'bgo.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'bgo-mgmt-ctpl01',
                  cpu: {
                    capacity: '4',
                    allocated: '1671749800n',
                  },
                  memory: {
                    capacity: '26408472Ki',
                    allocated: '7026044Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'bgo-mgmt-ctpl02',
                  cpu: {
                    capacity: '4',
                    allocated: '3252253512n',
                  },
                  memory: {
                    capacity: '16354900Ki',
                    allocated: '7685912Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'bgo-mgmt-ctpl03',
                  cpu: {
                    capacity: '4',
                    allocated: '597193690n',
                  },
                  memory: {
                    capacity: '16354932Ki',
                    allocated: '6158052Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'bgo-mgmt-wrkr01',
                      cpu: {
                        capacity: '8',
                        allocated: '659304502n',
                      },
                      memory: {
                        capacity: '32843972Ki',
                        allocated: '10717012Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'bgo-mgmt-wrkr02',
                      cpu: {
                        capacity: '8',
                        allocated: '304774382n',
                      },
                      memory: {
                        capacity: '32843960Ki',
                        allocated: '3473728Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'bgo-mgmt-wrkr03',
                      cpu: {
                        capacity: '8',
                        allocated: '1324217737n',
                      },
                      memory: {
                        capacity: '32843972Ki',
                        allocated: '4258512Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.8.0',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.bgo-mgmt-001.talos-bgo.sky.nhn.no',
              Grafana: 'https://grafana.bgo-mgmt-001.talos-bgo.sky.nhn.no',
            },
            createdAt: '2025-10-13T19:13:58Z',
            lastSeen: '2026-06-10T10:32:46.279Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: '8875ca15-abed-46f3-8c0f-8a73a2423baa',
        uid: '21fca0d4-051b-46cf-8b16-e77ce974ffb1',
        creationTimestamp: '2026-03-16T16:07:16Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:12.387733146 +0000 UTC m=+64871.107649590',
        hash: '3679589166291740758',
        ownerref: {
          scope: 'cluster',
          subject: 't-per-et-401-6rvy',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: '8875ca15-abed-46f3-8c0f-8a73a2423baa',
            clusterName: 't-per-et-401',
            kubernetesProvider: 'talos',
            az: 'bgo',
            region: 'west',
            country: 'no',
            workspaceId: 't-per',
            environment: 'test',
            datacenter: 'bgo.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-per-et-401-ctp01',
                  cpu: {
                    capacity: '4',
                    allocated: '530428372n',
                  },
                  memory: {
                    capacity: '7543988Ki',
                    allocated: '5486624Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.34.1',
                },
                {
                  name: 't-per-et-401-ctp02',
                  cpu: {
                    capacity: '4',
                    allocated: '425135268n',
                  },
                  memory: {
                    capacity: '7543984Ki',
                    allocated: '5404668Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.34.1',
                },
                {
                  name: 't-per-et-401-ctp03',
                  cpu: {
                    capacity: '4',
                    allocated: '486465433n',
                  },
                  memory: {
                    capacity: '7543984Ki',
                    allocated: '5488872Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.34.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-per-et-401-wrk01',
                      cpu: {
                        capacity: '4',
                        allocated: '372584298n',
                      },
                      memory: {
                        capacity: '15221308Ki',
                        allocated: '4670608Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.34.1',
                    },
                    {
                      name: 't-per-et-401-wrk02',
                      cpu: {
                        capacity: '4',
                        allocated: '602204945n',
                      },
                      memory: {
                        capacity: '15221308Ki',
                        allocated: '5485040Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.34.1',
                    },
                    {
                      name: 't-per-et-401-wrk03',
                      cpu: {
                        capacity: '4',
                        allocated: '431734342n',
                      },
                      memory: {
                        capacity: '15221308Ki',
                        allocated: '5707704Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.34.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-per-et-401.t-per.sky.nhn.no',
              Grafana: 'https://grafana.t-per-et-401.t-per.sky.nhn.no',
            },
            createdAt: '2025-10-09T21:27:23Z',
            lastSeen: '2026-06-10T10:32:12.395Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'cephtest-034-ab34',
        uid: '49384256-386c-4eba-bccc-ee9939abf648',
        creationTimestamp: '2026-05-22T12:06:34Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:43.217840962 +0000 UTC m=+316448.499266193',
        hash: '1155963385822703420',
        ownerref: {
          scope: 'cluster',
          subject: 'cephtest-034-ab34',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'cephtest-034-ab34',
            clusterName: 'cephtest-034',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'south',
            country: 'test',
            workspaceId: 'cephtest5',
            environment: 'dev',
            datacenter: 'az1.south.test',
            nodes: {
              controlPlane: [
                {
                  name: 'cephtest-034-ab34-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '403279025n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4669068Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'cephtest-034-ab34-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1090472442n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '5343084Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'cephtest-034-ab34-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '493822946n',
                      },
                      memory: {
                        capacity: '16331456Ki',
                        allocated: '4670060Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.cephtest-034.cephtest5.sky.nhn.no',
              Grafana: 'https://grafana.cephtest-034.cephtest5.sky.nhn.no',
            },
            createdAt: '2026-05-21T08:52:25Z',
            lastSeen: '2026-06-10T10:32:43.223Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-alarm-000-veyk',
        uid: '5a327eac-9dbc-42dc-89e4-3a2a2c45dd6e',
        creationTimestamp: '2026-05-28T18:20:22Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:25.997085917 +0000 UTC m=+21725.296635893',
        hash: '12856540969217642765',
        ownerref: {
          scope: 'cluster',
          subject: 'd-alarm-000-veyk',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-alarm-000-veyk',
            clusterName: 'd-alarm-000',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-ops-v92o',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-alarm-000-veyk-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '517322179n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4546940Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-alarm-000-veyk-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '518332507n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '4849928Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'd-alarm-000-veyk-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '707262411n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '6910888Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-alarm-000.vitistack-ops-v92o.sky.nhn.no',
              Grafana: 'https://grafana.d-alarm-000.vitistack-ops-v92o.sky.nhn.no',
            },
            createdAt: '2026-05-28T18:14:21Z',
            lastSeen: '2026-06-10T10:32:26Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-amk-003-gsax',
        uid: '17e03119-1801-4f11-9307-8f905fe4ac46',
        creationTimestamp: '2026-03-20T21:31:52Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:30.449871546 +0000 UTC m=+21727.529034451',
        hash: '7988488941103516048',
        ownerref: {
          scope: 'cluster',
          subject: 'd-amk-003-gsax',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-amk-003-gsax',
            clusterName: 'd-amk-003',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-amk-3sad',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-amk-003-gsax-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '303047286n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '5178192Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-amk-003-gsax-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '397545101n',
                  },
                  memory: {
                    capacity: '8088908Ki',
                    allocated: '4430988Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-amk-003-gsax-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '488064037n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4999104Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-amk-003-gsax-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '3104268159n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '13600616Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-amk-003-gsax-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '1644885056n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '6817936Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-amk-003-gsax-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '1002216756n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '6828632Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-amk-003.vitistack-amk-3sad.sky.nhn.no',
              Grafana: 'https://grafana.d-amk-003.vitistack-amk-3sad.sky.nhn.no',
            },
            createdAt: '2026-02-27T08:52:18Z',
            lastSeen: '2026-06-10T10:32:30.456Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-andre-123-1337',
        uid: '5e734255-e46c-4ec3-8c99-ea1c3ab70fda',
        creationTimestamp: '2026-03-20T21:31:47Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-04-10 08:06:03.582522513 +0000 UTC m=+231901.605311894',
        hash: '8066420013013270496',
        ownerref: {
          scope: 'cluster',
          subject: 'd-andre-123-1337',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-andre-123-1337',
            clusterName: 'd-andre-123',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-andreh',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-andre-123-1337-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '337864107n',
                  },
                  memory: {
                    capacity: '8089880Ki',
                    allocated: '4122976Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.2',
                },
                {
                  name: 'd-andre-123-1337-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '698920748n',
                  },
                  memory: {
                    capacity: '8089376Ki',
                    allocated: '4509016Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.2',
                },
                {
                  name: 'd-andre-123-1337-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '804744750n',
                  },
                  memory: {
                    capacity: '8089376Ki',
                    allocated: '4294272Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.2',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-andre-123-1337-wrk0',
                      cpu: {
                        capacity: '2',
                        allocated: '261369780n',
                      },
                      memory: {
                        capacity: '8089372Ki',
                        allocated: '2866704Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.2',
                    },
                    {
                      name: 'd-andre-123-1337-wrk1',
                      cpu: {
                        capacity: '2',
                        allocated: '323335455n',
                      },
                      memory: {
                        capacity: '8089372Ki',
                        allocated: '3418476Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.2',
                    },
                    {
                      name: 'd-andre-123-1337-wrk2',
                      cpu: {
                        capacity: '2',
                        allocated: '268741042n',
                      },
                      memory: {
                        capacity: '8089372Ki',
                        allocated: '3176612Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.2',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.16',
              RorAgent: 'v2.2.0',
            },
            urls: {
              Argocd: 'https://argo.d-andre-123.vitistack-andreh.sky.nhn.no',
              Grafana: 'https://grafana.d-andre-123.vitistack-andreh.sky.nhn.no',
            },
            createdAt: '2026-02-28T16:31:20Z',
            lastSeen: '2026-04-10T08:06:03.592Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-bgo-hndevops-001-19ih',
        uid: '523176ab-696f-4d42-aa4b-4071e28d014a',
        creationTimestamp: '2026-03-13T14:57:01Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-04-30 18:17:48.576376487 +0000 UTC m=+403624.502270167',
        hash: '2429817869606774278',
        ownerref: {
          scope: 'cluster',
          subject: 'd-bgo-hndevops-001-19ih',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-bgo-hndevops-001-19ih',
            clusterName: 'd-bgo-hndevops-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-hn-uzmx',
            environment: 'dev',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-bgo-hndevops-001-19ih-ctp0',
                  cpu: {
                    capacity: '2',
                  },
                  memory: {
                    capacity: '8087352Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'd-bgo-hndevops-001-19ih-ctp1',
                  cpu: {
                    capacity: '2',
                  },
                  memory: {
                    capacity: '8087352Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'd-bgo-hndevops-001-19ih-ctp2',
                  cpu: {
                    capacity: '2',
                  },
                  memory: {
                    capacity: '8087356Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-bgo-hndevops-001-19ih-wrk0',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '16329896Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-bgo-hndevops-001-19ih-wrk1',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '16329900Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-bgo-hndevops-001-19ih-wrk2',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '16329904Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: 'Unknown',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-03-12T09:24:30Z',
            lastSeen: '2026-04-30T18:17:48.577Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-bgo-hndevops-001-mg1f',
        uid: '7a22d2ac-6d44-4da7-bce2-2656838e861b',
        creationTimestamp: '2026-05-22T19:08:30Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:28.991079294 +0000 UTC m=+21727.115134313',
        hash: '14033965766777152560',
        ownerref: {
          scope: 'cluster',
          subject: 'd-bgo-hndevops-001-mg1f',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-bgo-hndevops-001-mg1f',
            clusterName: 'd-bgo-hndevops-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-hndevops-97x4',
            environment: 'dev',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-bgo-hndevops-001-mg1f-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '607847523n',
                  },
                  memory: {
                    capacity: '16324280Ki',
                    allocated: '5157312Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-bgo-hndevops-001-mg1f-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '425158149n',
                  },
                  memory: {
                    capacity: '16329420Ki',
                    allocated: '5137312Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-bgo-hndevops-001-mg1f-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '351546242n',
                  },
                  memory: {
                    capacity: '16329420Ki',
                    allocated: '5290592Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-bgo-hndevops-001-mg1f-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '640765577n',
                      },
                      memory: {
                        capacity: '16329428Ki',
                        allocated: '4437832Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-bgo-hndevops-001-mg1f-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '360265904n',
                      },
                      memory: {
                        capacity: '16329436Ki',
                        allocated: '4138804Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-bgo-hndevops-001-mg1f-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '291116506n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '4797188Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-bgo-hndevops-001.vitistack-hndevops-97x4.sky.nhn.no',
              Grafana: 'https://grafana.d-bgo-hndevops-001.vitistack-hndevops-97x4.sky.nhn.no',
            },
            createdAt: '2026-05-22T19:05:27Z',
            lastSeen: '2026-06-10T10:32:28.998Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-kd-001-1dx8',
        uid: '170a5b95-3ece-473f-a02b-14e01231b1bb',
        creationTimestamp: '2026-04-24T10:51:40Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:45.536079147 +0000 UTC m=+64920.180662720',
        hash: '2612134640069647004',
        ownerref: {
          scope: 'cluster',
          subject: 'd-kd-001-1dx8',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-kd-001-1dx8',
            clusterName: 'd-kd-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-kd-ze8h',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-kd-001-1dx8-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '333116679n',
                  },
                  memory: {
                    capacity: '16331832Ki',
                    allocated: '5718368Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-kd-001-1dx8-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '563950905n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '7893128Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-kd-001-1dx8-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '271834590n',
                      },
                      memory: {
                        capacity: '16332168Ki',
                        allocated: '3981032Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-kd-001.vitistack-kd-ze8h.sky.nhn.no',
              Grafana: 'https://grafana.d-kd-001.vitistack-kd-ze8h.sky.nhn.no',
            },
            createdAt: '2026-04-24T10:16:25Z',
            lastSeen: '2026-06-10T10:32:45.539Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-kitkat-123-t7ni',
        uid: '5fd6222c-dc1c-4d5f-bd89-6460cedd9c49',
        creationTimestamp: '2026-04-29T12:10:30Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-05-26 08:35:48.592389723 +0000 UTC m=+40685.576716261',
        hash: '4312076579225538091',
        ownerref: {
          scope: 'cluster',
          subject: 'd-kitkat-123-t7ni',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-kitkat-123-t7ni',
            clusterName: 'd-kitkat-123',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-test-nyhk',
            environment: 'dev',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-kitkat-123-t7ni-ctp0',
                  cpu: {
                    capacity: '4',
                  },
                  memory: {
                    capacity: '16330380Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-kitkat-123-t7ni-wrk0',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '8085148Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-kitkat-123-t7ni-wrk1',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '8085144Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: 'Unknown',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-04-29T08:42:26Z',
            lastSeen: '2026-05-26T08:35:48.593Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-kj-portal-002-i93p',
        uid: 'a6a485aa-0560-41e7-8123-1532a901697b',
        creationTimestamp: '2026-05-26T09:11:18Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:31.376220933 +0000 UTC m=+64877.359337076',
        hash: '12549709586792017103',
        ownerref: {
          scope: 'cluster',
          subject: 'd-kj-portal-002-i93p',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-kj-portal-002-i93p',
            clusterName: 'd-kj-portal-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-kollektivet-u2ze',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-kj-portal-002-i93p-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '596356929n',
                  },
                  memory: {
                    capacity: '16331428Ki',
                    allocated: '5346720Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-kj-portal-002-i93p-wrk0',
                      cpu: {
                        capacity: '16',
                        allocated: '870169135n',
                      },
                      memory: {
                        capacity: '16312980Ki',
                        allocated: '9017840Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-kj-portal-002.vitistack-kollektivet-u2ze.sky.nhn.no',
              Grafana: 'https://grafana.d-kj-portal-002.vitistack-kollektivet-u2ze.sky.nhn.no',
            },
            createdAt: '2026-05-26T09:04:30Z',
            lastSeen: '2026-06-10T10:32:31.38Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-melde-001-6jf7',
        uid: '3131e929-a1ac-4606-8cde-212c91451848',
        creationTimestamp: '2026-04-29T20:40:53Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:18.494559079 +0000 UTC m=+21722.706103334',
        hash: '9079215474152643121',
        ownerref: {
          scope: 'cluster',
          subject: 'd-melde-001-6jf7',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-melde-001-6jf7',
            clusterName: 'd-melde-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-innrapp-b3lf',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-melde-001-6jf7-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '492484783n',
                  },
                  memory: {
                    capacity: '16332380Ki',
                    allocated: '6290692Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-melde-001-6jf7-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1535322634n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '6544240Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-melde-001-6jf7-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '1355771914n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '3822960Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-melde-001-6jf7-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '1457960568n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '4695776Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-melde-001.vitistack-innrapp-b3lf.sky.nhn.no',
              Grafana: 'https://grafana.d-melde-001.vitistack-innrapp-b3lf.sky.nhn.no',
            },
            createdAt: '2026-04-29T20:33:49Z',
            lastSeen: '2026-06-10T10:32:18.498Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-nst-001-d6fa',
        uid: '62ed32fd-5d6d-46ec-9e8b-bc96dfca37e1',
        creationTimestamp: '2026-05-04T07:37:23Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:21.570070469 +0000 UTC m=+21723.514832791',
        hash: '549141034413674639',
        ownerref: {
          scope: 'cluster',
          subject: 'd-nst-001-d6fa',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-nst-001-d6fa',
            clusterName: 'd-nst-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-nst-hqjx',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-nst-001-d6fa-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '464899950n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '5464812Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-nst-001-d6fa-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '257415468n',
                      },
                      memory: {
                        capacity: '16332388Ki',
                        allocated: '4437704Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-nst-001-d6fa-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '972008006n',
                      },
                      memory: {
                        capacity: '16332380Ki',
                        allocated: '7549372Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-nst-001.vitistack-nst-hqjx.sky.nhn.no',
              Grafana: 'https://grafana.d-nst-001.vitistack-nst-hqjx.sky.nhn.no',
            },
            createdAt: '2026-05-04T07:29:57Z',
            lastSeen: '2026-06-10T10:32:21.574Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-nst-fhfx',
        uid: '7e601f15-f2e5-4698-acf5-e80176bab967',
        creationTimestamp: '2026-04-30T09:27:17Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-04-30 12:39:17.334914447 +0000 UTC m=+11520.289415939',
        hash: '12960747468227620030',
        ownerref: {
          scope: 'cluster',
          subject: 'd-nst-fhfx',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-nst-fhfx',
            clusterName: 'd-nst',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-nst-98g4',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-nst-fhfx-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '462471057n',
                  },
                  memory: {
                    capacity: '16332428Ki',
                    allocated: '4009620Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-nst-fhfx-wrk0',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '16332428Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-nst-fhfx-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '273852497n',
                      },
                      memory: {
                        capacity: '16332428Ki',
                        allocated: '2904528Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.21',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-nst.vitistack-nst-98g4.sky.nhn.no',
              Grafana: 'https://grafana.d-nst.vitistack-nst-98g4.sky.nhn.no',
            },
            createdAt: '2026-04-30T09:23:48Z',
            lastSeen: '2026-04-30T12:39:17.337Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-papla-8xa6',
        uid: '56eec5fa-abd2-4af7-8a0c-bb9053906e2c',
        creationTimestamp: '2026-06-01T10:59:22Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:57.980253336 +0000 UTC m=+64863.220974350',
        hash: '12108524739870046595',
        ownerref: {
          scope: 'cluster',
          subject: 'd-papla-8xa6',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-papla-8xa6',
            clusterName: 'd-papla',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-papla-prxe',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-papla-8xa6-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '543794869n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4793960Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-papla-8xa6-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '648824735n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '8519548Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-papla-8xa6-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '475771695n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2821200Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-papla.vitistack-papla-prxe.sky.nhn.no',
              Grafana: 'https://grafana.d-papla.vitistack-papla-prxe.sky.nhn.no',
            },
            createdAt: '2026-06-01T10:52:31Z',
            lastSeen: '2026-06-10T10:31:57.984Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-pts-000-fg21',
        uid: '96109cd8-f508-49da-87b7-66449dc2f70d',
        creationTimestamp: '2026-03-16T16:06:51Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:15.602576136 +0000 UTC m=+316380.542796774',
        hash: '6954573966040390582',
        ownerref: {
          scope: 'cluster',
          subject: 'd-pts-000-g9ej',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-pts-000-fg21',
            clusterName: 'd-pts-000',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pts',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-pts-000-fg21-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '506935096n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4810892Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-pts-000-fg21-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '568510734n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4333468Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-pts-000-fg21-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '849153857n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '5800812Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-pts-000-fg21-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '798370072n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '7112016Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-pts-000-fg21-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '326198287n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '3637644Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-pts-000-fg21-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '871687599n',
                      },
                      memory: {
                        capacity: '16331436Ki',
                        allocated: '6007912Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-pts-000.vitistack-pts.sky.nhn.no',
              Grafana: 'https://grafana.d-pts-000.vitistack-pts.sky.nhn.no',
            },
            createdAt: '2026-02-17T08:44:42Z',
            lastSeen: '2026-06-10T10:32:15.608Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-sb-067-kscm',
        uid: '8e1529f6-4484-45d7-aae7-98c4d65a1329',
        creationTimestamp: '2026-03-16T16:07:57Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:54.183858141 +0000 UTC m=+21670.445759578',
        hash: '14470871142163429239',
        ownerref: {
          scope: 'cluster',
          subject: 'd-sb-067-kscm',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-sb-067-kscm',
            clusterName: 'd-sb-067',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-sb-3sm5',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-sb-067-kscm-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '567872369n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '8581912Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-sb-067-kscm-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1839442980n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '6349336Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-sb-067-kscm-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '735606895n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '6610804Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-sb-067-kscm-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '1105781890n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '8716872Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.21',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-sb-067.vitistack-sb-3sm5.sky.nhn.no',
              Grafana: 'https://grafana.d-sb-067.vitistack-sb-3sm5.sky.nhn.no',
            },
            createdAt: '2026-03-11T09:53:32Z',
            lastSeen: '2026-06-10T10:31:54.188Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-taa-001-wyv8',
        uid: 'ac836d72-775b-4540-a816-02e517186cc9',
        creationTimestamp: '2026-03-16T16:08:27Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:55.786404629 +0000 UTC m=+104348.939566716',
        hash: '440458747263997134',
        ownerref: {
          scope: 'cluster',
          subject: 'd-taa-001-wyv8',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-taa-001-wyv8',
            clusterName: 'd-taa-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-taa-tafc',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-taa-001-wyv8-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '349783948n',
                  },
                  memory: {
                    capacity: '8086880Ki',
                    allocated: '4878924Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-taa-001-wyv8-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '560590349n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '5595748Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-taa-001-wyv8-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '217448258n',
                      },
                      memory: {
                        capacity: '16329428Ki',
                        allocated: '3299884Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-taa-001-wyv8-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '453686507n',
                      },
                      memory: {
                        capacity: '16329428Ki',
                        allocated: '6374996Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-taa-001.vitistack-taa-tafc.sky.nhn.no',
              Grafana: 'https://grafana.d-taa-001.vitistack-taa-tafc.sky.nhn.no',
            },
            createdAt: '2026-03-11T11:21:46Z',
            lastSeen: '2026-06-10T10:31:55.789Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-taa-010-kd5w',
        uid: '74ef6c0b-de55-4a59-b9d3-d4a0e93ee9fb',
        creationTimestamp: '2026-04-08T12:16:56Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:37.269425843 +0000 UTC m=+64866.431517744',
        hash: '15041042564188022236',
        ownerref: {
          scope: 'cluster',
          subject: 'd-taa-010-kd5w',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-taa-010-kd5w',
            clusterName: 'd-taa-010',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-taa-69n3',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-taa-010-kd5w-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '429013302n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '5652264Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-taa-010-kd5w-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '786194727n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '7004600Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-taa-010-kd5w-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '275405639n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '3786876Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-taa-010-kd5w-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '862420182n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '8342268Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-taa-010.vitistack-taa-69n3.sky.nhn.no',
              Grafana: 'https://grafana.d-taa-010.vitistack-taa-69n3.sky.nhn.no',
            },
            createdAt: '2026-04-08T12:12:18Z',
            lastSeen: '2026-06-10T10:32:37.274Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-taa-010-vl7s',
        uid: '08a6dcd7-9669-4b61-ba5b-30f49493f9f9',
        creationTimestamp: '2026-04-08T11:58:53Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-04-08 12:02:54.026215632 +0000 UTC m=+241.762155940',
        hash: '9820228992313518967',
        ownerref: {
          scope: 'cluster',
          subject: 'd-taa-010-vl7s',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-taa-010-vl7s',
            clusterName: 'd-taa-010',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-aa-l23n',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-taa-010-vl7s-ctp0',
                  cpu: {
                    capacity: '2',
                  },
                  memory: {
                    capacity: '8089312Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-taa-010-vl7s-wrk0',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '16331856Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-taa-010-vl7s-wrk1',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '16331864Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: 'Unknown',
              RorAgent: 'v2.2.0',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-04-08T11:48:33Z',
            lastSeen: '2026-04-08T12:02:54.027Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-trd-atlas-001-xdf2',
        uid: '5259d29f-9045-49a7-89c0-f8c05f01a59e',
        creationTimestamp: '2026-03-16T16:08:11Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-04 08:20:53.315570555 +0000 UTC m=+341220.206050104',
        hash: '1490520726427536099',
        ownerref: {
          scope: 'cluster',
          subject: 'd-trd-atlas-001-zu5w',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-trd-atlas-001-xdf2',
            clusterName: 'd-trd-atlas-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-atlas',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-trd-atlas-001-xdf2-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '426839762n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4891876Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'd-trd-atlas-001-xdf2-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '519482521n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '5379500Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'd-trd-atlas-001-xdf2-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '398640406n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '3998944Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-trd-atlas-001-xdf2-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '956339521n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '7389104Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-trd-atlas-001-xdf2-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '429783646n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2936464Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-trd-atlas-001-xdf2-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '789690568n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '8325596Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-trd-atlas-001.vitistack-atlas.sky.nhn.no',
              Grafana: 'https://grafana.d-trd-atlas-001.vitistack-atlas.sky.nhn.no',
            },
            createdAt: '2026-02-17T14:20:26Z',
            lastSeen: '2026-06-04T08:20:53.323Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-trd-atlas-001-xdf2',
        uid: '9e5eb714-e88a-4604-85ce-313dfb1183c6',
        creationTimestamp: '2026-06-04T08:24:40Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:31.979689212 +0000 UTC m=+64873.196189058',
        hash: '5271077700993093615',
        ownerref: {
          scope: 'cluster',
          subject: 'd-trd-atlas-001-xdf2',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-trd-atlas-001-xdf2',
            clusterName: 'd-trd-atlas-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-atlas',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-trd-atlas-001-xdf2-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '392220180n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4380580Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-atlas-001-xdf2-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '813889275n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4765304Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-atlas-001-xdf2-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '297123610n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '3910324Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-trd-atlas-001-xdf2-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '695827683n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '7420812Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-atlas-001-xdf2-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '370112750n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '4160592Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-atlas-001-xdf2-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '770168921n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '8330720Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-trd-atlas-001.vitistack-atlas.sky.nhn.no',
              Grafana: 'https://grafana.d-trd-atlas-001.vitistack-atlas.sky.nhn.no',
            },
            createdAt: '2026-02-17T14:20:26Z',
            lastSeen: '2026-06-10T10:32:31.986Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-trd-dd-viti-o1z9',
        uid: '642327e9-8187-42c5-8788-8a91093f33d2',
        creationTimestamp: '2026-06-02T12:17:30Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:42.902803012 +0000 UTC m=+104406.997953479',
        hash: '1279624510490168697',
        ownerref: {
          scope: 'cluster',
          subject: 'd-trd-dd-viti-o1z9',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-trd-dd-viti-o1z9',
            clusterName: 'd-trd-dd-viti',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-dokdeling-qr46',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-trd-dd-viti-o1z9-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '629634501n',
                  },
                  memory: {
                    capacity: '16331432Ki',
                    allocated: '4297140Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-dd-viti-o1z9-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '392641966n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '3830916Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-dd-viti-o1z9-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '396627367n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '3762908Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-trd-dd-viti-o1z9-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '358546464n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '3464880Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-dd-viti-o1z9-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '605468049n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '5289932Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-dd-viti-o1z9-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '466253016n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2207724Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-trd-dd-viti.vitistack-dokdeling-qr46.sky.nhn.no',
              Grafana: 'https://grafana.d-trd-dd-viti.vitistack-dokdeling-qr46.sky.nhn.no',
            },
            createdAt: '2026-06-02T12:11:31Z',
            lastSeen: '2026-06-10T10:32:42.908Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-trd-ek-viti-oc72',
        uid: '8a58acfe-baee-49e5-a3e7-f30e0df89f52',
        creationTimestamp: '2026-06-02T08:16:04Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:13.48598537 +0000 UTC m=+187030.140181239',
        hash: '18062134702210402925',
        ownerref: {
          scope: 'cluster',
          subject: 'd-trd-ek-viti-oc72',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-trd-ek-viti-oc72',
            clusterName: 'd-trd-ek-viti',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-ek-9iq6',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-trd-ek-viti-oc72-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '526812182n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4232972Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-ek-viti-oc72-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '414244853n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '3904724Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-ek-viti-oc72-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '402638149n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4002396Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-trd-ek-viti-oc72-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '568342980n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '3580776Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-ek-viti-oc72-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '798656661n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '5599616Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-ek-viti-oc72-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '373693959n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2081148Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-trd-ek-viti.vitistack-ek-9iq6.sky.nhn.no',
              Grafana: 'https://grafana.d-trd-ek-viti.vitistack-ek-9iq6.sky.nhn.no',
            },
            createdAt: '2026-06-02T08:08:00Z',
            lastSeen: '2026-06-10T10:32:13.491Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-trd-fts-da-001-vhj8',
        uid: '0b40ae5f-6064-4ff0-adf9-441ab7976d13',
        creationTimestamp: '2026-03-16T16:09:28Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:08.820831262 +0000 UTC m=+14760.196629898',
        hash: '16006714230891563944',
        ownerref: {
          scope: 'cluster',
          subject: 'd-trd-fts-da-001-vhj8',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-trd-fts-da-001-vhj8',
            clusterName: 'd-trd-fts-da-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-fts-6fsr',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-trd-fts-da-001-vhj8-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '592839420n',
                  },
                  memory: {
                    capacity: '8088892Ki',
                    allocated: '4362148Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-fts-da-001-vhj8-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '456406239n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '5552796Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-trd-fts-da-001-vhj8-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '537059379n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '5039856Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-trd-fts-da-001-vhj8-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '1039820180n',
                      },
                      memory: {
                        capacity: '16326300Ki',
                        allocated: '8497308Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-fts-da-001-vhj8-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '504630838n',
                      },
                      memory: {
                        capacity: '16326300Ki',
                        allocated: '7139024Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-trd-fts-da-001-vhj8-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '472159837n',
                      },
                      memory: {
                        capacity: '16326300Ki',
                        allocated: '8162812Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-trd-fts-da-001.vitistack-fts-6fsr.sky.nhn.no',
              Grafana: 'https://grafana.d-trd-fts-da-001.vitistack-fts-6fsr.sky.nhn.no',
            },
            createdAt: '2026-02-28T19:30:26Z',
            lastSeen: '2026-06-10T10:32:08.827Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-trd-fts-da-001-vhj8',
        uid: 'f160998b-90cf-4aeb-a77d-ac9c85754532',
        creationTimestamp: '2026-04-13T13:30:12Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-04-13 13:30:12.125709456 +0000 UTC m=+9665.535388527',
        hash: '7239818665278353885',
        ownerref: {
          scope: 'cluster',
          subject: 'd-trd-fts-da-001-vhj8',
        },
        action: 'Add',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-trd-fts-da-001-vhj8',
            clusterName: 'd-trd-fts-da-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-fts-6fsr',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-trd-fts-da-001-vhj8-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '677886309n',
                  },
                  memory: {
                    capacity: '8089436Ki',
                    allocated: '5050856Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'd-trd-fts-da-001-vhj8-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '382305083n',
                  },
                  memory: {
                    capacity: '8089432Ki',
                    allocated: '5377600Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'd-trd-fts-da-001-vhj8-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '597020422n',
                  },
                  memory: {
                    capacity: '8089432Ki',
                    allocated: '5147872Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-trd-fts-da-001-vhj8-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1060869381n',
                      },
                      memory: {
                        capacity: '16331972Ki',
                        allocated: '12748512Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-trd-fts-da-001-vhj8-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '841342291n',
                      },
                      memory: {
                        capacity: '16331972Ki',
                        allocated: '9557664Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'd-trd-fts-da-001-vhj8-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '550243576n',
                      },
                      memory: {
                        capacity: '16332300Ki',
                        allocated: '10929648Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.16',
              RorAgent: 'v2.2.0',
            },
            urls: {
              Argocd: 'https://argo.d-trd-fts-da-001.vitistack-fts-6fsr.sky.nhn.no',
              Grafana: 'https://grafana.d-trd-fts-da-001.vitistack-fts-6fsr.sky.nhn.no',
            },
            createdAt: '2026-02-28T19:30:26Z',
            lastSeen: '2026-04-13T13:30:12.148Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-viti-bg-xcads-001-cukr',
        uid: 'bdcc9539-4bd4-4ce8-96a0-361d930af7ff',
        creationTimestamp: '2026-03-16T16:08:04Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:48.807272201 +0000 UTC m=+21735.224420937',
        hash: '5597016402798693072',
        ownerref: {
          scope: 'cluster',
          subject: 'd-viti-bg-xcads-001-cukr',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-viti-bg-xcads-001-cukr',
            clusterName: 'd-viti-bg-xcads-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-xcads-rr2d',
            environment: 'dev',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-viti-bg-xcads-001-cukr-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '376465204n',
                  },
                  memory: {
                    capacity: '8086884Ki',
                    allocated: '4743948Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-viti-bg-xcads-001-cukr-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '302857497n',
                      },
                      memory: {
                        capacity: '16329428Ki',
                        allocated: '3496516Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-viti-bg-xcads-001-cukr-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '416292939n',
                      },
                      memory: {
                        capacity: '16329432Ki',
                        allocated: '6532044Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-viti-bg-xcads-001-cukr-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '649230769n',
                      },
                      memory: {
                        capacity: '16329432Ki',
                        allocated: '6113636Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-viti-bg-xcads-001.vitistack-xcads-rr2d.sky.nhn.no',
              Grafana: 'https://grafana.d-viti-bg-xcads-001.vitistack-xcads-rr2d.sky.nhn.no',
            },
            createdAt: '2026-03-06T08:13:45Z',
            lastSeen: '2026-06-10T10:32:48.81Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-viti-trd-xcads-001-dsf9',
        uid: '932fd4a8-8a25-4122-ab55-e61babaf5eeb',
        creationTimestamp: '2026-03-13T14:56:54Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:21.980234996 +0000 UTC m=+64874.918841873',
        hash: '8606705712797013100',
        ownerref: {
          scope: 'cluster',
          subject: 'd-viti-trd-xcads-001-dsf9',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-viti-trd-xcads-001-dsf9',
            clusterName: 'd-viti-trd-xcads-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-xcads-sd8k',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-viti-trd-xcads-001-dsf9-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '527023125n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4697492Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-viti-trd-xcads-001-dsf9-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '395371771n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '5573968Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-viti-trd-xcads-001-dsf9-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '273174986n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '3401928Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-viti-trd-xcads-001-dsf9-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '440400148n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '5503760Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-viti-trd-xcads-001.vitistack-xcads-sd8k.sky.nhn.no',
              Grafana: 'https://grafana.d-viti-trd-xcads-001.vitistack-xcads-sd8k.sky.nhn.no',
            },
            createdAt: '2026-03-04T14:18:54Z',
            lastSeen: '2026-06-10T10:32:21.983Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-viti-trd-xcais-07re',
        uid: '004cdf4a-92d8-45ab-9692-97b3abde03e9',
        creationTimestamp: '2026-06-09T11:19:35Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:04.269863446 +0000 UTC m=+64865.804625568',
        hash: '7353849271674866079',
        ownerref: {
          scope: 'cluster',
          subject: 'd-viti-trd-xcais-07re',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-viti-trd-xcais-07re',
            clusterName: 'd-viti-trd-xcais',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-dokdel-p7et',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-viti-trd-xcais-07re-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '480411747n',
                  },
                  memory: {
                    capacity: '16331360Ki',
                    allocated: '3944368Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-viti-trd-xcais-07re-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '338563708n',
                      },
                      memory: {
                        capacity: '16331392Ki',
                        allocated: '1784788Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-viti-trd-xcais-07re-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '675351815n',
                      },
                      memory: {
                        capacity: '16331380Ki',
                        allocated: '2572628Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-viti-trd-xcais-07re-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '306231509n',
                      },
                      memory: {
                        capacity: '16331372Ki',
                        allocated: '1898212Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-viti-trd-xcais.vitistack-dokdel-p7et.sky.nhn.no',
              Grafana: 'https://grafana.d-viti-trd-xcais.vitistack-dokdel-p7et.sky.nhn.no',
            },
            createdAt: '2026-06-09T11:14:39Z',
            lastSeen: '2026-06-10T10:32:04.273Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-wh-bgo-001-ynse',
        uid: 'ac2e0bd2-30be-4ff3-90ca-c5382ad4ffaa',
        creationTimestamp: '2026-04-08T07:42:02Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:13.209688736 +0000 UTC m=+64868.942442918',
        hash: '1980078286967441394',
        ownerref: {
          scope: 'cluster',
          subject: 'd-wh-bgo-001-ynse',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-wh-bgo-001-ynse',
            clusterName: 'd-wh-bgo-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-pm-r92m',
            environment: 'dev',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-wh-bgo-001-ynse-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '524285358n',
                  },
                  memory: {
                    capacity: '8086880Ki',
                    allocated: '4595468Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-wh-bgo-001-ynse-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '459709379n',
                      },
                      memory: {
                        capacity: '16329428Ki',
                        allocated: '5985284Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-wh-bgo-001-ynse-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '468891194n',
                      },
                      memory: {
                        capacity: '16329420Ki',
                        allocated: '7347028Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-wh-bgo-001.vitistack-pm-r92m.sky.nhn.no',
              Grafana: 'https://grafana.d-wh-bgo-001.vitistack-pm-r92m.sky.nhn.no',
            },
            createdAt: '2026-04-08T07:38:54Z',
            lastSeen: '2026-06-10T10:32:13.214Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-wh-osl-001-k732',
        uid: '095c4ba1-e6c2-4fc6-997a-e7438fd73781',
        creationTimestamp: '2026-05-20T07:40:12Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:25.681245382 +0000 UTC m=+21723.925765471',
        hash: '12428407540231560644',
        ownerref: {
          scope: 'cluster',
          subject: 'd-wh-osl-001-k732',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-wh-osl-001-k732',
            clusterName: 'd-wh-osl-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'south',
            country: 'no',
            workspaceId: 'team-meldingsflyt',
            environment: 'dev',
            datacenter: 'az1.south.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-wh-osl-001-k732-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '639319678n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '5973240Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.4',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-wh-osl-001-k732-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1933303773n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '7769048Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.4',
                    },
                    {
                      name: 'd-wh-osl-001-k732-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '313998858n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '4130128Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.4',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-wh-osl-001.team-meldingsflyt.sky.nhn.no',
              Grafana: 'https://grafana.d-wh-osl-001.team-meldingsflyt.sky.nhn.no',
            },
            createdAt: '2026-05-20T07:35:15Z',
            lastSeen: '2026-06-10T10:32:25.687Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'd-wh-trd-001-ooi8',
        uid: 'dae99838-9a62-4cbf-8a8b-3a7867c5a52e',
        creationTimestamp: '2026-03-25T12:34:07Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:53.801186152 +0000 UTC m=+64861.749935725',
        hash: '17754499575554721107',
        ownerref: {
          scope: 'cluster',
          subject: 'd-wh-trd-001-ooi8',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'd-wh-trd-001-ooi8',
            clusterName: 'd-wh-trd-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pm-37vp',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'd-wh-trd-001-ooi8-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '381217126n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4106900Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-wh-trd-001-ooi8-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '371704185n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4720824Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'd-wh-trd-001-ooi8-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '387384738n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '5035988Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'd-wh-trd-001-ooi8-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '871944999n',
                      },
                      memory: {
                        capacity: '16331456Ki',
                        allocated: '8900592Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'd-wh-trd-001-ooi8-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '439610006n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '5790076Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.d-wh-trd-001.vitistack-pm-37vp.sky.nhn.no',
              Grafana: 'https://grafana.d-wh-trd-001.vitistack-pm-37vp.sky.nhn.no',
            },
            createdAt: '2026-03-25T12:25:05Z',
            lastSeen: '2026-06-10T10:31:53.807Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'ktrd-amk-001-z2mx',
        uid: 'cdb0c4df-b1ae-4c1d-b038-a7c775ad5440',
        creationTimestamp: '2026-03-16T11:59:16Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:48.287676509 +0000 UTC m=+68400.420015147',
        hash: '13692959863987379742',
        ownerref: {
          scope: 'cluster',
          subject: 'ktrd-amk-001-z2mx',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'ktrd-amk-001-z2mx',
            clusterName: 'ktrd-amk-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-amk-3sad',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'ktrd-amk-001-z2mx-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '521629692n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '5074076Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'ktrd-amk-001-z2mx-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '258912536n',
                  },
                  memory: {
                    capacity: '8088892Ki',
                    allocated: '4620284Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'ktrd-amk-001-z2mx-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '332286440n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4323824Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'ktrd-amk-001-z2mx-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '907588287n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '7477368Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'ktrd-amk-001-z2mx-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '544899935n',
                      },
                      memory: {
                        capacity: '16331436Ki',
                        allocated: '6534320Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'ktrd-amk-001-z2mx-wrk6',
                      cpu: {
                        capacity: '4',
                        allocated: '622824995n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '7137164Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'ktrd-amk-001-z2mx-wrk7',
                      cpu: {
                        capacity: '4',
                        allocated: '1428982553n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '7715920Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.ktrd-amk-001.vitistack-amk-3sad.sky.nhn.no',
              Grafana: 'https://grafana.ktrd-amk-001.vitistack-amk-3sad.sky.nhn.no',
            },
            createdAt: '2026-03-16T11:51:56Z',
            lastSeen: '2026-06-10T10:32:48.291Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-bgo-obao-001-zzbp',
        uid: '6c2552c1-c6b7-47d7-8db5-946640553b2b',
        creationTimestamp: '2026-03-16T16:12:10Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:52.203463762 +0000 UTC m=+21665.716320647',
        hash: '985115056929356454',
        ownerref: {
          scope: 'cluster',
          subject: 'p-bgo-obao-001-zzbp',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-bgo-obao-001-zzbp',
            clusterName: 'p-bgo-obao-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-cry-prod-d801',
            environment: 'prod',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-bgo-obao-001-zzbp-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '480974444n',
                  },
                  memory: {
                    capacity: '8086876Ki',
                    allocated: '4734916Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-bgo-obao-001-zzbp-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '401680853n',
                  },
                  memory: {
                    capacity: '8086884Ki',
                    allocated: '4415668Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-bgo-obao-001-zzbp-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '324669236n',
                  },
                  memory: {
                    capacity: '8086884Ki',
                    allocated: '3807708Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-bgo-obao-001-zzbp-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '747954258n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '7801860Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-bgo-obao-001-zzbp-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '470943678n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '4816420Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-bgo-obao-001-zzbp-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '261443073n',
                      },
                      memory: {
                        capacity: '16329432Ki',
                        allocated: '4002980Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-bgo-obao-001.vitistack-cry-prod-d801.sky.nhn.no',
              Grafana: 'https://grafana.p-bgo-obao-001.vitistack-cry-prod-d801.sky.nhn.no',
            },
            createdAt: '2026-03-12T13:39:56Z',
            lastSeen: '2026-06-10T10:31:52.21Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-code-001-t2zg',
        uid: '0c63b2cc-b090-4e91-8a59-dfcf6468d4fb',
        creationTimestamp: '2026-05-13T11:31:33Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:01.369391414 +0000 UTC m=+104355.362199116',
        hash: '11451440077791050374',
        ownerref: {
          scope: 'cluster',
          subject: 'p-code-001-t2zg',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-code-001-t2zg',
            clusterName: 'p-code-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-forgejo-prod-3rhc',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-code-001-t2zg-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '411166683n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5714684Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-code-001-t2zg-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '394488130n',
                  },
                  memory: {
                    capacity: '16332380Ki',
                    allocated: '4995048Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-code-001-t2zg-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '296658334n',
                  },
                  memory: {
                    capacity: '16332380Ki',
                    allocated: '4717216Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-code-001-t2zg-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '442856319n',
                      },
                      memory: {
                        capacity: '32822872Ki',
                        allocated: '7578308Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-code-001-t2zg-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '595993160n',
                      },
                      memory: {
                        capacity: '32822860Ki',
                        allocated: '6575912Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-code-001-t2zg-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '398262419n',
                      },
                      memory: {
                        capacity: '32822856Ki',
                        allocated: '4463516Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-code-001.vitistack-forgejo-prod-3rhc.sky.nhn.no',
              Grafana: 'https://grafana.p-code-001.vitistack-forgejo-prod-3rhc.sky.nhn.no',
            },
            createdAt: '2026-05-13T11:26:59Z',
            lastSeen: '2026-06-10T10:32:01.374Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-db-101-0jtk',
        uid: '3769eb07-c28b-4705-a5e7-1aee859aa0d3',
        creationTimestamp: '2026-06-04T20:07:17Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:07.773520584 +0000 UTC m=+64865.560061655',
        hash: '10596556443159569980',
        ownerref: {
          scope: 'cluster',
          subject: 'p-db-101-0jtk',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-db-101-0jtk',
            clusterName: 'p-db-101',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-database-prod-e64d',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-db-101-0jtk-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '467755950n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '3823424Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-db-101-0jtk-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '425551468n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '3550940Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-db-101-0jtk-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '355260423n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '3547360Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-db-101-0jtk-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '463882998n',
                      },
                      memory: {
                        capacity: '49287836Ki',
                        allocated: '3083112Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-db-101-0jtk-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '714967495n',
                      },
                      memory: {
                        capacity: '49287836Ki',
                        allocated: '4329868Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-db-101-0jtk-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '356200715n',
                      },
                      memory: {
                        capacity: '49287828Ki',
                        allocated: '1996076Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-db-101.vitistack-database-prod-e64d.sky.nhn.no',
              Grafana: 'https://grafana.p-db-101.vitistack-database-prod-e64d.sky.nhn.no',
            },
            createdAt: '2026-06-04T19:57:46Z',
            lastSeen: '2026-06-10T10:32:07.779Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-edi-mon-001-knip',
        uid: '7dbea4f9-9631-444c-9a73-0d050462f137',
        creationTimestamp: '2026-03-24T08:32:08Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:08.389336873 +0000 UTC m=+64865.759072806',
        hash: '13714618707813073771',
        ownerref: {
          scope: 'cluster',
          subject: 'p-edi-mon-001-knip',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-edi-mon-001-knip',
            clusterName: 'p-edi-mon-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-edi-l10w',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-edi-mon-001-knip-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '427522629n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4500600Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-edi-mon-001-knip-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '333423559n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4394588Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-edi-mon-001-knip-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '1226416567n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4256232Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-edi-mon-001-knip-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '183896452n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '2575628Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-edi-mon-001-knip-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '388824234n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '5111320Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-edi-mon-001-knip-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '323841463n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '5512860Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.16',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-edi-mon-001.vitistack-edi-l10w.sky.nhn.no',
              Grafana: 'https://grafana.p-edi-mon-001.vitistack-edi-l10w.sky.nhn.no',
            },
            createdAt: '2026-03-24T08:27:02Z',
            lastSeen: '2026-06-10T10:32:08.395Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-ept-001-j3jh',
        uid: 'ae179c6d-c7ea-46a3-8434-e99f8068430a',
        creationTimestamp: '2026-06-03T06:58:11Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:36.976308618 +0000 UTC m=+21734.476446314',
        hash: '6423084126488705881',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ept-001-j3jh',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-ept-001-j3jh',
            clusterName: 'p-ept-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-devops-prod-pnxu',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-ept-001-j3jh-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '1446949625n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4409880Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-ept-001-j3jh-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '378296264n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '4094680Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-ept-001-j3jh-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '402311036n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '4011208Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-ept-001-j3jh-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '291491257n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '3644692Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-ept-001-j3jh-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '557537787n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '2487588Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-ept-001-j3jh-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '327570882n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2820272Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-ept-001-j3jh-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '332680203n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '1948160Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-ept-001-j3jh-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '366081720n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '2050456Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-ept-001.vitistack-devops-prod-pnxu.sky.nhn.no',
              Grafana: 'https://grafana.p-ept-001.vitistack-devops-prod-pnxu.sky.nhn.no',
            },
            createdAt: '2026-06-03T06:53:01Z',
            lastSeen: '2026-06-10T10:32:36.983Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-forgejo-run-001-7vbg',
        uid: 'a1eff655-4172-4c60-9de2-ef8b40a72357',
        creationTimestamp: '2026-05-13T11:32:33Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:08.16465672 +0000 UTC m=+21660.187799788',
        hash: '7393359994133146359',
        ownerref: {
          scope: 'cluster',
          subject: 'p-forgejo-run-001-7vbg',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-forgejo-run-001-7vbg',
            clusterName: 'p-forgejo-run-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-forgejo-prod-3rhc',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-forgejo-run-001-7vbg-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '386001695n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '5223392Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-forgejo-run-001-7vbg-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '374687849n',
                  },
                  memory: {
                    capacity: '16332388Ki',
                    allocated: '5119448Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-forgejo-run-001-7vbg-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '354764488n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '5549760Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-forgejo-run-001-7vbg-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1411030006n',
                      },
                      memory: {
                        capacity: '32822868Ki',
                        allocated: '7594752Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-forgejo-run-001-7vbg-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '175800756n',
                      },
                      memory: {
                        capacity: '32822864Ki',
                        allocated: '2616600Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-forgejo-run-001-7vbg-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '598866201n',
                      },
                      memory: {
                        capacity: '32822868Ki',
                        allocated: '6095144Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-forgejo-run-001.vitistack-forgejo-prod-3rhc.sky.nhn.no',
              Grafana: 'https://grafana.p-forgejo-run-001.vitistack-forgejo-prod-3rhc.sky.nhn.no',
            },
            createdAt: '2026-05-13T11:28:12Z',
            lastSeen: '2026-06-10T10:32:08.17Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-lmgd-001-8gg6',
        uid: '2e1a5230-36a5-47a9-83ca-889b9fb8aeaf',
        creationTimestamp: '2026-05-05T11:03:27Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:30.875417492 +0000 UTC m=+64878.707249092',
        hash: '3674335045195363745',
        ownerref: {
          scope: 'cluster',
          subject: 'p-lmgd-001-8gg6',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-lmgd-001-8gg6',
            clusterName: 'p-lmgd-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-lmgd-prod-uyhl',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-lmgd-001-8gg6-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '353727490n',
                  },
                  memory: {
                    capacity: '16332388Ki',
                    allocated: '5754352Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-lmgd-001-8gg6-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '361686851n',
                  },
                  memory: {
                    capacity: '16332372Ki',
                    allocated: '5148168Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-lmgd-001-8gg6-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '310801835n',
                  },
                  memory: {
                    capacity: '16332380Ki',
                    allocated: '5616432Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-lmgd-001-8gg6-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '217807673n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '3477420Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-lmgd-001-8gg6-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '796468320n',
                      },
                      memory: {
                        capacity: '16332380Ki',
                        allocated: '4662116Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-lmgd-001-8gg6-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '549138600n',
                      },
                      memory: {
                        capacity: '16332388Ki',
                        allocated: '8228604Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-lmgd-001.vitistack-lmgd-prod-uyhl.sky.nhn.no',
              Grafana: 'https://grafana.p-lmgd-001.vitistack-lmgd-prod-uyhl.sky.nhn.no',
            },
            createdAt: '2026-05-05T10:59:17Z',
            lastSeen: '2026-06-10T10:32:30.888Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-melde-001-ymh7',
        uid: 'e7cc13fc-14b9-42e1-af85-9a44b7ff46dc',
        creationTimestamp: '2026-04-30T07:52:29Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:41.984295805 +0000 UTC m=+104406.570197384',
        hash: '13277972787456741640',
        ownerref: {
          scope: 'cluster',
          subject: 'p-melde-001-ymh7',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-melde-001-ymh7',
            clusterName: 'p-melde-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-innrapp-prod-7169',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-melde-001-ymh7-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '433717430n',
                  },
                  memory: {
                    capacity: '16332388Ki',
                    allocated: '5709884Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-melde-001-ymh7-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '632898828n',
                  },
                  memory: {
                    capacity: '16332368Ki',
                    allocated: '5697088Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-melde-001-ymh7-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '197108960n',
                  },
                  memory: {
                    capacity: '16332372Ki',
                    allocated: '4860416Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-melde-001-ymh7-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '625773329n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '6401436Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-melde-001-ymh7-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '447406125n',
                      },
                      memory: {
                        capacity: '16332380Ki',
                        allocated: '3735532Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-melde-001-ymh7-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '456913701n',
                      },
                      memory: {
                        capacity: '16332392Ki',
                        allocated: '7056736Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-melde-001.vitistack-innrapp-prod-7169.sky.nhn.no',
              Grafana: 'https://grafana.p-melde-001.vitistack-innrapp-prod-7169.sky.nhn.no',
            },
            createdAt: '2026-04-30T07:45:09Z',
            lastSeen: '2026-06-10T10:32:41.989Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-mot-001-ho87',
        uid: '1a343050-0922-4b53-90b8-6182cd6336f8',
        creationTimestamp: '2026-04-24T20:05:40Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:10.371201949 +0000 UTC m=+64868.124330603',
        hash: '8765585987998753833',
        ownerref: {
          scope: 'cluster',
          subject: 'p-mot-001-ho87',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-mot-001-ho87',
            clusterName: 'p-mot-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-mot-prod-0u9n',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-mot-001-ho87-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '428528895n',
                  },
                  memory: {
                    capacity: '16331836Ki',
                    allocated: '7488428Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-mot-001-ho87-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '429985944n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '6994620Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-mot-001-ho87-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '337782439n',
                  },
                  memory: {
                    capacity: '16331848Ki',
                    allocated: '6809640Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-mot-001-ho87-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '734124567n',
                      },
                      memory: {
                        capacity: '32822316Ki',
                        allocated: '6035404Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-mot-001-ho87-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '1415504567n',
                      },
                      memory: {
                        capacity: '32822332Ki',
                        allocated: '5716748Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-mot-001-ho87-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '1859623501n',
                      },
                      memory: {
                        capacity: '32822872Ki',
                        allocated: '14232112Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-mot-001-ho87-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '298455585n',
                      },
                      memory: {
                        capacity: '32822872Ki',
                        allocated: '2790696Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-mot-001.vitistack-mot-prod-0u9n.sky.nhn.no',
              Grafana: 'https://grafana.p-mot-001.vitistack-mot-prod-0u9n.sky.nhn.no',
            },
            createdAt: '2026-04-24T19:58:21Z',
            lastSeen: '2026-06-10T10:32:10.376Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-pai-mgmt-6851',
        uid: '53e5b1f6-a30c-4a37-a030-d99ebb64bce1',
        creationTimestamp: '2026-04-10T08:11:38Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:39.771783208 +0000 UTC m=+64863.281605237',
        hash: '10974710524004937044',
        ownerref: {
          scope: 'cluster',
          subject: 'p-pai-mgmt-6851',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-pai-mgmt-6851',
            clusterName: 'p-pai-mgmt',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pai-prod-6tw4',
            environment: 'production',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-pai-mgmt-6851-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '614488019n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '5153812Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-pai-mgmt-6851-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '398851774n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4700508Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-pai-mgmt-6851-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '376441237n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '3818064Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-pai-mgmt-6851-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '1392562079n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '7494960Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-pai-mgmt-6851-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '303123906n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '4657356Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-pai-mgmt.vitistack-pai-prod-6tw4.sky.nhn.no',
              Grafana: 'https://grafana.p-pai-mgmt.vitistack-pai-prod-6tw4.sky.nhn.no',
            },
            createdAt: '2026-04-09T09:25:55Z',
            lastSeen: '2026-06-10T10:32:39.779Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-pasientreiser-atom-001-2mmc',
        uid: '22df0138-d813-4814-bb45-fe9ad90a5d53',
        creationTimestamp: '2026-04-29T12:53:02Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:31.871992122 +0000 UTC m=+21724.255658934',
        hash: '7494688279852224806',
        ownerref: {
          scope: 'cluster',
          subject: 'p-pasientreiser-atom-001-2mmc',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-pasientreiser-atom-001-2mmc',
            clusterName: 'p-pasientreiser-atom-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pastrans-prod-aoqr',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-pasientreiser-atom-001-2mmc-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '405775154n',
                  },
                  memory: {
                    capacity: '16332388Ki',
                    allocated: '5500884Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-pasientreiser-atom-001-2mmc-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '276494562n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '4981828Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-pasientreiser-atom-001-2mmc-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '326746996n',
                  },
                  memory: {
                    capacity: '16332372Ki',
                    allocated: '5394096Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-pasientreiser-atom-001-2mmc-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '498080067n',
                      },
                      memory: {
                        capacity: '16332380Ki',
                        allocated: '7269492Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-pasientreiser-atom-001-2mmc-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '171464086n',
                      },
                      memory: {
                        capacity: '16332380Ki',
                        allocated: '2762792Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-pasientreiser-atom-001-2mmc-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '611110764n',
                      },
                      memory: {
                        capacity: '16332392Ki',
                        allocated: '4265288Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-pasientreiser-atom-001.vitistack-pastrans-prod-aoqr.sky.nhn.no',
              Grafana: 'https://grafana.p-pasientreiser-atom-001.vitistack-pastrans-prod-aoqr.sky.nhn.no',
            },
            createdAt: '2026-04-29T12:48:24Z',
            lastSeen: '2026-06-10T10:32:31.879Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-per-401-xavs',
        uid: '8f75717c-54ea-4f2e-8e29-528d347395a8',
        creationTimestamp: '2026-04-23T09:15:41Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:08.002457659 +0000 UTC m=+64865.998149808',
        hash: '15932808090176553804',
        ownerref: {
          scope: 'cluster',
          subject: 'p-per-401-xavs',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-per-401-xavs',
            clusterName: 'p-per-401',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-per-prod-y0t5',
            environment: 'production',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-per-401-xavs-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '554986590n',
                  },
                  memory: {
                    capacity: '16324240Ki',
                    allocated: '5694680Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-per-401-xavs-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '519317092n',
                  },
                  memory: {
                    capacity: '16324240Ki',
                    allocated: '5721844Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-per-401-xavs-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '499628466n',
                  },
                  memory: {
                    capacity: '16324240Ki',
                    allocated: '5552956Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-per-401-xavs-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '291553250n',
                      },
                      memory: {
                        capacity: '32820304Ki',
                        allocated: '4195248Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-per-401-xavs-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '688047722n',
                      },
                      memory: {
                        capacity: '32820880Ki',
                        allocated: '8194444Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-per-401-xavs-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '1615622549n',
                      },
                      memory: {
                        capacity: '32820304Ki',
                        allocated: '3865580Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-per-401-xavs-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '256658744n',
                      },
                      memory: {
                        capacity: '32820300Ki',
                        allocated: '3671292Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-per-401-xavs-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '427069500n',
                      },
                      memory: {
                        capacity: '32820312Ki',
                        allocated: '3383948Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-per-401.vitistack-per-prod-y0t5.sky.nhn.no',
              Grafana: 'https://grafana.p-per-401.vitistack-per-prod-y0t5.sky.nhn.no',
            },
            createdAt: '2026-04-23T09:12:34Z',
            lastSeen: '2026-06-10T10:32:08.007Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-pers-002-0l69',
        uid: 'a2f6fcf7-0ecc-4eae-9f0b-d0368eb3ab02',
        creationTimestamp: '2026-04-29T19:46:53Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:58.015940109 +0000 UTC m=+79200.168906325',
        hash: '5820534087838852360',
        ownerref: {
          scope: 'cluster',
          subject: 'p-pers-002-0l69',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-pers-002-0l69',
            clusterName: 'p-pers-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-personell-if3d',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-pers-002-0l69-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '392914120n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '5221660Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-pers-002-0l69-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '499739277n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5732208Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-pers-002-0l69-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '305992520n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '4648612Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-pers-002-0l69-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '316568457n',
                      },
                      memory: {
                        capacity: '32822860Ki',
                        allocated: '3470008Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-pers-002-0l69-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '414449508n',
                      },
                      memory: {
                        capacity: '32822868Ki',
                        allocated: '6011888Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-pers-002-0l69-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '873910689n',
                      },
                      memory: {
                        capacity: '32822868Ki',
                        allocated: '8382892Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-pers-002.vitistack-personell-if3d.sky.nhn.no',
              Grafana: 'https://grafana.p-pers-002.vitistack-personell-if3d.sky.nhn.no',
            },
            createdAt: '2026-04-29T19:42:07Z',
            lastSeen: '2026-06-10T10:31:58.021Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-ptr-mgmt-001-5kck',
        uid: '879215f8-4618-445f-9cc1-c5e3015fd1ef',
        creationTimestamp: '2026-04-22T18:48:47Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:18.372608199 +0000 UTC m=+64870.875971184',
        hash: '12084617573292307810',
        ownerref: {
          scope: 'cluster',
          subject: 'p-ptr-mgmt-001-5kck',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-ptr-mgmt-001-5kck',
            clusterName: 'p-ptr-mgmt-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pastrans-prod-aoqr',
            environment: 'production',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-ptr-mgmt-001-5kck-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '725546188n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '4928Mi',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-ptr-mgmt-001-5kck-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '377985443n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '5220464Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-ptr-mgmt-001-5kck-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '395562792n',
                  },
                  memory: {
                    capacity: '16331840Ki',
                    allocated: '5556420Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-ptr-mgmt-001-5kck-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '696354115n',
                      },
                      memory: {
                        capacity: '16331844Ki',
                        allocated: '5722156Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-ptr-mgmt-001-5kck-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '333357668n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '5841272Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-ptr-mgmt-001-5kck-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '408979759n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '4320136Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-ptr-mgmt-001.vitistack-pastrans-prod-aoqr.sky.nhn.no',
              Grafana: 'https://grafana.p-ptr-mgmt-001.vitistack-pastrans-prod-aoqr.sky.nhn.no',
            },
            createdAt: '2026-04-22T18:41:18Z',
            lastSeen: '2026-06-10T10:32:18.377Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-pts-000-wahv',
        uid: '5781781a-b9e1-4140-ae23-90ee384f9e3b',
        creationTimestamp: '2026-04-27T19:44:46Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:13.176221595 +0000 UTC m=+316381.670212371',
        hash: '11844176745623264074',
        ownerref: {
          scope: 'cluster',
          subject: 'p-pts-000-wahv',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-pts-000-wahv',
            clusterName: 'p-pts-000',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pts-prod-pqp1',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-pts-000-wahv-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '267817782n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '5593460Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-pts-000-wahv-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '408226838n',
                  },
                  memory: {
                    capacity: '16331832Ki',
                    allocated: '5676348Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-pts-000-wahv-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '295101885n',
                  },
                  memory: {
                    capacity: '16331824Ki',
                    allocated: '4628768Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-pts-000-wahv-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '475826596n',
                      },
                      memory: {
                        capacity: '16331836Ki',
                        allocated: '4651560Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-pts-000-wahv-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '339005358n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '3882924Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-pts-000-wahv-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '315064080n',
                      },
                      memory: {
                        capacity: '16332416Ki',
                        allocated: '4703088Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-pts-000.vitistack-pts-prod-pqp1.sky.nhn.no',
              Grafana: 'https://grafana.p-pts-000.vitistack-pts-prod-pqp1.sky.nhn.no',
            },
            createdAt: '2026-04-27T19:37:23Z',
            lastSeen: '2026-06-10T10:32:13.181Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-rgt-001-80ka',
        uid: '4bb33988-6607-42a3-91b9-84802953ec11',
        creationTimestamp: '2026-04-24T12:19:58Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:39.087884938 +0000 UTC m=+370331.639971633',
        hash: '15927138332761742544',
        ownerref: {
          scope: 'cluster',
          subject: 'p-rgt-001-80ka',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-rgt-001-80ka',
            clusterName: 'p-rgt-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-rgt-prod-9c58',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-rgt-001-80ka-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '1324742264n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '5529336Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-rgt-001-80ka-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '412873922n',
                  },
                  memory: {
                    capacity: '16331852Ki',
                    allocated: '5533064Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'p-rgt-001-80ka-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '336776491n',
                  },
                  memory: {
                    capacity: '16331848Ki',
                    allocated: '5180900Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-rgt-001-80ka-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '698533576n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '6854492Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'p-rgt-001-80ka-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '333816706n',
                      },
                      memory: {
                        capacity: '16331844Ki',
                        allocated: '5212008Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-rgt-001.vitistack-rgt-prod-9c58.sky.nhn.no',
              Grafana: 'https://grafana.p-rgt-001.vitistack-rgt-prod-9c58.sky.nhn.no',
            },
            createdAt: '2026-04-24T12:10:43Z',
            lastSeen: '2026-06-10T10:32:39.094Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-sb-067-umns',
        uid: 'ac170c59-8184-4b90-a8f7-0e527a72f675',
        creationTimestamp: '2026-03-25T12:23:09Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:20.200303715 +0000 UTC m=+104343.770069892',
        hash: '2159854345212419850',
        ownerref: {
          scope: 'cluster',
          subject: 'p-sb-067-umns',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-sb-067-umns',
            clusterName: 'p-sb-067',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-sb-prod-30ze',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-sb-067-umns-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '428328632n',
                  },
                  memory: {
                    capacity: '8088908Ki',
                    allocated: '4429352Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-sb-067-umns-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '300104565n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '3305556Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-sb-067-umns-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '402983055n',
                  },
                  memory: {
                    capacity: '8088908Ki',
                    allocated: '4608944Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-sb-067-umns-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '549395852n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '6257268Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-sb-067-umns-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '382573925n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '4473364Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-sb-067-umns-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '264360724n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '3294268Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-sb-067.vitistack-sb-prod-30ze.sky.nhn.no',
              Grafana: 'https://grafana.p-sb-067.vitistack-sb-prod-30ze.sky.nhn.no',
            },
            createdAt: '2026-03-25T12:18:06Z',
            lastSeen: '2026-06-10T10:32:20.208Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-sky-001-5dot',
        uid: '10dc210e-cd07-4ff5-b8c9-c01e163d0554',
        creationTimestamp: '2026-03-13T13:19:28Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:00.0623999 +0000 UTC m=+21660.662050469',
        hash: '6018628085783877968',
        ownerref: {
          scope: 'cluster',
          subject: 'p-psky-001-1cd3',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-sky-001-5dot',
            clusterName: 'p-psky-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'central-az1',
            environment: 'dev',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-psky-001-ctp01',
                  cpu: {
                    capacity: '4',
                    allocated: '330446854n',
                  },
                  memory: {
                    capacity: '8109704Ki',
                    allocated: '4664276Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.0',
                },
                {
                  name: 'p-psky-001-ctp02',
                  cpu: {
                    capacity: '4',
                    allocated: '298334296n',
                  },
                  memory: {
                    capacity: '8109720Ki',
                    allocated: '4684864Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.0',
                },
                {
                  name: 'p-psky-001-ctp03',
                  cpu: {
                    capacity: '4',
                    allocated: '266881931n',
                  },
                  memory: {
                    capacity: '8109708Ki',
                    allocated: '4292236Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-psky-001-wrk01',
                      cpu: {
                        capacity: '32',
                        allocated: '188003044n',
                      },
                      memory: {
                        capacity: '527895860Ki',
                        allocated: '2062524Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.0',
                    },
                    {
                      name: 'p-psky-001-wrk02',
                      cpu: {
                        capacity: '32',
                        allocated: '735099163n',
                      },
                      memory: {
                        capacity: '527711364Ki',
                        allocated: '11581160Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.0',
                    },
                    {
                      name: 'p-psky-001-wrk03',
                      cpu: {
                        capacity: '32',
                        allocated: '3197901538n',
                      },
                      memory: {
                        capacity: '527711368Ki',
                        allocated: '9579648Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.0',
                    },
                    {
                      name: 'p-psky-001-wrk04',
                      cpu: {
                        capacity: '32',
                        allocated: '1394813694n',
                      },
                      memory: {
                        capacity: '527723340Ki',
                        allocated: '7167832Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-psky-001.central-az1.sky.nhn.no',
              Grafana: 'https://grafana.p-psky-001.central-az1.sky.nhn.no',
            },
            createdAt: '2026-02-12T13:37:35Z',
            lastSeen: '2026-06-10T10:32:00.066Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-sql-001-25rh',
        uid: 'e5c428b3-a9e4-47f8-84e7-833845b1f9dd',
        creationTimestamp: '2026-03-16T16:08:05Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-05-26 11:13:55.07758914 +0000 UTC m=+24960.250093540',
        hash: '18069467148765511967',
        ownerref: {
          scope: 'cluster',
          subject: 'p-sql-001-f7hs',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-sql-001-25rh',
            clusterName: 'p-sql-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'west-az1',
            environment: 'prod',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'talos-4k4-v6g',
                  cpu: {
                    capacity: '4',
                    allocated: '260911273n',
                  },
                  memory: {
                    capacity: '7543976Ki',
                    allocated: '4681428Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.34.1',
                },
                {
                  name: 'talos-ojq-48a',
                  cpu: {
                    capacity: '4',
                    allocated: '402021446n',
                  },
                  memory: {
                    capacity: '7543984Ki',
                    allocated: '5421720Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.34.1',
                },
                {
                  name: 'talos-pjr-e7g',
                  cpu: {
                    capacity: '4',
                    allocated: '347120673n',
                  },
                  memory: {
                    capacity: '7543984Ki',
                    allocated: '4631080Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.34.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'talos-d3b-z3t',
                      cpu: {
                        capacity: '16',
                        allocated: '697710863n',
                      },
                      memory: {
                        capacity: '245758068Ki',
                        allocated: '4583012Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.34.1',
                    },
                    {
                      name: 'talos-h3a-p4z',
                      cpu: {
                        capacity: '16',
                        allocated: '154676750n',
                      },
                      memory: {
                        capacity: '245758056Ki',
                        allocated: '2403916Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.34.1',
                    },
                    {
                      name: 'talos-icn-gxz',
                      cpu: {
                        capacity: '16',
                        allocated: '635548333n',
                      },
                      memory: {
                        capacity: '245758064Ki',
                        allocated: '6491928Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.34.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-sql-001.west-az1.sky.nhn.no',
              Grafana: 'https://grafana.p-sql-001.west-az1.sky.nhn.no',
            },
            createdAt: '2025-12-01T13:15:43Z',
            lastSeen: '2026-05-26T11:13:55.082Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-sql-401-37nj',
        uid: '688bcbbb-6ef1-47cf-b7d5-e6f19cfcd66d',
        creationTimestamp: '2026-05-22T10:40:05Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:05.891389919 +0000 UTC m=+104354.025971480',
        hash: '17218844872975584061',
        ownerref: {
          scope: 'cluster',
          subject: 'p-sql-401-37nj',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-sql-401-37nj',
            clusterName: 'p-sql-401',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-database-prod-lfme',
            environment: 'prod',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-sql-401-37nj-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '439462298n',
                  },
                  memory: {
                    capacity: '16330352Ki',
                    allocated: '4960924Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-sql-401-37nj-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '319157138n',
                  },
                  memory: {
                    capacity: '16330384Ki',
                    allocated: '3756716Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-sql-401-37nj-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '304954629n',
                  },
                  memory: {
                    capacity: '16330380Ki',
                    allocated: '3993940Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-sql-401-37nj-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '996682372n',
                      },
                      memory: {
                        capacity: '49286776Ki',
                        allocated: '27767732Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-sql-401-37nj-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '560672500n',
                      },
                      memory: {
                        capacity: '49286764Ki',
                        allocated: '25434676Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-sql-401.vitistack-database-prod-lfme.sky.nhn.no',
              Grafana: 'https://grafana.p-sql-401.vitistack-database-prod-lfme.sky.nhn.no',
            },
            createdAt: '2026-05-21T09:01:21Z',
            lastSeen: '2026-06-10T10:32:05.897Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-stat-001-oybw',
        uid: '30caf205-4d65-40d6-9dbc-6f2ac0c0eb43',
        creationTimestamp: '2026-05-13T09:01:10Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:24.695080043 +0000 UTC m=+21724.771901653',
        hash: '2424426665269093493',
        ownerref: {
          scope: 'cluster',
          subject: 'p-stat-001-oybw',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-stat-001-oybw',
            clusterName: 'p-stat-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-stat-prod-6f8x',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-stat-001-oybw-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '467069213n',
                  },
                  memory: {
                    capacity: '16332388Ki',
                    allocated: '5063320Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-stat-001-oybw-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '389122556n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5278268Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-stat-001-oybw-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '365319286n',
                  },
                  memory: {
                    capacity: '16332380Ki',
                    allocated: '5726540Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-stat-001-oybw-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '226939766n',
                      },
                      memory: {
                        capacity: '16332388Ki',
                        allocated: '3495796Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-stat-001-oybw-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '806500885n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '7050992Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-stat-001.vitistack-stat-prod-6f8x.sky.nhn.no',
              Grafana: 'https://grafana.p-stat-001.vitistack-stat-prod-6f8x.sky.nhn.no',
            },
            createdAt: '2026-05-13T08:55:01Z',
            lastSeen: '2026-06-10T10:32:24.7Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-ek-viti-fzh2',
        uid: 'aa3ccc02-6757-411a-b9fc-5bb9caec66ae',
        creationTimestamp: '2026-06-02T11:20:55Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-02 13:31:56.292106258 +0000 UTC m=+7860.659963945',
        hash: '15136894965090138987',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-ek-viti-fzh2',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-trd-ek-viti-fzh2',
            clusterName: 'p-trd-ek-viti',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-vitistack-ek-prod-qm3u',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-trd-ek-viti-fzh2-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '541881470n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '3792316Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-ek-viti-fzh2-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '365547991n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '2941960Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-ek-viti-fzh2-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '360123448n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '3438732Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-trd-ek-viti-fzh2-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1065320199n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '2570992Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-ek-viti-fzh2-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '313325655n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '1896816Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-ek-viti-fzh2-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '166481975n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '1696616Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-06-02T11:16:06Z',
            lastSeen: '2026-06-02T13:31:56.297Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-ek-viti-sims',
        uid: 'e6514697-5243-45ba-9e9a-baecc13b3fe7',
        creationTimestamp: '2026-06-02T11:26:35Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:21.374449598 +0000 UTC m=+21723.434774928',
        hash: '13796623815996430759',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-ek-viti-sims',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-trd-ek-viti-sims',
            clusterName: 'p-trd-ek-viti',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-ek-prod-77mi',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-trd-ek-viti-sims-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '469876936n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '4375952Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-ek-viti-sims-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '416301046n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '4047796Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-ek-viti-sims-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '473265935n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4424976Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-trd-ek-viti-sims-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '413743018n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '4628876Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-ek-viti-sims-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '410954227n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '2635096Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-ek-viti-sims-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '612465402n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '3770144Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-trd-ek-viti.vitistack-ek-prod-77mi.sky.nhn.no',
              Grafana: 'https://grafana.p-trd-ek-viti.vitistack-ek-prod-77mi.sky.nhn.no',
            },
            createdAt: '2026-06-02T11:21:42Z',
            lastSeen: '2026-06-10T10:32:21.383Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-obao-001-p36y',
        uid: 'd9353d66-0fac-4cd8-b18b-2017876f2a38',
        creationTimestamp: '2026-04-09T07:31:30Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:29.676521223 +0000 UTC m=+64876.393836589',
        hash: '949118734588720663',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-obao-001-p36y',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-trd-obao-001-p36y',
            clusterName: 'p-trd-obao-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-obao-prod-yeps',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-trd-obao-001-p36y-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '425849658n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4764708Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-obao-001-p36y-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '428603195n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4722628Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-obao-001-p36y-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '426545771n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4484004Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-trd-obao-001-p36y-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '856913925n',
                      },
                      memory: {
                        capacity: '49287836Ki',
                        allocated: '8178804Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-obao-001-p36y-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '707433525n',
                      },
                      memory: {
                        capacity: '49287832Ki',
                        allocated: '5993948Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-obao-001-p36y-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '475496911n',
                      },
                      memory: {
                        capacity: '49287832Ki',
                        allocated: '3626976Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-trd-obao-001.vitistack-obao-prod-yeps.sky.nhn.no',
              Grafana: 'https://grafana.p-trd-obao-001.vitistack-obao-prod-yeps.sky.nhn.no',
            },
            createdAt: '2026-04-09T07:23:42Z',
            lastSeen: '2026-06-10T10:32:29.682Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-soc-001-ou91',
        uid: 'a3758b08-c7c3-4c3f-9c1f-2af314aced68',
        creationTimestamp: '2026-05-20T13:38:02Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:24.370819471 +0000 UTC m=+21724.339252298',
        hash: '13030243687910472737',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-soc-001-ou91',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-trd-soc-001-ou91',
            clusterName: 'p-trd-soc-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-soc-pfey',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-trd-soc-001-ou91-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '394519882n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '5814708Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-trd-soc-001-ou91-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '364415058n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '5382504Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-trd-soc-001-ou91-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '293550428n',
                  },
                  memory: {
                    capacity: '16332388Ki',
                    allocated: '4123628Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-trd-soc-001-ou91-wrk0',
                      cpu: {
                        capacity: '8',
                        allocated: '1290853049n',
                      },
                      memory: {
                        capacity: '16326992Ki',
                        allocated: '5143052Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-trd-soc-001-ou91-wrk1',
                      cpu: {
                        capacity: '8',
                        allocated: '978745992n',
                      },
                      memory: {
                        capacity: '16327004Ki',
                        allocated: '8042472Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-trd-soc-001-ou91-wrk2',
                      cpu: {
                        capacity: '8',
                        allocated: '1256608699n',
                      },
                      memory: {
                        capacity: '16327000Ki',
                        allocated: '3444496Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-trd-soc-001.vitistack-soc-pfey.sky.nhn.no',
              Grafana: 'https://grafana.p-trd-soc-001.vitistack-soc-pfey.sky.nhn.no',
            },
            createdAt: '2026-05-20T13:34:03Z',
            lastSeen: '2026-06-10T10:32:24.376Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-soc-002-i5yk',
        uid: 'b2a20444-a268-42a7-84cc-98674eb865d3',
        creationTimestamp: '2026-05-20T14:05:26Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:26.676544218 +0000 UTC m=+187028.711336513',
        hash: '3784281391221547667',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-soc-002-i5yk',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-trd-soc-002-i5yk',
            clusterName: 'p-trd-soc-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-soc-pfey',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-trd-soc-002-i5yk-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '325956500n',
                  },
                  memory: {
                    capacity: '16332372Ki',
                    allocated: '4966748Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-trd-soc-002-i5yk-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '416114265n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5762908Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-trd-soc-002-i5yk-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '259497904n',
                  },
                  memory: {
                    capacity: '16332372Ki',
                    allocated: '5115252Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-trd-soc-002-i5yk-wrk0',
                      cpu: {
                        capacity: '8',
                        allocated: '803114217n',
                      },
                      memory: {
                        capacity: '16327000Ki',
                        allocated: '2260304Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-trd-soc-002-i5yk-wrk1',
                      cpu: {
                        capacity: '8',
                        allocated: '367330124n',
                      },
                      memory: {
                        capacity: '16327004Ki',
                        allocated: '4745696Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-trd-soc-002-i5yk-wrk2',
                      cpu: {
                        capacity: '8',
                        allocated: '783884217n',
                      },
                      memory: {
                        capacity: '16326988Ki',
                        allocated: '6618192Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-trd-soc-002.vitistack-soc-pfey.sky.nhn.no',
              Grafana: 'https://grafana.p-trd-soc-002.vitistack-soc-pfey.sky.nhn.no',
            },
            createdAt: '2026-05-20T14:01:53Z',
            lastSeen: '2026-06-10T10:32:26.681Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-soc-003-l9qx',
        uid: 'a613fbd4-88a4-4c6e-aea5-06742b971071',
        creationTimestamp: '2026-05-29T11:58:01Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:12.163196289 +0000 UTC m=+21420.183496177',
        hash: '4144145674303723261',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-soc-003-l9qx',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-trd-soc-003-l9qx',
            clusterName: 'p-trd-soc-003',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-soc-prod-5e7b',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-trd-soc-003-l9qx-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '404302427n',
                  },
                  memory: {
                    capacity: '16331436Ki',
                    allocated: '4104944Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-soc-003-l9qx-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '465320350n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '4249292Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-soc-003-l9qx-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '384465609n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '4575564Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-trd-soc-003-l9qx-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '499298479n',
                      },
                      memory: {
                        capacity: '16331432Ki',
                        allocated: '5139696Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-soc-003-l9qx-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '376725493n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '3671220Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-soc-003-l9qx-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '787326367n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '6561816Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-trd-soc-003.vitistack-soc-prod-5e7b.sky.nhn.no',
              Grafana: 'https://grafana.p-trd-soc-003.vitistack-soc-prod-5e7b.sky.nhn.no',
            },
            createdAt: '2026-05-29T11:53:25Z',
            lastSeen: '2026-06-10T10:32:12.168Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-soc-004-44d4',
        uid: 'c2c728d6-35a4-46af-bb0e-c014208f82a2',
        creationTimestamp: '2026-03-16T16:08:03Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:43.616429935 +0000 UTC m=+424260.165706713',
        hash: '12965970319870769646',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-soc-004-44d4',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-trd-soc-004-44d4',
            clusterName: 'p-trd-soc-004',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-soc-pfey',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-trd-soc-004-44d4-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '438397228n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4555168Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-soc-004-44d4-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '275055906n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4351072Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'p-trd-soc-004-44d4-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '366682248n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4464080Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-trd-soc-004-44d4-wrk0',
                      cpu: {
                        capacity: '8',
                        allocated: '269105976n',
                      },
                      memory: {
                        capacity: '16326060Ki',
                        allocated: '3407604Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-soc-004-44d4-wrk1',
                      cpu: {
                        capacity: '8',
                        allocated: '516967383n',
                      },
                      memory: {
                        capacity: '16326072Ki',
                        allocated: '6362204Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'p-trd-soc-004-44d4-wrk2',
                      cpu: {
                        capacity: '8',
                        allocated: '343760101n',
                      },
                      memory: {
                        capacity: '16326068Ki',
                        allocated: '5243640Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-trd-soc-004.vitistack-soc-pfey.sky.nhn.no',
              Grafana: 'https://grafana.p-trd-soc-004.vitistack-soc-pfey.sky.nhn.no',
            },
            createdAt: '2026-03-11T07:45:51Z',
            lastSeen: '2026-06-10T10:32:43.622Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-trd-soc-004-44d4',
        uid: 'dc78c1c0-ec8b-49dd-b464-75c352292608',
        creationTimestamp: '2026-03-26T17:34:26Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-03-26 17:34:26.338447294 +0000 UTC m=+64.203389677',
        hash: 'invalid',
        ownerref: {
          scope: 'cluster',
          subject: 'p-trd-soc-004-44d4',
        },
        action: 'Add',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {},
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-vk-viti-001-7z4x',
        uid: '1d651045-6881-42de-a658-8dc58f193146',
        creationTimestamp: '2026-05-18T09:58:02Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:23.973808984 +0000 UTC m=+64873.790538010',
        hash: '14203776876167439795',
        ownerref: {
          scope: 'cluster',
          subject: 'p-vk-viti-001-7z4x',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-vk-viti-001-7z4x',
            clusterName: 'p-vk-viti-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-videotj-agoi',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-vk-viti-001-7z4x-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '391287410n',
                  },
                  memory: {
                    capacity: '16332372Ki',
                    allocated: '4985952Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-vk-viti-001-7z4x-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '866531006n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '5644812Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-vk-viti-001-7z4x-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '351946441n',
                  },
                  memory: {
                    capacity: '16332368Ki',
                    allocated: '4375176Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-vk-viti-001-7z4x-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '317838828n',
                      },
                      memory: {
                        capacity: '8087144Ki',
                        allocated: '3480340Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-vk-viti-001-7z4x-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '659177172n',
                      },
                      memory: {
                        capacity: '8087140Ki',
                        allocated: '3162800Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-vk-viti-001-7z4x-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '492695371n',
                      },
                      memory: {
                        capacity: '8087144Ki',
                        allocated: '4078848Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-vk-viti-001-7z4x-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '211755944n',
                      },
                      memory: {
                        capacity: '8087144Ki',
                        allocated: '3100164Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-vk-viti-001-7z4x-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '478532502n',
                      },
                      memory: {
                        capacity: '8087140Ki',
                        allocated: '3981440Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-vk-viti-001.vitistack-videotj-agoi.sky.nhn.no',
              Grafana: 'https://grafana.p-vk-viti-001.vitistack-videotj-agoi.sky.nhn.no',
            },
            createdAt: '2026-05-18T09:53:37Z',
            lastSeen: '2026-06-10T10:32:23.978Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'p-vmiror-002-kwj6',
        uid: '4d83b477-1cb8-41fb-849d-8bbea3548cc3',
        creationTimestamp: '2026-05-13T10:22:30Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:27.88712098 +0000 UTC m=+64872.910990430',
        hash: '14665601597194677049',
        ownerref: {
          scope: 'cluster',
          subject: 'p-vmiror-002-kwj6',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'p-vmiror-002-kwj6',
            clusterName: 'p-vmiror-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-ptvm-resl',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'p-vmiror-002-kwj6-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '466299691n',
                  },
                  memory: {
                    capacity: '16332368Ki',
                    allocated: '5707188Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-vmiror-002-kwj6-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '517205828n',
                  },
                  memory: {
                    capacity: '16332380Ki',
                    allocated: '5466952Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
                {
                  name: 'p-vmiror-002-kwj6-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '337824946n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5161924Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'p-vmiror-002-kwj6-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '227211460n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '3049460Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'p-vmiror-002-kwj6-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '645133877n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '8058216Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.p-vmiror-002.vitistack-ptvm-resl.sky.nhn.no',
              Grafana: 'https://grafana.p-vmiror-002.vitistack-ptvm-resl.sky.nhn.no',
            },
            createdAt: '2026-05-13T10:14:40Z',
            lastSeen: '2026-06-10T10:32:27.892Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'ptr1-mgmt-001-oz53',
        uid: 'db795a98-dac8-4102-8a52-fb6c021ec2ec',
        creationTimestamp: '2026-05-18T11:09:26Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:57.689489404 +0000 UTC m=+104353.718970625',
        hash: '17634407580241714292',
        ownerref: {
          scope: 'cluster',
          subject: 'ptr1-mgmt-001-oz53',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'ptr1-mgmt-001-oz53',
            clusterName: 'ptr1-mgmt-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'central-az1',
            environment: 'prod',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'ptr1-mgmt-ctpl01',
                  cpu: {
                    capacity: '2',
                    allocated: '1301402424n',
                  },
                  memory: {
                    capacity: '8110364Ki',
                    allocated: '5324676Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'ptr1-mgmt-ctpl02',
                  cpu: {
                    capacity: '2',
                    allocated: '1686385143n',
                  },
                  memory: {
                    capacity: '8110364Ki',
                    allocated: '5347676Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'ptr1-mgmt-ctpl03',
                  cpu: {
                    capacity: '2',
                    allocated: '1081292862n',
                  },
                  memory: {
                    capacity: '8110368Ki',
                    allocated: '4891552Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'ptr1-mgmt-wrk01',
                      cpu: {
                        capacity: '4',
                        allocated: '366933326n',
                      },
                      memory: {
                        capacity: '12226152Ki',
                        allocated: '5726808Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'ptr1-mgmt-wrk02',
                      cpu: {
                        capacity: '4',
                        allocated: '353361178n',
                      },
                      memory: {
                        capacity: '12226152Ki',
                        allocated: '4027240Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'ptr1-mgmt-wrk03',
                      cpu: {
                        capacity: '4',
                        allocated: '1161276208n',
                      },
                      memory: {
                        capacity: '12226152Ki',
                        allocated: '2824316Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-02-02T13:52:26Z',
            lastSeen: '2026-06-10T10:31:57.694Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-db-101-tnip',
        uid: 'c04cdf56-f7c9-49e5-8857-b58e031aa65e',
        creationTimestamp: '2026-06-03T12:10:17Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:11.675771793 +0000 UTC m=+187029.063727466',
        hash: '995351569782090683',
        ownerref: {
          scope: 'cluster',
          subject: 'q-db-101-tnip',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-db-101-tnip',
            clusterName: 'q-db-101',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-database-nx0r',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-db-101-tnip-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '451529315n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '4199056Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-db-101-tnip-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '374078871n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '3905444Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-db-101-tnip-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '436296521n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '3644800Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-db-101-tnip-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '351729786n',
                      },
                      memory: {
                        capacity: '49287840Ki',
                        allocated: '3148756Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-db-101-tnip-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '366664053n',
                      },
                      memory: {
                        capacity: '49287832Ki',
                        allocated: '2511396Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-db-101-tnip-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '415783036n',
                      },
                      memory: {
                        capacity: '49287840Ki',
                        allocated: '3806552Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-db-101.vitistack-database-nx0r.sky.nhn.no',
              Grafana: 'https://grafana.q-db-101.vitistack-database-nx0r.sky.nhn.no',
            },
            createdAt: '2026-06-03T12:05:59Z',
            lastSeen: '2026-06-10T10:32:11.681Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-ept-001-dtlo',
        uid: '90fb5cb1-4bf0-44ea-bea2-dd8970b7ffcb',
        creationTimestamp: '2026-03-25T09:33:00Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:31.676214838 +0000 UTC m=+21727.133732271',
        hash: '18176288097200434683',
        ownerref: {
          scope: 'cluster',
          subject: 'q-ept-001-dtlo',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-ept-001-dtlo',
            clusterName: 'q-ept-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-devops-xyuw',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-ept-001-dtlo-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '415859161n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4612156Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-ept-001-dtlo-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '322249291n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '4275980Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-ept-001-dtlo-wrk6',
                      cpu: {
                        capacity: '4',
                        allocated: '304398237n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '3330308Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-ept-001-dtlo-wrk7',
                      cpu: {
                        capacity: '4',
                        allocated: '507791500n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '4920700Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-ept-001-dtlo-wrk8',
                      cpu: {
                        capacity: '4',
                        allocated: '324545526n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '4842588Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-ept-001-dtlo-wrk9',
                      cpu: {
                        capacity: '4',
                        allocated: '239918816n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '3111892Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-ept-001.vitistack-devops-xyuw.sky.nhn.no',
              Grafana: 'https://grafana.q-ept-001.vitistack-devops-xyuw.sky.nhn.no',
            },
            createdAt: '2026-03-25T09:24:15Z',
            lastSeen: '2026-06-10T10:32:31.68Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-pasientreiser-atom-001-5z8n',
        uid: 'bde62709-b3fc-406d-9c2a-a0adb8c6d5de',
        creationTimestamp: '2026-04-29T12:48:02Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:48.156936458 +0000 UTC m=+64920.179062333',
        hash: '17468441724245441250',
        ownerref: {
          scope: 'cluster',
          subject: 'q-pasientreiser-atom-001-5z8n',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-pasientreiser-atom-001-5z8n',
            clusterName: 'q-pasientreiser-atom-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pastrans-hvlb',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-pasientreiser-atom-001-5z8n-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '550907821n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5599004Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-pasientreiser-atom-001-5z8n-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '273052144n',
                      },
                      memory: {
                        capacity: '16332380Ki',
                        allocated: '3543568Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'q-pasientreiser-atom-001-5z8n-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '1773634185n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '4949644Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'q-pasientreiser-atom-001-5z8n-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '465012621n',
                      },
                      memory: {
                        capacity: '16332388Ki',
                        allocated: '5388068Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-pasientreiser-atom-001.vitistack-pastrans-hvlb.sky.nhn.no',
              Grafana: 'https://grafana.q-pasientreiser-atom-001.vitistack-pastrans-hvlb.sky.nhn.no',
            },
            createdAt: '2026-04-29T12:44:41Z',
            lastSeen: '2026-06-10T10:32:48.16Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-ptr-mgmt-001-4lb0',
        uid: 'f7bb731a-cbc4-48c9-90cb-94500f314012',
        creationTimestamp: '2026-04-22T20:00:50Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:26.59636259 +0000 UTC m=+64873.332443890',
        hash: '9399381627301469225',
        ownerref: {
          scope: 'cluster',
          subject: 'q-ptr-mgmt-001-4lb0',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-ptr-mgmt-001-4lb0',
            clusterName: 'q-ptr-mgmt-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pastrans-hvlb',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-ptr-mgmt-001-4lb0-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '415931008n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '6057836Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-ptr-mgmt-001-4lb0-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '326081946n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '4513500Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'q-ptr-mgmt-001-4lb0-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '258784199n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '5246140Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'q-ptr-mgmt-001-4lb0-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '529817603n',
                      },
                      memory: {
                        capacity: '16331844Ki',
                        allocated: '3830036Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-ptr-mgmt-001.vitistack-pastrans-hvlb.sky.nhn.no',
              Grafana: 'https://grafana.q-ptr-mgmt-001.vitistack-pastrans-hvlb.sky.nhn.no',
            },
            createdAt: '2026-04-22T19:56:07Z',
            lastSeen: '2026-06-10T10:32:26.6Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-sb-067-iihx',
        uid: 'f92a32bf-1541-4b2b-a299-2ede964ce245',
        creationTimestamp: '2026-03-25T12:20:14Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:15.615966871 +0000 UTC m=+21721.462089078',
        hash: '5598488948416011772',
        ownerref: {
          scope: 'cluster',
          subject: 'q-sb-067-iihx',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-sb-067-iihx',
            clusterName: 'q-sb-067',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-sb-3sm5',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-sb-067-iihx-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '386423659n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4952752Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-sb-067-iihx-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '624116709n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4579868Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-sb-067-iihx-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '355378410n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '3513952Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-sb-067-iihx-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '409986983n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '6175008Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-sb-067-iihx-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '520544887n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '4827328Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-sb-067-iihx-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '476699636n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '4474748Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-sb-067.vitistack-sb-3sm5.sky.nhn.no',
              Grafana: 'https://grafana.q-sb-067.vitistack-sb-3sm5.sky.nhn.no',
            },
            createdAt: '2026-03-25T12:12:28Z',
            lastSeen: '2026-06-10T10:32:15.622Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-trd-dd-viti-pp9y',
        uid: '72ef52a5-6293-4cc4-a3d3-870fce39de59',
        creationTimestamp: '2026-06-02T13:37:50Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:23.552226773 +0000 UTC m=+36240.201840216',
        hash: '6192419736604467134',
        ownerref: {
          scope: 'cluster',
          subject: 'q-trd-dd-viti-pp9y',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-trd-dd-viti-pp9y',
            clusterName: 'q-trd-dd-viti',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-dokdeling-qr46',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-trd-dd-viti-pp9y-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '624875411n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '4189176Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-trd-dd-viti-pp9y-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '381306909n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '3707236Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-trd-dd-viti-pp9y-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '395563883n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '3749768Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-trd-dd-viti-pp9y-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '543473919n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '5725576Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-dd-viti-pp9y-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '391323889n',
                      },
                      memory: {
                        capacity: '16331456Ki',
                        allocated: '2509492Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-dd-viti-pp9y-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '323034465n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '3163036Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-trd-dd-viti.vitistack-dokdeling-qr46.sky.nhn.no',
              Grafana: 'https://grafana.q-trd-dd-viti.vitistack-dokdeling-qr46.sky.nhn.no',
            },
            createdAt: '2026-06-02T13:30:49Z',
            lastSeen: '2026-06-10T10:32:23.558Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-trd-ek-3grd',
        uid: '6ca3e008-580f-4629-a1cd-e5cbe685b2b9',
        creationTimestamp: '2026-04-22T17:43:07Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:06.976953476 +0000 UTC m=+21660.159748430',
        hash: '15478335840604516058',
        ownerref: {
          scope: 'cluster',
          subject: 'q-trd-ek-3grd',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-trd-ek-3grd',
            clusterName: 'q-trd-ek',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-etterkontroll-b56q',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-trd-ek-3grd-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '635964953n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '5802772Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-trd-ek-3grd-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '970704870n',
                      },
                      memory: {
                        capacity: '16331840Ki',
                        allocated: '5038500Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'q-trd-ek-3grd-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '484914082n',
                      },
                      memory: {
                        capacity: '16331848Ki',
                        allocated: '5826996Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-trd-ek.vitistack-etterkontroll-b56q.sky.nhn.no',
              Grafana: 'https://grafana.q-trd-ek.vitistack-etterkontroll-b56q.sky.nhn.no',
            },
            createdAt: '2026-04-22T17:34:17Z',
            lastSeen: '2026-06-10T10:32:06.979Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-trd-ek-viti-26wb',
        uid: 'a79132e6-3b52-4c3c-8f27-435d3bff5fa9',
        creationTimestamp: '2026-06-02T08:19:08Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:23.493038248 +0000 UTC m=+11100.158061674',
        hash: '17658297672128030843',
        ownerref: {
          scope: 'cluster',
          subject: 'q-trd-ek-viti-26wb',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-trd-ek-viti-26wb',
            clusterName: 'q-trd-ek-viti',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-ek-9iq6',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-trd-ek-viti-26wb-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '803905763n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '4291052Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-trd-ek-viti-26wb-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '424846498n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '3631440Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-trd-ek-viti-26wb-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '497147217n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '3851488Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-trd-ek-viti-26wb-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '327596799n',
                      },
                      memory: {
                        capacity: '16331428Ki',
                        allocated: '2031380Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-ek-viti-26wb-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '1130488085n',
                      },
                      memory: {
                        capacity: '16331436Ki',
                        allocated: '6817060Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-ek-viti-26wb-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '401792541n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '2984592Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-trd-ek-viti.vitistack-ek-9iq6.sky.nhn.no',
              Grafana: 'https://grafana.q-trd-ek-viti.vitistack-ek-9iq6.sky.nhn.no',
            },
            createdAt: '2026-06-02T08:12:07Z',
            lastSeen: '2026-06-10T10:32:23.498Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'q-trd-sfm-001-nnxv',
        uid: 'e2ed81ab-3af8-4ea8-a784-02923c9f6fa9',
        creationTimestamp: '2026-03-16T16:07:05Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:24.268535498 +0000 UTC m=+64872.616739793',
        hash: '2822267094975807703',
        ownerref: {
          scope: 'cluster',
          subject: 'q-trd-sfm-001-nnxv',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'q-trd-sfm-001-jkj5',
            clusterName: 'q-trd-sfm-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-sfm',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'q-trd-sfm-001-jkj5-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '1833206621n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '9834192Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'q-trd-sfm-001-xxvn-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '1833206621n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '9834192Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'q-trd-sfm-001-jkj5-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '1476971036n',
                      },
                      memory: {
                        capacity: '32821936Ki',
                        allocated: '6424384Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-sfm-001-jkj5-wrk6',
                      cpu: {
                        capacity: '4',
                        allocated: '600269200n',
                      },
                      memory: {
                        capacity: '32821932Ki',
                        allocated: '7326392Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-sfm-001-jkj5-wrk7',
                      cpu: {
                        capacity: '4',
                        allocated: '868258925n',
                      },
                      memory: {
                        capacity: '32821936Ki',
                        allocated: '8444396Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-sfm-001-jkj5-wrk8',
                      cpu: {
                        capacity: '4',
                        allocated: '635023339n',
                      },
                      memory: {
                        capacity: '32821924Ki',
                        allocated: '7061768Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'q-trd-sfm-001-jkj5-wrk9',
                      cpu: {
                        capacity: '4',
                        allocated: '421592176n',
                      },
                      memory: {
                        capacity: '32821924Ki',
                        allocated: '7586804Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.q-trd-sfm-001.vitistack-sfm.sky.nhn.no',
              Grafana: 'https://grafana.q-trd-sfm-001.vitistack-sfm.sky.nhn.no',
            },
            createdAt: '2026-02-09T13:19:59Z',
            lastSeen: '2026-06-10T10:32:24.274Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'qa-melde-001-pcj8',
        uid: 'fe827588-e26b-49dd-beca-65d8e1a906eb',
        creationTimestamp: '2026-04-30T07:21:27Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:14.103318295 +0000 UTC m=+21721.533392786',
        hash: '5691813625412642013',
        ownerref: {
          scope: 'cluster',
          subject: 'qa-melde-001-pcj8',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'qa-melde-001-pcj8',
            clusterName: 'qa-melde-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-innrapp-b3lf',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'qa-melde-001-pcj8-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '419238990n',
                  },
                  memory: {
                    capacity: '16332376Ki',
                    allocated: '6127696Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'qa-melde-001-pcj8-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '678172754n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '5968360Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'qa-melde-001-pcj8-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '358779379n',
                      },
                      memory: {
                        capacity: '16332380Ki',
                        allocated: '3652720Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'qa-melde-001-pcj8-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '434764425n',
                      },
                      memory: {
                        capacity: '16332364Ki',
                        allocated: '6779432Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.qa-melde-001.vitistack-innrapp-b3lf.sky.nhn.no',
              Grafana: 'https://grafana.qa-melde-001.vitistack-innrapp-b3lf.sky.nhn.no',
            },
            createdAt: '2026-04-30T07:18:05Z',
            lastSeen: '2026-06-10T10:32:14.106Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'qatd-pers-002-qmiz',
        uid: '0ec740cd-7595-4925-b4fa-c6e8aa8d8e63',
        creationTimestamp: '2026-04-21T08:22:54Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:56.894499833 +0000 UTC m=+104350.286491986',
        hash: '18407663038620387850',
        ownerref: {
          scope: 'cluster',
          subject: 'qatd-pers-002-qmiz',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'qatd-pers-002-qmiz',
            clusterName: 'qatd-pers-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-tp-ttkf',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'qatd-pers-002-qmiz-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '515280912n',
                  },
                  memory: {
                    capacity: '8089296Ki',
                    allocated: '5444748Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'qatd-pers-002-qmiz-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '310393200n',
                  },
                  memory: {
                    capacity: '8089844Ki',
                    allocated: '4701344Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 'qatd-pers-002-qmiz-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '538982844n',
                  },
                  memory: {
                    capacity: '8089844Ki',
                    allocated: '4542288Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'qatd-pers-002-qmiz-wrk2',
                      cpu: {
                        capacity: '6',
                        allocated: '1114398723n',
                      },
                      memory: {
                        capacity: '16329704Ki',
                        allocated: '9289804Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 'qatd-pers-002-qmiz-wrk3',
                      cpu: {
                        capacity: '6',
                        allocated: '385447028n',
                      },
                      memory: {
                        capacity: '16329696Ki',
                        allocated: '5247748Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.qatd-pers-002.vitistack-tp-ttkf.sky.nhn.no',
              Grafana: 'https://grafana.qatd-pers-002.vitistack-tp-ttkf.sky.nhn.no',
            },
            createdAt: '2026-04-21T08:16:32Z',
            lastSeen: '2026-06-10T10:31:56.899Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'qatd-virk-002-54xb',
        uid: '25dc3ee6-f3b5-4726-8fef-847302e6e27d',
        creationTimestamp: '2026-06-02T08:22:25Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-02 09:41:25.397374173 +0000 UTC m=+4740.199287816',
        hash: '10853169225628217430',
        ownerref: {
          scope: 'cluster',
          subject: 'qatd-virk-002-54xb',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'qatd-virk-002-54xb',
            clusterName: 'qatd-virk-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-virksomhet-ir7e',
            environment: 'qa',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'qatd-virk-002-54xb-ctp0',
                  cpu: {
                    capacity: '4',
                  },
                  memory: {
                    capacity: '16331440Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'qatd-virk-002-54xb-ctp1',
                  cpu: {
                    capacity: '4',
                  },
                  memory: {
                    capacity: '16331440Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'qatd-virk-002-54xb-ctp2',
                  cpu: {
                    capacity: '4',
                  },
                  memory: {
                    capacity: '16331444Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'qatd-virk-002-54xb-wrk0',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '32821928Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'qatd-virk-002-54xb-wrk1',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '32821924Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'qatd-virk-002-54xb-wrk2',
                      cpu: {
                        capacity: '4',
                      },
                      memory: {
                        capacity: '32821912Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-06-02T08:17:04Z',
            lastSeen: '2026-06-02T09:41:25.406Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'qatd-virk-002-qhhw',
        uid: '679b0dd7-3750-434a-8e37-ffa6611d86e9',
        creationTimestamp: '2026-06-02T08:38:01Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:34.301265774 +0000 UTC m=+187080.159085282',
        hash: '10732339138683346753',
        ownerref: {
          scope: 'cluster',
          subject: 'qatd-virk-002-qhhw',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'qatd-virk-002-qhhw',
            clusterName: 'qatd-virk-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-virk-bunf',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'qatd-virk-002-qhhw-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '530539127n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '4158100Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'qatd-virk-002-qhhw-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '518676636n',
                  },
                  memory: {
                    capacity: '16331444Ki',
                    allocated: '3922980Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 'qatd-virk-002-qhhw-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '416029526n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '3954148Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'qatd-virk-002-qhhw-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '325077480n',
                      },
                      memory: {
                        capacity: '32821932Ki',
                        allocated: '3128064Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'qatd-virk-002-qhhw-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '452211454n',
                      },
                      memory: {
                        capacity: '32821932Ki',
                        allocated: '3555936Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 'qatd-virk-002-qhhw-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '335549577n',
                      },
                      memory: {
                        capacity: '32821912Ki',
                        allocated: '2934620Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.qatd-virk-002.vitistack-virk-bunf.sky.nhn.no',
              Grafana: 'https://grafana.qatd-virk-002.vitistack-virk-bunf.sky.nhn.no',
            },
            createdAt: '2026-06-02T08:33:27Z',
            lastSeen: '2026-06-10T10:32:34.307Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 'sigge-767-gd7l',
        uid: '09b8373d-fed2-4be5-ad46-1f565d3f033b',
        creationTimestamp: '2026-05-29T08:48:52Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:31.19092179 +0000 UTC m=+64871.984222075',
        hash: '17438046711381960973',
        ownerref: {
          scope: 'cluster',
          subject: 'sigge-767-gd7l',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 'sigge-767-gd7l',
            clusterName: 'sigge-767',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-diemslett-wbrd',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 'sigge-767-gd7l-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '505661217n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '3874072Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 'sigge-767-gd7l-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '310546564n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2205524Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 'sigge-767-gd7l-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '298854532n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2817084Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.sigge-767.vitistack-diemslett-wbrd.sky.nhn.no',
              Grafana: '',
            },
            createdAt: '2026-05-29T08:45:09Z',
            lastSeen: '2026-06-10T10:32:31.195Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-bgo-obao-001-c8r8',
        uid: 'a3210ac6-3e51-493a-8c48-933b5c3b5b6d',
        creationTimestamp: '2026-03-16T16:08:05Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:47.706765598 +0000 UTC m=+104409.060727556',
        hash: '10532461524672480954',
        ownerref: {
          scope: 'cluster',
          subject: 't-bgo-obao-001-c8r8',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-bgo-obao-001-c8r8',
            clusterName: 't-bgo-obao-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-cry-sozh',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-bgo-obao-001-c8r8-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '407264374n',
                  },
                  memory: {
                    capacity: '8086876Ki',
                    allocated: '4773808Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-bgo-obao-001-c8r8-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '383730658n',
                      },
                      memory: {
                        capacity: '16329420Ki',
                        allocated: '6933460Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-bgo-obao-001-c8r8-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '409825914n',
                      },
                      memory: {
                        capacity: '16329420Ki',
                        allocated: '4724668Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-bgo-obao-001-c8r8-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '319363980n',
                      },
                      memory: {
                        capacity: '16329420Ki',
                        allocated: '4053288Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-bgo-obao-001.vitistack-cry-sozh.sky.nhn.no',
              Grafana: 'https://grafana.t-bgo-obao-001.vitistack-cry-sozh.sky.nhn.no',
            },
            createdAt: '2026-03-12T13:39:04Z',
            lastSeen: '2026-06-10T10:32:47.711Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-bgo-slackbot-001-96mt',
        uid: 'a9949af8-2567-44a9-bb0b-043b83849141',
        creationTimestamp: '2026-03-14T11:25:39Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:48.410959525 +0000 UTC m=+316380.260011979',
        hash: '8034664076741948236',
        ownerref: {
          scope: 'cluster',
          subject: 't-bgo-slackbot-001-96mt',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-bgo-slackbot-001-96mt',
            clusterName: 't-bgo-slackbot-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-container-tze4',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-bgo-slackbot-001-96mt-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '330065250n',
                  },
                  memory: {
                    capacity: '8086884Ki',
                    allocated: '4305844Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-bgo-slackbot-001-96mt-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '291783802n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '2640860Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-bgo-slackbot-001-96mt-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '302134364n',
                      },
                      memory: {
                        capacity: '16329420Ki',
                        allocated: '2550468Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-bgo-slackbot-001-96mt-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '332073108n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '5617388Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.18',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-bgo-slackbot-001.vitistack-container-tze4.sky.nhn.no',
              Grafana: 'https://grafana.t-bgo-slackbot-001.vitistack-container-tze4.sky.nhn.no',
            },
            createdAt: '2026-03-10T05:42:43Z',
            lastSeen: '2026-06-10T10:32:48.419Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-dani-67-5xma',
        uid: '5478b71c-09a6-4fee-b308-93c7b5bc32d9',
        creationTimestamp: '2026-04-29T10:34:54Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:40.191543703 +0000 UTC m=+21730.040438340',
        hash: '7525994318373630177',
        ownerref: {
          scope: 'cluster',
          subject: 't-dani-67-5xma',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-dani-67-5xma',
            clusterName: 't-dani-67',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-container-tze4',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-dani-67-5xma-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '395871996n',
                  },
                  memory: {
                    capacity: '16330380Ki',
                    allocated: '6040944Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-dani-67-5xma-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '530033965n',
                      },
                      memory: {
                        capacity: '16330384Ki',
                        allocated: '4424852Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-dani-67-5xma-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '280566872n',
                      },
                      memory: {
                        capacity: '16330388Ki',
                        allocated: '5793036Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-dani-67-5xma-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '696062976n',
                      },
                      memory: {
                        capacity: '16330384Ki',
                        allocated: '5028648Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-dani-67.vitistack-container-tze4.sky.nhn.no',
              Grafana: 'https://grafana.t-dani-67.vitistack-container-tze4.sky.nhn.no',
            },
            createdAt: '2026-04-29T10:25:46Z',
            lastSeen: '2026-06-10T10:32:40.197Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-db-101-f5sz',
        uid: '552dfab0-a4a9-4e68-9a4d-5ac24bf72067',
        creationTimestamp: '2026-06-01T19:40:27Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:17.41667516 +0000 UTC m=+64800.153101636',
        hash: '9404529534455613735',
        ownerref: {
          scope: 'cluster',
          subject: 't-db-101-f5sz',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-db-101-f5sz',
            clusterName: 't-db-101',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-database-nx0r',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-db-101-f5sz-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '509187587n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '4303084Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-db-101-f5sz-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '408502368n',
                  },
                  memory: {
                    capacity: '16331452Ki',
                    allocated: '3859684Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-db-101-f5sz-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '359487483n',
                  },
                  memory: {
                    capacity: '16331448Ki',
                    allocated: '3652016Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-db-101-f5sz-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '701315987n',
                      },
                      memory: {
                        capacity: '49287836Ki',
                        allocated: '4138836Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-db-101-f5sz-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '342318869n',
                      },
                      memory: {
                        capacity: '49287836Ki',
                        allocated: '2308600Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-db-101-f5sz-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '342907404n',
                      },
                      memory: {
                        capacity: '49287832Ki',
                        allocated: '3284744Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-db-101.vitistack-database-nx0r.sky.nhn.no',
              Grafana: 'https://grafana.t-db-101.vitistack-database-nx0r.sky.nhn.no',
            },
            createdAt: '2026-06-01T19:34:24Z',
            lastSeen: '2026-06-10T10:32:17.42Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-diem-8181-pn6u',
        uid: 'a2de788a-e48e-4a1e-a941-97aecb877029',
        creationTimestamp: '2026-03-13T14:57:00Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-05-29 10:58:41.931280415 +0000 UTC m=+11160.301756312',
        hash: '13271159228249389155',
        ownerref: {
          scope: 'cluster',
          subject: 't-diem-8181-pn6u',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-diem-8181-pn6u',
            clusterName: 't-diem-8181',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-container-tze4',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-diem-8181-pn6u-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '214706843n',
                  },
                  memory: {
                    capacity: '8086872Ki',
                    allocated: '3470928Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 't-diem-8181-pn6u-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '250622869n',
                  },
                  memory: {
                    capacity: '8086880Ki',
                    allocated: '4857492Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 't-diem-8181-pn6u-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '363809879n',
                  },
                  memory: {
                    capacity: '8086876Ki',
                    allocated: '4770916Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-diem-8181-pn6u-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '269869833n',
                      },
                      memory: {
                        capacity: '16329432Ki',
                        allocated: '3889852Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-diem-8181-pn6u-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '296325502n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '4312288Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-diem-8181-pn6u-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '173944971n',
                      },
                      memory: {
                        capacity: '16330376Ki',
                        allocated: '1819448Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.18',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-diem-8181.vitistack-container-tze4.sky.nhn.no',
              Grafana: 'https://grafana.t-diem-8181.vitistack-container-tze4.sky.nhn.no',
            },
            createdAt: '2026-03-10T13:20:29Z',
            lastSeen: '2026-05-29T10:58:41.937Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-diem-8181-pn6u',
        uid: '330f2621-c313-4569-aab7-6e3450a6b566',
        creationTimestamp: '2026-03-26T18:25:10Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-03-26 18:25:10.672582942 +0000 UTC m=+314.445678879',
        hash: 'invalid',
        ownerref: {
          scope: 'cluster',
          subject: 't-diem-8181-pn6u',
        },
        action: 'Add',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {},
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-diemtest-888-mvy0',
        uid: '350cd2f6-aeb8-4bc4-85c5-dd61596b76a0',
        creationTimestamp: '2026-05-29T07:56:23Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:54.989053036 +0000 UTC m=+21668.839462137',
        hash: '4019520127925503520',
        ownerref: {
          scope: 'cluster',
          subject: 't-diemtest-888-mvy0',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-diemtest-888-mvy0',
            clusterName: 't-diemtest-888',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-diemslett-wbrd',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-diemtest-888-mvy0-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '388199271n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4278864Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-diemtest-888-mvy0-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '420182213n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '2514864Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 't-diemtest-888-mvy0-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '625452125n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '7135448Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-diemtest-888.vitistack-diemslett-wbrd.sky.nhn.no',
              Grafana: 'https://grafana.t-diemtest-888.vitistack-diemslett-wbrd.sky.nhn.no',
            },
            createdAt: '2026-05-29T07:52:22Z',
            lastSeen: '2026-06-10T10:31:54.993Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-hn-002-hx5m',
        uid: '98f0ca4e-eebc-4fdf-a179-e9c0e0b8f221',
        creationTimestamp: '2026-04-27T11:23:46Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:34.176011286 +0000 UTC m=+21730.782480755',
        hash: '16757932100279393585',
        ownerref: {
          scope: 'cluster',
          subject: 't-hn-002-hx5m',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-hn-002-hx5m',
            clusterName: 't-hn-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-hn-val1',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-hn-002-hx5m-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '560043954n',
                  },
                  memory: {
                    capacity: '16331848Ki',
                    allocated: '9026700Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 't-hn-002-hx5m-ctp1',
                  cpu: {
                    capacity: '4',
                    allocated: '397779392n',
                  },
                  memory: {
                    capacity: '16331840Ki',
                    allocated: '8817308Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
                {
                  name: 't-hn-002-hx5m-ctp2',
                  cpu: {
                    capacity: '4',
                    allocated: '552838134n',
                  },
                  memory: {
                    capacity: '16331844Ki',
                    allocated: '8504560Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-hn-002-hx5m-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '2111135479n',
                      },
                      memory: {
                        capacity: '32822332Ki',
                        allocated: '17621516Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-hn-002-hx5m-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '1983072815n',
                      },
                      memory: {
                        capacity: '32822324Ki',
                        allocated: '15336132Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-hn-002-hx5m-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '691679950n',
                      },
                      memory: {
                        capacity: '32822328Ki',
                        allocated: '16512884Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-hn-002-hx5m-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '1743061640n',
                      },
                      memory: {
                        capacity: '32822324Ki',
                        allocated: '15205196Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-hn-002-hx5m-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '952954911n',
                      },
                      memory: {
                        capacity: '32822332Ki',
                        allocated: '15672312Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-hn-002-hx5m-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '2213786208n',
                      },
                      memory: {
                        capacity: '32822876Ki',
                        allocated: '23471860Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-hn-002-hx5m-wrk6',
                      cpu: {
                        capacity: '4',
                        allocated: '670113111n',
                      },
                      memory: {
                        capacity: '32822888Ki',
                        allocated: '17868060Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-hn-002.vitistack-hn-val1.sky.nhn.no',
              Grafana: 'https://grafana.t-hn-002.vitistack-hn-val1.sky.nhn.no',
            },
            createdAt: '2026-04-27T11:13:16Z',
            lastSeen: '2026-06-10T10:32:34.18Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-jraviti-123-vexr',
        uid: 'c48981ac-e2fb-4a98-aeaa-cfe4870c4fc9',
        creationTimestamp: '2026-05-13T10:24:42Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:24.572075485 +0000 UTC m=+399123.713583514',
        hash: '7033223191503263549',
        ownerref: {
          scope: 'cluster',
          subject: 't-jraviti-123-vexr',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-jraviti-123-vexr',
            clusterName: 't-jraviti-123',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-container-asft',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-jraviti-123-vexr-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '511751394n',
                  },
                  memory: {
                    capacity: '16332372Ki',
                    allocated: '5697700Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.3',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-jraviti-123-vexr-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '525649601n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '5821504Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                    {
                      name: 't-jraviti-123-vexr-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '540802034n',
                      },
                      memory: {
                        capacity: '16332368Ki',
                        allocated: '6189592Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.3',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-05-13T10:20:47Z',
            lastSeen: '2026-06-10T10:32:24.58Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-lahey-111-dl3s',
        uid: '72c41755-3b47-4523-87f2-b3520c7de743',
        creationTimestamp: '2026-04-29T12:04:57Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-04-29 12:05:57.918980952 +0000 UTC m=+60.656808080',
        hash: '2248972926725241613',
        ownerref: {
          scope: 'cluster',
          subject: 't-lahey-111-dl3s',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-lahey-111-dl3s',
            clusterName: 't-lahey-111',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-container-tze4',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-lahey-111-dl3s-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '1043842576n',
                  },
                  memory: {
                    capacity: '16330408Ki',
                    allocated: '4514772Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-lahey-111-dl3s-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '515112545n',
                      },
                      memory: {
                        capacity: '16330388Ki',
                        allocated: '1629264Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-lahey-111-dl3s-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '3759008121n',
                      },
                      memory: {
                        capacity: '16330404Ki',
                        allocated: '4069164Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.18',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-04-29T11:54:40Z',
            lastSeen: '2026-04-29T12:05:57.921Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-lahey-222-oplz',
        uid: '8bee7680-ea7c-4a53-988e-e8b50ac01935',
        creationTimestamp: '2026-04-29T12:10:11Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-05-26 08:34:36.407782173 +0000 UTC m=+176341.132865790',
        hash: '9952087640310579366',
        ownerref: {
          scope: 'cluster',
          subject: 't-lahey-222-oplz',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-lahey-222-oplz',
            clusterName: 't-lahey-222',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-container-tze4',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-lahey-222-oplz-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '720851142n',
                  },
                  memory: {
                    capacity: '16330388Ki',
                    allocated: '4613980Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-lahey-222-oplz-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '413046696n',
                      },
                      memory: {
                        capacity: '16330384Ki',
                        allocated: '7048188Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-lahey-222-oplz-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '190175889n',
                      },
                      memory: {
                        capacity: '16330372Ki',
                        allocated: '2369872Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.18',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: '',
              Grafana: '',
            },
            createdAt: '2026-04-29T12:06:51Z',
            lastSeen: '2026-05-26T08:34:36.412Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-lb-001-6x4t',
        uid: '0a366cf4-5a64-42d3-9e0b-ee8cb56a5a6e',
        creationTimestamp: '2026-03-23T11:56:55Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:46.826828218 +0000 UTC m=+64920.341885174',
        hash: '11084322510032671840',
        ownerref: {
          scope: 'cluster',
          subject: 't-lb-001-6x4t',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-lb-001-6x4t',
            clusterName: 't-lb-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-lb-urm2',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-lb-001-6x4t-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '361016660n',
                  },
                  memory: {
                    capacity: '8086880Ki',
                    allocated: '4685336Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-lb-001-6x4t-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '1616951418n',
                      },
                      memory: {
                        capacity: '16329424Ki',
                        allocated: '8675724Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-lb-001-6x4t-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '312214363n',
                      },
                      memory: {
                        capacity: '16329432Ki',
                        allocated: '4824588Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.22',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-lb-001.vitistack-lb-urm2.sky.nhn.no',
              Grafana: 'https://grafana.t-lb-001.vitistack-lb-urm2.sky.nhn.no',
            },
            createdAt: '2026-03-23T11:53:25Z',
            lastSeen: '2026-06-10T10:32:46.832Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-lmgd-001-b4n1',
        uid: '95c44b32-5ad0-4351-aae0-95b1561ebe9c',
        creationTimestamp: '2026-03-23T11:04:55Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:10.276623676 +0000 UTC m=+104355.280804190',
        hash: '11400488747762623086',
        ownerref: {
          scope: 'cluster',
          subject: 't-lmgd-001-b4n1',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-lmgd-001-b4n1',
            clusterName: 't-lmgd-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-lmgd-kfr5',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-lmgd-001-b4n1-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '388972274n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4115488Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-lmgd-001-b4n1-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '374184790n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4356232Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-lmgd-001-b4n1-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '646341334n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4685996Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-lmgd-001-b4n1-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '1138852415n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '7273544Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-lmgd-001-b4n1-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '376717270n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '4083080Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-lmgd-001.vitistack-lmgd-kfr5.sky.nhn.no',
              Grafana: 'https://grafana.t-lmgd-001.vitistack-lmgd-kfr5.sky.nhn.no',
            },
            createdAt: '2026-03-23T11:00:40Z',
            lastSeen: '2026-06-10T10:32:10.288Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-martin-sp-qrr8',
        uid: 'ea090946-6d09-40ea-aca5-1417967b0c3a',
        creationTimestamp: '2026-06-08T11:56:50Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:55.425814808 +0000 UTC m=+120.184316638',
        hash: '10495932514009663274',
        ownerref: {
          scope: 'cluster',
          subject: 't-martin-sp-qrr8',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-martin-sp-qrr8',
            clusterName: 't-martin-sp',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-sops-gef8',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-martin-sp-qrr8-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '598009061n',
                  },
                  memory: {
                    capacity: '16331384Ki',
                    allocated: '3915620Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-martin-sp-qrr8-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '612852697n',
                      },
                      memory: {
                        capacity: '16331388Ki',
                        allocated: '4750580Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-martin-sp-qrr8-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '430409984n',
                      },
                      memory: {
                        capacity: '16331376Ki',
                        allocated: '4353936Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-martin-sp.vitistack-sops-gef8.sky.nhn.no',
              Grafana: 'https://grafana.t-martin-sp.vitistack-sops-gef8.sky.nhn.no',
            },
            createdAt: '2026-06-08T11:48:40Z',
            lastSeen: '2026-06-10T10:31:55.434Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-melde-001-ytb2',
        uid: '743bf2b1-0151-4862-903b-8328655dbd05',
        creationTimestamp: '2026-04-30T06:44:14Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:05.766624471 +0000 UTC m=+64866.087938781',
        hash: '13853448298504097984',
        ownerref: {
          scope: 'cluster',
          subject: 't-melde-001-ytb2',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-melde-001-ytb2',
            clusterName: 't-melde-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-innrapp-b3lf',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-melde-001-ytb2-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '434149189n',
                  },
                  memory: {
                    capacity: '16332388Ki',
                    allocated: '5938540Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-melde-001-ytb2-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '1346388082n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '4061072Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-melde-001-ytb2-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '536754440n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '6452744Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-melde-001-ytb2-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '416169477n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '7187Mi',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-melde-001.vitistack-innrapp-b3lf.sky.nhn.no',
              Grafana: 'https://grafana.t-melde-001.vitistack-innrapp-b3lf.sky.nhn.no',
            },
            createdAt: '2026-04-30T06:40:41Z',
            lastSeen: '2026-06-10T10:32:05.77Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-mon-001-jcgk',
        uid: 'db4544e0-63d5-4b76-b07d-1cd5a2594482',
        creationTimestamp: '2026-03-17T10:45:16Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:56.278218889 +0000 UTC m=+64800.898470990',
        hash: '14201411782972033202',
        ownerref: {
          scope: 'cluster',
          subject: 't-mon-001-jcgk',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-mon-001-jcgk',
            clusterName: 't-mon-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-mon-j9nn',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-mon-001-jcgk-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '366665968n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '3817596Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-mon-001-jcgk-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '605877951n',
                  },
                  memory: {
                    capacity: '8088900Ki',
                    allocated: '4765584Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-mon-001-jcgk-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '302126337n',
                  },
                  memory: {
                    capacity: '8088896Ki',
                    allocated: '4058460Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-mon-001-jcgk-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '1741823196n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '6516744Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-mon-001-jcgk-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '1274998808n',
                      },
                      memory: {
                        capacity: '16331448Ki',
                        allocated: '7028396Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-mon-001-jcgk-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '294082639n',
                      },
                      memory: {
                        capacity: '16331444Ki',
                        allocated: '2708448Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.18',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-mon-001.vitistack-mon-j9nn.sky.nhn.no',
              Grafana: 'https://grafana.t-mon-001.vitistack-mon-j9nn.sky.nhn.no',
            },
            createdAt: '2026-03-17T10:34:37Z',
            lastSeen: '2026-06-10T10:31:56.286Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-nn-002-2okt',
        uid: '1fedbbef-0f95-4140-a70e-6057b7710fbe',
        creationTimestamp: '2026-03-16T16:07:22Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:16.612638899 +0000 UTC m=+21721.646036744',
        hash: '3691807663489790336',
        ownerref: {
          scope: 'cluster',
          subject: 't-nn-002-2okt',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-nn-002-2okt',
            clusterName: 't-nn-002',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-nn-6omn',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-nn-002-2okt-ctp0',
                  cpu: {
                    capacity: '2',
                    allocated: '439777700n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '4527352Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-nn-002-2okt-ctp1',
                  cpu: {
                    capacity: '2',
                    allocated: '533979810n',
                  },
                  memory: {
                    capacity: '8088892Ki',
                    allocated: '4806580Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
                {
                  name: 't-nn-002-2okt-ctp2',
                  cpu: {
                    capacity: '2',
                    allocated: '343949162n',
                  },
                  memory: {
                    capacity: '8088904Ki',
                    allocated: '3599996Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-nn-002-2okt-wrk3',
                      cpu: {
                        capacity: '4',
                        allocated: '688061406n',
                      },
                      memory: {
                        capacity: '16331452Ki',
                        allocated: '5415932Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-nn-002-2okt-wrk4',
                      cpu: {
                        capacity: '4',
                        allocated: '427855197n',
                      },
                      memory: {
                        capacity: '16331436Ki',
                        allocated: '5226308Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-nn-002-2okt-wrk5',
                      cpu: {
                        capacity: '4',
                        allocated: '339255657n',
                      },
                      memory: {
                        capacity: '16331432Ki',
                        allocated: '3226856Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-nn-002.vitistack-nn-6omn.sky.nhn.no',
              Grafana: 'https://grafana.t-nn-002.vitistack-nn-6omn.sky.nhn.no',
            },
            createdAt: '2026-03-11T08:10:30Z',
            lastSeen: '2026-06-10T10:32:16.617Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-osl-xcais-nnn-tnah',
        uid: '77e27b44-6264-4805-8ff4-9ebb3416b8dc',
        creationTimestamp: '2026-05-04T18:51:36Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:51.32847469 +0000 UTC m=+64860.646318718',
        hash: '9145206672793951131',
        ownerref: {
          scope: 'cluster',
          subject: 't-osl-xcais-nnn-tnah',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-osl-xcais-nnn-tnah',
            clusterName: 't-osl-xcais-nnn',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-dokdel-p7et',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-osl-xcais-nnn-tnah-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '401635525n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5356092Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-osl-xcais-nnn-tnah-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '254648194n',
                      },
                      memory: {
                        capacity: '16332372Ki',
                        allocated: '4019276Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-osl-xcais-nnn-tnah-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '594046329n',
                      },
                      memory: {
                        capacity: '16332384Ki',
                        allocated: '7100944Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-osl-xcais-nnn.vitistack-dokdel-p7et.sky.nhn.no',
              Grafana: 'https://grafana.t-osl-xcais-nnn.vitistack-dokdel-p7et.sky.nhn.no',
            },
            createdAt: '2026-05-04T18:44:31Z',
            lastSeen: '2026-06-10T10:31:51.332Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-papla-we6f',
        uid: '74682e53-b63c-41d4-8977-2d824d675ef0',
        creationTimestamp: '2026-06-01T12:11:37Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:31:54.966113522 +0000 UTC m=+64862.572794723',
        hash: '3035582870783445809',
        ownerref: {
          scope: 'cluster',
          subject: 't-papla-we6f',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-papla-we6f',
            clusterName: 't-papla',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-papla-prxe',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-papla-we6f-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '685020972n',
                  },
                  memory: {
                    capacity: '16331440Ki',
                    allocated: '4706332Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.36.1',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-papla-we6f-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '467769938n',
                      },
                      memory: {
                        capacity: '16331440Ki',
                        allocated: '3815380Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                    {
                      name: 't-papla-we6f-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '674223292n',
                      },
                      memory: {
                        capacity: '16331436Ki',
                        allocated: '6536368Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.36.1',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-papla.vitistack-papla-prxe.sky.nhn.no',
              Grafana: 'https://grafana.t-papla.vitistack-papla-prxe.sky.nhn.no',
            },
            createdAt: '2026-06-01T12:06:35Z',
            lastSeen: '2026-06-10T10:31:54.976Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-pasientreiser-atom-001-vxlr',
        uid: '75af44dc-dcdc-48a0-9329-b72aed877635',
        creationTimestamp: '2026-04-29T12:42:09Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-06-10 10:32:50.288113294 +0000 UTC m=+187084.237900919',
        hash: '17771802424102827389',
        ownerref: {
          scope: 'cluster',
          subject: 't-pasientreiser-atom-001-vxlr',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-pasientreiser-atom-001-vxlr',
            clusterName: 't-pasientreiser-atom-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'central',
            country: 'no',
            workspaceId: 'vitistack-pastrans-hvlb',
            environment: 'test',
            datacenter: 'az1.central.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-pasientreiser-atom-001-vxlr-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '635273257n',
                  },
                  memory: {
                    capacity: '16332384Ki',
                    allocated: '5912036Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-pasientreiser-atom-001-vxlr-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '413635412n',
                      },
                      memory: {
                        capacity: '16332388Ki',
                        allocated: '7431532Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-pasientreiser-atom-001-vxlr-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '292972531n',
                      },
                      memory: {
                        capacity: '16332388Ki',
                        allocated: '4289896Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-pasientreiser-atom-001-vxlr-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '470495284n',
                      },
                      memory: {
                        capacity: '16332376Ki',
                        allocated: '4877240Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.24',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-pasientreiser-atom-001.vitistack-pastrans-hvlb.sky.nhn.no',
              Grafana: 'https://grafana.t-pasientreiser-atom-001.vitistack-pastrans-hvlb.sky.nhn.no',
            },
            createdAt: '2026-04-29T12:38:19Z',
            lastSeen: '2026-06-10T10:32:50.292Z',
          },
        },
      },
    },
    {
      kind: 'KubernetesCluster',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: 't-pasientreiser-atom-001-zu4o',
        uid: '6e9eef04-6e29-43d2-9639-be8fb514355a',
        creationTimestamp: '2026-04-29T09:39:28Z',
      },
      rormeta: {
        version: 'v2',
        lastReported: '2026-04-29 11:52:29.387028889 +0000 UTC m=+7981.252223315',
        hash: '11422776599224239719',
        ownerref: {
          scope: 'cluster',
          subject: 't-pasientreiser-atom-001-zu4o',
        },
        action: 'Update',
      },
      kubernetescluster: {
        spec: {
          slackChannels: null,
        },
        status: {
          agentstatus: {
            clusterId: 't-pasientreiser-atom-001-zu4o',
            clusterName: 't-pasientreiser-atom-001',
            kubernetesProvider: 'talos',
            az: 'az1',
            region: 'west',
            country: 'no',
            workspaceId: 'vitistack-pastrans-k468',
            environment: 'test',
            datacenter: 'az1.west.no',
            nodes: {
              controlPlane: [
                {
                  name: 't-pasientreiser-atom-001-zu4o-ctp0',
                  cpu: {
                    capacity: '4',
                    allocated: '328581293n',
                  },
                  memory: {
                    capacity: '16330400Ki',
                    allocated: '4190496Ki',
                  },
                  architecture: 'amd64',
                  kubernetesVersion: 'v1.35.0',
                },
              ],
              nodepools: [
                {
                  name: 'default',
                  nodes: [
                    {
                      name: 't-pasientreiser-atom-001-zu4o-wrk0',
                      cpu: {
                        capacity: '4',
                        allocated: '261845443n',
                      },
                      memory: {
                        capacity: '16330408Ki',
                        allocated: '1945472Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-pasientreiser-atom-001-zu4o-wrk1',
                      cpu: {
                        capacity: '4',
                        allocated: '261617617n',
                      },
                      memory: {
                        capacity: '16330404Ki',
                        allocated: '2574192Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                    {
                      name: 't-pasientreiser-atom-001-zu4o-wrk2',
                      cpu: {
                        capacity: '4',
                        allocated: '292876586n',
                      },
                      memory: {
                        capacity: '16330404Ki',
                        allocated: '3467380Ki',
                      },
                      architecture: 'amd64',
                      kubernetesVersion: 'v1.35.0',
                    },
                  ],
                },
              ],
            },
            versions: {
              NhnTooling: '1.9.18',
              RorAgent: 'v2.2.1',
            },
            urls: {
              Argocd: 'https://argo.t-pasientreiser-atom-001.vitistack-pastrans-k468.sky.nhn.no',
              Grafana: 'https://grafana.t-pasientreiser-atom-001.vitistack-pastrans-k468.sky.nhn.no',
            },
            createdAt: '2026-04-29T08:57:48Z',
            lastSeen: '2026-04-29T11:52:29.391Z',
          },
        },
      },
    },
  ],
}
