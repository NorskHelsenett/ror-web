const providerColors: Record<string, string> = {
  tanzu: 'bg-violet-600',
  aks: 'bg-sky-500',
  talos: 'bg-orange-500',
  kind: 'bg-emerald-500',
}

/**
 * Returns tailwind background color styling class for provider
 *
 * @param provider - provider of datacenter
 * @returns Tailwind styling class for background color
 */
export function getProviderColorClass(provider: string | null | undefined): string {
  if (!provider) return 'bg-slate-500'
  return providerColors[provider.toLowerCase()] ?? 'bg-slate-500'
}

/**
 * Matches datacenter name to regions
 *
 * @param name - name of datacenter
 * @returns Region of datacenter, based on name
 */
export function getRegionByName(name: string | undefined): string {
  if (name === undefined) {
    return ''
  }
  const startOfName = name.substring(0, 3)
  if (startOfName === 'osl') {
    return 'Oslo'
  } else if (startOfName === 'trd') {
    return 'Trondheim'
  } else if (startOfName === 'bgo') {
    return 'Bergen'
  } else if (startOfName === 'tos') {
    return 'Tromsø'
  }
  return ''
}

/**
 * Matches datacenter name to country
 *
 * @param name - name of datacenter
 * @returns Country of datacenter, based on name
 */
export function getCountryByName(name: string | undefined): string {
  if (name === undefined) {
    return ''
  }
  const startOfName = name.substring(0, 3)
  const countryIsNorwayCondition =
    startOfName === 'osl' || startOfName === 'trd' || startOfName === 'bgo' || startOfName === 'tos'
  if (countryIsNorwayCondition) {
    return 'Norway'
  }
  return ''
}
