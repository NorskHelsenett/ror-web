'use client'

import { OverviewItem, overviewItemsValues } from '../types/items'
import { getSavedPreference, savePreference } from '@/utils/local-storage'

export function getOverviewItems(): OverviewItem[] {
  if (typeof window === 'undefined') return [...overviewItemsValues]

  const stored = window.localStorage.getItem('dashboard:overviewItems')
  if (stored) {
    return JSON.parse(stored) as OverviewItem[]
  }
  window.localStorage.setItem('dashboard:overviewItems', JSON.stringify(overviewItemsValues))
  return [...overviewItemsValues]
}

export function removeOverviewItem(item: OverviewItem): OverviewItem[] {
  const items = getOverviewItems()
  if (!items.includes(item)) return items
  const updated = items.filter((i) => i !== item)
  window.localStorage.setItem('dashboard:overviewItems', JSON.stringify(updated))
  return updated
}

export function addOverviewItem(item: OverviewItem): OverviewItem[] {
  const items = getOverviewItems()
  if (items.includes(item)) return items
  const updated = [...items, item]
  window.localStorage.setItem('dashboard:overviewItems', JSON.stringify(updated))
  return updated
}

export function getFavoritedItems(domain: string): string[] {
  if (typeof window === 'undefined') return []
  const stored = window.localStorage.getItem(`${domain}:favorite`)
  if (stored) {
    return JSON.parse(stored)
  }
  return []
}

export function addFavoriteItem(itemId: string, domain: string) {
  const items = getSavedPreference(`${domain}:favorite`, [] as string[])
  if (items.includes(itemId)) return items
  const updated = [...items, itemId]
  savePreference(`${domain}:favorite`, JSON.stringify(updated))
  return updated
}

export function removeFavoriteItem(itemId: string, domain: string) {
  const items = getSavedPreference(`${domain}:favorite`, [] as string[])
  if (!items.includes(itemId)) return items
  const updated = items.filter((i) => i !== itemId)
  savePreference(`${domain}:favorite`, JSON.stringify(updated))
  return updated
}
