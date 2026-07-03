export const workspaceListView = {
  type: 'workspacelist',
  columns: [
    {
      name: 'workspaceUid',
      description: 'The unique identifier of the workspace',
      order: 0,
      default: true,
      type: 'string',
    },
    {
      name: 'workspaceName',
      description: 'The name of the workspace',
      order: 1,
      default: true,
      type: 'string',
    },
    {
      name: 'datacenterId',
      description: 'The datacenter id of the workspace',
      order: 2,
      default: true,
      type: 'string',
    },
    {
      name: 'datacenterName',
      description: 'The datacenter name of the workspace',
      order: 3,
      default: true,
      type: 'string',
    },
    {
      name: 'defaultMachineClass',
      description: 'The default machine class in the workspace',
      order: 4,
      default: true,
      type: 'string',
    },
    {
      name: 'defaultStorageClass',
      description: 'The default storage class in the workspace',
      order: 5,
      default: true,
      type: 'string',
    },
    {
      name: 'clusters',
      description: 'The number of clusters in the workspace',
      order: 6,
      default: true,
      type: 'string',
    },
  ],
  rows: [
    {
      clusters: {
        fieldValue: '42',
      },
      datacenterId: {
        fieldValue: 'trd.north.no',
      },
      datacenterName: {
        fieldValue: 'Trondheim',
      },
      defaultMachineClass: {
        fieldValue: 'best-effort-medium',
      },
      defaultStorageClass: {
        fieldValue: 'standard',
      },
      workspaceName: {
        fieldValue: 'trd1cl02-sfm-prod',
      },
      workspaceUid: {
        fieldValue: 'f0a1fb2e-5d77-4d08-918a-a73d0eb3db9e',
      },
    },
    {
      clusters: {
        fieldValue: '26',
      },
      datacenterId: {
        fieldValue: 'trd.north.no',
      },
      datacenterName: {
        fieldValue: 'Trondheim',
      },
      defaultMachineClass: {
        fieldValue: 'best-effort-small',
      },
      defaultStorageClass: {
        fieldValue: 'premium',
      },
      workspaceName: {
        fieldValue: 'trd1cl02-test',
      },
      workspaceUid: {
        fieldValue: 'c8777b9d-7e0c-4fe3-8421-94784fc8fdb9',
      },
    },
    {
      clusters: {
        fieldValue: '14',
      },
      datacenterId: {
        fieldValue: 'trd.north.no',
      },
      datacenterName: {
        fieldValue: 'Trondheim',
      },
      defaultMachineClass: {
        fieldValue: 'best-effort-medium',
      },
      defaultStorageClass: {
        fieldValue: 'standard',
      },
      workspaceName: {
        fieldValue: 'trd1-amk',
      },
      workspaceUid: {
        fieldValue: '2f9a9195-8b94-4951-aa5d-f0b8d7687dc9',
      },
    },
  ],
}
