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
import { OverviewItemsViewRowType } from '@ror/js-api-client'
import { PageView } from './page-view'
import { authGuard } from '@/features/auth/utils/auth-guard'
import { OverviewSection } from '@/features/dashboard/components/overview-section'

const DashboardPage = async () => {
  await authGuard()
  const api = await getRorApi()
  const overviewItemsList = await api.overviewItemsView.getOverviewItems()
  const overviewItems: OverviewItemsViewRowType[] = overviewItemsList.rows

  return <PageView overviewItems={overviewItems} />
}

export default DashboardPage
