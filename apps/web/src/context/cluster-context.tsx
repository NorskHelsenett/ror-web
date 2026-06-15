'use client'

import { ClusterListViewItemRowType, KubernetesCluster } from '@ror/js-api-client'
import { createContext, useContext } from 'react'

export interface ClusterContextData {
  cluster: ClusterListViewItemRowType
  kubernetesCluster: KubernetesCluster
}

// Create a context
const ClusterContext = createContext<ClusterContextData | undefined>(undefined)

// hook
export const useClusterContext = (): ClusterContextData => {
  const context = useContext(ClusterContext)
  if (!context) {
    throw new Error('useClusterContext must be used inside a ClusterProvider')
  }
  return context
}

// Provider-component
interface ClusterProviderProps {
  value: ClusterContextData
  children: React.ReactNode
}

export const ClusterProvider: React.FC<ClusterProviderProps> = ({ value, children }) => {
  return <ClusterContext.Provider value={value}>{children}</ClusterContext.Provider>
}
