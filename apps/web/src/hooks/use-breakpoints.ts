'use client'

import { useSyncExternalStore } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'

const queries: Array<[Breakpoint, string]> = [
  ['6xl', '(min-width: 2560px)'],
  ['5xl', '(min-width: 2304px)'],
  ['4xl', '(min-width: 2048px)'],
  ['3xl', '(min-width: 1792px)'],
  ['2xl', '(min-width: 1536px)'],
  ['xl', '(min-width: 1280px)'],
  ['lg', '(min-width: 1024px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 640px)'],
]

function getSnapshot(): Breakpoint {
  if (typeof window === 'undefined') return 'xs'
  for (const [bp, q] of queries) {
    if (window.matchMedia(q).matches) return bp
  }
  return 'xs'
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}

  const mqs = queries.map(([, q]) => window.matchMedia(q))
  const handler = () => onStoreChange()

  for (const mq of mqs) mq.addEventListener('change', handler)
  return () => {
    for (const mq of mqs) mq.removeEventListener('change', handler)
  }
}

export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'xs')
}
