import { Header } from '@/components/layout/app-shell/header'
import { PageView } from './page-view'
import { KubernetesCluster } from '@ror/js-api-client'
import { getRorApi } from '@/services/ror-api'
import { findVersions } from '@/features/statistics/utils/versions'
import { findProviders } from '@/features/statistics/utils/provider'
import { findDatacenters } from '@/features/statistics/utils/datacenter'
import { findRegions } from '@/features/statistics/utils/region'
import { findProjects } from '@/features/statistics/utils/project'
import { findWorkorders } from '@/features/statistics/utils/workorder'
import { findEnvironments } from '@/features/statistics/utils/environment'

const StatisticsPage = async () => {
  const api = await getRorApi()
  const listParams = new URLSearchParams()
  listParams.set('limit', '1000')
  const res = await api.kubernetesClusters.list(listParams)
  const items: KubernetesCluster[] = res?.resources ?? []

  const { topologyVersionCount, topologyControlPlaneVersionCount, kubernetesCount, agentCount, nhnToolingCount } =
    findVersions(items)
  const { providerCount } = findProviders(items)
  const { datacenterCount } = findDatacenters(items)
  const { regionCount } = findRegions(items)
  const { projectCount } = findProjects(items)
  const { workorderCount } = findWorkorders(items)
  const { environmentCount } = findEnvironments(items)

  return (
    <div className='w-full flex flex-col'>
      <Header title='Statistics' />
      <PageView
        topologyVersions={topologyVersionCount}
        topologyControlPlaneVersions={topologyControlPlaneVersionCount}
        kubernetesVersions={kubernetesCount}
        agentVersions={agentCount}
        nhnToolingVersion={nhnToolingCount}
        providers={providerCount}
        datacenters={datacenterCount}
        regions={regionCount}
        projects={projectCount}
        workorders={workorderCount}
        environments={environmentCount}
      />
    </div>
  )
}

export default StatisticsPage
