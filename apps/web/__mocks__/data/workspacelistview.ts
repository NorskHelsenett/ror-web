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
        fieldValue: '12',
      },
      datacenterId: {
        fieldValue: 'bgo.west.no',
      },
      datacenterName: {
        fieldValue: 'Bergen',
      },
      defaultMachineClass: {
        fieldValue: 'best-effort-medium',
      },
      defaultStorageClass: {
        fieldValue: 'standard',
      },
      workspaceName: {
        fieldValue: 'bgo-mgmt',
      },
      workspaceUid: {
        fieldValue: 'b5e6cfd3-2f4b-4f1e-8b58-2d8a4e3b5c01',
      },
    },
    {
      clusters: {
        fieldValue: '4',
      },
      datacenterId: {
        fieldValue: 'osl.east.no',
      },
      datacenterName: {
        fieldValue: 'Oslo',
      },
      defaultMachineClass: {
        fieldValue: 'best-effort-small',
      },
      defaultStorageClass: {
        fieldValue: 'premium',
      },
      workspaceName: {
        fieldValue: 'osl-prod',
      },
      workspaceUid: {
        fieldValue: 'f47e2d92-1d2d-4d19-baa0-ff16d18f55ac',
      },
    },
  ],
}
