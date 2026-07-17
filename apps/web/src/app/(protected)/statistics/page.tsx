import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'
import { getRorApi } from '@/services/ror-api'
import {
  getAZViewCount,
  getCountryViewCount,
  getDatacenterViewCount,
  getEnvironmentViewCount,
  getKubernetesVersionViewCount,
  getNhnToolVersionViewCount,
  getProviderViewCount,
  getRegionViewCount,
  getServiceIdViewCount,
  getStatusViewCount,
  getWorkspaceViewCount,
} from '@/features/cluster/utils/cluster'

const StatisticsPage = async () => {
  const api = await getRorApi()
  const listParams = new URLSearchParams()
  listParams.set('limit', '1000')

  const clusterList = await api.clusterListView.getClusterList(listParams)
  const clusters = clusterList.rows

  const providerCount = getProviderViewCount(clusters)
  const datacenterCount = getDatacenterViewCount(clusters)
  const azCount = getAZViewCount(clusters)
  const countryCount = getCountryViewCount(clusters)
  const regionCount = getRegionViewCount(clusters)
  const workspaceCount = getWorkspaceViewCount(clusters)
  const environmentCount = getEnvironmentViewCount(clusters)
  const kubernetesVersionCount = getKubernetesVersionViewCount(clusters)
  const nhnToolVersionCount = getNhnToolVersionViewCount(clusters)
  const statusCount = getStatusViewCount(clusters)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Statistics' />
      <PageView
        providerCount={providerCount}
        datacenterCount={datacenterCount}
        azCount={azCount}
        countryCount={countryCount}
        regionCount={regionCount}
        workspaceCount={workspaceCount}
        environmentCount={environmentCount}
        kubernetesVersionCount={kubernetesVersionCount}
        nhnToolVersionCount={nhnToolVersionCount}
        statusCount={statusCount}
      />
    </div>
  )
}

export default StatisticsPage
