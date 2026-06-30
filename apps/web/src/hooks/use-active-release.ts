'use client'

import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'release:active'
const EVENT_NAME = 'release:active-changed'

export interface ActiveRelease {
  releaseId: string
  step: number
}

function readFromStorage(): ActiveRelease | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ActiveRelease
  } catch {
    return null
  }
}

function writeToStorage(value: ActiveRelease | null): void {
  if (typeof window === 'undefined') return
  if (value === null) {
    window.localStorage.removeItem(STORAGE_KEY)
  } else {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }))
}

/**
 * Manages the active release tour state in localStorage.
 * All hook instances on the same page stay in sync via a custom window event.
 *
 * - `setActiveRelease(id)` — starts the tour at step 1 for the given release id.
 * - `advanceStep()`        — moves to the next step.
 * - `clearActiveRelease()` — dismisses the tour entirely.
 */
export function useActiveRelease() {
  const [activeRelease, setActiveReleaseState] = useState<ActiveRelease | null>(readFromStorage)

  const setActiveRelease = useCallback((releaseId: string) => {
    const next: ActiveRelease = { releaseId, step: 1 }
    writeToStorage(next)
    setActiveReleaseState(next)
  }, [])

  const advanceStep = useCallback(() => {
    const current = readFromStorage()
    if (!current) return
    const next: ActiveRelease = { ...current, step: current.step + 1 }
    writeToStorage(next)
    setActiveReleaseState(next)
  }, [])

  const clearActiveRelease = useCallback(() => {
    writeToStorage(null)
    setActiveReleaseState(null)
  }, [])

  // Keep all hook instances on the same page in sync
  useEffect(() => {
    function handleChange(e: Event) {
      setActiveReleaseState((e as CustomEvent<ActiveRelease | null>).detail)
    }
    window.addEventListener(EVENT_NAME, handleChange)
    return () => window.removeEventListener(EVENT_NAME, handleChange)
  }, [])

  return { activeRelease, setActiveRelease, advanceStep, clearActiveRelease }
}
