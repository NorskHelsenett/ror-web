import { Header } from '@/components/layout/app-shell/header'
import { DashboardSection } from '@/features/dashboard/components/dashboard-section'
import { Notification, NotificationBox } from '@/features/dashboard/components/notification-box'
import { OverviewBox } from '@/features/dashboard/components/overview-box'
import { FavoritedBox } from '@/features/dashboard/components/favorited-box'
import { ClusterListViewItemRowType, OverviewItemsViewRowType } from '@ror/js-api-client'
import { ReactNode } from 'react'
import { FavoritedCluster } from '@/features/dashboard/components/favorited-cluster'
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

  const notifications: { nodeId: string; node: ReactNode }[] = [
    { nodeId: '1', node: <NotificationBox key={1} notification={notificationTest1} /> },
    { nodeId: '2', node: <NotificationBox key={2} notification={notificationTest2} /> },
    { nodeId: '3', node: <NotificationBox key={3} notification={notificationTest3} /> },
  ]

  const mappedOverviewItems: { nodeId: string; node: ReactNode }[] = overviewItems.map((item) => ({
    nodeId: item.itemUid.fieldValue,
    nodeTitle: item.itemName.fieldValue ?? undefined,
    node: <OverviewBox key={item.itemUid.fieldValue} item={item} />,
  }))

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

  return (
    <div className='w-full flex flex-col'>
      <Header title='My Dashboard' />
      <div className='mx-6 my-8'>
        <NotReadyMessage removable={false}>
          This page is still under construction. Currently the data is saved locally in the browser. This means that if
          you clear the cache of the site, your overview items will be set back to standard and favorited items will be
          erased.
        </NotReadyMessage>
        <DashboardSection title='Notifications' items={notifications} />
        <OverviewSection allItems={overviewItems} />
        <DashboardSection title='Clusters' items={favoritedItems} />
        <DashboardSection title='VMs' />
      </div>
    </div>
  )
}

export default DashboardPage
