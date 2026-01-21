export const mockBackupJobs = {
  resources: [
    {
      kind: 'BackupJob',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '4923908281402464:1614676439887:11158793',
        uid: '3a7cecdb-2587-5444-ad7e-3405506cc787',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backupjob: {
        id: '4923908281402464:1614676439887:11158793',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          resourceBackupJobSpec: {
            name: 'tr1-vs-nhn-1m-gitlab-opt',
            status: 'inactive',
            policyId: '4923908281402464:1614676439887:3153',
            schedules: [
              {
                startTime: '13:26',
                endTime: 'none',
                frequency: 1,
                unit: 'Hours',
                retention: {
                  duration: 30,
                  unit: 'Days',
                },
                destination: {
                  name: 'mtr1-bck-ccl01.drift.nhn.no',
                  id: '',
                  type: 'local',
                  status: 'active',
                },
              },
              {
                startTime: '13:26',
                endTime: 'none',
                frequency: 1,
                unit: 'Runs',
                retention: {
                  duration: 30,
                  unit: 'Days',
                },
                destination: {
                  name: 'mtr2-bck-ccl01',
                  id: '818669404044608',
                  type: 'replica',
                  status: 'active',
                },
              },
            ],
            activeTargets: [
              {
                name: 'Mock-Virtual-machine-1',
                id: '2515',
                externalId: '501425ca-4dd7-1950-f259-3e53d087a31',
                source: {
                  name: 'm-trd-vcenter-02.drift.nhn.no',
                  id: '193',
                  uuid: '3acf4419-4708-4869-b7a5-28edc591fe2a',
                  type: 'kVCenter',
                },
              },
              {
                name: 'Mock-Virtual-machine-5',
                id: '2606',
                externalId: '501425ca-4dd7-1950-f259-3e53d087a35',
                source: {
                  name: 'm-trd-vcenter-02.drift.nhn.no',
                  id: '193',
                  uuid: '3acf4419-4708-4869-b7a5-28edc591fe2a',
                  type: 'kVCenter',
                },
              },
            ],
            indirectBackupTargets: null,
          },
          location: 'TRD1',
          policyName: 'Optimal-1M',
          backupRunIds: [
            '11158793:1762777612377235',
            '11158793:1762763214507514',
            '11158793:1762748804990047',
            '11158793:1762734406722623',
            '11158793:1762720011313147',
            '11158793:1762763214507512',
          ],
        },
        spec: {
          name: '',
          status: '',
          policyId: '',
          schedules: [],
          activeTargets: [],
          indirectBackupTargets: [],
        },
      },
    },
    {
      kind: 'BackupJob',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '4923908281402464:1614676439887:11158794',
        uid: '3a7cecdb-2587-5444-ad7e-3405506cc788',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backupjob: {
        id: '4923908281402464:1614676439887:11158794',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          resourceBackupJobSpec: {
            name: 'tr1-vs-nhn-1m-test-backup',
            status: 'paused',
            policyId: '4923908281402464:1614676439887:3154',
            schedules: [
              {
                startTime: '02:00',
                endTime: 'none',
                frequency: 1,
                unit: 'Days',
                retention: {
                  duration: 7,
                  unit: 'Days',
                },
                destination: {
                  name: 'mtr1-bck-ccl01.drift.nhn.no',
                  id: '',
                  type: 'local',
                  status: 'active',
                },
              },
            ],
            activeTargets: [
              {
                name: 'Mock-Virtual-machine-20',
                id: '2718',
                externalId: '501425ca-4dd7-1950-f259-3e53d087a320',
                source: {
                  name: 'm-trd-vcenter-02.drift.nhn.no',
                  id: '193',
                  uuid: '3acf4419-4708-4869-b7a5-28edc591fe2a',
                  type: 'kVCenter',
                },
              },
            ],
            indirectBackupTargets: null,
          },
          location: 'TRD1',
          policyName: 'Daily-7D',
          backupRunIds: ['11158794:1762777612377236', '11158794:1762763214507515', '11158794:1762748804990048'],
        },
        spec: {
          name: '',
          status: '',
          policyId: '',
          schedules: [],
          activeTargets: [],
          indirectBackupTargets: [],
        },
      },
    },
    {
      kind: 'BackupJob',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '4923908281402464:1614676439887:11158795',
        uid: '3a7cecdb-2587-5444-ad7e-3405506cc789',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backupjob: {
        id: '4923908281402464:1614676439887:11158795',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          resourceBackupJobSpec: {
            name: 'tr1-vs-nhn-12h-single-vm',
            status: 'deleted',
            policyId: '4923908281402464:1614676439887:3155',
            schedules: [
              {
                startTime: '06:00',
                endTime: 'none',
                frequency: 12,
                unit: 'Hours',
                retention: {
                  duration: 14,
                  unit: 'Days',
                },
                destination: {
                  name: 'mtr1-bck-ccl01.drift.nhn.no',
                  id: '',
                  type: 'local',
                  status: 'active',
                },
              },
            ],
            activeTargets: [
              {
                name: 'Mock-Virtual-machine-1',
                id: '2515',
                externalId: '501425ca-4dd7-1950-f259-3e53d087a31',
                source: {
                  name: 'm-trd-vcenter-02.drift.nhn.no',
                  id: '193',
                  uuid: '3acf4419-4708-4869-b7a5-28edc591fe2a',
                  type: 'kVCenter',
                },
              },
            ],
            indirectBackupTargets: null,
          },
          location: 'OSL1',
          policyName: 'Frequent-12H',
          backupRunIds: [],
        },
        spec: {
          name: '',
          status: '',
          policyId: '',
          schedules: [],
          activeTargets: [],
          indirectBackupTargets: [],
        },
      },
    },
    {
      kind: 'BackupJob',
      apiVersion: 'backup.ror.internal/v1alpha1',
      metadata: {
        name: '4923908281402464:1614676439887:11158778',
        uid: '3a7cecdb-2587-5444-ad7e-3405506cc790',
      },
      rormeta: {
        ownerref: {
          scope: 'ror',
          subject: 'globalscope',
        },
        action: 'Add',
      },
      backupjob: {
        id: '4923908281402464:1614676439887:11158778',
        provider: 'cohesity',
        source: 'mtr1-bck-ccl01.drift.nhn.no',
        status: {
          resourceBackupJobSpec: {
            name: 'tr1-vs-nhn-12h-single-vm',
            status: 'active',
            policyId: '4923908281402464:1614676439887:3153',
            schedules: [
              {
                startTime: '12:00',
                endTime: 'none',
                frequency: 12,
                unit: 'Hours',
                retention: {
                  duration: 14,
                  unit: 'Days',
                },
                destination: {
                  name: 'mtr1-bck-ccl01.drift.nhn.no',
                  id: '',
                  type: 'local',
                  status: 'active',
                },
              },
            ],
            activeTargets: [
              {
                name: 'Mock-Virtual-machine-8',
                id: '2515',
                externalId: '501425ca-4dd7-1950-f259-3e53d087a38',
                source: {
                  name: 'm-trd-vcenter-02.drift.nhn.no',
                  id: '193',
                  uuid: '3acf4419-4708-4869-b7a5-28edc591fe2a',
                  type: 'kVCenter',
                },
              },
            ],
            indirectBackupTargets: null,
          },
          location: 'OSL1',
          policyName: 'Frequent-12H',
          backupRunIds: [],
        },
        spec: {
          name: '',
          status: '',
          policyId: '',
          schedules: [],
          activeTargets: [],
          indirectBackupTargets: [],
        },
      },
    },
  ],
}
