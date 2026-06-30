import Fuse from 'fuse.js'
import { useMemo } from 'react'
import type { ClusterGroup } from '../types/policy-report-types'

export function useClusterGroupSearch(items: ClusterGroup[], query: string): ClusterGroup[] {
  const fuse = useMemo(() => new Fuse(items, { keys: ['clusterName'], threshold: 0.3 }), [items])

  return query ? fuse.search(query).map((r) => r.item) : items
}
