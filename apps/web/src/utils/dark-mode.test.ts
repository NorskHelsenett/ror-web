import { ColorScheme, isColorScheme, resolveColorScheme, validateColorScheme } from './dark-mode'

describe('color scheme preferences', () => {
  test.each(Object.values(ColorScheme))('accepts and preserves %s', (scheme) => {
    expect(isColorScheme(scheme)).toBe(true)
    expect(validateColorScheme(scheme)).toBe(scheme)
  })

  test('rejects unknown preferences', () => {
    expect(isColorScheme('unknown')).toBe(false)
    expect(() => validateColorScheme('unknown')).toThrow('Invalid color scheme')
  })

  test.each([
    [ColorScheme.Light, false, 'light'],
    [ColorScheme.Light, true, 'light'],
    [ColorScheme.Dark, false, 'dark'],
    [ColorScheme.Dark, true, 'dark'],
    [ColorScheme.DarkBlack, false, 'dark'],
    [ColorScheme.DarkBlack, true, 'dark'],
    [ColorScheme.System, false, 'light'],
    [ColorScheme.System, true, 'dark'],
  ] as const)('resolves %s with OS dark=%s to %s', (scheme, prefersDark, expected) => {
    expect(resolveColorScheme(scheme, prefersDark)).toBe(expected)
  })
})
