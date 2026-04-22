/*
 * FILE OVERVIEW:
 *
 * React hook for managing and persisting display data selection per domain using localStorage.
 */

import { useEffect, useState } from 'react'

/**
 * React hook for managing and persisting display data selection per domain using localStorage.
 *
 * On mount, it loads the selected display data from localStorage (if available) for the given domain.
 * Updates to the selection are automatically saved to localStorage, ensuring persistence across sessions.
 *
 * @template T - The type of the display data items.
 * @param domain - A unique string identifier for the domain/context of the display data.
 * @returns An object containing:
 *   - `selectedDisplayData`: The current array of selected display data items.
 *   - `setSelectedDisplayData`: A setter function to update the selection.
 */
export function useDisplayData<T>(domain: string) {
  const [selectedDisplayData, setSelectedDisplayData] = useState<T[]>([])

  // On mount, update from localStorage if available
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(`selectedDisplayData:${domain}`)
      if (stored) {
        const parsed = JSON.parse(stored) as T[]
        // Only update if different to avoid unnecessary re-renders
        if (JSON.stringify(parsed) !== JSON.stringify(selectedDisplayData)) {
          setSelectedDisplayData(parsed)
        }
      }
    } catch {
      // ignore
    }
  }, [domain, selectedDisplayData])

  // Keep localStorage updated only on the client
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const serialized = JSON.stringify(selectedDisplayData)
      const key = `selectedDisplayData:${domain}`
      if (localStorage.getItem(key) !== serialized) {
        localStorage.setItem(key, serialized)
      }
    } catch (error) {
      console.error(`Error saving selectedDisplayData for ${domain}:`, error)
    }
  }, [selectedDisplayData, domain])

  return { selectedDisplayData, setSelectedDisplayData }
}
