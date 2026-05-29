import { getRorApi } from '@/services/ror-api'
import { OverviewItemsViewRowType } from '@ror/js-api-client'
import { PageView } from './page-view'
import { authGuard } from '@/features/auth/utils/auth-guard'

const DashboardPage = async () => {
  await authGuard()
  const api = await getRorApi()
  const overviewItemsList = await api.overviewItemsView.getOverviewItems()
  const overviewItems: OverviewItemsViewRowType[] = overviewItemsList.rows

  return <PageView overviewItems={overviewItems} />
}

export default DashboardPage
