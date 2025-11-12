'use client'

import { useEffect, useState } from 'react'
import type { Layouts } from 'react-grid-layout'
import {
  getSavedUserPreferenceObject,
  updateUserPreferenceObject,
  PREFERENCES_KEY,
  DEFAULT_USERPREFERENCES,
  Preferences,
} from '@/utils/user-preferences'
import { LayoutKey } from '@/types/layouts'

/**
 * Type guard that checks whether a value matches the expected "Layouts" shape.
 *
 * The predicate returns true when the provided value is a non-null object and
 * every property value is either `undefined` or an `Array` (i.e. Array<unknown>).
 * Use this function in conditional checks to narrow an `unknown` value to the
 * `Layouts` type.
 */
function isLayouts(value: unknown): value is Layouts {
  if (!value || typeof value !== 'object') return false
  return Object.values(value as Record<string, unknown>).every(
    (layout) => layout === undefined || Array.isArray(layout)
  )
}

/**
 * A reusable hook to persist and manage user-specific layout configurations.
 *
 * @param key - The property key inside userPreferences (e.g. "clusterCards")
 * @param defaultLayouts - Default layout configuration if none is found in localStorage
 */
export function useLayoutPreferences(key: LayoutKey, defaultLayouts: Layouts) {
  const [layouts, setLayouts] = useState<Layouts>(() => {
    if (typeof window === 'undefined') return defaultLayouts
    const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
    const saved = (prefs as Preferences)[key]?.layouts
    return isLayouts(saved) ? saved : defaultLayouts
  })
  const [layoutKey, setLayoutKey] = useState(0)
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
    const saved = (prefs as Preferences)[key]?.layouts
    setLayouts(isLayouts(saved) ? saved : defaultLayouts)
  }, [key, defaultLayouts])

  const saveLayouts = (newLayouts: Layouts) => {
    setLayouts(newLayouts)
    updateUserPreferenceObject(PREFERENCES_KEY, {
      [key]: { layouts: newLayouts },
    })
  }

  const resetToDefault = () => {
    setLayouts(defaultLayouts)
    updateUserPreferenceObject(PREFERENCES_KEY, {
      [key]: { layouts: defaultLayouts },
    })
    setLayoutKey((prev) => prev + 1)
  }

  const resetToSaved = () => {
    const prefs = getSavedUserPreferenceObject(PREFERENCES_KEY, DEFAULT_USERPREFERENCES)
    const saved = (prefs as Preferences)[key]?.layouts
    if (isLayouts(saved)) {
      setLayouts(saved)
      setLayoutKey((prev) => prev + 1)
    }
  }

  return {
    layouts,
    setLayouts,
    layoutKey,
    setLayoutKey,
    currentBreakpoint,
    setCurrentBreakpoint,
    saveLayouts,
    resetToSaved,
    resetToDefault,
  }
}
