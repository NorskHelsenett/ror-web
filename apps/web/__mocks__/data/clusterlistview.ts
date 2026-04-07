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
      name: 'datacenter',
      description: 'The datacenter of the cluster',
      order: 4,
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
      name: 'resourcesCpu',
      description: 'The number of CPU cores in the cluster',
      order: 9,
      default: true,
      type: 'number',
    },
    {
      name: 'resourcesMemory',
      description: 'The amount of memory in the cluster, human readable eg. 7Gi',
      order: 9,
      default: true,
      type: 'string',
    },
    {
      name: 'resourcesCpuUsedMilli',
      description: 'The number of CPU cores in the cluster used in milli cores',
      order: 9,
      default: true,
      type: 'number',
    },
    {
      name: 'resourcesMemoryUsed',
      description: 'The amount of memory in the cluster that is used, human readable eg. 7Gi',
      order: 9,
      default: true,
      type: 'string',
    },
    {
      name: 'resourcesCpuUsedPercent',
      description: 'The percentage of CPU in the cluster that is used',
      order: 9,
      default: true,
      type: 'number',
    },
    {
      name: 'resourcesMemoryUsedPercent',
      description: 'The percetage of memory in the cluster that are used',
      order: 9,
      default: true,
      type: 'string',
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
      name: 'argocdURL',
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
      argocdURL: {
        fieldValue: 'https://argo.bgo-mgmt-001.talos-bgo.sky.nhn.no',
      },
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
        fieldValue: '2025-10-13T19:13:58Z',
      },
      datacenter: {
        fieldValue: 'bgo.west.no',
      },
      environment: {
        fieldValue: 'mgmt',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.bgo-mgmt-001.talos-bgo.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:32.928Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.8.0',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 15078,
      },
      priceYear: {
        fieldValue: 180936,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '36',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5607,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '150',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 19.83,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'bgo-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-per-et-401.t-per.sky.nhn.no',
      },
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
        fieldValue: '2025-10-09T21:27:23Z',
      },
      datacenter: {
        fieldValue: 'bgo.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-per-et-401.t-per.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.34.1',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.595Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 8407,
      },
      priceYear: {
        fieldValue: 100884,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4534,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20.83,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '65',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.04,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 't-per',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-amk-003.vitistack-amk-3sad.sky.nhn.no',
      },
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
        fieldValue: '17e03119-1801-4f11-9307-8f905fe4ac46',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-02-27T08:52:18Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-amk-003.vitistack-amk-3sad.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.08Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5094,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 33.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '38',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.64,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-amk-3sad',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-andre-123.vitistack-andreh.sky.nhn.no',
      },
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
        fieldValue: '5e734255-e46c-4ec3-8c99-ea1c3ab70fda',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-02-28T16:31:20Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-andre-123.vitistack-andreh.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.2',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.974Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1809,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '46',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.07,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-andreh',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-bgo-hndevops-001.vitistack-hn-uzmx.sky.nhn.no',
      },
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
        fieldValue: '2026-03-12T09:24:30Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-bgo-hndevops-001.vitistack-hn-uzmx.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.074Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2312,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 30.2,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-hn-uzmx',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-pts-000.vitistack-pts.sky.nhn.no',
      },
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
        fieldValue: '2026-02-17T08:44:42Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-pts-000.vitistack-pts.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.973Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1926,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '18',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 33.22,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-pts',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-sb-067.vitistack-sb-3sm5.sky.nhn.no',
      },
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
        fieldValue: '2026-03-11T09:53:32Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-sb-067.vitistack-sb-3sm5.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:40.778Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3910,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 28.57,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 35,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-sb-3sm5',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-taa-001.vitistack-taa-tafc.sky.nhn.no',
      },
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
        fieldValue: '2026-03-11T11:21:46Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-taa-001.vitistack-taa-tafc.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.173Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1729,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 28.43,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-taa-tafc',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-trd-atlas-001.vitistack-atlas.sky.nhn.no',
      },
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
        fieldValue: '2026-02-17T14:20:26Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-trd-atlas-001.vitistack-atlas.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.674Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2050,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 46.72,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-atlas',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-trd-fts-da-001.vitistack-fts-6fsr.sky.nhn.no',
      },
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
        fieldValue: '2026-02-28T19:30:26Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-trd-fts-da-001.vitistack-fts-6fsr.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.719Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4395,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 27.78,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 67.82,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-fts-6fsr',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-viti-bg-xcads-001.vitistack-xcads-rr2d.sky.nhn.no',
      },
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
        fieldValue: '2026-03-06T08:13:45Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-viti-bg-xcads-001.vitistack-xcads-rr2d.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.141Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1519,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '13',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 23.15,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-xcads-rr2d',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-viti-trd-xcads-001.vitistack-xcads-sd8k.sky.nhn.no',
      },
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
        fieldValue: '2026-03-04T14:18:54Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-viti-trd-xcads-001.vitistack-xcads-sd8k.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.684Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1306,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '16',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.66,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-xcads-sd8k',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-wh-trd-001.vitistack-pm-37vp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'd-wh-trd-001-ooi8',
      },
      clusterName: {
        fieldValue: 'd-wh-trd-001',
      },
      clusterUid: {
        fieldValue: 'dae99838-9a62-4cbf-8a8b-3a7867c5a52e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-25T12:25:05Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-wh-trd-001.vitistack-pm-37vp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.774Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1312,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 38.39,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-pm-37vp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.ktrd-amk-001.vitistack-amk-3sad.sky.nhn.no',
      },
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
        fieldValue: '2026-03-16T11:51:56Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.ktrd-amk-001.vitistack-amk-3sad.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.321Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1747,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 20.5,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-amk-3sad',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-bgo-obao-001.vitistack-cry-prod-d801.sky.nhn.no',
      },
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
        fieldValue: '2026-03-12T13:39:56Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-bgo-obao-001.vitistack-cry-prod-d801.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:35.318Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2710,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.59,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-cry-prod-d801',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-edi-mon-001.vitistack-edi-l10w.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'p-edi-mon-001-knip',
      },
      clusterName: {
        fieldValue: 'p-edi-mon-001',
      },
      clusterUid: {
        fieldValue: '7dbea4f9-9631-444c-9a73-0d050462f137',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-24T08:27:02Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'production',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-edi-mon-001.vitistack-edi-l10w.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.523Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1857,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 27.65,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-edi-l10w',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sb-067.vitistack-sb-prod-30ze.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'p-sb-067-umns',
      },
      clusterName: {
        fieldValue: 'p-sb-067',
      },
      clusterUid: {
        fieldValue: 'ac170c59-8184-4b90-a8f7-0e527a72f675',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-25T12:18:06Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'production',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sb-067.vitistack-sb-prod-30ze.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:41.587Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2654,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 30.05,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-sb-prod-30ze',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-psky-001.central-az1.sky.nhn.no',
      },
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
        fieldValue: '2026-02-12T13:37:35Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-psky-001.central-az1.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.069Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 126912,
      },
      priceYear: {
        fieldValue: 1522944,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '140',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2531,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 2.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '2037',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '56',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 2.76,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'central-az1',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sql-001.west-az1.sky.nhn.no',
      },
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
        fieldValue: '2025-12-01T13:15:43Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sql-001.west-az1.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.34.1',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:07.185Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 47408,
      },
      priceYear: {
        fieldValue: 568896,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '60',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2641,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '725',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 4.17,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'west-az1',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-trd-soc-004.vitistack-soc-pfey.sky.nhn.no',
      },
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
        fieldValue: '2026-03-11T07:45:51Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-trd-soc-004.vitistack-soc-pfey.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.177Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9933,
      },
      priceYear: {
        fieldValue: 119196,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '30',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2143,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.54,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-soc-pfey',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: 'dc78c1c0-ec8b-49dd-b464-75c352292608',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-ept-001.vitistack-devops-xyuw.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'q-ept-001-dtlo',
      },
      clusterName: {
        fieldValue: 'q-ept-001',
      },
      clusterUid: {
        fieldValue: '90fb5cb1-4bf0-44ea-bea2-dd8970b7ffcb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-25T09:24:15Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-ept-001.vitistack-devops-xyuw.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:47.619Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 8901,
      },
      priceYear: {
        fieldValue: 106812,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2049,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 13.64,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '86',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 16.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-devops-xyuw',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-sb-067.vitistack-sb-3sm5.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 'q-sb-067-iihx',
      },
      clusterName: {
        fieldValue: 'q-sb-067',
      },
      clusterUid: {
        fieldValue: 'f92a32bf-1541-4b2b-a299-2ede964ce245',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-25T12:12:28Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-sb-067.vitistack-sb-3sm5.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:42.775Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3013,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 30.51,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-sb-3sm5',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-trd-sfm-001.vitistack-sfm.sky.nhn.no',
      },
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
        fieldValue: '2026-02-09T13:19:59Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-trd-sfm-001.vitistack-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.578Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 12614,
      },
      priceYear: {
        fieldValue: 151368,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5222,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 27.27,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '164',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '36',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 21.92,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-bgo-obao-001.vitistack-cry-sozh.sky.nhn.no',
      },
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
        fieldValue: '2026-03-12T13:39:04Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-bgo-obao-001.vitistack-cry-sozh.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.751Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2245,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '13',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 24.64,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-cry-sozh',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-bgo-slackbot-001.vitistack-container-tze4.sky.nhn.no',
      },
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
        fieldValue: '2026-03-10T05:42:43Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-bgo-slackbot-001.vitistack-container-tze4.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:43.956Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1071,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '9',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 17.19,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-container-tze4',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-diem-8181.vitistack-container-tze4.sky.nhn.no',
      },
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
        fieldValue: '2026-03-10T13:20:29Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-diem-8181.vitistack-container-tze4.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:39.378Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2040,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 23.9,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-container-tze4',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '330f2621-c313-4569-aab7-6e3450a6b566',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-lb-001.vitistack-lb-urm2.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-lb-001-6x4t',
      },
      clusterName: {
        fieldValue: 't-lb-001',
      },
      clusterUid: {
        fieldValue: '0a366cf4-5a64-42d3-9e0b-ee8cb56a5a6e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-23T11:53:25Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-lb-001.vitistack-lb-urm2.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:57.125Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1093,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.85,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-lb-urm2',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-lmgd-001.vitistack-lmgd-kfr5.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-lmgd-001-b4n1',
      },
      clusterName: {
        fieldValue: 't-lmgd-001',
      },
      clusterUid: {
        fieldValue: '95c44b32-5ad0-4351-aae0-95b1561ebe9c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-23T11:00:40Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-lmgd-001.vitistack-lmgd-kfr5.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:33.413Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2256,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 30,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '13',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.74,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-lmgd-kfr5',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-mon-001.vitistack-mon-j9nn.sky.nhn.no',
      },
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
        fieldValue: '2026-03-17T10:34:37Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-mon-001.vitistack-mon-j9nn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:21.554Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2106,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 26.32,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-mon-j9nn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-nn-002.vitistack-nn-6omn.sky.nhn.no',
      },
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
        fieldValue: '2026-03-11T08:10:30Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-nn-002.vitistack-nn-6omn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.347Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1763,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '12',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 22.63,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-nn-6omn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-per-et-402.vitistack-per-wlt4.sky.nhn.no',
      },
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
        fieldValue: '2026-03-05T14:28:19Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-per-et-402.vitistack-per-wlt4.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:35.091Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2668,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 35.2,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-per-wlt4',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-rf-002.vitistack-reseptformidleren-9vq8.sky.nhn.no',
      },
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
        fieldValue: '2026-03-19T10:40:42Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-rf-002.vitistack-reseptformidleren-9vq8.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:17.104Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7869,
      },
      priceYear: {
        fieldValue: 94428,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2380,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '102',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '13',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 12.9,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-reseptformidleren-9vq8',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sb-067.vitistack-sb-3sm5.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'az1',
      },
      clusterId: {
        fieldValue: 't-sb-067-srs3',
      },
      clusterName: {
        fieldValue: 't-sb-067',
      },
      clusterUid: {
        fieldValue: '96717aa4-659f-43a9-9945-0c58b245ba40',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-03-25T12:07:19Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sb-067.vitistack-sb-3sm5.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.647Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2493,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '13',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 24.01,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-sb-3sm5',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-soc-888.vitistack-soc-q4sy.sky.nhn.no',
      },
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
        fieldValue: '2026-03-16T12:29:53Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-soc-888.vitistack-soc-q4sy.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.714Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1199,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '10',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 18.4,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-soc-q4sy',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '2273ed28-fc3c-47b9-b221-92c5d32c9eb1',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-test-001-4y8e.t-test001.sky.nhn.no',
      },
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
        fieldValue: 'a31534a4-d319-4fdb-9736-53cb28182e63',
      },
      country: {
        fieldValue: 'test',
      },
      created: {
        fieldValue: '2026-02-27T11:36:57Z',
      },
      datacenter: {
        fieldValue: 'az1.south.test',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-test-001-4y8e.t-test001.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.71Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'south',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2393,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 26.51,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 't-test001',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-test-sod-011.t-test-sod-011.sky.nhn.no',
      },
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
        fieldValue: '2026-03-11T09:10:25Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-test-sod-011.t-test-sod-011.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:12.401Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 1,
      },
      priceMonth: {
        fieldValue: 2419,
      },
      priceYear: {
        fieldValue: 29028,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '6',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 633,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '7',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 31.79,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 't-test-sod-011',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-trd-geirr-999.vitistack-container-asft.sky.nhn.no',
      },
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
        fieldValue: '2026-03-11T08:51:19Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-trd-geirr-999.vitistack-container-asft.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:18.281Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1618,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '13',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 23.39,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-container-asft',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-trd-obao-001.vitistack-obao.sky.nhn.no',
      },
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
        fieldValue: '2026-02-09T11:47:58Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-trd-obao-001.vitistack-obao.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:36.456Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3642,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 35.75,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-obao',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-trident-001.vitistack-container-tze4.sky.nhn.no',
      },
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
        fieldValue: '2026-03-18T12:53:35Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-trident-001.vitistack-container-tze4.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.344Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1548,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 26.99,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-container-tze4',
      },
    },
    {
      argocdURL: {
        fieldValue: '',
      },
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
        fieldValue: '2026-03-18T13:29:51Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-trident-002.vitistack-container-asft.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:03.235Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 961,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 7.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '9',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 16.51,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-container-asft',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-vk-viti-001.vitistack-video-uz3e.sky.nhn.no',
      },
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
        fieldValue: '2026-03-06T13:43:17Z',
      },
      datacenter: {
        fieldValue: 'az1.central.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-vk-viti-001.vitistack-video-uz3e.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.728Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'central',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1608,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 27.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-video-uz3e',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.test-al.vitistack-abjerke-pp3f.sky.nhn.no',
      },
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
        fieldValue: '2026-03-12T08:27:53Z',
      },
      datacenter: {
        fieldValue: 'az1.west.no',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.test-al.vitistack-abjerke-pp3f.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.025Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'west',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 902,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '8',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 21.05,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'vitistack-abjerke-pp3f',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-inn-web-001-gl14',
      },
      clusterName: {
        fieldValue: 'p-inn-web-001',
      },
      clusterUid: {
        fieldValue: 'f56c2212-f40b-40e7-875c-f43d23a026c2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-04T18:01:04Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:33.46Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1579,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.16,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-inn-web',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-rap-001.trd1cl02-rap.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-rap-001-cjou',
      },
      clusterName: {
        fieldValue: 'q-rap-001',
      },
      clusterUid: {
        fieldValue: 'ea1f66f4-abcb-4e9d-ae73-ee13f9884479',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-07-19T10:29:06Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-rap-001.trd1cl02-rap.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.967Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2124,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.17,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rap',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-rf-mon-001.trd1cl02-rf.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-rf-mon-001-a3sn',
      },
      clusterName: {
        fieldValue: 'q-rf-mon-001',
      },
      clusterUid: {
        fieldValue: '372a8185-d469-4ca2-a7c6-f669e5116e75',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-09-24T13:35:18Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-rf-mon-001.trd1cl02-rf.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:07.319Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 15785,
      },
      priceYear: {
        fieldValue: 189420,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '28',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2196,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10.71,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 11.56,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rf',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-taa-000.trd1cl02-taa.sky.nhn.no',
      },
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
        fieldValue: '2024-10-08T13:38:28Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-taa-000.trd1cl02-taa.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:17.977Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1620,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.84,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-taa',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.tooling-test.osl1-nhn-tooling.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'tooling-test-11da',
      },
      clusterName: {
        fieldValue: 'tooling-test',
      },
      clusterUid: {
        fieldValue: '010888f2-cf1d-41c9-aa11-a5403f56e65e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-04-26T12:04:41Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.tooling-test.osl1-nhn-tooling.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:21.903Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.14',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1636,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.78,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-nhn-tooling',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-vkp-001.trd1cl02-vkp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-vkp-001-01en',
      },
      clusterName: {
        fieldValue: 'd-vkp-001',
      },
      clusterUid: {
        fieldValue: 'a94ce356-ece2-4df5-adc1-99758d41e49d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-28T13:46:41Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-vkp-001.trd1cl02-vkp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:48.064Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1902,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '18',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.97,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-vkp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-gis-001.trd1-amk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-gis-001-2x9w',
      },
      clusterName: {
        fieldValue: 't-gis-001',
      },
      clusterUid: {
        fieldValue: '4bc1d4d9-163d-43b4-8fa1-2b86731e4dae',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-11-13T13:01:30Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-gis-001.trd1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.275Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 739,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 7.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.09,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-fest-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-fest-001-sk71',
      },
      clusterName: {
        fieldValue: 'p-sfm-fest-001',
      },
      clusterUid: {
        fieldValue: '7a8549e2-7be7-47e4-8bf8-701a7d408ec6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-02-24T11:40:28Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-fest-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.307Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9513,
      },
      priceYear: {
        fieldValue: 114156,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3798,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '38',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.21,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-anne-001.trd1cl02-test.sky.nhn.no',
      },
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
        fieldValue: '2024-08-13T12:06:39Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-anne-001.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.1+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.335Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2233,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 39.08,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.trd1-kj-qa001.trd1-kj-qa.sky.nhn.no',
      },
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
        fieldValue: '2022-09-19T11:30:37Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.trd1-kj-qa001.trd1-kj-qa.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:48.755Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2344,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '38',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.81,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-kj-qa',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-pps-001.trd1cl02-pps-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-pps-001-rrct',
      },
      clusterName: {
        fieldValue: 'p-pps-001',
      },
      clusterUid: {
        fieldValue: '10747b3f-74ab-4eff-8225-7c5aa1775ca7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-08T10:03:56Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-pps-001.trd1cl02-pps-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.89Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 16677,
      },
      priceYear: {
        fieldValue: 200124,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3580,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '77',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 37.89,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pps-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-komsat-001.trd1cl02-komsat.sky.nhn.no',
      },
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
        fieldValue: '2025-11-03T08:52:46Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-komsat-001.trd1cl02-komsat.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:17.243Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1435,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 39,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-komsat',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-matiass-001.trd1-sky-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-matiass-001-k1i4',
      },
      clusterName: {
        fieldValue: 't-matiass-001',
      },
      clusterUid: {
        fieldValue: 'aefe11d0-1298-414f-89df-62d45e7e9c9c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-09-01T11:51:07Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-matiass-001.trd1-sky-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.161Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.13',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1538,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '22',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 56.17,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-sky-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-gdr-001.trd1cl02-team-gdr.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-gdr-001-0rqj',
      },
      clusterName: {
        fieldValue: 't-gdr-001',
      },
      clusterUid: {
        fieldValue: '96cef2ac-6a9a-456d-b162-779a0113ced4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-10T12:29:23Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-gdr-001.trd1cl02-team-gdr.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.839Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 2677,
      },
      priceYear: {
        fieldValue: 32124,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1954,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 74.23,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-team-gdr',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-trd-ek-001.trd1-ek.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-trd-ek-001-tn2m',
      },
      clusterName: {
        fieldValue: 't-trd-ek-001',
      },
      clusterUid: {
        fieldValue: '79664417-798c-4bcf-9c23-0830d724b7f6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-29T12:56:36Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-trd-ek-001.trd1-ek.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:52.823Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1232,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.34,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-ek',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-vk-001.trd1-vk-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-vk-001-bvsa',
      },
      clusterName: {
        fieldValue: 'p-vk-001',
      },
      clusterUid: {
        fieldValue: '001886af-b84f-492c-9524-05ccbbb5238c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-03T20:31:01Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-vk-001.trd1-vk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.617Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2624,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '35',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.41,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-vk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-rasj-001.osl1-rasj.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-rasj-001-eb7j',
      },
      clusterName: {
        fieldValue: 'p-rasj-001',
      },
      clusterUid: {
        fieldValue: 'f8c468ed-62b6-4847-b941-b913ca5e52d6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-01-20T13:03:47Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-rasj-001.osl1-rasj.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:58.255Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1412,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 56.82,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-rasj',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-basis-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-basis-001-85h8',
      },
      clusterName: {
        fieldValue: 'p-sfm-basis-001',
      },
      clusterUid: {
        fieldValue: '212f7d32-27dc-448f-95d4-fbb5766647ab',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-09-02T10:44:00Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-basis-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.572Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 12964,
      },
      priceYear: {
        fieldValue: 155568,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3526,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '125',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '53',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.56,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-osl-xcads-001.osl1-xcads.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-osl-xcads-001-m976',
      },
      clusterName: {
        fieldValue: 'd-osl-xcads-001',
      },
      clusterUid: {
        fieldValue: '2c4bde27-2efd-47ef-b466-e3a164116619',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-10-02T12:51:54Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-osl-xcads-001.osl1-xcads.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.635Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3231,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 33.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.69,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-xcads',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.avi-test-04.trd1cl02-test.sky.nhn.no',
      },
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
        fieldValue: '2024-12-10T08:18:50Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.avi-test-04.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.637Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.11',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2504,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.1,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-par-001.trd1cl02-par-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-par-001-g34u',
      },
      clusterName: {
        fieldValue: 'p-par-001',
      },
      clusterUid: {
        fieldValue: 'd86bf780-be22-49fc-ac35-d713cb205d8a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-28T14:17:17Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-par-001.trd1cl02-par-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.487Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2810,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 41.36,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-par-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-amk-002.osl1-amk-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-amk-002-x6jx',
      },
      clusterName: {
        fieldValue: 'p-amk-002',
      },
      clusterUid: {
        fieldValue: '6f0d0056-8376-4c05-92d0-1801f6fc3185',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-11T09:02:20Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-amk-002.osl1-amk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:48.239Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 8,
      },
      priceMonth: {
        fieldValue: 17849,
      },
      priceYear: {
        fieldValue: 214188,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '44',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4555,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.36,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '172',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 36.34,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-amk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-os-rust-001.osl1-os-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-os-rust-001-217f',
      },
      clusterName: {
        fieldValue: 'p-os-rust-001',
      },
      clusterUid: {
        fieldValue: 'fe7d8879-9ae6-4067-9635-07e9e2b878f9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-02-18T10:23:12Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-os-rust-001.osl1-os-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.082Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1438,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '22',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 56.15,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-os-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-spe-001.trd1cl02-spe-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-spe-001-mued',
      },
      clusterName: {
        fieldValue: 'p-spe-001',
      },
      clusterUid: {
        fieldValue: '8a5900af-d5f5-434b-af95-35d80ca3acac',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-03-20T14:38:40Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-spe-001.trd1cl02-spe-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:04.543Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 12189,
      },
      priceYear: {
        fieldValue: 146268,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '30',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2404,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '34',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.16,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-spe-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-nmkp-001.osl1-nmkp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-nmkp-001-h31g',
      },
      clusterName: {
        fieldValue: 't-nmkp-001',
      },
      clusterUid: {
        fieldValue: '45d5d128-7663-4d8c-be42-57eb5792ca45',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-02-16T07:49:11Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-nmkp-001.osl1-nmkp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:40.628Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 2419,
      },
      priceYear: {
        fieldValue: 29028,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '6',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1420,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 33.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.13,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-nmkp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-bgs-001.trd1-lda-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-bgs-001-xlv7',
      },
      clusterName: {
        fieldValue: 'p-bgs-001',
      },
      clusterUid: {
        fieldValue: '9c614981-74ba-4aa6-94f6-588dd456ce1d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-18T11:26:27Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-bgs-001.trd1-lda-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:20.626Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1969,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 73.31,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-lda-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-ncpeh-000.osl1-ncpeh-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-ncpeh-000-ww30',
      },
      clusterName: {
        fieldValue: 'q-ncpeh-000',
      },
      clusterUid: {
        fieldValue: 'cc1c641a-dd65-4cde-a75b-cedcd2a595bc',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-03-01T18:31:44Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-ncpeh-000.osl1-ncpeh-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.372Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1052,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.16,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpeh-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-taa-000.trd1cl02-taa.sky.nhn.no',
      },
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
        fieldValue: '2024-11-12T08:32:56Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-taa-000.trd1cl02-taa.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.28Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1771,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 47.69,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-taa',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-poc-001.osl1-pastrans.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-poc-001-wuey',
      },
      clusterName: {
        fieldValue: 'd-poc-001',
      },
      clusterUid: {
        fieldValue: 'f369a0fa-2077-47e7-9cf6-6851b287a159',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-28T15:05:10Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-poc-001.osl1-pastrans.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.341Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 835,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '16',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 50.96,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-pastrans',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.apt-sommer.trd1cl02-apt-sommer.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'apt-sommer-9oz9',
      },
      clusterName: {
        fieldValue: 'apt-sommer',
      },
      clusterUid: {
        fieldValue: '85d68aa2-4182-4e72-b2bb-0759947719a0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-06-24T07:13:19Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.apt-sommer.trd1cl02-apt-sommer.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:12.993Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.11',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1205,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.33,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-apt-sommer',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.k-amk-001.trd1-amk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'k-amk-001-pr4k',
      },
      clusterName: {
        fieldValue: 'k-amk-001',
      },
      clusterUid: {
        fieldValue: '18202611-978f-4915-b17f-3684cdd44bc0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-11T08:41:51Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'kurs',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.k-amk-001.trd1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.99Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 8901,
      },
      priceYear: {
        fieldValue: 106812,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2452,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 13.64,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '86',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.69,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-amk-003.trd1-amk.sky.nhn.no',
      },
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
        fieldValue: '2024-06-02T17:02:25Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-amk-003.trd1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:51.953Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2371,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.28,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-amk-001.trd1-amk-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-amk-001-scjy',
      },
      clusterName: {
        fieldValue: 'p-amk-001',
      },
      clusterUid: {
        fieldValue: 'fd75b0c0-d8e8-4294-9b1e-bc58112030dd',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-11T09:04:06Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-amk-001.trd1-amk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.226Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 8,
      },
      priceMonth: {
        fieldValue: 17849,
      },
      priceYear: {
        fieldValue: 214188,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '44',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6215,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 15.91,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '172',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '68',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 39.4,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-per-001.trd1-per-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-per-001-591e',
      },
      clusterName: {
        fieldValue: 't-per-001',
      },
      clusterUid: {
        fieldValue: '9698529f-b6aa-44dc-af0b-5a58c40d25df',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-01-30T11:22:09Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-per-001.trd1-per-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:39.62Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1187,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.58,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-per-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ndl4-mon-001.trd1cl02-mfp-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-04-10T07:06:31Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ndl4-mon-001.trd1cl02-mfp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.262Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1955,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 52.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mfp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-014.trd1cl02-sfm-prod2.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-014-kdhr',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-014',
      },
      clusterUid: {
        fieldValue: '20a7c847-2a4c-44b7-9c64-0c3e88b916a0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-07-07T12:57:43Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-014.trd1cl02-sfm-prod2.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:15.181Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 16677,
      },
      priceYear: {
        fieldValue: 200124,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4092,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 15.63,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '60',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.48,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod2',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-mrs-001.trd1cl02-mrs-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-mrs-001-rv5m',
      },
      clusterName: {
        fieldValue: 'p-mrs-001',
      },
      clusterUid: {
        fieldValue: '8ef9e55b-f923-496d-8c48-10a224046661',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-19T10:59:47Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-mrs-001.trd1cl02-mrs-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:32.443Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2374,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.39,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mrs-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-vk-001.osl1-vk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-vk-001-mblb',
      },
      clusterName: {
        fieldValue: 't-vk-001',
      },
      clusterUid: {
        fieldValue: '8e26835a-855e-487a-b6a3-01441e50e0e0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-03T11:10:26Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-vk-001.osl1-vk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.773Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1261,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.96,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-vk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ori-wiki000.trd1-ori-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ori-wiki000-n9bi',
      },
      clusterName: {
        fieldValue: 'p-ori-wiki000',
      },
      clusterUid: {
        fieldValue: 'a4ef0bcc-756c-4680-8dfa-6464f861abc2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-09-08T08:51:00Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ori-wiki000.trd1-ori-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.809Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1190,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.31,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-ori-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sb-001.trd1-sb-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-sb-001-sq40',
      },
      clusterName: {
        fieldValue: 't-sb-001',
      },
      clusterUid: {
        fieldValue: '28fa3acb-6add-46aa-a9d2-c0127efdcf7a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-10-24T12:41:10Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sb-001.trd1-sb-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.383Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1188,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '18',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.98,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-sb-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-nxt-port-001.trd1cl02-nxt-port.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-nxt-port-001-6hda',
      },
      clusterName: {
        fieldValue: 't-nxt-port-001',
      },
      clusterUid: {
        fieldValue: '7abda288-4482-42ac-b1b1-a03e5dc25fe5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-05-13T07:33:54Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-nxt-port-001.trd1cl02-nxt-port.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.645Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1785,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '22',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 40.5,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-nxt-port',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-013.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-013-jv2y',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-013',
      },
      clusterUid: {
        fieldValue: '5f26a1d4-107e-4b95-8498-7591e7837e7e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-23T14:22:00Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-013.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:47.613Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9513,
      },
      priceYear: {
        fieldValue: 114156,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3159,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 26.24,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-plm-001.trd1-plm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-plm-001-zlga',
      },
      clusterName: {
        fieldValue: 'q-plm-001',
      },
      clusterUid: {
        fieldValue: '548dbf6c-2654-4eaa-8b26-24f78375e85e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-07-03T13:26:29Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-plm-001.trd1-plm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.649Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1890,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '33',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 47.79,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-plm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-oss-001.trd1cl02-oss.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-oss-001-4ypj',
      },
      clusterName: {
        fieldValue: 't-oss-001',
      },
      clusterUid: {
        fieldValue: '212bc893-46e3-4202-bf3f-142411b4494c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-25T11:18:36Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-oss-001.trd1cl02-oss.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.035Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.12',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1244,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '18',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.02,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-oss',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-diem-888.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-diem-888-q8ve',
      },
      clusterName: {
        fieldValue: 't-diem-888',
      },
      clusterUid: {
        fieldValue: '5f14ee39-79a0-4be6-afa6-557d41080187',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-15T09:50:35Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-diem-888.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:29.841Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2320,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.78,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-rf-001.trd1cl02-rf.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-rf-001-g1wr',
      },
      clusterName: {
        fieldValue: 'q-rf-001',
      },
      clusterUid: {
        fieldValue: 'e02023e4-6cf4-4276-a7f6-927e622b555b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-02-08T10:12:55Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-rf-001.trd1cl02-rf.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:48.883Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 916,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '16',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.18,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rf',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-iss-001.trd1-internutv.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-iss-001-6vne',
      },
      clusterName: {
        fieldValue: 'p-iss-001',
      },
      clusterUid: {
        fieldValue: 'ff1d2964-9b0f-4dc1-b80f-0fcbb4061111',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-01-28T09:29:16Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-iss-001.trd1-internutv.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:27.526Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1293,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.27,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-internutv',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.trd1-kj-prod002.trd1-kj-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'trd1-kj-prod002-sv55',
      },
      clusterName: {
        fieldValue: 'trd1-kj-prod002',
      },
      clusterUid: {
        fieldValue: '43d6e3cc-e2a0-4227-a449-eebd1ffdbea8',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-10-11T07:57:33Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.trd1-kj-prod002.trd1-kj-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:15.583Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2393,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '49',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 52.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-kj-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sfm-basis-001.trd1cl02-sfm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-sfm-basis-001-fb16',
      },
      clusterName: {
        fieldValue: 't-sfm-basis-001',
      },
      clusterUid: {
        fieldValue: '833776ff-21c3-49e6-aeb3-7fa403cbfec9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-10-24T10:09:42Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sfm-basis-001.trd1cl02-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.698Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 11367,
      },
      priceYear: {
        fieldValue: 136404,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '28',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3113,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '109',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '51',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 46.64,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-pers-001.trd1cl02-pers-prod.sky.nhn.no',
      },
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
        fieldValue: '2024-01-30T13:17:48Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-pers-001.trd1cl02-pers-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.985Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2541,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.55,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pers-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.dsdi-melding.trd1-team-melding.sky.nhn.no',
      },
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
        fieldValue: '2022-08-31T12:37:51Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.dsdi-melding.trd1-team-melding.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.537Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3720,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '38',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.07,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-team-melding',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-edi-001.trd1cl02-edi.sky.nhn.no',
      },
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
        fieldValue: '2025-01-08T09:00:10Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-edi-001.trd1cl02-edi.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.548Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.7.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 890,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.99,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-edi',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.pt-nav-004.trd1cl02-dhp-nav.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'pt-nav-004-isyt',
      },
      clusterName: {
        fieldValue: 'pt-nav-004',
      },
      clusterUid: {
        fieldValue: '83d493c9-9f9c-4d87-a3be-a0efc69e0ffa',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-03-25T08:58:24Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.pt-nav-004.trd1cl02-dhp-nav.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:21.328Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5355,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 33.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '50',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 71.24,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-dhp-nav',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-sapt-airag-001.trd1cl02-apt-sommer.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-sapt-airag-001-jrge',
      },
      clusterName: {
        fieldValue: 'd-sapt-airag-001',
      },
      clusterUid: {
        fieldValue: 'bd2aaf04-ec23-432e-9397-ccff674fafcf',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-07-10T07:20:38Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-sapt-airag-001.trd1cl02-apt-sommer.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.783Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1898,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.42,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-apt-sommer',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-hn-vlt001.trd1cl02-hn-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-hn-vlt001-3sys',
      },
      clusterName: {
        fieldValue: 'q-hn-vlt001',
      },
      clusterUid: {
        fieldValue: '364ad338-4e3b-402c-ac90-ed3d5b58f47f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-07-17T08:42:12Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-hn-vlt001.trd1cl02-hn-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:58.04Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1521,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '16',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 51.05,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-tsc-001.trd1-tsc.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-tsc-001-mt5q',
      },
      clusterName: {
        fieldValue: 'q-tsc-001',
      },
      clusterUid: {
        fieldValue: '426f8d74-7a83-4446-aee0-843c43b339ca',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-27T09:38:57Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-tsc-001.trd1-tsc.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.428Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1248,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '42',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.62,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-tsc',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-sfm-fest-001.trd1cl02-sfm.sky.nhn.no',
      },
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
        fieldValue: '2025-03-03T11:21:18Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-sfm-fest-001.trd1cl02-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:41.712Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 8691,
      },
      priceYear: {
        fieldValue: 104292,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1726,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '110',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '35',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 31.88,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-jonas-001.trd1-sky-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-jonas-001-c21m',
      },
      clusterName: {
        fieldValue: 't-jonas-001',
      },
      clusterUid: {
        fieldValue: 'c401b774-8dab-4e6f-b1a3-6c4c0d92166b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-08-04T13:16:06Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-jonas-001.trd1-sky-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.258Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.0',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 889,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-sky-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-nav-000.osl1-team-nav.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-nav-000-77mw',
      },
      clusterName: {
        fieldValue: 't-nav-000',
      },
      clusterUid: {
        fieldValue: '4857c691-3995-4d67-9441-70870c59b95c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-11-18T12:14:39Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-nav-000.osl1-team-nav.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.534Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 998,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 7.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.27,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-team-nav',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-k8s-1-32.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-k8s-1-32-7a4q',
      },
      clusterName: {
        fieldValue: 't-k8s-1-32',
      },
      clusterUid: {
        fieldValue: '6742dd9d-1675-439e-83df-4b84d2214263',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-03T12:11:23Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-k8s-1-32.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:20.726Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.7.6',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 2419,
      },
      priceYear: {
        fieldValue: 29028,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '6',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1183,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 33.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.95,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-k8s-1-30.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-k8s-1-30-ymqj',
      },
      clusterName: {
        fieldValue: 't-k8s-1-30',
      },
      clusterUid: {
        fieldValue: 'dee6134e-e991-4c4f-916a-b06859cfaa97',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-04T09:37:45Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-k8s-1-30.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.31.4+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:08.829Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.7.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 952,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '16',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 50.96,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-dpt-001.trd1cl02-hn-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-dpt-001-524c',
      },
      clusterName: {
        fieldValue: 'p-dpt-001',
      },
      clusterUid: {
        fieldValue: 'b7f0df57-594d-4d77-96ba-51760d4ef77f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-20T09:11:04Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-dpt-001.trd1cl02-hn-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:53.221Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3703,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.13,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.kj-portal-test.trd1-team-kjernejournal-portal.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'kjernejournal-portal-test-t1g3',
      },
      clusterName: {
        fieldValue: 'kjernejournal-portal-test',
      },
      clusterUid: {
        fieldValue: '805ba829-cd2b-43a6-8470-e7f411dc4a8d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-05-10T09:56:49Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.kj-portal-test.trd1-team-kjernejournal-portal.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:32.828Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 11131,
      },
      priceYear: {
        fieldValue: 133572,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2153,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 9.38,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '86',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.24,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-team-kjernejournal-portal',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-nav-002.osl1-dhp-nav.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-nav-002-9sil',
      },
      clusterName: {
        fieldValue: 't-nav-002',
      },
      clusterUid: {
        fieldValue: 'fb264363-5aa7-46d7-beec-6f331599ca9b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-08T15:13:12Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-nav-002.osl1-dhp-nav.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:24.585Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 17074,
      },
      priceYear: {
        fieldValue: 204888,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '42',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5037,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '164',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '116',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 70.92,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-dhp-nav',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.kjernejournal-test.trd1-team-kjernejournal-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'kjernejournal-test-psox',
      },
      clusterName: {
        fieldValue: 'kjernejournal-test',
      },
      clusterUid: {
        fieldValue: 'ca2640c4-aa51-4b4e-8194-e189149549b6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-02-23T15:03:42Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.kjernejournal-test.trd1-team-kjernejournal-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:12.408Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9980,
      },
      priceYear: {
        fieldValue: 119760,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '30',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2016,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '42',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 59.67,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-team-kjernejournal-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.mgmt-felles-0002-staging.osl1-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'mgmt-felles-0002-staging-8375',
      },
      clusterName: {
        fieldValue: 'mgmt-felles-0002-staging',
      },
      clusterUid: {
        fieldValue: '84cd8efb-f05d-46c1-82c8-12716ac7c709',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-11-24T12:41:06Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.mgmt-felles-0002-staging.osl1-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:31.49Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.15',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2308,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '42',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.21,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.psdi-melding.trd1-team-melding-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'psdi-melding-i46r',
      },
      clusterName: {
        fieldValue: 'psdi-melding',
      },
      clusterUid: {
        fieldValue: '08bf8384-b356-4186-80d0-a83942ae1d2d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-07-01T09:14:07Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.psdi-melding.trd1-team-melding-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.36Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 12964,
      },
      priceYear: {
        fieldValue: 155568,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 7613,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '125',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '53',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.04,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-team-melding-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-ncpehp-000.osl1-ncpehp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-ncpehp-000-r8ev',
      },
      clusterName: {
        fieldValue: 'd-ncpehp-000',
      },
      clusterUid: {
        fieldValue: '5ead3bbc-2148-481a-b2bc-76ca9f3e127a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-12-09T09:01:42Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-ncpehp-000.osl1-ncpehp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:33.512Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1645,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.08,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpehp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-011.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-011-rm0n',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-011',
      },
      clusterUid: {
        fieldValue: 'fe034281-7cb6-4592-9f52-c12b53053feb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-23T10:39:47Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-011.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:58.709Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 30057,
      },
      priceYear: {
        fieldValue: 360684,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '92',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4148,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 5.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '60',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.33,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-basis-000.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-basis-000-hsoj',
      },
      clusterName: {
        fieldValue: 'p-sfm-basis-000',
      },
      clusterUid: {
        fieldValue: '2f173b72-551e-4e65-870e-869bf13b428a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-05-14T08:38:13Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-basis-000.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.295Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2850,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 41.72,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-komlink-001.trd1cl02-komlink.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-komlink-001-sd27',
      },
      clusterName: {
        fieldValue: 'd-komlink-001',
      },
      clusterUid: {
        fieldValue: 'ec00ded5-e099-47c4-bb41-acf0dcd79bbc',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-01T07:40:03Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-komlink-001.trd1cl02-komlink.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.49Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1593,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 39.43,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-komlink',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-tp-002.trd1cl02-tp-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-tp-002-bo5d',
      },
      clusterName: {
        fieldValue: 'p-tp-002',
      },
      clusterUid: {
        fieldValue: 'e2586f3a-8b12-49f6-8d23-33660f64bc8f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-05-10T10:13:46Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-tp-002.trd1cl02-tp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.066Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 15,
      },
      priceMonth: {
        fieldValue: 40308,
      },
      priceYear: {
        fieldValue: 483696,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '72',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 37076,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 52.78,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '517',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '306',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 59.14,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-tp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.test-melding-001.trd1-team-melding.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'test-melding-001-vvut',
      },
      clusterName: {
        fieldValue: 'test-melding-001',
      },
      clusterUid: {
        fieldValue: 'ce6a1f9b-6a3f-4106-ae45-237e4bd0c489',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-08-30T08:08:24Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.test-melding-001.trd1-team-melding.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:02.506Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 10545,
      },
      priceYear: {
        fieldValue: 126540,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '26',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2544,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.54,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '101',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 46.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-team-melding',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-012.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-012-baib',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-012',
      },
      clusterUid: {
        fieldValue: 'bcbc1eb3-ac66-44ff-a385-c55aacb5fdfd',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-23T12:39:04Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-012.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.642Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 19960,
      },
      priceYear: {
        fieldValue: 239520,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '60',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3731,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 6.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '73',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 51.97,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-splunk-dashpub-002.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-splunk-dashpub-002-ccff',
      },
      clusterName: {
        fieldValue: 't-splunk-dashpub-002',
      },
      clusterUid: {
        fieldValue: 'e4333c24-ce84-4efa-be33-71c940da1bde',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-12-15T12:52:00Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-splunk-dashpub-002.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.954Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4322,
      },
      priceYear: {
        fieldValue: 51864,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1275,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 36.15,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-andre-111.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-andre-111-51xq',
      },
      clusterName: {
        fieldValue: 'd-andre-111',
      },
      clusterUid: {
        fieldValue: '2514ed6b-4eed-4d67-b38c-920d8981894d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-10-13T10:25:33Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-andre-111.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.33.6+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.821Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.13',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1294,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.24,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-nmkp-001.osl1-nmkp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-nmkp-001-rv25',
      },
      clusterName: {
        fieldValue: 'q-nmkp-001',
      },
      clusterUid: {
        fieldValue: '6bcb0681-c30b-4459-a5fc-d2c7761f676c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-01-20T14:13:09Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-nmkp-001.osl1-nmkp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:01.361Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 2419,
      },
      priceYear: {
        fieldValue: 29028,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '6',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 788,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 61.57,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-nmkp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.avi-test-03.trd1-avi-system.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'avi-test-03-b01w',
      },
      clusterName: {
        fieldValue: 'avi-test-03',
      },
      clusterUid: {
        fieldValue: '7a173852-5188-4340-b327-e53698639fbb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-14T10:22:51Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.avi-test-03.trd1-avi-system.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.316Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 867,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.04,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-avi-system',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-trd-pam-001.trd1cl02-pam.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-trd-pam-001-78ef',
      },
      clusterName: {
        fieldValue: 't-trd-pam-001',
      },
      clusterUid: {
        fieldValue: '5c507e16-022b-4271-9504-12cdda2a83ef',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-27T12:54:18Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-trd-pam-001.trd1cl02-pam.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.159Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 2419,
      },
      priceYear: {
        fieldValue: 29028,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '6',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1651,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 33.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 65.62,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pam',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ror-001.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ror-001-4u98',
      },
      clusterName: {
        fieldValue: 'p-ror-001',
      },
      clusterUid: {
        fieldValue: '4a7ef8be-6fa3-4135-8759-9bded91a4ba2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-12T09:38:27Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ror-001.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.31.4+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:00.456Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1894,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 38.87,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-nav-002.osl1-dhp-nav-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-nav-002-a1ow',
      },
      clusterName: {
        fieldValue: 'p-nav-002',
      },
      clusterUid: {
        fieldValue: '77b42ca6-80d0-4f61-8cb1-74153e981282',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-08T13:47:23Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-nav-002.osl1-dhp-nav-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.049Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 17074,
      },
      priceYear: {
        fieldValue: 204888,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '42',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4710,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.9,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '164',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '115',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 70.37,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-dhp-nav-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-tek-002.trd1-teknisktest.sky.nhn.no',
      },
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
        fieldValue: '2024-01-24T13:52:56Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-tek-002.trd1-teknisktest.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:46.451Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 880,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 7.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.82,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-teknisktest',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-oct-001.trd1cl02-oct-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-oct-001-m8jn',
      },
      clusterName: {
        fieldValue: 'p-oct-001',
      },
      clusterUid: {
        fieldValue: '2004623f-dbe0-4837-97a7-f935f29397e8',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-15T10:34:16Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-oct-001.trd1cl02-oct-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.304Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9513,
      },
      priceYear: {
        fieldValue: 114156,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2791,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '44',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 37.69,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-oct-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-inn-web-001-6l13',
      },
      clusterName: {
        fieldValue: 't-inn-web-001',
      },
      clusterUid: {
        fieldValue: '36c12747-4053-4795-8cde-d80459cc89c1',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-04T16:25:18Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.57Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1701,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 65.45,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-inn-web',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-tu-001.trd1cl02-tu-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-tu-001-dx6p',
      },
      clusterName: {
        fieldValue: 'p-tu-001',
      },
      clusterUid: {
        fieldValue: 'f201eb72-788c-4798-a628-f7f9a74a8828',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-22T09:28:46Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-tu-001.trd1cl02-tu-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:27.131Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9513,
      },
      priceYear: {
        fieldValue: 114156,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3061,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '56',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 47.59,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-tu-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-edi-001.trd1cl02-edi-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-edi-001-9rxa',
      },
      clusterName: {
        fieldValue: 'p-edi-001',
      },
      clusterUid: {
        fieldValue: '8d5db3d5-9da1-4b59-b8aa-06a54dc00ba0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-01-08T09:00:40Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-edi-001.trd1cl02-edi-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:33.561Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2039,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.52,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-edi-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-basis-003.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-basis-003-s0o6',
      },
      clusterName: {
        fieldValue: 'p-sfm-basis-003',
      },
      clusterUid: {
        fieldValue: 'a0fd1c99-0b25-4eb2-8f99-9ef00c9e1aa7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-03-13T11:12:19Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-basis-003.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.669Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 11932,
      },
      priceYear: {
        fieldValue: 143184,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2623,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '40',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 28.19,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-ncpehp-000.osl1-ncpehp.sky.nhn.no',
      },
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
        fieldValue: '2024-10-17T08:08:42Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-ncpehp-000.osl1-ncpehp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:23.942Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2397,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 37.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.94,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpehp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-rf-mgmt-001.trd1cl02-rf-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-rf-mgmt-001-e96s',
      },
      clusterName: {
        fieldValue: 'p-rf-mgmt-001',
      },
      clusterUid: {
        fieldValue: 'fafef489-07f9-497b-aa7c-1d4917384c87',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-12-03T12:18:36Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-rf-mgmt-001.trd1cl02-rf-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:34.538Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 16607,
      },
      priceYear: {
        fieldValue: 199284,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '30',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2706,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '212',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 14.36,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rf-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-hn-vlt001.trd1cl02-hn-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-hn-vlt001-3e6i',
      },
      clusterName: {
        fieldValue: 'p-hn-vlt001',
      },
      clusterUid: {
        fieldValue: 'b0231c5f-cda2-4b19-aa66-ba21136a17d8',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-03T06:46:48Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-hn-vlt001.trd1cl02-hn-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:33.145Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2317,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.89,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.qatd-pers-201.osl1-pers.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'qatd-pers-201-hi8n',
      },
      clusterName: {
        fieldValue: 'qatd-pers-201',
      },
      clusterUid: {
        fieldValue: '5b4eb79c-438a-48be-a771-5b4b440bc223',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-31T09:36:19Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.qatd-pers-201.osl1-pers.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:39.585Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 847,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.96,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-pers',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-dd-000.osl1-dd.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-dd-000-330q',
      },
      clusterName: {
        fieldValue: 't-dd-000',
      },
      clusterUid: {
        fieldValue: '41b9cc70-e202-400e-96e1-18ca2b96dd40',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-09-25T10:46:24Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-dd-000.osl1-dd.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:05.207Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 980,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 67.28,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-dd',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-hn-001.trd1cl02-hn-prod.sky.nhn.no',
      },
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
        fieldValue: '2024-09-11T14:54:42Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-hn-001.trd1cl02-hn-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:43.12Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 11,
      },
      priceMonth: {
        fieldValue: 56939,
      },
      priceYear: {
        fieldValue: 683268,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '100',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 50208,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 51,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '738',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '256',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.73,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-plm-002.osl1-plm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-plm-002-2k9v',
      },
      clusterName: {
        fieldValue: 'q-plm-002',
      },
      clusterUid: {
        fieldValue: '8493860d-e57b-453e-813a-96cf8aeea8e9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-07-03T10:33:25Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-plm-002.osl1-plm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.535Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1917,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '34',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-plm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-gis-002.osl1-amk-prod.sky.nhn.no',
      },
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
        fieldValue: '2023-04-11T09:08:33Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-gis-002.osl1-amk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:40.265Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 8126,
      },
      priceYear: {
        fieldValue: 97512,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '20',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1281,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '78',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.41,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-amk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-bgs-001.trd1-lda.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-bgs-001-mj0i',
      },
      clusterName: {
        fieldValue: 'q-bgs-001',
      },
      clusterUid: {
        fieldValue: '26e0174b-f18a-4809-b7f8-0eafbf7aebd7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-15T09:27:10Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-bgs-001.trd1-lda.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:48.596Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 778,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.21,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-lda',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-uni-001.trd1cl02-uni-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-uni-001-w3z4',
      },
      clusterName: {
        fieldValue: 'p-uni-001',
      },
      clusterUid: {
        fieldValue: 'c97a3d77-d602-439c-941d-e7143cc23013',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-11T20:00:52Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-uni-001.trd1cl02-uni-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:46.885Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 10804,
      },
      priceYear: {
        fieldValue: 129648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3318,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '67',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 57.03,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-uni-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-tsc-001.trd1-tsc-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-tsc-001-l7wu',
      },
      clusterName: {
        fieldValue: 'p-tsc-001',
      },
      clusterUid: {
        fieldValue: '4991576d-875d-445a-83e1-a7d7f6dbc105',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-27T09:44:03Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-tsc-001.trd1-tsc-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:09.934Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1535,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '52',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.73,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-tsc-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-git-002.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-git-002-k2ab',
      },
      clusterName: {
        fieldValue: 'p-git-002',
      },
      clusterUid: {
        fieldValue: '2c335be2-e3af-470a-8073-e4682ce209e4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-10-30T10:58:28Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-git-002.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:03.526Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.8.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 8,
      },
      priceMonth: {
        fieldValue: 54529,
      },
      priceYear: {
        fieldValue: 654348,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '152',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4214,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 3.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '439',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 12.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-010.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-010-yee1',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-010',
      },
      clusterUid: {
        fieldValue: '0e2b01de-42af-47d6-8065-c94c89a93e8a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-04T08:55:50Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-010.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:53.601Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 11932,
      },
      priceYear: {
        fieldValue: 143184,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2329,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '37',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 26.21,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-hn-001.trd1cl02-hn-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-hn-001-254x',
      },
      clusterName: {
        fieldValue: 'q-hn-001',
      },
      clusterUid: {
        fieldValue: '597d05e5-3726-4fea-b948-dddae27827e8',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-07-16T12:25:29Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-hn-001.trd1cl02-hn-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.202Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 16677,
      },
      priceYear: {
        fieldValue: 200124,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5017,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 18.75,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '125',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 61.53,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-smax-002.trd1cl02-smax-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-smax-002-nkku',
      },
      clusterName: {
        fieldValue: 'p-smax-002',
      },
      clusterUid: {
        fieldValue: '8b99f7af-dac0-4052-a436-7313bc50d462',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-02-16T10:57:20Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-smax-002.trd1cl02-smax-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.277Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 7,
      },
      priceMonth: {
        fieldValue: 42891,
      },
      priceYear: {
        fieldValue: 514692,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '80',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6329,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.75,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '534',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '172',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.26,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-smax-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-trd-pam-001.trd1cl02-pam-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-trd-pam-001-vpxa',
      },
      clusterName: {
        fieldValue: 'p-trd-pam-001',
      },
      clusterUid: {
        fieldValue: '52ec20f7-358f-4843-8d98-2cb3936a743d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-08T11:20:50Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-trd-pam-001.trd1cl02-pam-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.582Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1963,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 43.17,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pam-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-per-et-001.trd1-per-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-per-et-001-zy3q',
      },
      clusterName: {
        fieldValue: 't-per-et-001',
      },
      clusterUid: {
        fieldValue: 'fd168449-a5f5-4012-821f-da1309bb8a2a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-01-30T11:21:20Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-per-et-001.trd1-per-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:53.321Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1262,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '32',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.92,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-per-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-rahmi-123.osl1-sky-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-rahmi-123-v06x',
      },
      clusterName: {
        fieldValue: 'd-rahmi-123',
      },
      clusterUid: {
        fieldValue: 'ed2cb33c-c75c-47b9-b2aa-1db93f74aad4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-30T12:17:25Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-rahmi-123.osl1-sky-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:17.765Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1621,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '35',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 37.05,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-sky-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-tu-001.trd1cl02-tu.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-tu-001-oems',
      },
      clusterName: {
        fieldValue: 'd-tu-001',
      },
      clusterUid: {
        fieldValue: 'f34c7f8e-416e-4df3-ab37-e8e8e7b038e9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-26T08:02:26Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-tu-001.trd1cl02-tu.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.99Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1511,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 67.03,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-tu',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ldp-001.trd1cl02-ldp-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-01-28T14:46:14Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ldp-001.trd1cl02-ldp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:06.173Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2163,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 51.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-ldp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.et-ncpehp-000.osl1-ncpehp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'et-ncpehp-000-w02z',
      },
      clusterName: {
        fieldValue: 'et-ncpehp-000',
      },
      clusterUid: {
        fieldValue: '5a9b9c8d-7be0-4005-bfb3-49c265e5b8e2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-12-09T09:21:29Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.et-ncpehp-000.osl1-ncpehp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:58.816Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 896,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.7,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpehp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-basis-002.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-basis-002-3cpw',
      },
      clusterName: {
        fieldValue: 'p-sfm-basis-002',
      },
      clusterUid: {
        fieldValue: '127a6bce-f60d-4507-bfa8-9c26d915d6bc',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-09-02T10:44:00Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-basis-002.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:31.593Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 11367,
      },
      priceYear: {
        fieldValue: 136404,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '28',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3285,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '109',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '53',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 48.1,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-wap-905.osl1-wap.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-wap-905-iek7',
      },
      clusterName: {
        fieldValue: 't-wap-905',
      },
      clusterUid: {
        fieldValue: 'cdb99309-5bce-440c-a0c8-5e1565f92f11',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-05-05T07:24:02Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-wap-905.osl1-wap.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:49.35Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 942,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 7.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 41.42,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-wap',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-cont-slackbot-001.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-cont-slackbot-001-33eh',
      },
      clusterName: {
        fieldValue: 't-cont-slackbot-001',
      },
      clusterUid: {
        fieldValue: '332dcd80-c7e3-4a8d-aa84-b911aeda7a1b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-03T12:13:32Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-cont-slackbot-001.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.851Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.7.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1630,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.44,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-gis-002.osl1-amk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-gis-002-ywtb',
      },
      clusterName: {
        fieldValue: 'q-gis-002',
      },
      clusterUid: {
        fieldValue: '793e164d-2dc0-4353-9463-aa4a92b5f3f5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-11T08:58:02Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-gis-002.osl1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:09.935Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1398,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.79,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-kyverno-123.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-kyverno-123-q228',
      },
      clusterName: {
        fieldValue: 't-kyverno-123',
      },
      clusterUid: {
        fieldValue: 'd1d8062f-579d-4653-8abb-48147b8b6835',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-13T11:35:32Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-kyverno-123.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.1+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.072Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.8.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 977,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.94,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-amk-003.trd1-amk-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-amk-003-wla8',
      },
      clusterName: {
        fieldValue: 'p-amk-003',
      },
      clusterUid: {
        fieldValue: '7dd3e7a5-2101-45e1-be17-2d516db1d574',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-01T09:35:37Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-amk-003.trd1-amk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.092Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1305,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 27.48,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-taa-000.trd1cl02-taa-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-taa-000-g25d',
      },
      clusterName: {
        fieldValue: 'p-taa-000',
      },
      clusterUid: {
        fieldValue: '58f1f4e2-7a4a-4290-a330-19e197e0022d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-01-21T15:28:57Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-taa-000.trd1cl02-taa-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:55.112Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2363,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 50.75,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-taa-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-inn-002.trd1-inn.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-inn-002-tn1p',
      },
      clusterName: {
        fieldValue: 'p-inn-002',
      },
      clusterUid: {
        fieldValue: 'c5d38583-972c-49c4-b2b8-27a7a1bac64c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-09-12T09:52:37Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-inn-002.trd1-inn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.614Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2288,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '37',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 52.71,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-inn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.contracts-test.osl1-contracts.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'contracts-test-wpc7',
      },
      clusterName: {
        fieldValue: 'contracts-test',
      },
      clusterUid: {
        fieldValue: 'df8e3d5b-7095-461b-821d-fc3adfe249ef',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-02-03T13:01:21Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.contracts-test.osl1-contracts.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:40.741Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 660,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.14,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-contracts',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-trd-ek-001.trd1-ek.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-trd-ek-001-gfbr',
      },
      clusterName: {
        fieldValue: 'p-trd-ek-001',
      },
      clusterUid: {
        fieldValue: 'f1cec42e-f378-4b9a-88a9-d94c092e3d2c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-17T08:23:43Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-trd-ek-001.trd1-ek.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:46.95Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1364,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.32,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-ek',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-osl-xcais-001.osl1-xcais.sky.nhn.no',
      },
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
        fieldValue: '2025-10-21T10:14:24Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-osl-xcais-001.osl1-xcais.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.232Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 2419,
      },
      priceYear: {
        fieldValue: 29028,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '6',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 850,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.01,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-xcais',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-gis-002.osl1-amk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-gis-002-yc14',
      },
      clusterName: {
        fieldValue: 't-gis-002',
      },
      clusterUid: {
        fieldValue: '421f212e-f4f8-4fd9-bc43-5f34c5b2a0ec',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-11-11T12:41:55Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-gis-002.osl1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:19.032Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2144,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.37,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-gis-001.trd1-amk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-gis-001-8rud',
      },
      clusterName: {
        fieldValue: 'q-gis-001',
      },
      clusterUid: {
        fieldValue: 'fd838d82-6e65-42ad-aa90-4b269c5c7a16',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-09-06T08:10:31Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-gis-001.trd1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.547Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1368,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 38.62,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-ror-001.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
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
        fieldValue: '2025-08-05T11:30:33Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-ror-001.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.612Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 8901,
      },
      priceYear: {
        fieldValue: 106812,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3371,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 18.18,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '86',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '46',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ds-001.trd1-lda.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ds-001-3d2w',
      },
      clusterName: {
        fieldValue: 'p-ds-001',
      },
      clusterUid: {
        fieldValue: '83a94998-5153-4ed8-aa1d-6686af65f293',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-06-07T11:35:07Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ds-001.trd1-lda.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.998Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 11862,
      },
      priceYear: {
        fieldValue: 142344,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1243,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 9.09,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '149',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 31.3,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-lda',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.mgmt-felles-0002.osl1-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'mgmt-felles-0002-gl3s',
      },
      clusterName: {
        fieldValue: 'mgmt-felles-0002',
      },
      clusterUid: {
        fieldValue: '167dd445-d04e-44fe-a0ce-81086eccad51',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-06-30T09:49:00Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.mgmt-felles-0002.osl1-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.86Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1699,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '32',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.14,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '2647684b-b3d8-417c-b491-87dc0e2c03a0',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.trd1-kj-qa002.trd1-kj-qa.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'trd1-kj-qa002-tmaz',
      },
      clusterName: {
        fieldValue: 'trd1-kj-qa002',
      },
      clusterUid: {
        fieldValue: 'a3ac9a64-acf7-4586-80ca-64a04b964b7f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-10-11T07:53:57Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.trd1-kj-qa002.trd1-kj-qa.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:06.358Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1492,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '34',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 72.29,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-kj-qa',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-spe-001.trd1-spe.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-spe-001-sr4t',
      },
      clusterName: {
        fieldValue: 't-spe-001',
      },
      clusterUid: {
        fieldValue: '43b8fb9c-baeb-4bb9-bfa9-92eb98253806',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-02-03T17:59:32Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-spe-001.trd1-spe.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:04.834Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5354,
      },
      priceYear: {
        fieldValue: 64248,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1428,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.42,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-spe',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sfm-srv-002.trd1cl02-sfm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-sfm-srv-002-5urg',
      },
      clusterName: {
        fieldValue: 't-sfm-srv-002',
      },
      clusterUid: {
        fieldValue: 'a139fd42-e586-4a42-b4a3-d993dbb78670',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-09-02T10:47:55Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sfm-srv-002.trd1cl02-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:08.005Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 14328,
      },
      priceYear: {
        fieldValue: 171936,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '28',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5853,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '172',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '60',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.77,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-tp-001.trd1cl02-tp-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-tp-001-tlvr',
      },
      clusterName: {
        fieldValue: 'p-tp-001',
      },
      clusterUid: {
        fieldValue: '6008d7e4-784f-40a1-a3b7-245558ae26ba',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-02-05T11:48:34Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-tp-001.trd1cl02-tp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.957Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 16607,
      },
      priceYear: {
        fieldValue: 199284,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '30',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4560,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '211',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.24,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-tp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-oss-001.trd1cl02-oss-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-oss-001-0noq',
      },
      clusterName: {
        fieldValue: 'p-oss-001',
      },
      clusterUid: {
        fieldValue: '022ad32e-9bac-4b5d-beee-0515498f9b10',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-12-04T09:40:47Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-oss-001.trd1cl02-oss-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.042Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2192,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.85,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-oss-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-osl-xcads-001.osl1-xcads.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-osl-xcads-001-om5w',
      },
      clusterName: {
        fieldValue: 'q-osl-xcads-001',
      },
      clusterUid: {
        fieldValue: 'f2e0e7cb-45f4-4d51-8a45-15e6e4f46a06',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-10-16T08:31:00Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-osl-xcads-001.osl1-xcads.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:05.959Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.8.0',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1996,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 61.75,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-xcads',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-rf-sekdat-001.trd1cl02-rf.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-rf-sekdat-001-64pv',
      },
      clusterName: {
        fieldValue: 't-rf-sekdat-001',
      },
      clusterUid: {
        fieldValue: 'f1d2d000-bcf6-47fd-a503-4663b2d12837',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-25T12:23:16Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-rf-sekdat-001.trd1cl02-rf.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:59.088Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1175,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.01,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rf',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-dcn-001.talos-dcn.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'TalosAZ',
      },
      clusterId: {
        fieldValue: 't-dcn-001-9m6y',
      },
      clusterName: {
        fieldValue: 't-dcn-001',
      },
      clusterUid: {
        fieldValue: 'd8b912f6-92ca-4a79-907f-300bd36e2bd3',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-23T07:29:13Z',
      },
      datacenter: {
        fieldValue: 'trd1 TalosAZ',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-dcn-001.talos-dcn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.2',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:24.818Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 16435,
      },
      priceYear: {
        fieldValue: 197220,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'trd1',
      },
      resourcesCpu: {
        fieldValue: '60',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3522,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 6.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '65',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 39.42,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 't-dcn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-pjdmon-001.trd1-pjdmon-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-pjdmon-001-banu',
      },
      clusterName: {
        fieldValue: 'p-pjdmon-001',
      },
      clusterUid: {
        fieldValue: 'f77ed846-fc1a-4e5a-92f2-dfc3d2a1c208',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-16T10:47:59Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-pjdmon-001.trd1-pjdmon-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.31.4+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:29.349Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1228,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.92,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-pjdmon-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-pts-001.osl1-team-pts-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-pts-001-mwgn',
      },
      clusterName: {
        fieldValue: 'p-pts-001',
      },
      clusterUid: {
        fieldValue: '2e1b906d-3a93-402f-bfc7-4caeda2090e6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-01-09T09:56:00Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-pts-001.osl1-team-pts-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.213Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1380,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 31.53,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-team-pts-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.osl-kj-qa001.osl1-kj-qa.sky.nhn.no',
      },
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
        fieldValue: '2025-10-02T09:01:21Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.osl-kj-qa001.osl1-kj-qa.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.053Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1849,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '37',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.31,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-kj-qa',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-per-et-201.osl1-per.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-per-et-201-vglo',
      },
      clusterName: {
        fieldValue: 't-per-et-201',
      },
      clusterUid: {
        fieldValue: '9931bcb4-dc88-4981-bafe-99b66072c0d6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-02T09:42:05Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-per-et-201.osl1-per.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.84Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1211,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 48.74,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-per',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-cry-obao-001.trd1cl02-cry-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-cry-obao-001-0cyy',
      },
      clusterName: {
        fieldValue: 'p-cry-obao-001',
      },
      clusterUid: {
        fieldValue: 'd79ba6f0-827e-4646-846e-b81064029361',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-28T12:25:35Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-cry-obao-001.trd1cl02-cry-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.1+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.998Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2911,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '36',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 38.17,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-cry-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-cry-obao-001.trd1cl02-cry.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-cry-obao-001-ib1x',
      },
      clusterName: {
        fieldValue: 't-cry-obao-001',
      },
      clusterUid: {
        fieldValue: '7af34545-f9d6-425a-9f9d-4f98a8b9d8d6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-28T10:46:47Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-cry-obao-001.trd1cl02-cry.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:12.384Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4857,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 27.78,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 36.11,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-cry',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-app-001.trd1-app.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-app-001-v9fw',
      },
      clusterName: {
        fieldValue: 'd-app-001',
      },
      clusterUid: {
        fieldValue: 'a9abf13c-a3b7-4161-a98e-92baad946d31',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-02-10T16:18:12Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-app-001.trd1-app.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:23.338Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 13436,
      },
      priceYear: {
        fieldValue: 161232,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6653,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 29.17,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '172',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '48',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 27.69,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-app',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.osl-kj-prod001.osl1-kj-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'osl-kj-prod001-f32w',
      },
      clusterName: {
        fieldValue: 'osl-kj-prod001',
      },
      clusterUid: {
        fieldValue: '136f13a3-29f2-4aec-a28f-32ecf770ea53',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-10-02T09:38:11Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.osl-kj-prod001.osl1-kj-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:15.7Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1850,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '38',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-kj-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-cry-mgmt-001.osl1-cry-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-cry-mgmt-001-vmgw',
      },
      clusterName: {
        fieldValue: 'p-cry-mgmt-001',
      },
      clusterUid: {
        fieldValue: '487b9faf-3ab7-4b62-9fc2-798c50eacfdc',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-02-19T14:05:55Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-cry-mgmt-001.osl1-cry-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.31.4+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:24.788Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1550,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 28.26,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-cry-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-sfm-thla-001.trd1cl02-sfm.sky.nhn.no',
      },
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
        fieldValue: '2024-04-22T08:24:20Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-sfm-thla-001.trd1cl02-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.662Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 8,
      },
      priceMonth: {
        fieldValue: 17849,
      },
      priceYear: {
        fieldValue: 214188,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '44',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5762,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 13.64,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '172',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '88',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 51.32,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-slackbot-001.trd1cl02-apt-sommer.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-slackbot-001-xlqf',
      },
      clusterName: {
        fieldValue: 't-slackbot-001',
      },
      clusterUid: {
        fieldValue: '58eecfb6-274b-4597-864d-58cc8d07b950',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-13T08:39:52Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-slackbot-001.trd1cl02-apt-sommer.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:27.286Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1054,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '18',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 57.28,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-apt-sommer',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-mtj-001.trd1cl02-mtj-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-mtj-001-4fop',
      },
      clusterName: {
        fieldValue: 'p-mtj-001',
      },
      clusterUid: {
        fieldValue: '6178c634-345a-42fd-9df4-bdca0906646c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-11-13T12:29:06Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-mtj-001.trd1cl02-mtj-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:41.146Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2693,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '41',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.07,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mtj-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-osltesting-123.osl1-sky-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-osltesting-123-g0om',
      },
      clusterName: {
        fieldValue: 't-osltesting-123',
      },
      clusterUid: {
        fieldValue: '23c68d49-6da3-444a-88a0-ee8c9e0b2232',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-01-07T13:18:50Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-osltesting-123.osl1-sky-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.31.4+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:07.508Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 2419,
      },
      priceYear: {
        fieldValue: 29028,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '6',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 665,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.63,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-sky-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-nn-001.trd1cl02-nn-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-03-27T09:41:02Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-nn-001.trd1cl02-nn-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:09.106Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6176,
      },
      priceYear: {
        fieldValue: 74112,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3183,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '33',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 71.45,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-nn-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-ncpeh-000.osl1-ncpeh.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-ncpeh-000-z6w9',
      },
      clusterName: {
        fieldValue: 't-ncpeh-000',
      },
      clusterUid: {
        fieldValue: '2699bd17-08c3-4d30-8dfa-5cb31eda2bc3',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-03-01T19:55:42Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-ncpeh-000.osl1-ncpeh.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:17.224Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 873,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 6.25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '41',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 65.35,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpeh',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-pps-001.trd1cl02-pps.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-pps-001-zulu',
      },
      clusterName: {
        fieldValue: 'd-pps-001',
      },
      clusterUid: {
        fieldValue: '71e09edc-8303-416b-a8fe-7107ad5a05a5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-10T12:13:27Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-pps-001.trd1cl02-pps.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:09.672Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4165,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 31.25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.97,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pps',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-007.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-007-xitw',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-007',
      },
      clusterUid: {
        fieldValue: 'ad48b9f0-9489-4a63-9e1c-ba5ea204d9c0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-18T11:17:51Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-007.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:08.343Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 14328,
      },
      priceYear: {
        fieldValue: 171936,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '28',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3075,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '172',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '49',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 28.45,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-inn-001.trd1cl02-inn.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-inn-001-p7gl',
      },
      clusterName: {
        fieldValue: 'q-inn-001',
      },
      clusterUid: {
        fieldValue: 'b511fbfa-d538-4b02-861e-e2dfcb788bdf',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-11T12:16:08Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-inn-001.trd1cl02-inn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.272Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1246,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.4,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-inn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-basis-004.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-basis-004-y7ey',
      },
      clusterName: {
        fieldValue: 'p-sfm-basis-004',
      },
      clusterUid: {
        fieldValue: 'be9ce2dd-045a-4fa5-a520-9e31a823894f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-12T10:30:40Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-basis-004.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.312Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 11932,
      },
      priceYear: {
        fieldValue: 143184,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3527,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '42',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.51,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-plm-002.osl1-plm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-plm-002-epu4',
      },
      clusterName: {
        fieldValue: 'p-plm-002',
      },
      clusterUid: {
        fieldValue: '2a677e60-1ad9-44b1-b32b-977584baa3bb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-03T07:38:46Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-plm-002.osl1-plm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.757Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1466,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-plm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-virk-001.trd1cl02-virk-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-virk-001-myzh',
      },
      clusterName: {
        fieldValue: 'p-virk-001',
      },
      clusterUid: {
        fieldValue: '6180b257-9f7c-47e4-8d01-a1bd8729ba75',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-30T13:14:16Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-virk-001.trd1cl02-virk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:49.61Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3087,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '35',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.57,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-virk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-ndl4-mon-001.trd1cl02-mfp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-ndl4-mon-001-ygga',
      },
      clusterName: {
        fieldValue: 't-ndl4-mon-001',
      },
      clusterUid: {
        fieldValue: '232e52e7-5915-4355-9390-ee6ef012d2b9',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-02-24T07:52:55Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-ndl4-mon-001.trd1cl02-mfp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:02.833Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2482,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 30,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.58,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mfp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-gdr-001.trd1cl02-team-gdr-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-gdr-001-s3rl',
      },
      clusterName: {
        fieldValue: 'p-gdr-001',
      },
      clusterUid: {
        fieldValue: '4cd04f32-7b3f-446a-ae89-d1199b8b3ac3',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-10T12:37:36Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-gdr-001.trd1cl02-team-gdr-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:43.271Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2190,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.68,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-team-gdr-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-009.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-009-tkhl',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-009',
      },
      clusterUid: {
        fieldValue: '3819dc22-d933-4b96-8fdc-ab8812fa0d62',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-23T08:46:45Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-009.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:21.823Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 19026,
      },
      priceYear: {
        fieldValue: 228312,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '36',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4489,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 13.89,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '235',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '88',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 37.62,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ncpeh-000.osl1-ncpeh-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ncpeh-000-9vbq',
      },
      clusterName: {
        fieldValue: 'p-ncpeh-000',
      },
      clusterUid: {
        fieldValue: '57e8e135-1d7d-4054-a6cb-86c65883c60e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-03-01T18:33:04Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ncpeh-000.osl1-ncpeh-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:05.129Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1670,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '36',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 50.82,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpeh-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-rap-001.trd1cl02-rap-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-rap-001-ym6l',
      },
      clusterName: {
        fieldValue: 'p-rap-001',
      },
      clusterUid: {
        fieldValue: '7d76c093-a4d5-4663-a924-e1d8fd84009f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-01-15T07:50:22Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-rap-001.trd1cl02-rap-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.025Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3958,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '37',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 52.86,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rap-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-kaf-001.trd1cl02-kaf-int.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-kaf-001-wjs2',
      },
      clusterName: {
        fieldValue: 't-kaf-001',
      },
      clusterUid: {
        fieldValue: '90dbf650-c20c-4a7f-87a3-57dd11fb58b5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-15T08:52:18Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-kaf-001.trd1cl02-kaf-int.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.801Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 10029,
      },
      priceYear: {
        fieldValue: 120348,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3302,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 18.18,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '109',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.17,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-kaf-int',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-alert-000.trd1-ops.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-alert-000-vq9x',
      },
      clusterName: {
        fieldValue: 't-alert-000',
      },
      clusterUid: {
        fieldValue: 'b2692ee0-0826-4512-984e-3f17d680138e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-12-07T10:35:28Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-alert-000.trd1-ops.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:09.029Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1102,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.02,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-ops',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-soc-003.osl1-soc-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-soc-003-k864',
      },
      clusterName: {
        fieldValue: 'p-soc-003',
      },
      clusterUid: {
        fieldValue: 'a2af6cb0-d2b4-4f55-8df9-3066dbd6e885',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-02-06T11:25:47Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-soc-003.osl1-soc-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.458Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 15075,
      },
      priceYear: {
        fieldValue: 180900,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '48',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2126,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 6.25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.36,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-soc-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-gis-001.trd1-amk-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-gis-001-pxt3',
      },
      clusterName: {
        fieldValue: 'p-gis-001',
      },
      clusterUid: {
        fieldValue: '97ae7b78-2d92-46a1-9661-44da1e94c0fa',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-12-12T09:09:19Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-gis-001.trd1-amk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:55.203Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1212,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 40.56,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-sb-000.trd1-sb-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-sb-000-4l46',
      },
      clusterName: {
        fieldValue: 'q-sb-000',
      },
      clusterUid: {
        fieldValue: '5b04aab9-d7be-4eab-8e86-6495e87d0038',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-25T11:25:36Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-sb-000.trd1-sb-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:07.892Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1637,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.4,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-sb-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-cd-001.trd1-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-cd-001-d67e',
      },
      clusterName: {
        fieldValue: 'p-cd-001',
      },
      clusterUid: {
        fieldValue: 'c8954f42-9093-42a2-bb6e-77f7a6f841e0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-09-23T11:17:02Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-cd-001.trd1-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.881Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2122,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '33',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 47.01,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-ptr-001.osl1-pastrans.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-ptr-001-aku6',
      },
      clusterName: {
        fieldValue: 't-ptr-001',
      },
      clusterUid: {
        fieldValue: '3b602a43-ca08-498a-81a8-6258dd36ff8c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-12-05T14:47:55Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-ptr-001.osl1-pastrans.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.686Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1071,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 67.65,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-pastrans',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-015.trd1cl02-sfm-prod2.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-015-dujz',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-015',
      },
      clusterUid: {
        fieldValue: '4fd12e51-2606-4bc0-8281-c6576cd1dac3',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-10-06T18:49:51Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-015.trd1cl02-sfm-prod2.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:20.929Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 11932,
      },
      priceYear: {
        fieldValue: 143184,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2760,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '42',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.68,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod2',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-per-001.trd1-per-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-per-001-eme9',
      },
      clusterName: {
        fieldValue: 'd-per-001',
      },
      clusterUid: {
        fieldValue: 'd88a428a-9637-4f23-9674-6b4e34c6f904',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-01-30T11:20:29Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-per-001.trd1-per-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.514Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1461,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 70.18,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-per-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-004.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-004-ibe8',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-004',
      },
      clusterUid: {
        fieldValue: '4367ae47-9c66-4f0f-8f52-3823cfdac221',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-18T11:16:24Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-004.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:20.72Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 16677,
      },
      priceYear: {
        fieldValue: 200124,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3465,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '60',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.54,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-ptr-001.osl1-pastrans.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-ptr-001-0tk4',
      },
      clusterName: {
        fieldValue: 'q-ptr-001',
      },
      clusterUid: {
        fieldValue: '2a57a0b0-ae31-49a0-9b3f-cc8a8e6e11cd',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-24T13:23:53Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-ptr-001.osl1-pastrans.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:52Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 832,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '17',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.56,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-pastrans',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-rorgpt-001.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-rorgpt-001-y599',
      },
      clusterName: {
        fieldValue: 'q-rorgpt-001',
      },
      clusterUid: {
        fieldValue: 'c882c4f3-07e5-47db-a051-551a5567dd1a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-11-30T12:30:24Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-rorgpt-001.trd1cl02-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:19.022Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 15897,
      },
      priceYear: {
        fieldValue: 190764,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '50',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1472,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 4,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '102',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 18.96,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.qatd-pers-901.trd1cl02-pers.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'qatd-pers-901-sbp8',
      },
      clusterName: {
        fieldValue: 'qatd-pers-901',
      },
      clusterUid: {
        fieldValue: '4c0aa3ce-b70a-4ba5-830a-d02b7da0cabc',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-25T11:20:24Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.qatd-pers-901.trd1cl02-pers.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:06.212Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1101,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 48.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pers',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-amk-002.osl1-amk.sky.nhn.no',
      },
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
        fieldValue: '2022-10-31T21:21:33Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-amk-002.osl1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.339Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 14608,
      },
      priceYear: {
        fieldValue: 175296,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '36',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3740,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '53',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 37.68,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-il-001.trd1cl02-il.sky.nhn.no',
      },
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
        fieldValue: '2024-12-11T13:09:27Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-il-001.trd1cl02-il.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:18.393Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2641,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '32',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.41,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-il',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-mgmt-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-mgmt-001-zgkv',
      },
      clusterName: {
        fieldValue: 'p-sfm-mgmt-001',
      },
      clusterUid: {
        fieldValue: 'c8ebd47d-bea0-4dcb-9fda-9a7009ef839d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-04T08:45:40Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-mgmt-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:27.522Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 8901,
      },
      priceYear: {
        fieldValue: 106812,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3141,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 18.18,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '86',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '45',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 52.22,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-osl-xcads-001.osl1-xcads-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-08-12T08:20:37Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-osl-xcads-001.osl1-xcads-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.668Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1423,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.99,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-xcads-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-tp-004.trd1cl02-tp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-tp-004-xs6r',
      },
      clusterName: {
        fieldValue: 'd-tp-004',
      },
      clusterUid: {
        fieldValue: '7bfe6db4-c73b-4211-89c6-a8ee02448f6f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-20T14:24:27Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-tp-004.trd1cl02-tp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:36.124Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 11862,
      },
      priceYear: {
        fieldValue: 142344,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2327,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 13.64,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '149',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 18.92,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-tp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-dd-001.trd1cl02-dd-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-dd-001-aw1u',
      },
      clusterName: {
        fieldValue: 'p-dd-001',
      },
      clusterUid: {
        fieldValue: 'd4752b81-52e7-49a8-8c7c-c3b41635a708',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-05-10T07:18:00Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-dd-001.trd1cl02-dd-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:12.408Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4648,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 27.78,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '42',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 59.72,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-dd-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-komsat-001.osl1-komsat-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-komsat-001-j2tu',
      },
      clusterName: {
        fieldValue: 'p-komsat-001',
      },
      clusterUid: {
        fieldValue: 'eff6f41d-4f82-44e9-ba32-ffae667c1500',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-12-09T12:37:41Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-komsat-001.osl1-komsat-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.025Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9513,
      },
      priceYear: {
        fieldValue: 114156,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1320,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 26.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-komsat-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: 'ece3ef21-11c0-430f-8c1e-e9056810d0ef',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-student-001.osl1-pastrans.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-student-001-ddb1',
      },
      clusterName: {
        fieldValue: 'd-student-001',
      },
      clusterUid: {
        fieldValue: 'b173b082-b99e-4cfc-b92a-20943d07fa66',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-18T10:38:22Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-student-001.osl1-pastrans.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:17.137Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 992,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.14,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-pastrans',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-001-u7w2',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-001',
      },
      clusterUid: {
        fieldValue: 'bc9d26b6-1c01-4549-b441-c5e83a772bab',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-01T10:12:35Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-001.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:07.655Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 30057,
      },
      priceYear: {
        fieldValue: 360684,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '92',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 21808,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 23.91,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '103',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 50.74,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-komlink-001.trd1cl02-komlink-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-04-16T08:52:16Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-komlink-001.trd1cl02-komlink-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:21.063Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3280,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '35',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.32,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-komlink-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-soc-777.osl1-soc.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-soc-777-7byp',
      },
      clusterName: {
        fieldValue: 't-soc-777',
      },
      clusterUid: {
        fieldValue: '498c875a-b0e0-424c-a7bf-8c9a12364b06',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-19T12:16:15Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-soc-777.osl1-soc.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.452Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2076,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '40',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 57.49,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-soc',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-stat-001.osl1-stat.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-stat-001-ctjp',
      },
      clusterName: {
        fieldValue: 'd-stat-001',
      },
      clusterUid: {
        fieldValue: '81613ccd-e9f0-48a5-9923-74d209ec6a89',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-02-20T07:18:36Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-stat-001.osl1-stat.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:34.676Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.11',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4579,
      },
      priceYear: {
        fieldValue: 54948,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 773,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 7.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '14',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 46.63,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-stat',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-trd-mon-001.trd1-pjdmon-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-trd-mon-001-1bq4',
      },
      clusterName: {
        fieldValue: 'p-trd-mon-001',
      },
      clusterUid: {
        fieldValue: '2ec7f305-c051-49e3-a897-6b8e65c9ddd6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-16T06:53:21Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-trd-mon-001.trd1-pjdmon-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.31.4+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.764Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1309,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.69,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-pjdmon-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-rfi-000.osl1-rf-it.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-rfi-000-2vru',
      },
      clusterName: {
        fieldValue: 'd-rfi-000',
      },
      clusterUid: {
        fieldValue: 'c41a478e-a88a-4f5f-b813-db47a9585da8',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-01-18T12:38:43Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-rfi-000.osl1-rf-it.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.698Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 806,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.89,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-rf-it',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-par-001.trd1cl02-par.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-par-001-8jep',
      },
      clusterName: {
        fieldValue: 't-par-001',
      },
      clusterUid: {
        fieldValue: '97c34b5f-a481-4989-a965-20c8ee642184',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-28T11:50:53Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-par-001.trd1cl02-par.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.563Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2002,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 21.43,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.68,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-par',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-003.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-003-pxcz',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-003',
      },
      clusterUid: {
        fieldValue: 'c6911660-1c5f-448c-a2ec-2e422b992301',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-18T11:16:28Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-003.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.883Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 16677,
      },
      priceYear: {
        fieldValue: 200124,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '32',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3992,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '204',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 30.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-kaf-001.trd1cl02-kaf-int.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-kaf-001-wd0d',
      },
      clusterName: {
        fieldValue: 'p-kaf-001',
      },
      clusterUid: {
        fieldValue: '20516c8b-ddc4-4eea-bbbc-8d828df5047f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-29T07:58:49Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-kaf-001.trd1cl02-kaf-int.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:24.265Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 10804,
      },
      priceYear: {
        fieldValue: 129648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3038,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-kaf-int',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.qatd-virk-201.osl1-virk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'qatd-virk-201-fwo8',
      },
      clusterName: {
        fieldValue: 'qatd-virk-201',
      },
      clusterUid: {
        fieldValue: 'df5f978a-e01b-44a5-b32c-d2514960b2f5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-31T09:56:37Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.qatd-virk-201.osl1-virk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:41.833Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 867,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 61.49,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-virk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-rf-001.trd1cl02-rf-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-rf-001-420x',
      },
      clusterName: {
        fieldValue: 'p-rf-001',
      },
      clusterUid: {
        fieldValue: '5288aac4-ef9e-4666-a6c9-9c1d55be2fd5',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-02-08T10:22:00Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-rf-001.trd1cl02-rf-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.725Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1871,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.84,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rf-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-mtj-001.trd1cl02-mtj.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-mtj-001-kjcd',
      },
      clusterName: {
        fieldValue: 't-mtj-001',
      },
      clusterUid: {
        fieldValue: 'fceea881-0604-4bc3-b406-1f9505bc4028',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-11-13T12:16:14Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-mtj-001.trd1cl02-mtj.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.374Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2377,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 18.75,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 43.57,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mtj',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '8c2bc6c9-a595-4d18-b182-f6e084d90807',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.mgmt-felles-0001-staging.trd1-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'mgmt-felles-0001-staging-zpvg',
      },
      clusterName: {
        fieldValue: 'mgmt-felles-0001-staging',
      },
      clusterUid: {
        fieldValue: 'd5c4c5ed-be6c-4c17-b25b-777b075d1745',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-01-27T09:20:18Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.mgmt-felles-0001-staging.trd1-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:09.73Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1957,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '37',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 52.19,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: 'beb1c7a3-22a8-406d-b471-5df028012f52',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.trd1-kj-prod001.trd1-kj-prod.sky.nhn.no',
      },
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
        fieldValue: '2022-10-10T08:37:06Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.trd1-kj-prod001.trd1-kj-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.536Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2811,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '38',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 40.19,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-kj-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-mtj-001.trd1cl02-mtj.sky.nhn.no',
      },
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
        fieldValue: '2023-11-13T12:20:05Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-mtj-001.trd1cl02-mtj.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.494Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2599,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '33',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 47.03,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mtj',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-002.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-002-7ocn',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-002',
      },
      clusterUid: {
        fieldValue: 'e8a206a7-05a4-46fc-94c0-2c6e740c399b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-18T10:21:33Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-002.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.415Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 7,
      },
      priceMonth: {
        fieldValue: 21422,
      },
      priceYear: {
        fieldValue: 257064,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '40',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6627,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 17.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '266',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 26.21,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.osl-kj-qa002.osl1-kj-qa.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'osl-kj-qa002-17vm',
      },
      clusterName: {
        fieldValue: 'osl-kj-qa002',
      },
      clusterUid: {
        fieldValue: 'caab0d3f-e7a4-48ae-9b82-542e218445c0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-12-14T11:11:42Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.osl-kj-qa002.osl1-kj-qa.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:32.277Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 849,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.48,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-kj-qa',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-nav-001.trd1cl02-dhp-nav-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-nav-001-b8hf',
      },
      clusterName: {
        fieldValue: 'p-nav-001',
      },
      clusterUid: {
        fieldValue: 'c1474837-778d-4ab3-a1bc-572fe40c9bb0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-08T13:37:57Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-nav-001.trd1cl02-dhp-nav-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:32.23Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 17074,
      },
      priceYear: {
        fieldValue: 204888,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '42',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6195,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '164',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 71.28,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-dhp-nav-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-dns-001.trd1cl02-ldp-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-02-10T16:16:08Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-dns-001.trd1cl02-ldp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.988Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2658,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 54.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-ldp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ncpehp-000.osl1-ncpehp-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ncpehp-000-hh1z',
      },
      clusterName: {
        fieldValue: 'p-ncpehp-000',
      },
      clusterUid: {
        fieldValue: '50e7e0d5-b89e-4b21-a973-10e40669a446',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-17T08:11:27Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ncpehp-000.osl1-ncpehp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:24.651Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1385,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.04,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpehp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-sb-001.trd1cl02-team-selvbetjening.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-sb-001-9wvl',
      },
      clusterName: {
        fieldValue: 'd-sb-001',
      },
      clusterUid: {
        fieldValue: 'b120d8c8-2911-4cf6-8136-679c3150f63c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-02-06T19:35:16Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-sb-001.trd1cl02-team-selvbetjening.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:49.745Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 11061,
      },
      priceYear: {
        fieldValue: 132732,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '30',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2774,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 50.46,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-team-selvbetjening',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-mitt-nettverk-001.osl1-mitt-nettverk-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-01-21T14:40:18Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-mitt-nettverk-001.osl1-mitt-nettverk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:58.657Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1319,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.49,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-mitt-nettverk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-trd-ek-001.trd1-ek.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-trd-ek-001-9kr9',
      },
      clusterName: {
        fieldValue: 'd-trd-ek-001',
      },
      clusterUid: {
        fieldValue: 'e6f129cc-aac9-4f37-a3de-c38e65250b38',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-29T13:59:43Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-trd-ek-001.trd1-ek.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:38.126Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 971,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.84,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-ek',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-per-201.osl1-per-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-per-201-pwc3',
      },
      clusterName: {
        fieldValue: 'p-per-201',
      },
      clusterUid: {
        fieldValue: '2237fd81-1dc1-41df-9b91-a8fb8250cf92',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-09-16T09:27:03Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-per-201.osl1-per-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.474Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 10545,
      },
      priceYear: {
        fieldValue: 126540,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '26',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2410,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.54,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '101',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '35',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.43,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-per-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-nn-001.osl1-nn.sky.nhn.no',
      },
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
        fieldValue: '2025-03-27T09:23:37Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-nn-001.osl1-nn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:29.459Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2200,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 18.75,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '41',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.07,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-nn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-mot-001.osl1-mot.sky.nhn.no',
      },
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
        fieldValue: '2026-02-10T08:21:18Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-mot-001.osl1-mot.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:15.334Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.11',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 8126,
      },
      priceYear: {
        fieldValue: 97512,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '20',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1188,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '78',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 30.88,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-mot',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-uni-001.trd1cl02-uni.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-uni-001-sr0w',
      },
      clusterName: {
        fieldValue: 't-uni-001',
      },
      clusterUid: {
        fieldValue: 'ed8facc4-5015-423f-aa60-e1b5a60991b3',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-11T19:23:30Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-uni-001.trd1cl02-uni.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:39.972Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 10029,
      },
      priceYear: {
        fieldValue: 120348,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '22',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2280,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 13.64,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '109',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '60',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-uni',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sb-000.trd1-sb-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sb-000-v8d8',
      },
      clusterName: {
        fieldValue: 'p-sb-000',
      },
      clusterUid: {
        fieldValue: 'bb95efad-cfc6-4b8e-83a4-c9c01080477f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-02-16T14:03:59Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sb-000.trd1-sb-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:17.707Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2043,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.9,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-sb-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.sdi-per-prod.trd1-per.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'sdi-per-prod-ewn0',
      },
      clusterName: {
        fieldValue: 'sdi-per-prod',
      },
      clusterUid: {
        fieldValue: 'b046c755-356f-4e8b-bc72-43483dec546d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2021-12-01T11:26:37Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.sdi-per-prod.trd1-per.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.368Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 10545,
      },
      priceYear: {
        fieldValue: 126540,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '26',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3397,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 15.38,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '101',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '44',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.95,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-per',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-amk-001.trd1-amk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-amk-001-fc09',
      },
      clusterName: {
        fieldValue: 't-amk-001',
      },
      clusterUid: {
        fieldValue: '9deefa29-7d11-47b1-8290-1e4695c2f334',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-10-05T11:38:32Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-amk-001.trd1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.077Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 14608,
      },
      priceYear: {
        fieldValue: 175296,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '36',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5443,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.38,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-fellesloggshp-001.trd1cl02-shp-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-fellesloggshp-001-kk9j',
      },
      clusterName: {
        fieldValue: 'p-fellesloggshp-001',
      },
      clusterUid: {
        fieldValue: '64cb43a3-b0f6-4634-bea8-164cced5d65a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-11-08T12:06:16Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-fellesloggshp-001.trd1cl02-shp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.665Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2242,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 57.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-shp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-komsat-001.trd1cl02-komsat.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-komsat-001-zv16',
      },
      clusterName: {
        fieldValue: 'd-komsat-001',
      },
      clusterUid: {
        fieldValue: '26edec8f-6278-4a1b-81ee-684ac191245a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-03T08:22:52Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-komsat-001.trd1cl02-komsat.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.43Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 3311,
      },
      priceYear: {
        fieldValue: 39732,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1027,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '15',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.98,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-komsat',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sql-001.west-az1.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'TalosAZ',
      },
      clusterId: {
        fieldValue: 't-sql-001-wo0z',
      },
      clusterName: {
        fieldValue: '',
      },
      clusterUid: {
        fieldValue: '8d4dfc76-4b84-4d52-985a-6ca4a180bf41',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-06T11:45:21Z',
      },
      datacenter: {
        fieldValue: 'TalosDC TalosAZ',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sql-001.west-az1.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.34.1',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:24.515Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 22836,
      },
      priceYear: {
        fieldValue: 274032,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'TalosDC',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4327,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20.83,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '373',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '180',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 48.2,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'Talos',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.osl-kj-prod002.osl1-kj-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'osl-kj-prod002-0a8y',
      },
      clusterName: {
        fieldValue: 'osl-kj-prod002',
      },
      clusterUid: {
        fieldValue: 'bf31ad26-977e-482e-9854-f72d714a5540',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-12-15T12:50:27Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.osl-kj-prod002.osl1-kj-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.31.4+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:15.273Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1181,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 59.81,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-kj-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-vmiror-001.osl1-produktvm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-vmiror-001-nzza',
      },
      clusterName: {
        fieldValue: 'p-vmiror-001',
      },
      clusterUid: {
        fieldValue: '9ff7f4d1-66e2-477c-9290-9d2b33453a2e',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2026-01-29T08:44:25Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-vmiror-001.osl1-produktvm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:36.062Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4772,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 50,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.21,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-produktvm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-wap-001.osl1-wap.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-wap-001-mje0',
      },
      clusterName: {
        fieldValue: 't-wap-001',
      },
      clusterUid: {
        fieldValue: '2a0beacc-9f3d-4524-a4a8-52dc28beea8f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-10-18T14:57:58Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-wap-001.osl1-wap.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:23.142Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 12142,
      },
      priceYear: {
        fieldValue: 145704,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '30',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4827,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '50',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.91,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-wap',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-005.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-005-qp8u',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-005',
      },
      clusterUid: {
        fieldValue: '287e13a5-09ee-4569-9d9e-471318ebfe27',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-18T11:16:31Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-005.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:23.929Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 7,
      },
      priceMonth: {
        fieldValue: 21422,
      },
      priceYear: {
        fieldValue: 257064,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '40',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5128,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 15,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '266',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '95',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 35.64,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-soc-002.osl1-soc-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-10-29T13:16:16Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-soc-002.osl1-soc-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:52.213Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 8642,
      },
      priceYear: {
        fieldValue: 103704,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1506,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 37.8,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-soc-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-hn-001.trd1cl02-hn-test.sky.nhn.no',
      },
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
        fieldValue: '2024-01-04T12:14:43Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-hn-001.trd1cl02-hn-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.776Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 12,
      },
      priceMonth: {
        fieldValue: 43498,
      },
      priceYear: {
        fieldValue: 521976,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '96',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 14373,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 15.63,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '470',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '288',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 61.25,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-plm-001.trd1-plm-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-09-02T19:12:12Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-plm-001.trd1-plm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:06.751Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1456,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '34',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.04,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-plm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-fellesloggshp-001.trd1cl02-shp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-fellesloggshp-001-ync6',
      },
      clusterName: {
        fieldValue: 't-fellesloggshp-001',
      },
      clusterUid: {
        fieldValue: '45a849e1-ee40-4f3b-995a-821c6544d0cd',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-11-08T10:45:08Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-fellesloggshp-001.trd1cl02-shp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:57.133Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1448,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.14,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-shp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-ldp-001.trd1cl02-ldp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-ldp-001-59kr',
      },
      clusterName: {
        fieldValue: 't-ldp-001',
      },
      clusterUid: {
        fieldValue: 'a7b45801-9a19-4003-b9d1-3551ed8e21eb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-12T09:53:15Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-ldp-001.trd1cl02-ldp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.643Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1332,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '16',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 49.82,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-ldp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-amk-001.trd1-amk.sky.nhn.no',
      },
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
        fieldValue: '2022-10-05T08:12:41Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-amk-001.trd1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:07.057Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 14608,
      },
      priceYear: {
        fieldValue: 175296,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '36',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5529,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '63',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.1,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-per-yt-001.trd1-per-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-per-yt-001-csxv',
      },
      clusterName: {
        fieldValue: 't-per-yt-001',
      },
      clusterUid: {
        fieldValue: '3c1c3203-8df7-4984-a0b8-8fe428236390',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-01-30T11:21:21Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-per-yt-001.trd1-per-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:00.776Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 11297,
      },
      priceYear: {
        fieldValue: 135564,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '26',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1778,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 7.69,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '40',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 33.97,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-per-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-hn-vlt001.trd1cl02-hn-test.sky.nhn.no',
      },
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
        fieldValue: '2024-04-04T11:35:43Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-hn-vlt001.trd1cl02-hn-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:39.534Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2425,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.23,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-psky-005.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-psky-005-cfa3',
      },
      clusterName: {
        fieldValue: 't-psky-005',
      },
      clusterUid: {
        fieldValue: '922463cd-80de-444a-b3ad-1e2f2c7207e8',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-08-29T12:01:30Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-psky-005.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.10+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.269Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.11',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1001,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '18',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 29.19,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-db-001.talos-sqldb.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'TalosAZ',
      },
      clusterId: {
        fieldValue: 't-db-001-4d26',
      },
      clusterName: {
        fieldValue: 't-db-001',
      },
      clusterUid: {
        fieldValue: 'a8304500-cca4-4911-8b10-5f6464d0d21b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-28T07:04:25Z',
      },
      datacenter: {
        fieldValue: 'trd1 TalosAZ',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-db-001.talos-sqldb.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.33.0',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:47.26Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 8407,
      },
      priceYear: {
        fieldValue: 100884,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'trd1',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6119,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 29.17,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '65',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '33',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 50.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 't-nhn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-rf-001.trd1cl02-rf.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-rf-001-7kqf',
      },
      clusterName: {
        fieldValue: 't-rf-001',
      },
      clusterUid: {
        fieldValue: '0c4f575e-104a-40b6-8d21-553188851f96',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-02-08T10:12:51Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-rf-001.trd1cl02-rf.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.662Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 12399,
      },
      priceYear: {
        fieldValue: 148788,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '36',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2511,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '33',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.91,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-rf',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-geir-001.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-geir-001-b6bw',
      },
      clusterName: {
        fieldValue: 't-geir-001',
      },
      clusterUid: {
        fieldValue: '9faf0c94-9c6a-4f9e-8a5a-b6cae7967bb3',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-02T11:48:44Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-geir-001.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:10.878Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1248,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '16',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 40.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-kj-portal-001.trd1cl02-team-kjernejournal-portal.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-kj-portal-001-pk2p',
      },
      clusterName: {
        fieldValue: 'd-kj-portal-001',
      },
      clusterUid: {
        fieldValue: '2736130d-1e73-4bc9-9e7c-daf74bd974e7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-23T10:51:08Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-kj-portal-001.trd1cl02-team-kjernejournal-portal.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:57.125Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2054,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 37.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 63.54,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-team-kjernejournal-portal',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-pts-001.osl1-team-pts.sky.nhn.no',
      },
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
        fieldValue: '2023-01-05T12:09:22Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-pts-001.osl1-team-pts.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:51.487Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2563,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 37.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.65,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-team-pts',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-ncpeh-001.osl1-ncpeh.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-ncpeh-001-9snl',
      },
      clusterName: {
        fieldValue: 'd-ncpeh-001',
      },
      clusterUid: {
        fieldValue: '6afe9675-3b78-4091-bbed-114cb6d8428b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-09-12T07:32:57Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-ncpeh-001.osl1-ncpeh.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.93Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 774,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.33,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '26',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 56.62,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-ncpeh',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-dcn-001.talos-dcn.sky.nhn.no',
      },
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
        fieldValue: '2025-05-09T08:16:25Z',
      },
      datacenter: {
        fieldValue: 'trd1 TalosAZ',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-dcn-001.talos-dcn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.35.2',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:56.99Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 8407,
      },
      priceYear: {
        fieldValue: 100884,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'trd1',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2914,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '65',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 41.94,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'p-dcn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-tp-000.trd1-tp-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-tp-000-zpid',
      },
      clusterName: {
        fieldValue: 'p-tp-000',
      },
      clusterUid: {
        fieldValue: '77d8d78a-7dfb-4b36-b5d9-f8aa12345573',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-05-08T10:01:14Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-tp-000.trd1-tp-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:15.421Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1856,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 65.76,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-tp-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.pt-nav-002.osl1-dhp-nav.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'pt-nav-002-r8y7',
      },
      clusterName: {
        fieldValue: 'pt-nav-002',
      },
      clusterUid: {
        fieldValue: 'afdfb8c1-6303-4909-8725-283bc65636e7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-02-01T12:34:31Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.pt-nav-002.osl1-dhp-nav.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:32.837Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 7257,
      },
      priceYear: {
        fieldValue: 87084,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1929,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '46',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.42,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-dhp-nav',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-tsc-001.trd1-tsc.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-tsc-001-kbl8',
      },
      clusterName: {
        fieldValue: 't-tsc-001',
      },
      clusterUid: {
        fieldValue: '7ba6d924-6263-4616-ab6e-f21173dc57f7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-09-09T08:12:42Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-tsc-001.trd1-tsc.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:24.153Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1498,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '40',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.66,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-tsc',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-inn-001.trd1-inn.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-inn-001-orrp',
      },
      clusterName: {
        fieldValue: 't-inn-001',
      },
      clusterUid: {
        fieldValue: '73ef28c5-344a-4a69-b397-701743922ef2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-09-08T10:35:13Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-inn-001.trd1-inn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:20.295Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1013,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 62.64,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-inn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-jra-999.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-jra-999-11yg',
      },
      clusterName: {
        fieldValue: 'd-jra-999',
      },
      clusterUid: {
        fieldValue: '1596ffc3-6ed3-452a-ad05-183341af2654',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-08T10:56:04Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-jra-999.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:37.781Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2278,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 58.29,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'q-inn-web-001-wcxy',
      },
      clusterName: {
        fieldValue: 'q-inn-web-001',
      },
      clusterUid: {
        fieldValue: '8d0ad1e1-4c48-486d-8d8b-746dd00bc729',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-04T16:55:09Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:42.917Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1216,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.44,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-inn-web',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-tp-001.trd1-tp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-tp-001-tv5r',
      },
      clusterName: {
        fieldValue: 'd-tp-001',
      },
      clusterUid: {
        fieldValue: '99c097b3-72d5-427c-9af4-c71d98e00bfc',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-05-08T09:57:56Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-tp-001.trd1-tp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.021Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1538,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '34',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 61.84,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-tp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-jra-888.trd1cl02-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-jra-888-as1u',
      },
      clusterName: {
        fieldValue: 't-jra-888',
      },
      clusterUid: {
        fieldValue: '1c455c54-ec26-4a3b-b3ea-9202f1dfc0e2',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-12-11T12:21:50Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-jra-888.trd1cl02-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.774Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2401,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '30',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 43.35,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-soc-001.osl1-soc-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-soc-001-z1mv',
      },
      clusterName: {
        fieldValue: 'p-soc-001',
      },
      clusterUid: {
        fieldValue: 'dc8d4339-a61f-4ebf-9b73-54a8032dc5b6',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-06-03T12:19:20Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-soc-001.osl1-soc-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:25.848Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 15075,
      },
      priceYear: {
        fieldValue: 180900,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '48',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2481,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 6.25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '42',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-soc-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-pers-201.osl1-pers-prod.sky.nhn.no',
      },
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
        fieldValue: '2026-01-05T07:46:09Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-pers-201.osl1-pers-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:02.578Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 4016,
      },
      priceYear: {
        fieldValue: 48192,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 907,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 10,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 51.5,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-pers-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-komlink-001.trd1cl02-komlink.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-komlink-001-01kf',
      },
      clusterName: {
        fieldValue: 't-komlink-001',
      },
      clusterUid: {
        fieldValue: 'a7f0dd50-2035-45ea-bedd-2e03aa2e51c4',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-14T07:56:08Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-komlink-001.trd1cl02-komlink.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.377Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1595,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 46.96,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-komlink',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.mgmt-felles-0001.trd1-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'mgmt-felles-0001-aoet',
      },
      clusterName: {
        fieldValue: 'mgmt-felles-0001',
      },
      clusterUid: {
        fieldValue: 'd39a3cfa-56a7-482e-aa07-200a1d97d684',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2021-11-18T10:01:20Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'mgmt',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.mgmt-felles-0001.trd1-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:29.489Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 35082,
      },
      priceYear: {
        fieldValue: 420984,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '108',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3540,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 3.7,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '235',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '82',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.79,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-osl-asky-001.osl1-asky.sky.nhn.no',
      },
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
        fieldValue: '2026-01-07T12:54:50Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-osl-asky-001.osl1-asky.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.201Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1152,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '19',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 34.9,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-asky',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-mrs-001.trd1cl02-mrs-test.sky.nhn.no',
      },
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
        fieldValue: '2024-10-31T12:55:00Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-mrs-001.trd1cl02-mrs-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:08.945Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1769,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.12,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mrs-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.sdi-ror-dev.trd1-nhn-mgmt.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'sdi-ror-dev-953z',
      },
      clusterName: {
        fieldValue: 'sdi-ror-dev',
      },
      clusterUid: {
        fieldValue: 'cf5f6d2a-f66b-4ab7-be11-1bdcc69f8cb1',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-03-17T14:06:47Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.sdi-ror-dev.trd1-nhn-mgmt.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:07.135Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 27591,
      },
      priceYear: {
        fieldValue: 331092,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '86',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6683,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.14,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '180',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '73',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 40.43,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-nhn-mgmt',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-cat-001.trd1cl02-cyberactionteam-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-cat-001-qh8y',
      },
      clusterName: {
        fieldValue: 'p-cat-001',
      },
      clusterUid: {
        fieldValue: 'c5c9c545-0bf7-40c8-b9a9-1818216cf7c0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-06-20T11:30:33Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-cat-001.trd1cl02-cyberactionteam-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:57.973Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2882,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '29',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 31.43,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-cyberactionteam-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sfm-fest-001.trd1cl02-sfm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-sfm-fest-001-60bc',
      },
      clusterName: {
        fieldValue: 't-sfm-fest-001',
      },
      clusterUid: {
        fieldValue: '2f6c282c-a7d4-4f77-a7b6-2ad9ceb42b8c',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-03-03T11:20:24Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sfm-fest-001.trd1cl02-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:35.499Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 8691,
      },
      priceYear: {
        fieldValue: 104292,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3086,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '110',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '36',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.73,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-amk-002.osl1-amk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-amk-002-n2y9',
      },
      clusterName: {
        fieldValue: 't-amk-002',
      },
      clusterUid: {
        fieldValue: '201c2bbb-588f-41c3-bb5d-eec2f5fd7682',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-04-11T08:38:24Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-amk-002.osl1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:16.736Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.12',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 6,
      },
      priceMonth: {
        fieldValue: 14608,
      },
      priceYear: {
        fieldValue: 175296,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '36',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4351,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 13.89,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '61',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 43.13,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-kj-portal-002.trd1-team-kjernejournal-portal.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-kj-portal-002-c8h3',
      },
      clusterName: {
        fieldValue: 't-kj-portal-002',
      },
      clusterUid: {
        fieldValue: '8dc4bf1d-bfcc-4f06-85c5-485eca91b1fb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-07T09:46:14Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-kj-portal-002.trd1-team-kjernejournal-portal.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.684Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.7.1',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1628,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 66.49,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-team-kjernejournal-portal',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-alert-000.trd1-ops.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-alert-000-aqai',
      },
      clusterName: {
        fieldValue: 'p-alert-000',
      },
      clusterUid: {
        fieldValue: '8b20d42f-a43a-4792-a6a1-480c248b7f74',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-08-24T18:53:52Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-alert-000.trd1-ops.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:22.417Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.0',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1834,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.11,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 44.59,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-ops',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-amk-003.trd1-amk.sky.nhn.no',
      },
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
        fieldValue: '2024-06-02T14:40:44Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-amk-003.trd1-amk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.817Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9723,
      },
      priceYear: {
        fieldValue: 116676,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2520,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '94',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-amk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-splunk-dashpub-001.trd1cl02-mon-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-splunk-dashpub-001-02vu',
      },
      clusterName: {
        fieldValue: 'p-splunk-dashpub-001',
      },
      clusterUid: {
        fieldValue: 'c6b6b7e6-251d-4ccb-bfb1-c39e947e4999',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-29T12:33:34Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-splunk-dashpub-001.trd1cl02-mon-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:44.806Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2081,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '25',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 53.83,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-mon-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ptr-001.osl1-pastrans-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-ptr-001-53yq',
      },
      clusterName: {
        fieldValue: 'p-ptr-001',
      },
      clusterUid: {
        fieldValue: '283dd364-0a06-4064-b615-228c48acd024',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-25T12:11:25Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ptr-001.osl1-pastrans-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:53.556Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1178,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '24',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 52.66,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-pastrans-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-taa-000.trd1cl02-taa.sky.nhn.no',
      },
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
        fieldValue: '2024-11-12T08:33:44Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-taa-000.trd1cl02-taa.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:39.009Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1992,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '27',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.55,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-taa',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-inn-web-001-z6zz',
      },
      clusterName: {
        fieldValue: 'd-inn-web-001',
      },
      clusterUid: {
        fieldValue: 'c7c0a44e-9b16-4bff-b74a-43df0b7fd7eb',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-11-04T13:09:43Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-inn-web-001.trd1-inn-web.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:48.722Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1202,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 65.75,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-inn-web',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-lb-001.trd1cl02-lb.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-lb-001-dhi0',
      },
      clusterName: {
        fieldValue: 'p-lb-001',
      },
      clusterUid: {
        fieldValue: '8ea3c4bd-783d-479b-a784-d6626a263078',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-18T05:49:12Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-lb-001.trd1cl02-lb.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.643Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2042,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '22',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 47.33,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-lb',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-osl-xcads-001.osl1-xcads.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-osl-xcads-001-nttx',
      },
      clusterName: {
        fieldValue: 't-osl-xcads-001',
      },
      clusterUid: {
        fieldValue: '722e0db6-b619-4c7f-95ca-da96acf87d2f',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-12T08:20:23Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-osl-xcads-001.osl1-xcads.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:18.159Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3388,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 22.22,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '32',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 46.02,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-xcads',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-intsam-001.osl1-nhn-tooling.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-intsam-001-s7e0',
      },
      clusterName: {
        fieldValue: 't-intsam-001',
      },
      clusterUid: {
        fieldValue: '80ed99e1-222d-451a-af9f-098728abcfd1',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-10-23T12:13:18Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-intsam-001.osl1-nhn-tooling.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:11.759Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 5,
      },
      priceMonth: {
        fieldValue: 10545,
      },
      priceYear: {
        fieldValue: 126540,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '26',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2005,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.54,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '101',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '40',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 39.15,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-nhn-tooling',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-virk-201.osl1-virk-prod.sky.nhn.no',
      },
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
        fieldValue: '2025-10-14T13:08:43Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-virk-201.osl1-virk-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:14.241Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 4,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1738,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '54',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '32',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 59.6,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-virk-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-smax-001.trd1cl02-smax.sky.nhn.no',
      },
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
        fieldValue: '2024-04-03T08:32:56Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-smax-001.trd1cl02-smax.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:58.93Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 7,
      },
      priceMonth: {
        fieldValue: 29875,
      },
      priceYear: {
        fieldValue: 358500,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '68',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5439,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 8.82,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '313',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '142',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 45.32,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-smax',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sfm-srv-001.trd1cl02-sfm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-sfm-srv-001-vzbh',
      },
      clusterName: {
        fieldValue: 't-sfm-srv-001',
      },
      clusterUid: {
        fieldValue: 'ba69e796-1b41-4d81-a18b-3307113fb0c7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-02-06T13:45:38Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sfm-srv-001.trd1cl02-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:24:40.635Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 8,
      },
      priceMonth: {
        fieldValue: 23771,
      },
      priceYear: {
        fieldValue: 285252,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '44',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4298,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 11.36,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '298',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '72',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 24.06,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-ori-001.trd1cl02-ori.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-ori-001-9vru',
      },
      clusterName: {
        fieldValue: 't-ori-001',
      },
      clusterUid: {
        fieldValue: '0b67e45b-06f9-4120-ae30-95eb5beae83b',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-10T17:04:08Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-ori-001.trd1cl02-ori.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:30.955Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 2,
      },
      priceMonth: {
        fieldValue: 5800,
      },
      priceYear: {
        fieldValue: 69600,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2905,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '39',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '22',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 55.31,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-ori',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.qatd-pers-001.trd1cl02-pers.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'qatd-pers-001-dxqg',
      },
      clusterName: {
        fieldValue: 'qatd-pers-001',
      },
      clusterUid: {
        fieldValue: '8dba5c33-bc8b-43ee-a5ae-405428cfb061',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-01-30T13:15:56Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.qatd-pers-001.trd1cl02-pers.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:18.117Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2761,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '34',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 48.61,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pers',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.q-dd-000.osl1-dd.sky.nhn.no',
      },
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
        fieldValue: 'd23d1a0f-a460-4490-a558-e7c65ea8b199',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-27T13:56:02Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'qa',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.q-dd-000.osl1-dd.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:13.309Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1009,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '21',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 68.24,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-dd',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '3ea563fa-5c0b-491b-947b-ce08819ceb72',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-008.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-008-7h62',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-008',
      },
      clusterUid: {
        fieldValue: '2279a1a9-d5d9-404f-995a-58e7f8b2de71',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-05-12T10:31:46Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-008.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:41.148Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 11932,
      },
      priceYear: {
        fieldValue: 143184,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '24',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 3780,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '141',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '43',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 30.86,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-inn-002.trd1-inn.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-inn-002-hano',
      },
      clusterName: {
        fieldValue: 'd-inn-002',
      },
      clusterUid: {
        fieldValue: '25b18852-c126-4f8b-b696-6bab0e8671c8',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-10-15T20:31:10Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-inn-002.trd1-inn.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:19.211Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1496,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 25,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '18',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 57.31,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-inn',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-sfm-free-002.trd1cl02-sfm.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-sfm-free-002-isc9',
      },
      clusterName: {
        fieldValue: 't-sfm-free-002',
      },
      clusterUid: {
        fieldValue: '2e3e152a-3724-46ad-a3b0-d6bd088f9544',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-11-15T11:44:34Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-sfm-free-002.trd1cl02-sfm.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:54.146Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 9513,
      },
      priceYear: {
        fieldValue: 114156,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2531,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '117',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '38',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.19,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.qatd-virk-001.trd1cl02-virk.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'qatd-virk-001-fcba',
      },
      clusterName: {
        fieldValue: 'qatd-virk-001',
      },
      clusterUid: {
        fieldValue: '55d27099-bd33-443b-a31f-fab5ef2f5434',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-09-15T07:53:24Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.qatd-virk-001.trd1cl02-virk.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:58.536Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 7304,
      },
      priceYear: {
        fieldValue: 87648,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '18',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 4198,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 27.78,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '70',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '43',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.99,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-virk',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-pps-001.trd1cl02-pps.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-pps-001-y5r1',
      },
      clusterName: {
        fieldValue: 't-pps-001',
      },
      clusterUid: {
        fieldValue: '57a2d0a6-0fdb-482d-b3b3-11fa71d44872',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-08T09:50:32Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-pps-001.trd1cl02-pps.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:02.585Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 2509,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 18.75,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '35',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 56.79,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-pps',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-sfm-srv-006.trd1cl02-sfm-prod.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'p-sfm-srv-006-gah4',
      },
      clusterName: {
        fieldValue: 'p-sfm-srv-006',
      },
      clusterUid: {
        fieldValue: '1a78a634-16db-4bdf-a12f-2f6433b964ca',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-10-18T11:16:44Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-sfm-srv-006.trd1cl02-sfm-prod.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:12.648Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 7,
      },
      priceMonth: {
        fieldValue: 21422,
      },
      priceYear: {
        fieldValue: 257064,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '40',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 6096,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 17.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '266',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '101',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 38.05,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-tp-003.trd1cl02-tp.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-tp-003-2jja',
      },
      clusterName: {
        fieldValue: 'd-tp-003',
      },
      clusterUid: {
        fieldValue: 'd82bdc63-e1be-42a2-95dd-b26bfc7a67fe',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-10-31T09:31:47Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-tp-003.trd1cl02-tp.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.32.0+vmware.6-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:45.808Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 9,
      },
      priceMonth: {
        fieldValue: 22879,
      },
      priceYear: {
        fieldValue: 274548,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '40',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 17452,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 45,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '298',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '191',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 64.04,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-tp',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.p-ai-001.p-ai.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'TalosAZ',
      },
      clusterId: {
        fieldValue: 'p-ai-001-e3d5',
      },
      clusterName: {
        fieldValue: 'p-ai-001',
      },
      clusterUid: {
        fieldValue: '226ace5d-ce01-4e90-b119-14c8870f2f16',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-04-01T09:33:38Z',
      },
      datacenter: {
        fieldValue: 'trd1 TalosAZ',
      },
      environment: {
        fieldValue: 'prod',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.p-ai-001.p-ai.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.33.3',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:28.132Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.16',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 1,
      },
      priceMonth: {
        fieldValue: 82058,
      },
      priceYear: {
        fieldValue: 984696,
      },
      provider: {
        fieldValue: 'talos',
      },
      region: {
        fieldValue: 'trd1',
      },
      resourcesCpu: {
        fieldValue: '204',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 5661,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 2.94,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '779',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '127',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 16.26,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'p-ai',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-dpt-001.trd1cl02-hn-test.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-dpt-001-zzbr',
      },
      clusterName: {
        fieldValue: 't-dpt-001',
      },
      clusterUid: {
        fieldValue: '7dd11564-639e-4226-8c12-2ebf22277c84',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-04-23T08:29:24Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-dpt-001.trd1cl02-hn-test.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:33.667Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 6482,
      },
      priceYear: {
        fieldValue: 77784,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '16',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1332,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '22',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 35.9,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-hn-test',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-iutv-001.trd1-internutv.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-iutv-001-ytqj',
      },
      clusterName: {
        fieldValue: 't-iutv-001',
      },
      clusterUid: {
        fieldValue: '8873d65b-0573-48d9-89fe-4d1eb3d983a7',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2022-08-22T08:40:29Z',
      },
      datacenter: {
        fieldValue: 'trd1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-iutv-001.trd1-internutv.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:06.256Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 4838,
      },
      priceYear: {
        fieldValue: 58056,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '12',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1329,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 16.67,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '47',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '28',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 60.4,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1-internutv',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-pts-001.osl1-team-pts.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-pts-001-qs7i',
      },
      clusterName: {
        fieldValue: 'd-pts-001',
      },
      clusterUid: {
        fieldValue: 'c2a7384d-67c7-4dfc-8abc-f289f0ac903d',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2023-09-15T10:43:00Z',
      },
      datacenter: {
        fieldValue: 'osl1',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-pts-001.osl1-team-pts.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:47.827Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 3241,
      },
      priceYear: {
        fieldValue: 38892,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '8',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 761,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 12.5,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '31',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '22',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 70.66,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'osl1-team-pts',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.d-par-001.trd1cl02-par.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 'd-par-001-shv8',
      },
      clusterName: {
        fieldValue: 'd-par-001',
      },
      clusterUid: {
        fieldValue: 'ea4772df-42e7-4967-be06-009abc5d0ae0',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2025-08-28T09:46:07Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'dev',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.d-par-001.trd1cl02-par.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:28:12.179Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5660,
      },
      priceYear: {
        fieldValue: 67920,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '14',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1674,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 14.29,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '55',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '23',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 42.99,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-par',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '9ba53b07-b228-4395-8bf3-7f1118945c2a',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'https://argo.t-oct-001.trd1cl02-oct.sky.nhn.no',
      },
      availabilityZone: {
        fieldValue: 'unknown-undefined',
      },
      clusterId: {
        fieldValue: 't-oct-001-yzhp',
      },
      clusterName: {
        fieldValue: 't-oct-001',
      },
      clusterUid: {
        fieldValue: 'da3f4e14-f61e-4d76-b5d2-758407d6bc5a',
      },
      country: {
        fieldValue: 'no',
      },
      created: {
        fieldValue: '2024-08-29T06:17:51Z',
      },
      datacenter: {
        fieldValue: 'trd1cl02',
      },
      environment: {
        fieldValue: 'test',
      },
      grafanaURL: {
        fieldValue: 'https://grafana.t-oct-001.trd1cl02-oct.sky.nhn.no',
      },
      kubernetesVersion: {
        fieldValue: 'v1.30.8+vmware.1-fips',
      },
      lastSeen: {
        fieldValue: '2026-04-07T10:27:29.713Z',
      },
      nhnToolVersion: {
        fieldValue: 'v1.9.17',
      },
      nodePools: {
        fieldValue: 1,
      },
      nodes: {
        fieldValue: 3,
      },
      priceMonth: {
        fieldValue: 5144,
      },
      priceYear: {
        fieldValue: 61728,
      },
      provider: {
        fieldValue: 'tanzu',
      },
      region: {
        fieldValue: 'unknown-undefined',
      },
      resourcesCpu: {
        fieldValue: '10',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 1999,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 20,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '62',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '20',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 32.05,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'v2.2.0',
      },
      status: {
        fieldValue: 'ok',
      },
      workspace: {
        fieldValue: 'trd1cl02-oct',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: 'af9f2a40-a048-4e43-b073-80d101ce67db',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '6abc0849-d28a-40fe-bccd-981a96027f86',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
    {
      argocdURL: {
        fieldValue: 'Unknown',
      },
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
        fieldValue: '62b0249e-f14d-4332-b085-9cfd26253cd2',
      },
      country: {
        fieldValue: '',
      },
      created: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      datacenter: {
        fieldValue: '',
      },
      environment: {
        fieldValue: '',
      },
      grafanaURL: {
        fieldValue: 'Unknown',
      },
      kubernetesVersion: {
        fieldValue: 'Unknown',
      },
      lastSeen: {
        fieldValue: '0001-01-01T00:00:00Z',
      },
      nhnToolVersion: {
        fieldValue: 'Unknown',
      },
      nodePools: {
        fieldValue: 0,
      },
      nodes: {
        fieldValue: 0,
      },
      priceMonth: {
        fieldValue: 0,
      },
      priceYear: {
        fieldValue: 0,
      },
      provider: {
        fieldValue: '',
      },
      region: {
        fieldValue: '',
      },
      resourcesCpu: {
        fieldValue: '0',
      },
      resourcesCpuUsedMilli: {
        fieldValue: 0,
        fieldUnit: 'm',
      },
      resourcesCpuUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      resourcesMemory: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsed: {
        fieldValue: '0',
        fieldUnit: ' Gi',
      },
      resourcesMemoryUsedPercent: {
        fieldValue: 0,
        fieldUnit: '%',
      },
      rorAgentVersion: {
        fieldValue: 'Unknown',
      },
      status: {
        fieldValue: 'error',
      },
      workspace: {
        fieldValue: '',
      },
    },
  ],
}
