import { Header } from '@/components/layout/app-shell/header'
import { DashboardSection } from '@/features/dashboard/components/dashboard-section'
import { Notification, NotificationBox } from '@/features/dashboard/components/notification-box'
import { FavoritedBox } from '@/features/dashboard/components/favorited-box'
import { ClusterListViewItemRowType, OverviewItemsViewRowType } from '@ror/js-api-client'
import { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import { ReactNode } from 'react'
import { FavoritedCluster } from '@/features/dashboard/components/favorited-cluster'
import { FavoritedVm } from '@/features/dashboard/components/favorited-vm'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { getRorApi } from '@/services/ror-api'
import { OverviewSection } from '@/features/dashboard/components/overview-section'

const DashboardPage = async () => {
  const api = await getRorApi()
  const overviewItemsList = await api.overviewItemsView.getOverviewItems()
  const overviewItems: OverviewItemsViewRowType[] = overviewItemsList.rows

  const notificationTest1: Notification = {
    title: {
      fieldValue: 'Test notification 1',
    },
    description: {
      fieldValue: 'This is a test description 1',
    },
    criticality: {
      fieldValue: 'negative',
    },
  }

  const notificationTest2: Notification = {
    title: {
      fieldValue: 'Test notification 2',
    },
    description: {
      fieldValue: 'This is a test description 2',
    },
    criticality: {
      fieldValue: 'neutral',
    },
  }

  const notificationTest3: Notification = {
    title: {
      fieldValue: 'Test notification 3',
    },
    description: {
      fieldValue: 'This is a test description 3',
    },
    criticality: {
      fieldValue: 'positive',
    },
  }

  const favorited1: ClusterListViewItemRowType = {
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
  }

  const favorited2: ClusterListViewItemRowType = {
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
  }

  const favorited3: ClusterListViewItemRowType = {
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
      fieldValue: 'error',
    },
    workspace: {
      fieldValue: 'vitistack-amk-3sad',
    },
  }

  const favoritedVm1: VMWithBackupStatus = {
    kind: 'VirtualMachine',
    apiVersion: 'general.ror.internal/v1alpha1',
    metadata: {
      name: 'mtrd-posl-1',
      uid: 'mock-uid-1',
    },
    rormeta: {
      ownerref: {
        scope: 'virtualmachine',
        subject: 'mock-subject-1',
      },
      action: 'Add',
    },
    virtualmachine: {
      externalId: '501425ca-4dd7-1950-f259-3e53d087a301',
      provider: 'Vsphere',
      spec: {
        cpu: { coresPerSocket: 2, sockets: 4 },
        name: 'mtrd-posl-1',
        disks: null,
        memory: { sizeBytes: 4294967296 },
      },
      status: {
        lastUpdated: '2025-09-23T07:52:41Z',
        location: 'OSL NAM01',
        cpu: { coresPerSocket: 2, sockets: 4, unit: '', usage: 0 },
        disks: [
          {
            id: 'disk-1',
            name: 'Mock-Virtual-machine-disk-1-vmdk/disk-name-1',
            sizeBytes: 78843545600,
            type: 'persistent',
            usageBytes: 0,
            isMounted: true,
          },
        ],
        memory: { sizeBytes: 4294967296, unit: 'bytes', usage: 3221225472 },
        networks: [
          {
            id: 'net-1-mgmt',
            dns: '10.28.212.1',
            gateway: '',
            ipv4: '10.28.212.101',
            ipv6: 'fe80::250:56ff:fe94:9a01',
            mac: '00:50:56:94:9a:4f',
            mask: '',
          },
        ],
        operatingSystem: {
          id: 'windows2022srvNext_64Guest',
          name: 'Windows',
          family: 'Windows',
          version: '5.4.0-208-generic',
          hostName: 'hostmtrd-posl-1',
          powerState: 'poweredOff',
          toolVersion: '11360',
          architecture: 'X86',
        },
        state: { reason: '', state: 'ready', time: '' },
        tags: {
          team: { description: 'Driftsteam 1 Fagapplikasjoner SHDIR', key: 'team', value: 'mon' },
          environment: { description: 'Tag 2', key: 'environment', value: 'test' },
          serviceId: { description: 'Egg- og Sæddonorregisteret', key: 'service-id', value: '1001' },
        },
      },
    },
    backupStatus: {
      hasBackupJob: true,
      hasBackupRun: true,
      lastBackupInfo: {
        startTime: '2026-05-27T22:00:00Z',
        endTime: '2026-05-27T22:14:32Z',
        expiryTime: '2026-06-27T22:00:00Z',
      },
    },
  }

  const favoritedVm2: VMWithBackupStatus = {
    kind: 'VirtualMachine',
    apiVersion: 'general.ror.internal/v1alpha1',
    metadata: {
      name: 'mtrd3-posl-2',
      uid: 'mock-uid-2',
    },
    rormeta: {
      ownerref: {
        scope: 'virtualmachine',
        subject: 'mock-subject-2',
      },
      action: 'Add',
    },
    virtualmachine: {
      externalId: '501425ca-4dd7-1950-f259-3e53d087a302',
      provider: 'Vsphere',
      spec: {
        cpu: { coresPerSocket: 4, sockets: 4 },
        name: 'mtrd3-posl-2',
        disks: null,
        memory: { sizeBytes: 8589934592 },
      },
      status: {
        lastUpdated: '2025-09-23T07:52:41Z',
        location: 'OSL3 NAM03',
        cpu: { coresPerSocket: 4, sockets: 4, unit: '', usage: 2 },
        disks: [
          {
            id: 'disk-2',
            name: 'Mock-Virtual-machine-disk-2-vmdk/disk-name-2',
            sizeBytes: 78843545600,
            type: 'persistent',
            usageBytes: 0,
            isMounted: true,
          },
          {
            id: 'disk-3',
            name: 'Mock-Virtual-machine-disk-3-vmdk/disk-name-3',
            sizeBytes: 35843545600,
            type: 'persistent',
            usageBytes: 15843545600,
            isMounted: false,
          },
        ],
        memory: { sizeBytes: 8589934592, unit: 'bytes', usage: 4096000000 },
        networks: [
          {
            id: 'net-2-mgmt',
            dns: '10.28.212.1',
            gateway: '',
            ipv4: '10.28.212.102',
            ipv6: 'fe80::250:56ff:fe94:9a02',
            mac: '00:50:56:94:9a:50',
            mask: '',
          },
        ],
        operatingSystem: {
          id: 'windows2022srvNext_64Guest',
          name: 'Red Hat Enterprise Linux',
          family: 'Linux',
          version: '5.4.0-208-generic',
          hostName: 'hostmtrd3-posl-2',
          powerState: 'poweredOn',
          toolVersion: '11360',
          architecture: 'X86',
        },
        state: { reason: '', state: 'ready', time: '' },
        tags: {
          team: { description: 'stamnett', key: 'team', value: 'stam' },
          environment: { description: 'Tag 2', key: 'environment', value: 'prod' },
          serviceId: { description: 'Ansible', key: 'service-id', value: '1002' },
        },
      },
    },
    backupStatus: {
      hasBackupJob: false,
      hasBackupRun: false,
      lastBackupInfo: null,
    },
  }

  const favoritedVm3: VMWithBackupStatus = {
    kind: 'VirtualMachine',
    apiVersion: 'general.ror.internal/v1alpha1',
    metadata: {
      name: 'trd1-dc-nam-01-intern-3',
      uid: 'mock-uid-3',
    },
    rormeta: {
      ownerref: {
        scope: 'virtualmachine',
        subject: 'mock-subject-3',
      },
      action: 'Add',
    },
    virtualmachine: {
      externalId: '501425ca-4dd7-1950-f259-3e53d087a303',
      provider: 'Vsphere',
      spec: {
        cpu: { coresPerSocket: 2, sockets: 4 },
        name: 'trd1-dc-nam-01-intern-3',
        disks: null,
        memory: { sizeBytes: 4294967296 },
      },
      status: {
        lastUpdated: '2025-09-23T07:52:41Z',
        location: 'TRD NAM01',
        cpu: { coresPerSocket: 2, sockets: 4, unit: '', usage: 5 },
        disks: [
          {
            id: 'disk-3',
            name: 'Mock-Virtual-machine-disk-3-vmdk/disk-name-3',
            sizeBytes: 78843545600,
            type: 'persistent',
            usageBytes: 0,
            isMounted: true,
          },
          {
            id: 'disk-4',
            name: 'Mock-Virtual-machine-disk-4-vmdk/disk-name-4',
            sizeBytes: 35843545600,
            type: 'persistent',
            usageBytes: 15843545600,
            isMounted: false,
          },
          {
            id: 'disk-5',
            name: 'Mock-Virtual-machine-disk-5-vmdk/disk-name-5',
            sizeBytes: 54843545600,
            type: 'persistent',
            usageBytes: 44843545600,
            isMounted: true,
          },
        ],
        memory: { sizeBytes: 4294967296, unit: 'bytes', usage: 0 },
        networks: [
          {
            id: 'net-3-mgmt',
            dns: '10.28.212.1',
            gateway: '',
            ipv4: '10.28.212.103',
            ipv6: 'fe80::250:56ff:fe94:9a03',
            mac: '00:50:56:94:9a:51',
            mask: '',
          },
        ],
        operatingSystem: {
          id: 'windows2022srvNext_64Guest',
          name: 'Windows',
          family: 'Windows',
          version: '5.4.0-208-generic',
          hostName: 'hosttrd1-dc-nam-01-intern-3',
          powerState: 'poweredOn',
          toolVersion: '11360',
          architecture: 'X86',
        },
        state: { reason: '', state: 'ready', time: '' },
        tags: {
          team: { description: '', key: 'team', value: 'mon' },
          environment: { description: 'Tag 2', key: 'environment', value: 'test' },
          serviceId: { description: 'Egg- og Sæddonorregisteret', key: 'service-id', value: '1003' },
        },
      },
    },
    backupStatus: {
      hasBackupJob: true,
      hasBackupRun: true,
      lastBackupInfo: {
        startTime: '2026-05-20T01:00:00Z',
        endTime: '2026-05-20T01:08:11Z',
        expiryTime: '2026-05-28T01:00:00Z',
      },
    },
  }

  const notifications: { nodeId: string; node: ReactNode }[] = [
    { nodeId: '1', node: <NotificationBox key={1} notification={notificationTest1} /> },
    { nodeId: '2', node: <NotificationBox key={2} notification={notificationTest2} /> },
    { nodeId: '3', node: <NotificationBox key={3} notification={notificationTest3} /> },
  ]

  const favoritedItems: { nodeId: string; node: ReactNode }[] = [
    {
      nodeId: '7',
      node: (
        <FavoritedBox
          key={1}
          title={favorited1.clusterName?.fieldValue || 'Unknown cluster'}
          isError={favorited1.status?.fieldValue === 'error'}
        >
          <FavoritedCluster cluster={favorited1} />
        </FavoritedBox>
      ),
    },
    {
      nodeId: '8',
      node: (
        <FavoritedBox
          key={2}
          title={favorited2.clusterName?.fieldValue || 'Unknown cluster'}
          isError={favorited2.status?.fieldValue === 'error'}
        >
          <FavoritedCluster cluster={favorited2} />
        </FavoritedBox>
      ),
    },
    {
      nodeId: '9',
      node: (
        <FavoritedBox
          key={3}
          title={favorited3.clusterName?.fieldValue || 'Unknown cluster'}
          isError={favorited3.status?.fieldValue === 'error'}
        >
          <FavoritedCluster cluster={favorited3} />
        </FavoritedBox>
      ),
    },
    {
      nodeId: '10',
      node: (
        <FavoritedBox
          key={4}
          title={favorited1.clusterName?.fieldValue || 'Unknown cluster'}
          isError={favorited1.status?.fieldValue === 'error'}
        >
          <FavoritedCluster cluster={favorited1} />
        </FavoritedBox>
      ),
    },
    {
      nodeId: '11',
      node: (
        <FavoritedBox
          key={5}
          title={favorited2.clusterName?.fieldValue || 'Unknown cluster'}
          isError={favorited2.status?.fieldValue === 'error'}
        >
          <FavoritedCluster cluster={favorited2} />
        </FavoritedBox>
      ),
    },
    {
      nodeId: '12',
      node: (
        <FavoritedBox
          key={6}
          title={favorited3.clusterName?.fieldValue || 'Unknown cluster'}
          isError={favorited3.status?.fieldValue === 'error'}
        >
          <FavoritedCluster cluster={favorited3} />
        </FavoritedBox>
      ),
    },
  ]

  const favoritedVms: { nodeId: string; node: ReactNode }[] = [
    {
      nodeId: '13',
      node: (
        <FavoritedBox key={7} title={favoritedVm1.virtualmachine?.spec?.name || 'Unknown VM'} isError={false}>
          <FavoritedVm vm={favoritedVm1} />
        </FavoritedBox>
      ),
    },
    {
      nodeId: '14',
      node: (
        <FavoritedBox key={8} title={favoritedVm2.virtualmachine?.spec?.name || 'Unknown VM'} isError={false}>
          <FavoritedVm vm={favoritedVm2} />
        </FavoritedBox>
      ),
    },
    {
      nodeId: '15',
      node: (
        <FavoritedBox key={9} title={favoritedVm3.virtualmachine?.spec?.name || 'Unknown VM'} isError={false}>
          <FavoritedVm vm={favoritedVm3} />
        </FavoritedBox>
      ),
    },
  ]

  return (
    <div className='w-full flex flex-col'>
      <Header title='My Dashboard' />
      <div className='mx-6 my-8 flex flex-col gap-6'>
        <NotReadyMessage removable={false}>
          This page is still under construction. Currently the data is saved locally in the browser. This means that if
          you clear the cache of the site, your overview items will be set back to standard and favorited items will be
          erased.
        </NotReadyMessage>
        <DashboardSection title='Notifications' items={notifications} />
        <OverviewSection allItems={overviewItems} />
        <DashboardSection title='Clusters' items={favoritedItems} />
        <DashboardSection title='VMs' items={favoritedVms} />
      </div>
    </div>
  )
}

export default DashboardPage
