export const clusterListView = {
  type: 'clusterlist',
  columns: [
    {
      name: 'clusterUid',
      description: 'The unique identifier of the cluster',
      order: 0,
      default: true,
      type: 'string',
    },
    {
      name: 'clusterId',
      description: 'The identifier of the cluster',
      order: 1,
      default: true,
      type: 'string',
    },
    {
      name: 'clusterName',
      description: 'The name of the cluster',
      order: 2,
      default: true,
      type: 'string',
    },
    {
      name: 'provider',
      description: 'The provider of the cluster',
      order: 3,
      default: true,
      type: 'string',
    },
    {
      name: 'availabilityZone',
      description: 'The az of the cluster',
      order: 4,
      default: true,
      type: 'string',
    },
    {
      name: 'country',
      description: 'The country where the cluster is located',
      order: 4,
      default: true,
      type: 'string',
    },
    {
      name: 'region',
      description: 'The region where the cluster is located',
      order: 5,
      default: true,
      type: 'string',
    },
    {
      name: 'workspace',
      description: 'Workspace of the cluster',
      order: 7,
      default: true,
      type: 'string',
    },
    {
      name: 'environment',
      description: 'The environment of the cluster',
      order: 8,
      default: true,
      type: 'string',
    },
    {
      name: 'resoures',
      description: 'The resources of the cluster',
      order: 9,
      default: true,
      type: 'object',
    },
    {
      name: 'nodes',
      description: 'The number of nodes in the cluster',
      order: 10,
      default: true,
      type: 'number',
    },
    {
      name: 'nodePools',
      description: 'The number of nodepools in the cluster',
      order: 11,
      default: true,
      type: 'number',
    },
    {
      name: 'priceMonth',
      description: 'The price of the cluster per month',
      order: 12,
      default: true,
      type: 'number',
    },
    {
      name: 'priceYear',
      description: 'The price of the cluster per year',
      order: 13,
      default: true,
      type: 'number',
    },
    {
      name: 'ArgocdURL',
      description: 'The URL to the ArgoCD instance for the cluster',
      order: 14,
      default: true,
      type: 'string',
    },
    {
      name: 'grafanaURL',
      description: 'The URL to the Grafana instance for the cluster',
      order: 15,
      default: true,
      type: 'string',
    },
    {
      name: 'rorAgentVersion',
      description: 'The version of the ROR agent running on the cluster',
      order: 16,
      default: true,
      type: 'string',
    },
    {
      name: 'kubernetesVersion',
      description: 'The version of Kubernetes running on the cluster',
      order: 17,
      default: true,
      type: 'string',
    },
    {
      name: 'nhnToolVersion',
      description: 'The version of the NHN tooling in the cluster',
      order: 18,
      default: true,
      type: 'string',
    },
    {
      name: 'serviceID',
      description: 'The service ID of the cluster',
      order: 19,
      default: true,
      type: 'string',
    },
    {
      name: 'tags',
      description: 'The tags of the cluster',
      order: 20,
      default: true,
      type: 'object',
    },
    {
      name: 'status',
      description: 'The status of the cluster',
      order: 21,
      default: true,
      type: 'string',
    },
    {
      name: 'created',
      description: 'The date the cluster was created',
      order: 22,
      default: true,
      type: 'datetime',
    },
    {
      name: 'lastSeen',
      description: 'The last time the cluster was seen',
      order: 23,
      default: true,
      type: 'datetime',
    },
  ],
  rows: [
    {
      availabilityZone: {
        fieldValue: 'bgo',
      },
      clusterId: {
        fieldValue: '68dfa1cab4c8fa1490291fb5',
      },
      clusterName: {
        fieldValue: 'bgo-mgmt-001',
      },
      clusterUid: {
        fieldValue: '2607fdb0-da0a-4a97-9fb9-73127224533f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'mgmt',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:37:31.81Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'bgo-mgmt',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'bgo',
      },
      clusterId: {
        fieldValue: '8875ca15-abed-46f3-8c0f-8a73a2423baa',
      },
      clusterName: {
        fieldValue: 't-per-et-401',
      },
      clusterUid: {
        fieldValue: '21fca0d4-051b-46cf-8b16-e77ce974ffb1',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:59.591Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 't-per',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-amk-003-gsax',
      },
      clusterName: {
        fieldValue: 'd-amk-003',
      },
      clusterUid: {
        fieldValue: '8a1356b1-183f-459e-9b19-c8cbc0e662fa',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:37:17.29Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-amk-3sad',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-andre-123-1337',
      },
      clusterName: {
        fieldValue: 'd-andre-123',
      },
      clusterUid: {
        fieldValue: 'a8eb1be4-9d67-4d1c-a2d2-2e614735f229',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:49.284Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-andreh',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-bgo-hndevops-001-19ih',
      },
      clusterName: {
        fieldValue: 'd-bgo-hndevops-001',
      },
      clusterUid: {
        fieldValue: '523176ab-696f-4d42-aa4b-4071e28d014a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:38:15.927Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-hn-uzmx',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-pts-000-fg21',
      },
      clusterName: {
        fieldValue: 'd-pts-000',
      },
      clusterUid: {
        fieldValue: '96109cd8-f508-49da-87b7-66449dc2f70d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:44.974Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-pts',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-sb-067-kscm',
      },
      clusterName: {
        fieldValue: 'd-sb-067',
      },
      clusterUid: {
        fieldValue: '8e1529f6-4484-45d7-aae7-98c4d65a1329',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:28.115Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-sb-3sm5',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-taa-001-wyv8',
      },
      clusterName: {
        fieldValue: 'd-taa-001',
      },
      clusterUid: {
        fieldValue: 'ac836d72-775b-4540-a816-02e517186cc9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:13.372Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-taa-tafc',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-trd-atlas-001-xdf2',
      },
      clusterName: {
        fieldValue: 'd-trd-atlas-001',
      },
      clusterUid: {
        fieldValue: '5259d29f-9045-49a7-89c0-f8c05f01a59e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:40.362Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-atlas',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-trd-fts-da-001-vhj8',
      },
      clusterName: {
        fieldValue: 'd-trd-fts-da-001',
      },
      clusterUid: {
        fieldValue: '0b40ae5f-6064-4ff0-adf9-441ab7976d13',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:02.309Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-fts-6fsr',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-viti-bg-xcads-001-cukr',
      },
      clusterName: {
        fieldValue: 'd-viti-bg-xcads-001',
      },
      clusterUid: {
        fieldValue: 'bdcc9539-4bd4-4ce8-96a0-361d930af7ff',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:53.435Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-xcads-rr2d',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-viti-trd-xcads-001-dsf9',
      },
      clusterName: {
        fieldValue: 'd-viti-trd-xcads-001',
      },
      clusterUid: {
        fieldValue: '932fd4a8-8a25-4122-ab55-e61babaf5eeb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:38:11.112Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-xcads-sd8k',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'ktrd-amk-001-z2mx',
      },
      clusterName: {
        fieldValue: 'ktrd-amk-001',
      },
      clusterUid: {
        fieldValue: 'cdb0c4df-b1ae-4c1d-b038-a7c775ad5440',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:53.88Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-amk-3sad',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'p-bgo-obao-001-zzbp',
      },
      clusterName: {
        fieldValue: 'p-bgo-obao-001',
      },
      clusterUid: {
        fieldValue: '6c2552c1-c6b7-47d7-8db5-946640553b2b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:55.646Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-cry-prod-d801',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'p-sky-001-5dot',
      },
      clusterName: {
        fieldValue: 'p-psky-001',
      },
      clusterUid: {
        fieldValue: '10dc210e-cd07-4ff5-b8c9-c01e163d0554',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T13:53:28.755Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'central-az1',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'p-sql-001-25rh',
      },
      clusterName: {
        fieldValue: 'p-sql-001',
      },
      clusterUid: {
        fieldValue: 'e5c428b3-a9e4-47f8-84e7-833845b1f9dd',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:38:38.183Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'west-az1',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'p-trd-soc-004-44d4',
      },
      clusterName: {
        fieldValue: 'p-trd-soc-004',
      },
      clusterUid: {
        fieldValue: 'c2c728d6-35a4-46af-bb0e-c014208f82a2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:22.408Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-soc-pfey',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'q-trd-sfm-001-jkj5',
      },
      clusterName: {
        fieldValue: 'q-trd-sfm-001',
      },
      clusterUid: {
        fieldValue: 'e2ed81ab-3af8-4ea8-a784-02923c9f6fa9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:51.193Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-sfm',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-bgo-obao-001-c8r8',
      },
      clusterName: {
        fieldValue: 't-bgo-obao-001',
      },
      clusterUid: {
        fieldValue: 'a3210ac6-3e51-493a-8c48-933b5c3b5b6d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:00.829Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-cry-sozh',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-bgo-slackbot-001-96mt',
      },
      clusterName: {
        fieldValue: 't-bgo-slackbot-001',
      },
      clusterUid: {
        fieldValue: 'a9949af8-2567-44a9-bb0b-043b83849141',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:37:20.97Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-container-tze4',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-diem-8181-pn6u',
      },
      clusterName: {
        fieldValue: 't-diem-8181',
      },
      clusterUid: {
        fieldValue: 'a2de788a-e48e-4a1e-a941-97aecb877029',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:40.416Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-container-tze4',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-lb-001-b3d6',
      },
      clusterName: {
        fieldValue: 't-lb-001',
      },
      clusterUid: {
        fieldValue: 'ca5f9604-e028-42ad-8cf0-41fb58f14890',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'unknown-environment',
      },
      lastSeen: {
        fieldValue: '2026-03-18T10:26:27.786Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.8',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 't-dcn-68gh',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-martinen-001-ga53',
      },
      clusterName: {
        fieldValue: 't-martinen-001',
      },
      clusterUid: {
        fieldValue: '4375c318-a2f8-47dc-aedd-66742c9db607',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'unknown-environment',
      },
      lastSeen: {
        fieldValue: '2026-03-16T16:09:27.796Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.8',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 't-martinen-001',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-mon-001-jcgk',
      },
      clusterName: {
        fieldValue: 't-mon-001',
      },
      clusterUid: {
        fieldValue: 'db4544e0-63d5-4b76-b07d-1cd5a2594482',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:47.687Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-mon-j9nn',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-nn-002-2okt',
      },
      clusterName: {
        fieldValue: 't-nn-002',
      },
      clusterUid: {
        fieldValue: '1fedbbef-0f95-4140-a70e-6057b7710fbe',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:14.19Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-nn-6omn',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-per-et-402-4y8e',
      },
      clusterName: {
        fieldValue: 't-per-et-402',
      },
      clusterUid: {
        fieldValue: '83888273-b8a9-474c-af84-d69644b49484',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:42.526Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-per-wlt4',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-rf-002-f9xo',
      },
      clusterName: {
        fieldValue: 't-rf-002',
      },
      clusterUid: {
        fieldValue: 'cd3a88fc-d984-4b48-ac6a-3d04e40dcfe5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:05.507Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-reseptformidleren-9vq8',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-soc-888-a4w4',
      },
      clusterName: {
        fieldValue: 't-soc-888',
      },
      clusterUid: {
        fieldValue: 'd874fcc5-e955-4308-bc6e-fa354f902ad2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:16.63Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-soc-q4sy',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-tek-001-g2ny',
      },
      clusterName: {
        fieldValue: 't-tek-001',
      },
      clusterUid: {
        fieldValue: '2273ed28-fc3c-47b9-b221-92c5d32c9eb1',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:32.801Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-cat-nkrn',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-test-001-4y8e',
      },
      clusterName: {
        fieldValue: 't-test-001-4y8e',
      },
      clusterUid: {
        fieldValue: 'c3e47c44-141f-43fb-9832-22f221f8975b',
      },
      country: {
        fieldValue: 'test',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'unknown-environment',
      },
      lastSeen: {
        fieldValue: '2026-03-20T11:42:24.973Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'south',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.8',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 't-test001',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: 'ed845310-3c46-45ad-8679-7929b71d46ab',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '791dc083-c224-4a3f-ac3d-c024096eb464',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: 'ab67a253-b087-43e1-83dc-2b3c518994ee',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '5a076ca0-5f1f-46c8-924f-13ab2c7aa973',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '802255ea-0adf-4106-9648-850b4ec23119',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '48224c7e-acc5-4ec2-9c10-9ff2a6f13850',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '2e748152-48a4-4636-b7d3-d4d501760ce0',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: 'cf927efc-5085-42df-8b3c-97a795dc30a5',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '3fdf0a7c-7cff-49c0-a3df-322d66773ad1',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: 'b47e2070-6ba5-4697-9712-77689390e00c',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '696bae26-81d5-4ade-8e35-05c6b610fb1f',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-test-sod-011-agt3',
      },
      clusterName: {
        fieldValue: 't-test-sod-011',
      },
      clusterUid: {
        fieldValue: '934222c4-c363-4a98-a6e1-0db447954bdd',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:46.713Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 't-test-sod-011',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-testersen-001-h60p',
      },
      clusterName: {
        fieldValue: 't-testersen-001',
      },
      clusterUid: {
        fieldValue: '3332e4dd-997d-468a-917a-beac5392cca4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-17T14:12:54.183Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.8',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-test-nyhk',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-trd-geirr-999-opvc',
      },
      clusterName: {
        fieldValue: 't-trd-geirr-999',
      },
      clusterUid: {
        fieldValue: '825ec826-befc-48d1-86f6-2d6d0d8fbf75',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:29.425Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-container-asft',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-trd-obao-001-z236',
      },
      clusterName: {
        fieldValue: 't-trd-obao-001',
      },
      clusterUid: {
        fieldValue: '39e7d3f9-db30-4544-bf7b-cd2ed75c3f8a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:55.566Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-obao',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-trident-001-3e65',
      },
      clusterName: {
        fieldValue: 't-trident-001',
      },
      clusterUid: {
        fieldValue: '350edf3e-105f-4c15-abd7-babe4bfb87e2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:37.343Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-container-tze4',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-trident-002-abck',
      },
      clusterName: {
        fieldValue: 't-trident-002',
      },
      clusterUid: {
        fieldValue: 'd17d4da6-29d9-4b45-8301-0e14caf27f7a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:04.533Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-container-asft',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-vk-viti-001-x6dc',
      },
      clusterName: {
        fieldValue: 't-vk-viti-001',
      },
      clusterUid: {
        fieldValue: '1ae616c3-15bf-4f74-907e-79cc171ff8e6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:38:20.835Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-video-uz3e',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'test-al-x4oy',
      },
      clusterName: {
        fieldValue: 'test-al',
      },
      clusterUid: {
        fieldValue: 'e1a7d2e3-fd14-4b7e-9b7b-f5e5aa3cd630',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:38:13.546Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'vitistack-abjerke-pp3f',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '67bf9554-03be-4dda-8057-ab8c84109cbc',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: 'd70457d6-7655-40bc-bbb1-e5805a39ab3b',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: '',
      },
      clusterId: {
        fieldValue: '',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '1593c86a-f1d5-4fff-aa0d-e8263d805517',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: '',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      rorAgentVersion: {
        fieldValue: '',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-mot-001-tkvb',
      },
      clusterName: {
        fieldValue: 'p-mot-001',
      },
      clusterUid: {
        fieldValue: 'e626e52d-7d14-4ccd-91ec-15592af20ad4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:48.046Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-mot',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'trd1-kj-qa001-2wb3',
      },
      clusterName: {
        fieldValue: 'trd1-kj-qa001',
      },
      clusterUid: {
        fieldValue: '3b7f9219-dede-4f8c-8c8c-b1cc3a0c39dd',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:43.324Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-kj-qa',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ldp-001-nfgq',
      },
      clusterName: {
        fieldValue: 'p-ldp-001',
      },
      clusterUid: {
        fieldValue: 'd89a2585-867d-4975-9563-c70d47ae3fb2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:04.382Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-ldp-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-hn-001-y6ks',
      },
      clusterName: {
        fieldValue: 'p-hn-001',
      },
      clusterUid: {
        fieldValue: '6610230c-d118-4a19-a9d5-7757bc57d545',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:00.978Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-sfm-thla-001-ku2l',
      },
      clusterName: {
        fieldValue: 'd-sfm-thla-001',
      },
      clusterUid: {
        fieldValue: '39977707-c414-4432-a753-be65a9d7b44f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:54.38Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-hn-001-9g3v',
      },
      clusterName: {
        fieldValue: 't-hn-001',
      },
      clusterUid: {
        fieldValue: '2e3cc745-d6a7-42ab-9c2b-8940ccc58280',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:27.634Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-test',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-smax-001-d5e1',
      },
      clusterName: {
        fieldValue: 'q-smax-001',
      },
      clusterUid: {
        fieldValue: '1d89e632-3ca0-487f-ab08-edd4f61295bf',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:39.283Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-smax',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'avi-test-04-qz6m',
      },
      clusterName: {
        fieldValue: 'avi-test-04',
      },
      clusterUid: {
        fieldValue: '71449333-17ce-4581-984a-159771bbaa49',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:27.925Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-edi-001-9rqk',
      },
      clusterName: {
        fieldValue: 'q-edi-001',
      },
      clusterUid: {
        fieldValue: 'a9db5e86-2ed3-4f48-88eb-8cf9dc852e37',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:37:58.688Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-edi',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ndl4-mon-001-dobj',
      },
      clusterName: {
        fieldValue: 'p-ndl4-mon-001',
      },
      clusterUid: {
        fieldValue: '900b8a52-b220-4a3f-8205-8a10fda180ca',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:20.685Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-mfp-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-il-001-ygcz',
      },
      clusterName: {
        fieldValue: 't-il-001',
      },
      clusterUid: {
        fieldValue: '9a7b1f10-d1e6-4a38-978d-92e86d13a5cb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:00.751Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-il',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-sfm-basis-001-clsr',
      },
      clusterName: {
        fieldValue: 'q-sfm-basis-001',
      },
      clusterUid: {
        fieldValue: '2647684b-b3d8-417c-b491-87dc0e2c03a0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:16.574Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-plm-001-5drr',
      },
      clusterName: {
        fieldValue: 'p-plm-001',
      },
      clusterUid: {
        fieldValue: '04e19207-6f60-45ac-8ae7-26048bbe3386',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:49.901Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-plm-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-mitt-nettverk-001-l40n',
      },
      clusterName: {
        fieldValue: 'p-mitt-nettverk-001',
      },
      clusterUid: {
        fieldValue: '770c8265-fa0c-45a3-bf9a-55ee5d93b193',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:58.96Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-mitt-nettverk-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-taa-000-z3r5',
      },
      clusterName: {
        fieldValue: 't-taa-000',
      },
      clusterUid: {
        fieldValue: 'c5988265-e28b-42ad-ab11-e1853a6a00d2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:56.595Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-taa',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-amk-003-rzc6',
      },
      clusterName: {
        fieldValue: 't-amk-003',
      },
      clusterUid: {
        fieldValue: 'cbc5f81e-eb2d-482d-9c12-cb0015398f16',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:37:35.795Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-mtj-001-hta6',
      },
      clusterName: {
        fieldValue: 'q-mtj-001',
      },
      clusterUid: {
        fieldValue: '267120cf-bb3d-4f17-9b97-24793cdf9cb3',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:38:01.725Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-mtj',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-amk-001-09ca',
      },
      clusterName: {
        fieldValue: 'q-amk-001',
      },
      clusterUid: {
        fieldValue: 'e3451fec-daca-4c9c-a924-e6f2064c76f7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:32:38.91Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-ncpehp-000-zf19',
      },
      clusterName: {
        fieldValue: 't-ncpehp-000',
      },
      clusterUid: {
        fieldValue: '92023e44-9289-4b18-bd55-7e363eee2ae9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:35.481Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-ncpehp',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-taa-000-36do',
      },
      clusterName: {
        fieldValue: 'q-taa-000',
      },
      clusterUid: {
        fieldValue: '88604fa5-4d92-4161-9d44-ad3599b8d2bf',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:21.037Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-taa',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-dd-000-643l',
      },
      clusterName: {
        fieldValue: 'q-dd-000',
      },
      clusterUid: {
        fieldValue: '2a727f74-08ef-4823-b0c9-866d3fbb5c90',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:04.127Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-dd',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-tek-002-yoxk',
      },
      clusterName: {
        fieldValue: 't-tek-002',
      },
      clusterUid: {
        fieldValue: '6cfce715-a9dc-446f-9184-c8a52f931ef2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:11.707Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-teknisktest',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-taa-000-jdti',
      },
      clusterName: {
        fieldValue: 'd-taa-000',
      },
      clusterUid: {
        fieldValue: '121aff37-1939-4ff3-aa31-f867d953f165',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:35.46Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-taa',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-soc-002-p6d9',
      },
      clusterName: {
        fieldValue: 'p-soc-002',
      },
      clusterUid: {
        fieldValue: '631d6f36-1999-4106-84b9-a47bd696e9ee',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:37:49.032Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-soc-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'osl-kj-qa001-9z88',
      },
      clusterName: {
        fieldValue: 'osl-kj-qa001',
      },
      clusterUid: {
        fieldValue: 'd232519b-988c-4ed1-b6e0-a5a89676359e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:55.715Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-kj-qa',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-gis-002-3xu7',
      },
      clusterName: {
        fieldValue: 'p-gis-002',
      },
      clusterUid: {
        fieldValue: '92ff005f-f177-4653-af2c-799f187e2305',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:54.497Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-amk-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-pers-201-166j',
      },
      clusterName: {
        fieldValue: 'p-pers-201',
      },
      clusterUid: {
        fieldValue: '563a8835-d77e-4314-9843-5e0cb7f95dc5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:39.999Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-pers-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'TalosAZ',
      },
      clusterId: {
        fieldValue: 'p-dcn-001-j6i3',
      },
      clusterName: {
        fieldValue: 'p-dcn-001',
      },
      clusterUid: {
        fieldValue: '1fe1a0e8-9280-48f2-8585-7e72385987c7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:59.945Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'trd1',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'p-dcn',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-komsat-001-t264',
      },
      clusterName: {
        fieldValue: 't-komsat-001',
      },
      clusterUid: {
        fieldValue: '83b7582a-2425-49ac-a029-59e5a957a983',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:37.802Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-komsat',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-osl-xcais-001-hnvr',
      },
      clusterName: {
        fieldValue: 'd-osl-xcais-001',
      },
      clusterUid: {
        fieldValue: '713b8023-8737-4b5d-8676-39411dcee08e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:47.564Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-xcais',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'dsdi-melding-73qo',
      },
      clusterName: {
        fieldValue: 'dsdi-melding',
      },
      clusterUid: {
        fieldValue: '6c34ee10-bb14-465b-a295-e636ee5cc61d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:32:40.221Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-team-melding',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-pers-001-468a',
      },
      clusterName: {
        fieldValue: 'p-pers-001',
      },
      clusterUid: {
        fieldValue: '846eab81-1c6a-45df-8541-8da4685f739f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:27.803Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-pers-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-anne-001-fyy9',
      },
      clusterName: {
        fieldValue: 'd-anne-001',
      },
      clusterUid: {
        fieldValue: '69ce1419-0723-41d4-a55f-c6bd914d70cf',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:34.752Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-hn-vlt001-0bbm',
      },
      clusterName: {
        fieldValue: 't-hn-vlt001',
      },
      clusterUid: {
        fieldValue: '8f9aa484-6796-46dc-9520-f48c957ec778',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:59.42Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-test',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-amk-002-f1cv',
      },
      clusterName: {
        fieldValue: 'q-amk-002',
      },
      clusterUid: {
        fieldValue: '1c799d24-303e-4229-b233-c66e1fcbbf93',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:37.969Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-amk',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-sfm-fest-001-sqn7',
      },
      clusterName: {
        fieldValue: 'q-sfm-fest-001',
      },
      clusterUid: {
        fieldValue: 'b196d579-a251-4c2c-9df7-98ecf8ae9d8e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:37:09.692Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-osl-asky-001-nq6j',
      },
      clusterName: {
        fieldValue: 't-osl-asky-001',
      },
      clusterUid: {
        fieldValue: 'a8476885-560c-4065-8799-9ebc6f31d062',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:22.407Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-asky',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-ror-001-j8de',
      },
      clusterName: {
        fieldValue: 't-ror-001',
      },
      clusterUid: {
        fieldValue: '6c5c919a-cce1-4edc-8400-cc56deedf364',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:43.203Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-nhn-mgmt',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-mrs-001-fgyt',
      },
      clusterName: {
        fieldValue: 't-mrs-001',
      },
      clusterUid: {
        fieldValue: '942d7e07-3fde-4fde-a66a-6f9b6f4d5381',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:23.028Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-mrs-test',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-amk-003-iw2l',
      },
      clusterName: {
        fieldValue: 'q-amk-003',
      },
      clusterUid: {
        fieldValue: '6daf667d-ea26-4cf6-8107-91df708a6c02',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'qa',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:26.751Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-dns-001-uvih',
      },
      clusterName: {
        fieldValue: 'p-dns-001',
      },
      clusterUid: {
        fieldValue: '7bf0fa09-f65b-4535-8ae8-08a5ce0835b1',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:38:45.098Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-ldp-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-nn-001-1tm9',
      },
      clusterName: {
        fieldValue: 'p-nn-001',
      },
      clusterUid: {
        fieldValue: '24ee2bec-a801-4fb7-bb57-ca20f03f0531',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:36:14.562Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-nn-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-komlink-001-e3w6',
      },
      clusterName: {
        fieldValue: 'p-komlink-001',
      },
      clusterUid: {
        fieldValue: 'd0d1c4d7-4fd6-40c4-8854-91e86c201081',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:48.12Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1cl02-komlink-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'trd1-kj-prod001-3ht2',
      },
      clusterName: {
        fieldValue: 'trd1-kj-prod001',
      },
      clusterUid: {
        fieldValue: 'ff19402a-647b-4239-aa35-22dfd78ddc5c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:33:58.459Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'trd1-kj-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-virk-201-ggy7',
      },
      clusterName: {
        fieldValue: 'p-virk-201',
      },
      clusterUid: {
        fieldValue: 'cb2b026b-abfa-4232-bb58-b0e4983a18a4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:07.085Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-virk-prod',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-pts-001-5fxn',
      },
      clusterName: {
        fieldValue: 't-pts-001',
      },
      clusterUid: {
        fieldValue: 'd8689665-3024-424f-aab0-87eeaafb2d66',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'dev',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:30.412Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-team-pts',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-nn-001-o162',
      },
      clusterName: {
        fieldValue: 't-nn-001',
      },
      clusterUid: {
        fieldValue: '00b372ab-e8e0-45d0-a442-366ce1dca2b2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'test',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:35:58.043Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-nn',
      },
    },
    {
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-osl-xcads-001-j5c5',
      },
      clusterName: {
        fieldValue: 'p-osl-xcads-001',
      },
      clusterUid: {
        fieldValue: '6e8d8c8e-e655-4a3a-97bf-0450b50942d4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      environment: {
        fieldValue: 'prod',
      },
      lastSeen: {
        fieldValue: '2026-03-20T12:34:04.757Z',
      },
      nodes: {
        fieldValue: 799,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      rorAgentVersion: {
        fieldValue: 'v2.1.9',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: 'osl1-xcads-prod',
      },
    },
  ],
}
