/*
 * FILE OVERVIEW:
 *
 * A wrapper component for a responsive grid layout using `react-grid-layout`.
 */

'use client'

import { cn } from '@/utils/clsxm'
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout'
import { useState, useEffect } from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface GridLayoutWrapperProps {
  className?: string
  layouts: Layouts
  onLayoutChange?: (layout: Layout[]) => void
  onBreakpointChange?: (breakpoint: string) => void
  layoutKey?: number // optional, for "reset" triggers
  children: React.ReactNode
}

/**
 * A wrapper component for a responsive grid layout using `ResponsiveGridLayout`.
 *
 * This component provides a styled container and manages the internal key for layout resets.
 * It applies custom styles for grid items and resizable handles, and passes layout configuration
 * and event handlers to the underlying grid layout.
 *
 * @param {object} props - The props for the GridLayoutWrapper component.
 * @param {string} [props.className] - Additional class names to apply to the grid layout container.
 * @param {Layouts} props.layouts - The layout configuration for different breakpoints.
 * @param {(layout: Layout[], layouts: Layouts) => void} [props.onLayoutChange] - Callback fired when the layout changes.
 * @param {(breakpoint: string, cols: number) => void} [props.onBreakpointChange] - Callback fired when the breakpoint changes.
 * @param {number} [props.layoutKey] - Key to force re-rendering of the layout (e.g., when resetting).
 * @param {React.ReactNode} props.children - The grid items to render within the layout.
 *
 * @returns {JSX.Element} The rendered grid layout wrapper.
 */
export const GridLayoutWrapper = ({
  className,
  layouts,
  onLayoutChange,
  onBreakpointChange,
  layoutKey,
  children,
}: GridLayoutWrapperProps) => {
  const [internalKey, setInternalKey] = useState(layoutKey ?? 0)

  // When layoutKey changes externally (e.g. Reset button pressed), re-render layout
  useEffect(() => {
    if (layoutKey !== undefined) setInternalKey(layoutKey)
  }, [layoutKey])

  return (
    <div className='w-full border rounded-xl p-2'>
      <style>
        {`
          .react-resizable-handle :after { border-color: black; }
          .dark .react-resizable-handle::after { border-color: white; }
          .react-resizable-handle::after { scale: 2; margin-right: 8px; margin-bottom: 8px; }
          .react-grid-item.react-grid-placeholder { background-color: #58acf2; }
          .dark .react-grid-item.react-grid-placeholder { background-color: #3e88c5; }
        `}
      </style>

      <ResponsiveGridLayout
        className={cn(
          'layout w-full',
          '[&>div]:bg-[var(--r-layer)] [&>div]:rounded-lg [&>div]:p-4 [&>div]:shadow [&>div]:cursor-move',
          className
        )}
        key={internalKey}
        layouts={layouts}
        breakpoints={{ lg: 1856, md: 1200, sm: 640, xs: 512 }}
        cols={{ lg: 42, md: 24, sm: 12, xs: 6 }}
        rowHeight={30}
        draggableHandle='.drag-handle'
        draggableCancel='.no-drag'
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  )
}
