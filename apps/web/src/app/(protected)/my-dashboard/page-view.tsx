'use client'
import { Header } from '@/components/layout/app-shell/header'
import { DashboardSection } from '@/features/dashboard/components/dashboard-section'
import { FavoritedBox } from '@/features/dashboard/components/favorited-box'
import { FavoritedCluster } from '@/features/dashboard/components/favorited-cluster'
import { NotReadyMessage } from '@/components/ui/not-ready-message'
import { OverviewSection } from '@/features/dashboard/components/overview-section'
import { getFavoritedItems } from '@/features/dashboard/utils/dashboard-localstorage'
import { ClusterListViewItemRowType, OverviewItemsViewRowType, VirtualMachine } from '@ror/js-api-client'
import { useCallback, useEffect, useState } from 'react'
import { loadFavoritedClusters, loadFavoritedVms } from '@/features/dashboard/utils/favorited-item'
import { FavoritedVm } from '@/features/dashboard/components/favorited-vm'

interface PageViewProps {
  overviewItems: OverviewItemsViewRowType[]
}

export const PageView = ({ overviewItems }: PageViewProps) => {
  const [favoritedClusters, setFavoritedClusters] = useState<ClusterListViewItemRowType[]>([])
  const [favoritedVms, setFavoritedVms] = useState<VirtualMachine[]>([])

  const fetchFavorites = useCallback(() => {
    const clusterUids = getFavoritedItems('cluster')
    if (!clusterUids.length) {
      setFavoritedClusters([])
    } else {
      loadFavoritedClusters(clusterUids).then(setFavoritedClusters)
    }

    const vmUids = getFavoritedItems('vms')
    if (!vmUids.length) {
      setFavoritedVms([])
    } else {
      loadFavoritedVms(vmUids).then(setFavoritedVms)
    }
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const favoritedClusterBoxes = favoritedClusters.map((cluster) => ({
    nodeId: cluster.clusterUid?.fieldValue ?? globalThis.crypto.randomUUID(),
    node: (
      <FavoritedBox
        title={cluster.clusterName?.fieldValue || 'Unknown cluster'}
        domain='cluster'
        itemId={cluster.clusterUid?.fieldValue ?? globalThis.crypto.randomUUID()}
        isError={cluster.status?.fieldValue === 'error'}
        onUnfavorite={fetchFavorites}
      >
        <FavoritedCluster cluster={cluster} />
      </FavoritedBox>
    ),
  }))

  const favoritedVmBoxes = favoritedVms.map((vm) => ({
    nodeId: getVmUid,
  }))

  //   const favoritedVms: { nodeId: string; node: ReactNode }[] = [
  //     {
  //       nodeId: '13',
  //       node: (
  //         <FavoritedBox key={7} title={favoritedVm1.virtualmachine?.spec?.name || 'Unknown VM'} isError={false} domain={''} itemId={''}>
  //           <FavoritedVm vm={favoritedVm1} />
  //         </FavoritedBox>
  //       ),
  //     },
  //     {
  //       nodeId: '14',
  //       node: (
  //         <FavoritedBox key={8} title={favoritedVm2.virtualmachine?.spec?.name || 'Unknown VM'} isError={false} domain={''} itemId={''}>
  //           <FavoritedVm vm={favoritedVm2} />
  //         </FavoritedBox>
  //       ),
  //     },
  //     {
  //       nodeId: '15',
  //       node: (
  //         <FavoritedBox key={9} title={favoritedVm3.virtualmachine?.spec?.name || 'Unknown VM'} isError={false} domain={''} itemId={''}>
  //           <FavoritedVm vm={favoritedVm3} />
  //         </FavoritedBox>
  //       ),
  //     },
  //   ]

  //   const favoritedVm1: VMWithBackupStatus = {
  //     kind: 'VirtualMachine',
  //     apiVersion: 'general.ror.internal/v1alpha1',
  //     metadata: {
  //       name: 'mtrd-posl-1',
  //       uid: 'mock-uid-1',
  //     },
  //     rormeta: {
  //       ownerref: {
  //         scope: 'virtualmachine',
  //         subject: 'mock-subject-1',
  //       },
  //       action: 'Add',
  //     },
  //     virtualmachine: {
  //       externalId: '501425ca-4dd7-1950-f259-3e53d087a301',
  //       provider: 'Vsphere',
  //       spec: {
  //         cpu: { coresPerSocket: 2, sockets: 4 },
  //         name: 'mtrd-posl-1',
  //         disks: null,
  //         memory: { sizeBytes: 4294967296 },
  //       },
  //       status: {
  //         lastUpdated: '2025-09-23T07:52:41Z',
  //         location: 'OSL NAM01',
  //         cpu: { coresPerSocket: 2, sockets: 4, unit: '', usage: 0 },
  //         disks: [
  //           {
  //             id: 'disk-1',
  //             name: 'Mock-Virtual-machine-disk-1-vmdk/disk-name-1',
  //             sizeBytes: 78843545600,
  //             type: 'persistent',
  //             usageBytes: 0,
  //             isMounted: true,
  //           },
  //         ],
  //         memory: { sizeBytes: 4294967296, unit: 'bytes', usage: 3221225472 },
  //         networks: [
  //           {
  //             id: 'net-1-mgmt',
  //             dns: '10.28.212.1',
  //             gateway: '',
  //             ipv4: '10.28.212.101',
  //             ipv6: 'fe80::250:56ff:fe94:9a01',
  //             mac: '00:50:56:94:9a:4f',
  //             mask: '',
  //           },
  //         ],
  //         operatingSystem: {
  //           id: 'windows2022srvNext_64Guest',
  //           name: 'Windows',
  //           family: 'Windows',
  //           version: '5.4.0-208-generic',
  //           hostName: 'hostmtrd-posl-1',
  //           powerState: 'poweredOff',
  //           toolVersion: '11360',
  //           architecture: 'X86',
  //         },
  //         state: { reason: '', state: 'ready', time: '' },
  //         tags: {
  //           team: { description: 'Driftsteam 1 Fagapplikasjoner SHDIR', key: 'team', value: 'mon' },
  //           environment: { description: 'Tag 2', key: 'environment', value: 'test' },
  //           serviceId: { description: 'Egg- og Sæddonorregisteret', key: 'service-id', value: '1001' },
  //         },
  //       },
  //     },
  //     backupStatus: {
  //       hasBackupJob: true,
  //       hasBackupRun: true,
  //       lastBackupInfo: {
  //         startTime: '2026-05-27T22:00:00Z',
  //         endTime: '2026-05-27T22:14:32Z',
  //         expiryTime: '2026-06-27T22:00:00Z',
  //       },
  //     },
  //   }

  //   const favoritedVm2: VMWithBackupStatus = {
  //     kind: 'VirtualMachine',
  //     apiVersion: 'general.ror.internal/v1alpha1',
  //     metadata: {
  //       name: 'mtrd3-posl-2',
  //       uid: 'mock-uid-2',
  //     },
  //     rormeta: {
  //       ownerref: {
  //         scope: 'virtualmachine',
  //         subject: 'mock-subject-2',
  //       },
  //       action: 'Add',
  //     },
  //     virtualmachine: {
  //       externalId: '501425ca-4dd7-1950-f259-3e53d087a302',
  //       provider: 'Vsphere',
  //       spec: {
  //         cpu: { coresPerSocket: 4, sockets: 4 },
  //         name: 'mtrd3-posl-2',
  //         disks: null,
  //         memory: { sizeBytes: 8589934592 },
  //       },
  //       status: {
  //         lastUpdated: '2025-09-23T07:52:41Z',
  //         location: 'OSL3 NAM03',
  //         cpu: { coresPerSocket: 4, sockets: 4, unit: '', usage: 2 },
  //         disks: [
  //           {
  //             id: 'disk-2',
  //             name: 'Mock-Virtual-machine-disk-2-vmdk/disk-name-2',
  //             sizeBytes: 78843545600,
  //             type: 'persistent',
  //             usageBytes: 0,
  //             isMounted: true,
  //           },
  //           {
  //             id: 'disk-3',
  //             name: 'Mock-Virtual-machine-disk-3-vmdk/disk-name-3',
  //             sizeBytes: 35843545600,
  //             type: 'persistent',
  //             usageBytes: 15843545600,
  //             isMounted: false,
  //           },
  //         ],
  //         memory: { sizeBytes: 8589934592, unit: 'bytes', usage: 4096000000 },
  //         networks: [
  //           {
  //             id: 'net-2-mgmt',
  //             dns: '10.28.212.1',
  //             gateway: '',
  //             ipv4: '10.28.212.102',
  //             ipv6: 'fe80::250:56ff:fe94:9a02',
  //             mac: '00:50:56:94:9a:50',
  //             mask: '',
  //           },
  //         ],
  //         operatingSystem: {
  //           id: 'windows2022srvNext_64Guest',
  //           name: 'Red Hat Enterprise Linux',
  //           family: 'Linux',
  //           version: '5.4.0-208-generic',
  //           hostName: 'hostmtrd3-posl-2',
  //           powerState: 'poweredOn',
  //           toolVersion: '11360',
  //           architecture: 'X86',
  //         },
  //         state: { reason: '', state: 'ready', time: '' },
  //         tags: {
  //           team: { description: 'stamnett', key: 'team', value: 'stam' },
  //           environment: { description: 'Tag 2', key: 'environment', value: 'prod' },
  //           serviceId: { description: 'Ansible', key: 'service-id', value: '1002' },
  //         },
  //       },
  //     },
  //     backupStatus: {
  //       hasBackupJob: false,
  //       hasBackupRun: false,
  //       lastBackupInfo: null,
  //     },
  //   }

  //   const favoritedVm3: VMWithBackupStatus = {
  //     kind: 'VirtualMachine',
  //     apiVersion: 'general.ror.internal/v1alpha1',
  //     metadata: {
  //       name: 'trd1-dc-nam-01-intern-3',
  //       uid: 'mock-uid-3',
  //     },
  //     rormeta: {
  //       ownerref: {
  //         scope: 'virtualmachine',
  //         subject: 'mock-subject-3',
  //       },
  //       action: 'Add',
  //     },
  //     virtualmachine: {
  //       externalId: '501425ca-4dd7-1950-f259-3e53d087a303',
  //       provider: 'Vsphere',
  //       spec: {
  //         cpu: { coresPerSocket: 2, sockets: 4 },
  //         name: 'trd1-dc-nam-01-intern-3',
  //         disks: null,
  //         memory: { sizeBytes: 4294967296 },
  //       },
  //       status: {
  //         lastUpdated: '2025-09-23T07:52:41Z',
  //         location: 'TRD NAM01',
  //         cpu: { coresPerSocket: 2, sockets: 4, unit: '', usage: 5 },
  //         disks: [
  //           {
  //             id: 'disk-3',
  //             name: 'Mock-Virtual-machine-disk-3-vmdk/disk-name-3',
  //             sizeBytes: 78843545600,
  //             type: 'persistent',
  //             usageBytes: 0,
  //             isMounted: true,
  //           },
  //           {
  //             id: 'disk-4',
  //             name: 'Mock-Virtual-machine-disk-4-vmdk/disk-name-4',
  //             sizeBytes: 35843545600,
  //             type: 'persistent',
  //             usageBytes: 15843545600,
  //             isMounted: false,
  //           },
  //           {
  //             id: 'disk-5',
  //             name: 'Mock-Virtual-machine-disk-5-vmdk/disk-name-5',
  //             sizeBytes: 54843545600,
  //             type: 'persistent',
  //             usageBytes: 44843545600,
  //             isMounted: true,
  //           },
  //         ],
  //         memory: { sizeBytes: 4294967296, unit: 'bytes', usage: 0 },
  //         networks: [
  //           {
  //             id: 'net-3-mgmt',
  //             dns: '10.28.212.1',
  //             gateway: '',
  //             ipv4: '10.28.212.103',
  //             ipv6: 'fe80::250:56ff:fe94:9a03',
  //             mac: '00:50:56:94:9a:51',
  //             mask: '',
  //           },
  //         ],
  //         operatingSystem: {
  //           id: 'windows2022srvNext_64Guest',
  //           name: 'Windows',
  //           family: 'Windows',
  //           version: '5.4.0-208-generic',
  //           hostName: 'hosttrd1-dc-nam-01-intern-3',
  //           powerState: 'poweredOn',
  //           toolVersion: '11360',
  //           architecture: 'X86',
  //         },
  //         state: { reason: '', state: 'ready', time: '' },
  //         tags: {
  //           team: { description: '', key: 'team', value: 'mon' },
  //           environment: { description: 'Tag 2', key: 'environment', value: 'test' },
  //           serviceId: { description: 'Egg- og Sæddonorregisteret', key: 'service-id', value: '1003' },
  //         },
  //       },
  //     },
  //     backupStatus: {
  //       hasBackupJob: true,
  //       hasBackupRun: true,
  //       lastBackupInfo: {
  //         startTime: '2026-05-20T01:00:00Z',
  //         endTime: '2026-05-20T01:08:11Z',
  //         expiryTime: '2026-05-28T01:00:00Z',
  //       },
  //     },
  //   }

  return (
    <div className='w-full flex flex-col'>
      <Header title='My Dashboard' />
      <div className='mx-6 my-8'>
        <NotReadyMessage removable={false}>
          This page is still under construction. Currently the data is saved locally in the browser. This means that if
          you clear the cache of the site, your overview items will be set back to standard and favorited items will be
          erased.
        </NotReadyMessage>
        <OverviewSection allItems={overviewItems} />
        <DashboardSection title='Clusters' items={favoritedClusterBoxes} />
        {/* <DashboardSection title='VMs' items={favorited} /> */}
      </div>
    </div>
  )
}
