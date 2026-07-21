/**
 * Original source: https://gist.github.com/gynekolog/c78a918f93c16522157539dc31b53dbb
 */

import { parseQuantity } from './parse-quantity'

type Plurals = Record<Intl.LDMLPluralRule, string>

const DEFAULT_PLURALS: Plurals = {
  zero: 'Bytes',
  one: 'Byte',
  two: 'Bytes',
  few: 'Bytes',
  many: 'Bytes',
  other: 'Bytes',
}

const SIZE_UNITS_BINARY = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
const SIZE_UNITS_DECIMAL = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export function convertBytes(
  bytes: number,
  options: {
    // Use binary units (1024) instead of decimal units (1000). Defaults to false.
    useBinaryUnits?: boolean
    // Number of decimal places to round the result to. Defaults to 2.
    roundingPrecision?: number
    // Include the unit in the output string. Defaults to true.
    includeUnit?: boolean
    // Localize byte units to a specific language with optional plural forms. Defaults to English, which only requires "one" and "other".
    localizeOptions?:
      | { language: 'en'; plurals?: Partial<Pick<Plurals, 'one' | 'other'>> }
      // Not all languages require all plural forms, so missing forms will fall back to default plurals.
      // To check which plural forms a language needs, refer to:
      // @see: https://www.unicode.org/cldr/charts/46/supplemental/language_plural_rules.html
      | { language: string; plurals?: Partial<Plurals> }
  } = {}
) {
  const {
    useBinaryUnits = false,
    roundingPrecision = 2,
    includeUnit = true,
    localizeOptions = { language: 'en' },
  } = options

  // Ensure rounding precision is valid (non-negative).
  if (roundingPrecision < 0) throw new Error(`Invalid decimal precision: ${roundingPrecision}`)

  // Choose the correct base (1024 for binary, 1000 for decimal) and units.
  const base = useBinaryUnits ? 1024 : 1000
  const units = useBinaryUnits ? SIZE_UNITS_BINARY : SIZE_UNITS_DECIMAL

  // Combine custom plural forms with the default ones to ensure all necessary forms are included.
  const plurals = { ...DEFAULT_PLURALS, ...localizeOptions.plurals }

  // Determine the plural form based on the byte count.
  const pluralRules = new Intl.PluralRules(localizeOptions.language)
  const pluralForm = pluralRules.select(bytes)
  const pluralizedUnit = plurals[pluralForm]

  // Special case for 0 bytes.
  const exponent = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(base))

  // Calculate the value and round to the specified precision.
  const value = (bytes / base ** exponent).toFixed(roundingPrecision)

  // Select the appropriate unit for the result (e.g., "KiB" or "KB").
  const unit = exponent === 0 ? pluralizedUnit : units[exponent]

  return includeUnit ? `${value} ${unit}` : value
}

/**
 * Converts a memory quantity string into a human-readable string with appropriate binary units.
 *
 * The function parses the input memory string, determines the number of bytes, and then formats
 * it using binary units. The output is localized to English and uses singular or plural forms
 * for "Byte" as appropriate.
 *
 * @param memory - The memory quantity string to convert (e.g., "2Gi", "512Mi").
 * @returns A human-readable string representing the memory size with binary units.
 */
export function convertMemory(memory: string): string {
  const memoryBytes = parseQuantity(memory)
  const memoryGiB = memoryBytes / 1024 ** 3
  const decimals = memoryGiB.toFixed(2).split('.')[1]
  const roundingPrecision = decimals === '00' ? 0 : 2

  return convertBytes(memoryBytes, {
    useBinaryUnits: true,
    roundingPrecision,
    includeUnit: true,
    localizeOptions: { language: 'en', plurals: { one: 'Byte', other: 'Bytes' } },
  })
}
/**
 * Format cores to string, showing millicores for values < 1.
 *
 * @param {number} cores - number of cores
 */
export function formatCores(cores: number): string {
  return cores < 1 ? `${(cores * 1000).toFixed(0)}m` : `${cores.toFixed(2)}`
}
