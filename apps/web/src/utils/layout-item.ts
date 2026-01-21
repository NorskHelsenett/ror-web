import { GridStackLayoutItem } from '@/hooks/use-layout-preferences'

export type StoredLayoutItem = {
  i: string
  x: number
  y: number
  w: number
  h: number
  [key: string]: unknown
}

export type Layout = { id: string; x: number; y: number; w: number; h: number }
export type Layouts = Record<string, StoredLayoutItem[]>

export function normalizeToLayouts(value: Layouts | GridStackLayoutItem[]): Layouts {
  if (Array.isArray(value)) {
    const lgLayout: StoredLayoutItem[] = value.map((n) => ({
      i: n.id,
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
    }))
    return { lg: lgLayout }
  }
  return value
}

export type LayoutItem = {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW: number
  minH: number
}

export type WidgetItem = {
  id: string
  x: number
  y: number
  w: number
  h: number
  minW: number
  minH: number
  content: React.ReactNode
}

export type ItemsLayouts = Record<string, LayoutItem[]>
