import { ClusterListViewRowType } from '@ror/js-api-client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { getClusterIdView, getClustersViewKey } from '../utils/cluster'
import { loadMoreClusters } from '@/utils/cluster-actions'

interface UseClusterInfiniteLoaderProps {
  initial: ClusterListViewRowType[]
  sort?: string
  pageSize?: number
}

/**
 * Custom React hook for infinite loading of Kubernetes clusters with support for sorting, pagination, and deduplication.
 *
 * This hook manages a list of clusters, loading more as the user scrolls near the bottom of the list.
 * It avoids parallel requests, handles stale responses, and prevents unnecessary rerenders by tracking server payloads.
 *
 * @param {Object} params - Hook parameters.
 * @param {ClusterListViewRowType[]} params.initial - Initial list of clusters to display.
 * @param {string} params.sort - Sort order or key for clusters.
 * @param {number} [params.pageSize=50] - Number of clusters to load per request.
 *
 * @returns {{
 *   items: ClusterListViewRowType[],
 *   sentinelRef: React.RefObject<HTMLDivElement>,
 *   isLoading: boolean,
 *   hasMore: boolean,
 *   fetchMore: () => Promise<void>,
 *   reset: (nextInitial?: ClusterListViewRowType[]) => void
 * }} - Hook state and actions:
 *   - `items`: Current list of clusters.
 *   - `sentinelRef`: Ref to the DOM element used for intersection observer.
 *   - `isLoading`: Whether a fetch is in progress.
 *   - `hasMore`: Whether more clusters are available to load.
 *   - `fetchMore`: Function to load more clusters.
 *   - `reset`: Function to reset the stream and optionally set a new initial list.
 */
export function useClusterInfiniteLoader({ initial, sort, pageSize = 50 }: UseClusterInfiniteLoaderProps) {
  const [items, setItems] = useState<ClusterListViewRowType[]>(initial)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // DOM sentinel. When this div becomes visible, more clusters are loaded.
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Avoid parallel requests, by returning immediately if inFlightRef.current is true
  const inFlightRef = useRef(false)
  // Handles stale results, by returning immediately if runId has changed (for example if user changes sort before previous fetch completes)
  const runIdRef = useRef(0) // increments whenever we "reset" the stream
  // Remember last server payload to see if the content changed, to avoid unnecessary rerenders
  const lastKeyRef = useRef(getClustersViewKey(initial))

  // Adopt new server payload only if content changed
  useEffect(() => {
    const nextKey = getClustersViewKey(initial)
    if (nextKey !== lastKeyRef.current) {
      lastKeyRef.current = nextKey
      setItems(initial)
      setHasMore(true)
      runIdRef.current++ // bump runId so any in-flight responses are ignored
    }
  }, [initial])

  // If sort changes, reset the stream (but keep current initial)
  useEffect(() => {
    setHasMore(true)
    runIdRef.current++ // bump runId so any in-flight responses are ignored
  }, [sort])

  // Fetch more clusters
  const fetchMore = useCallback(async () => {
    // If already loading or no more to load, don't do anything
    if (inFlightRef.current || isLoading || !hasMore) return
    inFlightRef.current = true
    setIsLoading(true)

    // Remember the runId for this request
    const runId = runIdRef.current
    try {
      // Fetch more clusters
      const data = await loadMoreClusters({ offset: items.length, limit: pageSize, sort })

      // Ignore stale responses (e.g. sort changed mid-request)
      if (runId !== runIdRef.current) return

      // Append new clusters, avoiding duplicates
      setItems((prev) => {
        const seen = new Set(prev.map(getClusterIdView))
        const incoming = (data.items ?? []).filter((c) => {
          const id = getClusterIdView(c)
          return id && !seen.has(id)
        })
        return incoming.length ? [...prev, ...incoming] : prev
      })

      // If we got less than requested, there's no more to load
      if (!data.hasMore) {
        setHasMore(false)
      }
    } catch (e) {
      console.error('[useInfiniteClusters] fetchMore failed', e)
      setHasMore(false)
    } finally {
      // Only turn off loading if this is the latest request
      if (runId === runIdRef.current) {
        setIsLoading(false)
        inFlightRef.current = false
      }
    }
  }, [items.length, pageSize, sort, hasMore, isLoading])

  // Observe sentinel to auto-fetch when near bottom
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !isLoading && hasMore) {
          fetchMore()
        }
      },
      { root: null, rootMargin: '600px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [fetchMore, isLoading, hasMore])

  // in case you need to programmatically clear the stream
  const reset = useCallback((nextInitial?: ClusterListViewRowType[]) => {
    runIdRef.current++
    inFlightRef.current = false
    setIsLoading(false)
    setHasMore(true)
    setItems(nextInitial ?? [])
    if (nextInitial) lastKeyRef.current = getClustersViewKey(nextInitial)
  }, [])

  return { items, sentinelRef, isLoading, hasMore, fetchMore, reset }
}
