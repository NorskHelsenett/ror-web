export const mockMachines = {
  resources: Array.from({ length: 104 }, (_, i) => {
    const id = i % 100

    return {
      kind: 'Machine',
      apiVersion: 'general.ror.internal/v1alpha1',
      metadata: {
        name: `machine-${id}`,
        uid: `mock-uid-${id}`,
        namespace: `namespace-${id % 5}`,
      },
      rormeta: {
        ownerref: {
          scope: 'machine',
          subject: `mock-subject-${id}`,
        },
      },
      machine: {
        spec: {
          name: `machine-${id}`,
          machineClass: `class-${id % 3}`,
          machineType: `type-${id % 4}`,

          cpu: {
            cores: 2 + (id % 8),
            threadsPerCore: 2,
            sockets: 1,
          },

          memory: 2048 + (id % 8) * 1024,

          disks: [
            {
              name: `root-${id}`,
              sizeGB: 40 + id,
              type: 'ssd',
              boot: true,
              device: '/dev/sda',
              encrypted: id % 2 === 0,
              iops: 3000,
              throughput: 125,
            },
          ],

          network: {
            networkNameSpaceName: `netns-${id}`,
            vpc: `vpc-${id % 3}`,
            subnet: `subnet-${id % 6}`,
            assignPublicIP: id % 2 === 0,
            privateIP: `10.0.${id % 255}.${id}`,
            publicIP: `34.10.${id % 255}.${id}`,

            interfaces: [
              {
                name: 'eth0',
                subnet: `subnet-${id % 6}`,
                securityGroups: [`sg-${id % 4}`],
                primary: true,
              },
            ],
          },

          os: {
            family: 'linux',
            distribution: id % 2 ? 'ubuntu' : 'alpine',
            version: id % 2 ? '22.04' : '3.19',
            architecture: 'x86_64',
            imageID: `img-${id}`,
            isoUri: `https://example.com/iso/${id}`,
            imageFamily: 'ubuntu-lts',
          },

          provider: 'aws',

          providerConfig: {
            name: 'aws',
            region: `eu-west-${id % 3}`,
            zone: `eu-west-${id % 3}a`,
            config: {
              instanceType: `t3.${id % 2 ? 'medium' : 'large'}`,
            },
            credentialsRef: {
              secretName: `aws-creds-${id}`,
              namespace: 'infra',
            },
          },

          sshKeys: [`ssh-rsa AAAAB3NzaC${id}`],

          userData: `#!/bin/bash\necho machine-${id}`,

          tags: {
            env: id % 2 ? 'prod' : 'dev',
            team: `team-${id % 4}`,
          },

          securityGroups: [`sg-${id % 5}`],

          monitoring: id % 2 === 0,

          backup: {
            enabled: id % 2 === 0,
            schedule: '0 2 * * *',
            retentionDays: 7 + (id % 7),
          },

          cloudInit: {
            type: 'cloud-config',
            userData: `#cloud-config\nhostname: machine-${id}`,
            userDataBase64: null,
            networkData: null,
            networkDataBase64: null,

            userDataSecretRef: {
              name: `cloudinit-secret-${id}`,
              key: 'userData',
            },

            networkDataSecretRef: {
              name: `cloudinit-net-${id}`,
              key: 'networkData',
            },

            userDataConfigMapRef: {
              name: `cloudinit-cm-${id}`,
              key: 'userData',
            },

            networkDataConfigMapRef: {
              name: `cloudinit-cm-${id}`,
              key: 'networkData',
            },
          },
        },

        status: {
          phase: id % 3 === 0 ? 'Running' : 'Provisioning',
          message: `status message ${id}`,
          providerID: `aws://instance-${id}`,
          machineID: `mid-${id}`,
          state: id % 4 === 0 ? 'stopped' : 'running',

          lastUpdated: {},

          provider: 'aws',
          region: `eu-west-${id % 3}`,
          zone: `eu-west-${id % 3}a`,

          ipAddresses: [`10.0.${id % 255}.${id}`],
          ipv6Addresses: [`fd00::${id}`],

          publicIPAddresses: [`34.10.${id % 255}.${id}`],
          privateIPAddresses: [`10.0.${id % 255}.${id}`],

          hostname: `machine-${id}.internal`,
          architecture: 'x86_64',
          operatingSystem: 'linux',
          operatingSystemVersion: '22.04',
          kernelVersion: '6.8.0',

          cpus: 2 + (id % 8),
          memory: 2048 + (id % 8) * 1024,

          disks: [
            {
              name: 'root',
              size: 40 + id,
              type: 'ssd',
              mountPoint: '/',
              pvcName: `pvc-${id}`,
              volumeMode: 'Filesystem',
              accessModes: ['ReadWriteOnce'],
              filesystemType: 'ext4',
              uuid: `uuid-${id}`,
              label: `disk-${id}`,
              serialNumber: `sn-${id}`,
              device: '/dev/sda',
              usedBytes: 1000000000,
              availableBytes: 5000000000,
              usagePercent: `${20 + (id % 50)}%`,
            },
          ],

          networkInterfaces: [
            {
              name: 'eth0',
              macAddress: `02:00:00:00:${(id % 255).toString(16).padStart(2, '0')}:aa`,
              ipAddresses: [`10.0.${id % 255}.${id}`],
              ipv6Addresses: [`fd00::${id}`],
              state: 'up',
              mtu: 1500,
              type: 'ethernet',
            },
          ],

          conditions: [
            {
              type: 'Ready',
              status: id % 4 === 0 ? 'False' : 'True',
              lastTransitionTime: {},
              reason: 'MockCondition',
              message: `machine ${id} condition`,
            },
          ],

          bootTime: {},
          creationTime: {},

          failureReason: id % 10 === 0 ? 'MockFailure' : null,
          failureMessage: id % 10 === 0 ? 'Something failed' : null,
        },
      },
    }
  }),
}
