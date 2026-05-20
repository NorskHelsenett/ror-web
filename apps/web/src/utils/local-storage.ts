/**
 * Retrieve a saved preference from local storage
 * @remarks
 * This function retrieves a value stored in localStorage by the specified key. If no value is found, returns the provided fallback value.
 * If a boolean value was stored as a string ('true'/'false'), it will be converted back to a boolean.
 * @param key - The key to look up in localStorage
 * @param fallback - The default value to return if no value is found for the key
 * @returns The stored value of type T, or the fallback value if none exists
 * @typeParam T - The expected type of the stored value
 */
export function getSavedPreference<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  if (raw === 'true') return true as T
  if (raw === 'false') return false as T
  try {
    return JSON.parse(raw) as T
  } catch {
    return raw as T
  }
}
/**
 * Save a preference value to local storage
 * @param key - The key to store the value under in localStorage
 * @param value - The value to store
 * @typeParam T - The type of value being stored (must extend string)
 */
export function savePreference<T extends string>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, value)
}

/**
 * Remove a saved preference from local storage
 * @remarks
 * This function permanently removes a stored value from localStorage by its key.
 * @param key - The key of the preference to remove from localStorage
 * @returns void
 */
export function removePreference(key: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(key)
}
