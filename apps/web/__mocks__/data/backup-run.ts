export const mockBackupRuns = {
  resources: [
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158793:1762777612377235',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7b9',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158793:1762777612377235',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158793:1762777612377235',
          backupJobId: '4923908281402464:1614676439887:11158793',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-1',
              id: '2606',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a31',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 562930434,
                logicalSize: 367211315200,
                physicalSize: 2140667904,
              },
            },
            {
              name: 'Mock-virtual-machine-5',
              id: '2515',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a35',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 437901770,
                logicalSize: 2138885324800,
                physicalSize: 5331877888,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Succeeded',
            },
            {
              name: 'mtr2-bck-ccl01',
              id: '818669404044608',
              type: 'remote',
              status: 'Succeeded',
            },
            {
              name: 'test',
              id: '',
              type: 'remote',
              status: 'Failed',
            },
          ],
          startTime: '2025-08-29T23:26:52Z',
          endTime: '2025-08-29T23:30:09Z',
          expiryTime: '2025-09-28T23:30:33Z',
          backupStorage: {
            unit: 'bytes',
            sourceSize: 7472545792,
            logicalSize: 2506096640000,
            physicalSize: 1000832204,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158793:1762748804990047',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7c0',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158793:1762748804990047',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158793:1762748804990047',
          backupJobId: '4923908281402464:1614676439887:11158793',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-9',
              id: '2516',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a39',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 362930434,
                logicalSize: 267211315200,
                physicalSize: 1140667904,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Succeeded',
            },
          ],
          startTime: '2025-08-30T02:00:00Z',
          endTime: '2025-08-30T02:15:30Z',
          expiryTime: '2025-09-06T02:15:30Z',
          backupStorage: {
            unit: 'bytes',
            sourceSize: 362930434,
            logicalSize: 267211315200,
            physicalSize: 1140667904,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158794:1762777612377236',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7c1',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158794:1762777612377236',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158794:1762777612377236',
          backupJobId: '4923908281402464:1614676439887:11158794',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-20',
              id: '2520',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a320',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 162930434,
                logicalSize: 167211315200,
                physicalSize: 840667904,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Failed',
            },
          ],
          startTime: '2025-08-30T02:00:00Z',
          endTime: null,
          expiryTime: null,
          backupStorage: {
            unit: 'bytes',
            sourceSize: 162930434,
            logicalSize: 167211315200,
            physicalSize: 840667904,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158793:1762763214507514',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7c2',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158793:1762763214507514',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158793:1762763214507514',
          backupJobId: '4923908281402464:1614676439887:11158793',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-1',
              id: '2515',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a31',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 462930434,
                logicalSize: 267211315200,
                physicalSize: 1040667904,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Succeeded',
            },
            {
              name: 'mtr2-bck-ccl01',
              id: '818669404044608',
              type: 'remote',
              status: 'Succeeded',
            },
          ],
          startTime: '2025-08-28T13:26:00Z',
          endTime: '2025-08-28T13:28:15Z',
          expiryTime: '2025-09-27T13:28:15Z',
          backupStorage: {
            unit: 'bytes',
            sourceSize: 462930434,
            logicalSize: 267211315200,
            physicalSize: 1040667904,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158793:1762734406722623',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7c3',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158793:1762734406722623',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158793:1762734406722623',
          backupJobId: '4923908281402464:1614676439887:11158793',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-5',
              id: '2515',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a35',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 362930434,
                logicalSize: 167211315200,
                physicalSize: 940667904,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Succeeded',
            },
          ],
          startTime: '2025-08-27T13:26:00Z',
          endTime: '2025-08-27T13:27:45Z',
          expiryTime: '2025-09-26T13:27:45Z',
          backupStorage: {
            unit: 'bytes',
            sourceSize: 362930434,
            logicalSize: 167211315200,
            physicalSize: 940667904,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158793:1762720011313147',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7c4',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158793:1762720011313147',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158793:1762720011313147',
          backupJobId: '4923908281402464:1614676439887:11158793',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-1',
              id: '2515',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a31',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 262930434,
                logicalSize: 167211315200,
                physicalSize: 840667904,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Succeeded',
            },
          ],
          startTime: '2025-08-26T13:26:00Z',
          endTime: '2025-08-26T13:27:30Z',
          expiryTime: '2025-09-25T13:27:30Z',
          backupStorage: {
            unit: 'bytes',
            sourceSize: 262930434,
            logicalSize: 167211315200,
            physicalSize: 840667904,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158794:1762763214507515',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7c5',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158794:1762763214507515',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158794:1762763214507515',
          backupJobId: '4923908281402464:1614676439887:11158794',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-10',
              id: '2516',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a310',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 262930434,
                logicalSize: 167211315200,
                physicalSize: 740667904,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Succeeded',
            },
          ],
          startTime: '2025-08-29T02:00:00Z',
          endTime: '2025-08-29T02:12:45Z',
          expiryTime: '2025-09-05T02:12:45Z',
          backupStorage: {
            unit: 'bytes',
            sourceSize: 262930434,
            logicalSize: 167211315200,
            physicalSize: 740667904,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
    {
      kind: 'BackupRun',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '11158794:1762748804990048',
        uid: 'a2f91dfd-0659-5428-b4c2-bec93ecdd7c6',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backuprun: {
        id: '11158794:1762748804990048',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          id: '11158794:1762748804990048',
          backupJobId: '4923908281402464:1614676439887:11158794',
          backupTargets: [
            {
              name: 'Mock-virtual-machine-15',
              id: '2617',
              externalId: '501425ca-4dd7-1950-f259-3e53d087a315',
              source: {
                name: '',
                id: '',
                uuid: '',
                type: '',
              },
              size: {
                unit: 'bytes',
                sourceSize: 162930434,
                logicalSize: 67211315200,
                physicalSize: 640667904,
              },
            },
          ],
          backupDestinations: [
            {
              name: 'mtr1-bck-ccl01.drift.nhn.no',
              id: '',
              type: 'local',
              status: 'Succeeded',
            },
          ],
          startTime: '2025-08-28T02:00:00Z',
          endTime: '2025-08-28T02:10:15Z',
          expiryTime: '2025-09-04T02:10:15Z',
          backupStorage: {
            unit: 'bytes',
            sourceSize: 162930434,
            logicalSize: 67211315200,
            physicalSize: 640667904,
          },
        },
        spec: {
          delete: false,
        },
      },
    },
  ],
}
