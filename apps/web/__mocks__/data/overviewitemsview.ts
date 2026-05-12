export const overviewItemsView = {
  type: 'overviewitemslist',
  columns: [
    {
      name: 'itemUid',
      description: 'The unique identifier of the overview item',
      order: 0,
      default: true,
      type: 'string',
    },
    {
      name: 'itemName',
      description: 'The name of the overview item',
      order: 1,
      default: true,
      type: 'string',
    },
    {
      name: 'greenTitle',
      description: 'The title of the green element',
      order: 2,
      default: true,
      type: 'string',
    },
    {
      name: 'greenNumber',
      description: 'The number of the green element',
      order: 3,
      default: true,
      type: 'number',
    },
    {
      name: 'yellowTitle',
      description: 'The title of the yellow element',
      order: 4,
      default: true,
      type: 'string',
    },
    {
      name: 'yellowNumber',
      description: 'The number of the yellow element',
      order: 5,
      default: true,
      type: 'number',
    },
    {
      name: 'redTitle',
      description: 'The title of the red element',
      order: 6,
      default: true,
      type: 'string',
    },
    {
      name: 'redNumber',
      description: 'The number of the red element',
      order: 7,
      default: true,
      type: 'number',
    },
  ],
  rows: [
    {
      greenNumber: {
        fieldValue: 0,
      },
      greenTitle: {
        fieldValue: 'Healthy',
      },
      itemName: {
        fieldValue: 'Clusters',
      },
      itemUid: {
        fieldValue: '1a8c89d5-100f-4b73-a0e5-a369b15bea30',
      },
      redNumber: {
        fieldValue: 36,
      },
      redTitle: {
        fieldValue: 'Error',
      },
      yellowNumber: {
        fieldValue: 349,
      },
      yellowTitle: {
        fieldValue: 'Warning',
      },
    },
    {
      greenNumber: {
        fieldValue: 926,
      },
      greenTitle: {
        fieldValue: 'On',
      },
      itemName: {
        fieldValue: 'VMs',
      },
      itemUid: {
        fieldValue: '33495de0-168e-4eeb-9337-02c770daf173',
      },
      redNumber: {
        fieldValue: 74,
      },
      redTitle: {
        fieldValue: 'Off',
      },
      yellowNumber: {
        fieldValue: 0,
      },
      yellowTitle: {
        fieldValue: 'Undefined',
      },
    },
    {
      greenNumber: {
        fieldValue: 0,
      },
      greenTitle: {
        fieldValue: 'Medium/Low',
      },
      itemName: {
        fieldValue: 'Vulnerabilities',
      },
      itemUid: {
        fieldValue: '93d27db2-52e3-454f-b400-3dab56249c67',
      },
      redNumber: {
        fieldValue: 1747,
      },
      redTitle: {
        fieldValue: 'Critical',
      },
      yellowNumber: {
        fieldValue: 18357,
      },
      yellowTitle: {
        fieldValue: 'High',
      },
    },
  ],
}
