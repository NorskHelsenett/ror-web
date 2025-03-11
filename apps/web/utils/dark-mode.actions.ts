'use server'

import { ColorScheme, COLOR_SCHEME_COOKIE_KEY, validateColorScheme } from '@/utils/dark-mode'
import { deleteSavedPreference, getSavedPreference, setSavedPreference } from '@/utils/cookies'

export async function saveDarkModePreferenceAction(value: ColorScheme) {
  if (value === ColorScheme.System) {
    await deleteSavedPreference(COLOR_SCHEME_COOKIE_KEY)
  } else {
    await setSavedPreference(COLOR_SCHEME_COOKIE_KEY, value)
  }
}

/**
 * Get the user's dark mode preference from the cookie.
 * If the cookie is not set, return the default value.
 */
export async function getDarkModePreferenceAction(): Promise<ColorScheme> {
  const value = await getSavedPreference(COLOR_SCHEME_COOKIE_KEY, ColorScheme.System)
  const colorScheme = validateColorScheme(value)
  return colorScheme
}
