'use client'

import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'release:read'
const EVENT_NAME = 'release:read-changed'

function readFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return new Set()
  try {
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

function writeToStorage(ids: Set<string>): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  window.dispatchEvent(new CustomEvent<string[]>(EVENT_NAME, { detail: [...ids] }))
}

/**
 * Tracks which releases the user has clicked/read, persisted in localStorage.
 * All hook instances on the same page stay in sync via a custom window event.
 *
 * - `markRead(id)`  — marks a release as read.
 * - `isRead(id)`    — returns true if the release has been read.
 */
export function useReadReleases() {
  const [readIds, setReadIds] = useState<Set<string>>(readFromStorage)

  useEffect(() => {
    const handler = () => setReadIds(readFromStorage())
    window.addEventListener(EVENT_NAME, handler)
    return () => window.removeEventListener(EVENT_NAME, handler)
  }, [])

  const markRead = useCallback((id: string) => {
    const next = new Set(readFromStorage())
    next.add(id)
    writeToStorage(next)
    setReadIds(next)
  }, [])

  const isRead = useCallback((id: string) => readIds.has(id), [readIds])

  return { markRead, isRead }
}
