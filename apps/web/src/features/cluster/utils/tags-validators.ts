// Vocabulary: alnum = alphanumeric characters (A-Z, a-z, 0-9)

// 1-63 chars, alnum at ends, middle may include -_. and alnum
const name_regex = /^[A-Za-z0-9]([A-Za-z0-9_.-]{0,61}[A-Za-z0-9])?$/

// lowercase only, dots + hyphens, <=253 overall (we length-check separately)
const prefix_regex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/

export function tagKeyValidator(key: string): string | null {
  const k = key.trim()
  if (!k) {
    return 'Key is required'
  }

  const parts = k.split('/')

  if (parts.length > 2) {
    return 'Key cannot contain more than one / (prefix/name)'
  }

  const hasPrefix = parts.length === 2
  const name = hasPrefix ? parts[1] : parts[0]
  const prefix = hasPrefix ? parts[0] : null

  if (!name_regex.test(name)) {
    return 'Key name must follow allowed pattern'
  }

  if (prefix) {
    if (prefix.length > 253) {
      return 'Key prefix must be under 254 characters'
    }
    if (!prefix_regex.test(prefix)) {
      return 'Key prefix must be DNS subdomain and follow allowed pattern'
    }
  }

  return null
}

export function tagValueValidator(value: string): string | null {
  const v = value.trim()
  if (!v) {
    return 'Value is required'
  }

  if (v.length > 63) {
    return 'Value must be under 63 characters'
  }
  if (!name_regex.test(v)) {
    return 'Value must follow allowed pattern'
  }

  return null
}
