export const mockVms = {
  resources: Array.from({ length: 104 }, (_, i) => {
    const idx = i + 1
    const teamsDescription = ['Driftsteam 1 Fagapplikasjoner SHDIR', 'stamnett', '']
    const teamsValue = ['mon', 'stam']
    const osFamily = ['Windows', 'Linux']
    const osName = ['Windows', 'Red Hat Enterprise Linux']
    const diskCount = (idx % 3) + 1
    const allDisks = [
      {
        id: `disk-${idx}`,
        name: `Mock-Virtual-machine-disk-${idx}-vmdk/disk-name-${idx}`,
        sizeBytes: 78843545600,
        type: 'persistent',
        usageBytes: 0,
        isMounted: true,
      },
      {
        id: `disk-${idx + 1}`,
        name: `Mock-Virtual-machine-disk-${idx + 1}-vmdk/disk-name-${idx + 1}`,
        sizeBytes: 35843545600,
        type: 'persistent',
        usageBytes: 15843545600,
        isMounted: false,
      },
      {
        id: `disk-${idx + 2}`,
        name: `Mock-Virtual-machine-disk-${idx + 2}-vmdk/disk-name-${idx + 2}`,
        sizeBytes: 54843545600,
        type: 'persistent',
        usageBytes: 44843545600,
        isMounted: true,
      },
    ]
    const names = [`mtrd-posl-${idx}`, `mtrd3-posl-${idx}`, `trd1-dc-nam-01-intern-${idx}`]
    const locations = ['OSL NAM01', 'OSL3 NAM03', 'TRD NAM01', 'TRD3 NAM03']
    const location = locations[idx % 4]
    const disks = allDisks.slice(0, diskCount)
    const memorySizes = [4294967296, 8589934592] // 4GB, 8GB in bytes
    const memorySize = memorySizes[idx % 2]
    const memoryUsageOptions = [3221225472, 4096000000, 0] // 2GB, 3GB, 3.81GB in bytes
    const memoryUsage = memoryUsageOptions[idx % 3]

    const CoresPerSocketOptions = [2, 4]
    const CoresPerSocket = CoresPerSocketOptions[idx % 2]
    const cpuUsageOptions = [0, 2, 5]
    const cpuUsage = cpuUsageOptions[idx % 3]

    return {
      kind: 'VirtualMachine',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: names[idx % names.length],
        uid: `mock-uid-${idx}`,
      },
      rormeta: {
        ownerref: {
          scope: 'virtualmachine',
          subject: `mock-subject-${idx}`,
        },
        action: 'Add',
      },
      virtualmachine: {
        externalId: `501425ca-4dd7-1950-f259-3e53d087a3${idx}`,
        provider: 'Vsphere',
        spec: {
          cpu: {
            coresPerSocket: CoresPerSocket,
            sockets: 4,
          },
          name: names[idx % names.length],
          disks: null,
          memory: {
            sizeBytes: memorySize,
          },
        },
        status: {
          lastUpdated: '2025-09-23T07:52:41Z',
          location: location,
          cpu: {
            coresPerSocket: CoresPerSocket,
            sockets: 4,
            unit: '',
            usage: cpuUsage,
          },
          disks: disks,
          memory: {
            sizeBytes: memorySize,
            unit: 'bytes',
            usage: memoryUsage,
          },
          networks: [
            {
              id: `net-${idx}-mgmt`,
              dns: '10.28.212.1',
              gateway: '',
              ipv4: `10.28.212.${100 + idx}`,
              ipv6: `fe80::250:56ff:fe94:9a${idx.toString().padStart(2, '0')}`,
              mac: `00:50:56:94:9a:${(78 + idx).toString(16).padStart(2, '0')}`,
              mask: '',
            },
            {
              id: `2301_trd1-dc-nam-01-intern_365lab-01`,
              dns: '10.204.39.205',
              gateway: '',
              ipv4: `10.204.39.205.${101 + idx}`,
              ipv6: `fe80::250:56ff:fe94:9a${(idx + 1).toString().padStart(2, '0')}`,
              mac: `00:50:56:94:9a:${(79 + idx).toString(16).padStart(2, '0')}`,
              mask: '',
            },
          ],
          operatingSystem: {
            id: `windows2022srvNext_64Guest`,
            name: osName[idx % 5],
            family: osFamily[idx % 2],
            version: '5.4.0-208-generic',
            hostName: names[idx % names.length],
            powerState: idx % 3 === 0 ? 'poweredOn' : idx % 3 === 1 ? 'poweredOff' : 'undefined',
            toolVersion: '11360',
            architecture: 'X86',
          },
          state: {
            reason: '',
            state: 'ready',
            time: '',
          },
          tags: {
            team: {
              description: teamsDescription[idx % 3],
              key: 'team',
              value: teamsValue[idx % 2],
            },
            _AdGroup: {
              description: '',
              key: '_AdGroup',
              value: 'A-T1-ROR-VM-WD-Admin@drift.nhn.no',
            },
            environment: {
              description: 'Tag 2',
              key: 'environment',
              value: idx % 2 === 0 ? 'prod' : 'test',
            },
            serviceId: {
              description: 'Egg- og Sæddonorregisteret',
              key: 'service-id',
              value: `100${idx}`,
            },
            serviceSensitivity: {
              description: 'Intern',
              key: 'service-sensitivity',
              value: '2',
            },
          },
        },
      },
    }
  }),
}
