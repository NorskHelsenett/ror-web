import { useEffect, useState } from 'react'
import type { ClusterListViewRowType } from '@ror/js-api-client'

export interface UseClusterLayoutParams {
  params: Promise<{ id: string }>
}

export interface UseClusterLayoutReturn {
  id: string
  cluster: ClusterListViewRowType | null
  isLoading: boolean
  error: string | null
}

export const useClusterLayout = ({ params }: UseClusterLayoutParams): UseClusterLayoutReturn => {
  const [id, setId] = useState('')
  const [cluster, setCluster] = useState<ClusterListViewRowType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadVmData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const { id } = await params
        setId(id)
        const stored = localStorage.getItem('selectedCluster')
        if (stored) {
          setCluster(JSON.parse(stored))
        } else {
          setError('No Cluster data found in localStorage')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setIsLoading(false)
      }
    }

    loadVmData()
  }, [params])

  return { id, cluster, isLoading, error }
}
