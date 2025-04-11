'use server'

import { getSavedPreference, setSavedPreference } from '@/utils/cookies'

export async function saveLeftPanelPreferenceAction(value: boolean) {
  await setSavedPreference('ror.left-panel-expanded', value.toString())
}

export async function getLeftPanelPreferenceAction(): Promise<boolean> {
  const value = await getSavedPreference('ror.left-panel-expanded', 'true')
  const validValue = validateLeftPanelPreference(value)
  return validValue
}

function validateLeftPanelPreference(value: string): boolean {
  const isBoolean = value === 'true' || value === 'false'
  if (!isBoolean) {
    throw new Error(`Invalid value for left panel preference. Expected string 'true' or 'false', got ${typeof value}`)
  }
  return value === 'true' ? true : false
}
