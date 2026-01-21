/*
 * FILE OVERVIEW:
 *
 * A wrapper component for a responsive grid layout using `gridstack`.
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { GridStack, type GridStackNode } from 'gridstack'
import { useLayoutPreferences } from '@/hooks/use-layout-preferences'
import { LayoutKey } from '@/types/layouts'
import { createRoot } from 'react-dom/client'
import { Button } from '../shadcn/button'
import { toast } from 'sonner'
import { ItemsLayouts, Layout, LayoutItem, WidgetItem } from '@/utils/layout-item'

interface GridLayoutWrapperProps {
  preferenceKey: LayoutKey
  standardLayouts: ItemsLayouts
  contentMap: Record<string, React.ReactNode>
  onLayoutChange?: (layout: Layout[]) => void
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 780,
  lg: 992,
  xl: 1400,
}

const reactRoots = new WeakMap<Element, ReturnType<typeof createRoot>>()

export const GridLayoutWrapper = ({
  preferenceKey,
  standardLayouts,
  contentMap,
  onLayoutChange,
}: GridLayoutWrapperProps) => {
  const gridContainerRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<GridStack | null>(null)
  const layoutRef = useRef<Layout[] | null>(null)
  const [layout, setLayout] = useState<Layout[]>([])

  const {
    layoutKey,
    currentBreakpoint,
    setCurrentBreakpoint,
    saveLayouts,
    resetToSaved,
    resetToDefault,
    getCurrentLayouts,
  } = useLayoutPreferences(preferenceKey, layout)

  const handleResize = useCallback(() => {
    const width = window.innerWidth
    if (width >= breakpoints.xl) {
      setCurrentBreakpoint('xl')
    } else if (width >= breakpoints.lg) {
      setCurrentBreakpoint('lg')
    } else if (width >= breakpoints.md) {
      setCurrentBreakpoint('md')
    } else if (width >= breakpoints.sm) {
      setCurrentBreakpoint('sm')
    } else {
      setCurrentBreakpoint('xs')
    }
  }, [setCurrentBreakpoint])

  useEffect(() => {
    const container = gridContainerRef.current
    if (!container) return

    container.innerHTML = '' // Clear existing DOM

    const prefs = getCurrentLayouts()
    const savedLayouts = prefs?.[preferenceKey]?.layouts as Record<string, LayoutItem[]>

    const savedMap: Record<string, { x: number; y: number; w: number; h: number }> = {}

    const layoutForBreakpoint =
      savedLayouts?.[currentBreakpoint] ?? standardLayouts[currentBreakpoint] ?? standardLayouts.lg

    const items: WidgetItem[] = (Array.isArray(layoutForBreakpoint) ? layoutForBreakpoint : []).map((l) => ({
      id: l.i,
      x: l.x,
      y: l.y,
      w: l.w,
      h: l.h,
      minW: l.minW,
      minH: l.minH,
      content: contentMap[l.i] ?? <div>Missing widget content</div>,
    }))

    const grid = GridStack.init(
      {
        column: 12,
        float: true,
        cellHeight: '30px',
        minRow: 1,
        margin: 5,
        staticGrid: false,
        disableDrag: false,
        disableResize: false,
      },
      container
    )

    gridRef.current = grid

    items.forEach((item) => {
      const fromSaved = savedMap[item.id]
      const node: GridStackNode = {
        x: fromSaved?.x ?? item.x,
        y: fromSaved?.y ?? item.y,
        w: fromSaved?.w ?? item.w,
        h: fromSaved?.h ?? item.h,
        minW: item.minW,
        minH: item.minH,
        id: item.id,
      }

      const el = grid.addWidget(node)
      const contentEl = el.querySelector('.grid-stack-item-content') as HTMLDivElement

      let root = reactRoots.get(contentEl)
      if (!root) {
        root = createRoot(contentEl)
        reactRoots.set(contentEl, root)
      }
      root.render(item.content)
    })

    const handleChange = () => {
      const nodes = grid.engine.nodes
      const newLayout = nodes.map((n) => ({
        id: String(n.id ?? ''),
        x: n.x ?? 0,
        y: n.y ?? 0,
        w: n.w ?? 0,
        h: n.h ?? 0,
      }))

      setLayout(newLayout)

      if (layoutRef) {
        layoutRef.current = newLayout
      }

      onLayoutChange?.(newLayout)
    }

    grid.on('change', handleChange)
    grid.on('dragstop', handleChange)
    grid.on('resizestop', handleChange)

    handleChange() // capture initial layout

    return () => {
      grid.off('change')
      grid.off('dragstop')
      grid.off('resizestop')
      grid.destroy(false)
      gridRef.current = null
    }
  }, [layoutKey, currentBreakpoint])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const LayoutButtons = () => (
    <div className='flex sm:flex-row flex-col gap-2 mb-3'>
      <Button
        onClick={() => {
          const prefs = getCurrentLayouts()
          const existing = prefs?.[preferenceKey]?.layouts ?? {}

          const layoutMap = {
            ...existing,
            [currentBreakpoint]: layout.map((l) => ({
              i: l.id,
              x: l.x,
              y: l.y,
              w: l.w,
              h: l.h,
            })),
          }

          saveLayouts(layoutMap)
          toast.info('Layout saved')
        }}
      >
        Save layout
      </Button>
      <Button onClick={resetToSaved}>Reset to saved</Button>
      <Button onClick={resetToDefault}>Reset to default</Button>
    </div>
  )

  return (
    <>
      <LayoutButtons />
      <section className='border rounded-lg p-1'>
        <div ref={gridContainerRef} />
      </section>
    </>
  )
}
