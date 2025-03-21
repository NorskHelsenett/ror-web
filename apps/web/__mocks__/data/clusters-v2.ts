const v2ResourcesClusters = [
  {
    kind: 'KubernetesCluster',
    apiVersion: 'general.ror.internal/v1alpha1',
    metadata: {
      name: 'sdi-ror-dev',
      creationTimestamp: '2022-03-17T14:06:47Z',
    },
    rormeta: {
      version: 'v2',
      ownerref: {
        scope: 'workspace',
        subject: 'trd1-nhn-mgmt',
      },
      tags: [
        {
          key: 'consumer',
          value: 'ror',
        },
        {
          key: 'environment',
          value: 'dev',
        },
        {
          key: 'criticality',
          value: '4',
        },
        {
          key: 'senstivity',
          value: '2',
        },
        {
          key: 'servicetag',
          value: '434423',
        },
      ],
    },
    kubernetescluster: {
      spec: {
        data: {
          clusterId: 'sdi-ror-dev-953z',
          provider: 'tanzu',
          datacenter: 'trd1',
          region: 'trd',
          zone: 'trd1cl01',
          project: 'test',
          workspace: 'trd1-nhn-mgmt',
          workorder: 'Intern',
          environment: 'dev',
        },
        topology: {
          version: 'v1.28.7',
          controlplane: {
            replicas: 3,
            provider: 'tanzu',
            machineClass: 'best-effort-large',
            metadata: {
              labels: null,
              annotations: null,
            },
            storage: null,
          },
          workers: {
            nodePools: [
              {
                name: 'default',
                replicas: 4,
                provider: 'tanzu',
                machineClass: 'best-effort-cpu-2xlarge',
                metadata: {
                  labels: null,
                  annotations: null,
                },
                storage: null,
              },
            ],
          },
        },
      },
      status: {
        status: {
          cluster: {
            externalId: '0000-0000-0000-0000',
            resources: [
              {
                name: 'cpu',
                allocated: '8',
                usage: '8%',
              },
              {
                name: 'memory',
                allocated: '64Gi',
                usage: '50%',
              },
            ],
            controlplane: {
              status: 'Running',
              message: '3/3 Controllplane is running',
            },
            workers: {
              nodepools: [
                {
                  name: 'default',
                  status: 'Running',
                  message: '4/4 Workers are running',
                },
              ],
            },
          },
          versions: [
            {
              component: 'kubernetes',
              version: 'v1.28.7',
            },
            {
              component: 'nhntooling',
              version: 'v1.16.3',
              branch: 'main',
            },
          ],
          'egress-ip': '10.204.2.10',
          controlplaneendpoint: '10.204.0.50:6443',
          lastUpdated: '0001-01-01T00:00:00Z',
          lastUpdatedBy: 'agentv2',
          created: '2022-03-17T14:06:47Z',
        },
        phase: 'Running',
        conditions: null,
      },
    },
  },
]

export default v2ResourcesClusters
