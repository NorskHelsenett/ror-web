'use server'

import { ColorScheme, COLOR_SCHEME_COOKIE_KEY, validateColorScheme } from '@/utils/dark-mode'
import { deleteSavedPreference, getSavedPreference, setSavedPreference } from '@/utils/cookies'

export async function saveDarkModePreferenceAction(value: ColorScheme) {
  try {
    if (value === ColorScheme.System) {
      await deleteSavedPreference(COLOR_SCHEME_COOKIE_KEY)
    } else {
      await setSavedPreference(COLOR_SCHEME_COOKIE_KEY, value)
    }
  } catch (error) {
    console.error('Error saving dark mode preference:', error)
  }
}

/**
 * Get the user's dark mode preference from the cookie.
 * If the cookie is not set, return the default value.
 */
export async function getDarkModePreferenceAction(): Promise<ColorScheme> {
  try {
    const value = await getSavedPreference(COLOR_SCHEME_COOKIE_KEY, ColorScheme.System)
    const colorScheme = validateColorScheme(value)
    return colorScheme
  } catch (error) {
    console.error('Error getting dark mode preference:', error)
    return ColorScheme.System
  }
}
