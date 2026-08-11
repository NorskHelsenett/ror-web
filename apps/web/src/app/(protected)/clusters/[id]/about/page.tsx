import { getRorApi } from '@/services/ror-api'
import { PageView } from './page-view'
import { NotFoundError } from '@ror/js-api-client'
import { Cluster } from '@ror/js-api-client'

export default async function ClusterAboutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const api = await getRorApi()
  const clusterByUid = await api.kubernetesClusters.id(id)
  const clusterId = clusterByUid.kubernetescluster?.status?.agentstatus?.clusterId || ''

  let v1Cluster: Cluster | undefined
  if (clusterId) {
    try {
      v1Cluster = await api.kubernetesClusters.idV1(clusterId)
    } catch (e) {
      if (!(e instanceof NotFoundError)) throw e
    }
  }

  return <PageView v1Cluster={v1Cluster} />
}
