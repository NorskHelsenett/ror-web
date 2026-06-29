'use client'

import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'release:active'
const EVENT_NAME = 'release:active-changed'

function readFromStorage(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(STORAGE_KEY)
}

/**
 * Manages the "active release" state stored in localStorage.
 * All instances of this hook on the same page stay in sync via a custom window event.
 *
 * Usage:
 * - Call `setActiveReleaseId(id)` when the user clicks a release (e.g. in release-card).
 * - Call `clearActiveRelease()` when the user dismisses the spotlight.
 * - Read `activeReleaseId` in ReleaseSpotlight to decide whether to highlight.
 */
export function useActiveRelease() {
  const [activeReleaseId, setActiveReleaseIdState] = useState<string | null>(readFromStorage)

  const setActiveReleaseId = useCallback((id: string) => {
    window.localStorage.setItem(STORAGE_KEY, id)
    setActiveReleaseIdState(id)
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: id }))
  }, [])

  const clearActiveRelease = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setActiveReleaseIdState(null)
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }))
  }, [])

  // Keep all hook instances on the same page in sync
  useEffect(() => {
    function handleChange(e: Event) {
      setActiveReleaseIdState((e as CustomEvent<string | null>).detail)
    }
    window.addEventListener(EVENT_NAME, handleChange)
    return () => window.removeEventListener(EVENT_NAME, handleChange)
  }, [])

  return { activeReleaseId, setActiveReleaseId, clearActiveRelease }
}
