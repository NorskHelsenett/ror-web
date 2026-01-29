import { Provider, Region } from '../types/create-cluster'
import { prices } from './prices-mock'

export const optionMap = [
  'talos-west',
  'talos-central',
  'talos-south',
  'tanzu-east',
  'tanzu-central',
  'azure-east',
  'azure-west',
]

export const isTemp = (current: string, tempValue: string) => current === tempValue
export const isOption = (option: string) => optionMap.includes(option)

// Prices
const formatPrice = (price: number) => {
  const splitUp: string[] = []
  let i = price.toString().length

  while (i > 0) {
    const start = Math.max(i - 3, 0)
    const chunk = price.toString().slice(start, i)
    splitUp.unshift(chunk)
    i = start
  }

  let formattedPrice = ''

  for (const piece of splitUp) {
    formattedPrice += piece
    formattedPrice += '.'
  }

  return formattedPrice.slice(0, -1) + ' NOK'
}

const getPrice = (provider: string, wpClassWatch: string, wpNumberWatch: number, cpWatch: number): number | null => {
  const match = prices.find(
    (p) =>
      p.provider.toLowerCase() === provider.toLowerCase() &&
      p.machineClass.toLowerCase() === (wpClassWatch || 'medium').toLowerCase()
  )

  if (!match || typeof match.price !== 'number') {
    return null
  }

  const wp = wpNumberWatch || 3
  const cp = cpWatch || 3

  return match.price * wp * cp
}

export const priceForCluster = (
  provider: string,
  wpClassWatch: string,
  wpNumberWatch: number,
  cpWatch: number
): string => {
  const price = getPrice(provider, wpClassWatch, wpNumberWatch, cpWatch)
  if (price == null) {
    return 'Cannot fetch price'
  }
  return formatPrice(price)
}

// -----

export const renderTagsYaml = (tags: { key: string; value: string }[]) => {
  const safe = Array.isArray(tags) ? tags : []
  if (safe.length === 0) return ''

  const quote = (v: string) => {
    if (/[:#\n\r\t]/.test(v) || v.trim() !== v || v === '') return JSON.stringify(v)
    return v
  }

  return safe
    .filter((t) => t?.key?.trim() && t?.value?.trim())
    .map((t) => `    ${t.key.trim()}: ${quote(t.value.trim())}`)
    .join('\n')
}

export const convertToVitiMachineClass = (wpClassWatch: string) => {
  if (!wpClassWatch) return null
  const splitText = wpClassWatch.split('-')
  return splitText[2]
}

export const tableClusterPriceDescription = (cpWatch: number, wpNumberWatch: number) =>
  `Cluster (${cpWatch} cp${cpWatch > 1 ? 's' : ''}, ${wpNumberWatch} worker${wpNumberWatch > 1 ? 's' : ''})`

export const table2DisplayCondition = (provider: Provider, region: Region, tpw: string, trw: string) =>
  (isTemp(provider, tpw) || isTemp('', tpw)) &&
  (isTemp(region, trw) || isTemp('', trw)) &&
  isOption(`${provider}-${region}`)

// Provider region
export const validOptions = (tpw: string, trw: string) => {
  return optionMap.filter((opt) => {
    const [provider, region] = opt.split('-')

    const providerOk = !tpw || tpw === provider
    const regionOk = !trw || trw === region

    return providerOk && regionOk
  })
}

export const hasAnyValid = validOptions.length > 0
