import { authGuard } from '@/features/auth/utils/auth-guard'
import { rorApiClient } from '@/services/ror-api'
import { ClusterIngressesDataView } from './ingress-data-view'

interface ClusterIngressesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ClusterIngressesPage({ params }: ClusterIngressesPageProps) {
  const { id } = await params

  const session = await authGuard()
  const client = rorApiClient(session.accessToken)

  const ingressFilter = [
    {
      field: 'rormeta.ownerref.subject',
      type: 'string',
      operator: 'eq',
      value: id,
    },
  ]
  const listParams = new URLSearchParams([['filter', JSON.stringify(ingressFilter)]])
  const clusterIngresses = await client.ingresses.list(listParams)
  const ingresses = clusterIngresses ?? []

  if (!ingresses) {
    return <div>No ingresses found</div>
  }

  return <ClusterIngressesDataView ingresses={ingresses} />
}
