'use client'

import { useEffect, useState, useRef, type SetStateAction, useCallback } from 'react'
import {
  getSavedUserPreferenceObject,
  updateUserPreferenceObject,
  PREFERENCES_KEY,
  DEFAULT_USERPREFERENCES,
  Preferences,
} from '@/utils/user-preferences'
import { LayoutKey } from '@/types/layouts'
import { Layouts } from '@/utils/layout-item'

// ---- Types ----------------------------------------------------

// What GridStack gives you
export type GridStackLayoutItem = {
  id: string
  x: number
  y: number
  w: number
  h: number
}

// Minimal react-grid-layout-like shape we persist in preferences
export type RGLLayoutItem = {
  i: string
  x: number
  y: number
  w: number
  h: number
  // allow extra fields if schema has them
  [key: string]: unknown
}

/**
 * Type guard that checks whether a value matches the expected "Layouts" shape.
 */
function isLayouts(value: unknown): value is Layouts {
  if (!value || typeof value !== 'object') return false
  return Object.values(value as Record<string, unknown>).every(
    (layout) => layout === undefined || Array.isArray(layout)
  )
}

const LOG_NS = '[useLayoutPreferences]'

// Normalize either a GridStack array or Layouts into Layouts
function normalizeToLayouts(value: Layouts | GridStackLayoutItem[]): Layouts {
  if (Array.isArray(value)) {
    // Wrap GridStack items into a single breakpoint key (e.g. "lg")
    const lgLayout: RGLLayoutItem[] = value.map((n) => ({
      i: n.id,
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
    }))
    return { lg: lgLayout }
  }
  return value
}

/**
 * A reusable hook to persist and manage user-specific layout configurations.
 *
 * NOTE: Now supports **either**
 *  - a react-grid-layout-style Layouts object, or
 *  - a GridStackLayoutItem[] array (what you're using).
 */
export function useLayoutPreferences(key: LayoutKey, defaultLayoutsInput: Layouts | GridStackLayoutItem[]) {
  const isClient = typeof window !== 'undefined'
  const defaultLayoutsRef = useRef<Layouts>(normalizeToLayouts(defaultLayoutsInput))
  const initialDefaultLayouts = defaultLayoutsRef.current

  const [layouts, setLayouts] = useState<Layouts>(() => {
    if (!isClient) {
      return initialDefaultLayouts
    }
    try {
      const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
      const saved = (prefs as Preferences)[key]?.layouts
      const result = isLayouts(saved) ? saved : initialDefaultLayouts
      return result
    } catch (e) {
      console.warn(`${LOG_NS} init parse error, falling back to defaults`, e)
      return initialDefaultLayouts
    }
  })

  // in-memory snapshot of the saved layouts for the current session.
  const [savedLayouts, setSavedLayouts] = useState<Layouts | null>(() => {
    if (!isClient) return null
    try {
      const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
      const saved = (prefs as Preferences)[key]?.layouts
      return isLayouts(saved) ? clone(saved) : null
    } catch {
      return null
    }
  })
  const [layoutKey, setLayoutKey] = useState(0)
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [hasManualReset, setHasManualReset] = useState(false)

  useEffect(() => {
    if (!isClient || hasManualReset) return
    try {
      const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
      const saved = (prefs as Preferences)[key]?.layouts
      const next = isLayouts(saved) ? saved : initialDefaultLayouts
      setLayouts(next)
      setSavedLayouts(isLayouts(saved) ? clone(saved) : null)
    } catch (e) {
      console.warn(`${LOG_NS} effect->load error`, e)
    }
  }, [key, isClient, hasManualReset, initialDefaultLayouts])

  const saveLayouts = (newLayoutsInput: Layouts | GridStackLayoutItem[]) => {
    try {
      const normalized = normalizeToLayouts(newLayoutsInput)

      const merged: Layouts = {
        ...layouts,
        ...normalized,
      }

      setLayouts(merged)
      setSavedLayouts(clone(merged))

      updateUserPreferenceObject(PREFERENCES_KEY, {
        [key]: { layouts: merged },
      })
    } catch (e) {
      console.error(`${LOG_NS} saveLayouts error`, e)
    }
  }

  const resetToDefault = () => {
    try {
      setLayouts(initialDefaultLayouts)
      updateUserPreferenceObject(PREFERENCES_KEY, { [key]: { layouts: initialDefaultLayouts } })
      setSavedLayouts(clone(initialDefaultLayouts))
      setLayoutKey((prev) => prev + 1)
      setHasManualReset(true)
      console.info(`${LOG_NS} resetToDefault applied`)
    } catch (e) {
      console.error(`${LOG_NS} resetToDefault error`, e)
    }
  }

  const resetToSaved = () => {
    try {
      const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
      const persisted = (prefs as Preferences)[key]?.layouts
      const candidate = savedLayouts ?? (isLayouts(persisted) ? persisted : undefined)
      if (candidate && isLayouts(candidate)) {
        setLayouts(candidate)
        setLayoutKey((prev) => prev + 1)
        setHasManualReset(true)
        console.info(
          `${LOG_NS} resetToSaved applied ${JSON.stringify(savedLayouts)} (from ${savedLayouts ? 'memory' : 'persisted'})`
        )
      } else {
        console.info(`${LOG_NS} resetToSaved nothing to apply`)
      }
    } catch (e) {
      console.error(`${LOG_NS} resetToSaved error`, e)
    }
  }

  const getCurrentLayouts = useCallback(() => {
    const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
    console.log('getCurrentLayouts prefs: ', prefs)
    return prefs
  }, [])

  function clone<T>(v: T): T {
    try {
      const sc = (globalThis as unknown as { structuredClone?: (v: unknown) => unknown }).structuredClone
      if (typeof sc === 'function') return sc(v) as T
      return JSON.parse(JSON.stringify(v))
    } catch {
      return JSON.parse(JSON.stringify(v))
    }
  }

  return {
    layouts,
    // unpersisted setter (still expects Layouts object)
    setLayouts: (next: Layouts) => {
      console.info(`${LOG_NS} setLayouts (unpersisted)`, {
        key,
        nextKeys: Object.keys(next || {}),
      })
      setLayouts(next)
    },
    layoutKey,
    setLayoutKey: (fnOrVal: SetStateAction<number>) => {
      const next = typeof fnOrVal === 'function' ? (fnOrVal as (prev: number) => number)(layoutKey) : fnOrVal
      console.info(`${LOG_NS} setLayoutKey`, { from: layoutKey, to: next })
      setLayoutKey(next)
    },
    currentBreakpoint,
    setCurrentBreakpoint: (bp: string) => {
      setCurrentBreakpoint(bp)
    },
    saveLayouts,
    resetToSaved,
    resetToDefault,
    getCurrentLayouts,
  }
}
