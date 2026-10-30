import { getRorApi } from '@/services/ror-api'
import { OverviewItemsViewRowType } from '@ror/js-api-client'
import { PageView } from './page-view'
import { authGuard } from '@/features/auth/utils/auth-guard'
import { Suspense } from 'react'
import { DashboardLoading } from '@/features/dashboard/components/dashboard-loading'

const DashboardPage = async () => {
  await authGuard()

  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}

async function DashboardContent() {
  const api = await getRorApi()
  const overviewItemsList = await api.overviewItemsView.getOverviewItems()
  const overviewItems: OverviewItemsViewRowType[] = overviewItemsList.rows

  return <PageView overviewItems={overviewItems} />
}

export default DashboardPage
