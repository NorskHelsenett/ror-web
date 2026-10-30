'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, GripVertical, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/button'
import { cn } from '@/utils/clsxm'
import {
  DASHBOARD_LAYOUT_KEY,
  dashboardSectionIds,
  dashboardSectionLabels,
  defaultDashboardLayout,
  moveDashboardSection,
  parseDashboardLayout,
  type DashboardLayoutPreference,
  type DashboardSectionId,
} from '../utils/dashboard-layout'

interface DashboardLayoutProps {
  isEditing: boolean
  sections: Record<DashboardSectionId, ReactNode>
}

export function DashboardLayout({ isEditing, sections }: DashboardLayoutProps) {
  const [layout, setLayout] = useState(defaultDashboardLayout)
  const [announcement, setAnnouncement] = useState('')
  const [dragPreview, setDragPreview] = useState<{ id: DashboardSectionId; x: number; y: number } | null>(null)
  const [dropTarget, setDropTarget] = useState<{ id: DashboardSectionId; placement: 'before' | 'after' } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ id: DashboardSectionId; startY: number } | null>(null)
  const visible = layout.order.filter((id) => !layout.hidden.includes(id))

  function clearDrag() {
    dragRef.current = null
    setDragPreview(null)
    setDropTarget(null)
  }

  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(DASHBOARD_LAYOUT_KEY)
      if (saved) setLayout(parseDashboardLayout(saved))
    } catch (error) {
      console.error('Failed to load dashboard layout:', error)
      toast.error('Could not load your dashboard layout. The default layout is shown.')
    }
  }, [])

  function updateLayout(next: DashboardLayoutPreference, message: string) {
    try {
      localStorage.setItem(DASHBOARD_LAYOUT_KEY, JSON.stringify(next))
      setLayout(next)
      setAnnouncement(message)
    } catch (error) {
      console.error('Failed to save dashboard layout:', error)
      toast.error('Could not save your dashboard layout. Please try again.')
    }
  }

  function moveSection(id: DashboardSectionId, direction: -1 | 1) {
    const target = visible[visible.indexOf(id) + direction]
    if (target) {
      updateLayout(
        moveDashboardSection(layout, id, target, direction === -1 ? 'before' : 'after'),
        `${dashboardSectionLabels[id]} moved ${direction === -1 ? 'up' : 'down'}.`
      )
    }
  }

  function toggleSection(id: DashboardSectionId) {
    const hidden = layout.hidden.includes(id)
    updateLayout(
      { ...layout, hidden: hidden ? layout.hidden.filter((item) => item !== id) : [...layout.hidden, id] },
      `${dashboardSectionLabels[id]} ${hidden ? 'shown' : 'hidden'}.`
    )
  }

  return (
    <div ref={containerRef}>
      {isEditing && (
        <div className='mx-7 my-4 rounded-lg border border-action-blue-border bg-action-blue p-4 ring-1 ring-action-blue-border'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <h2 className='text-base font-semibold text-action-blue-foreground'>Dashboard sections</h2>
            <Button
              variant='outline'
              size='sm'
              onClick={() => updateLayout(defaultDashboardLayout(), 'Default section order and visibility restored.')}
            >
              Reset layout
            </Button>
          </div>
          <p className='mt-2 text-sm text-muted-foreground'>
            Choose sections to show. Drag the handles on the right or use the arrow controls to reorder. Changes are
            saved automatically.
          </p>
          <div className='mt-3 flex flex-wrap gap-x-6 gap-y-3'>
            {dashboardSectionIds.map((id) => (
              <label key={id} className='flex items-center gap-2 text-sm cursor-pointer'>
                <input type='checkbox' checked={!layout.hidden.includes(id)} onChange={() => toggleSection(id)} />
                {dashboardSectionLabels[id]}
              </label>
            ))}
          </div>
        </div>
      )}
      <p className='sr-only' role='status'>
        {announcement}
      </p>
      {visible.length === 0 && (
        <p className='mx-7 my-8 text-muted-foreground'>
          All dashboard sections are hidden. Use Customize dashboard to show them again.
        </p>
      )}
      <div className={cn('flex flex-col', isEditing ? 'gap-3 my-3' : 'gap-8 py-4')}>
        {visible.map((id, index) => (
          <section
            key={id}
            aria-label={dashboardSectionLabels[id]}
            data-dashboard-section={id}
            className={cn(
              'relative min-w-0',
              isEditing
                ? 'min-h-40 rounded-lg border border-dashed border-subtle p-5 pr-16'
                : cn('mx-7', (id === 'greeting' || id === 'search') && 'max-w-4xl'),
              isEditing && dragPreview?.id === id && 'opacity-40 ring-2 ring-blue-400 bg-action-blue/10',
              isEditing && dropTarget?.id === id && 'bg-action-blue/10'
            )}
          >
            {isEditing && dragPreview && dropTarget?.id === id && (
              <div
                data-dashboard-drop-indicator
                aria-hidden='true'
                className={cn(
                  'pointer-events-none absolute inset-x-0 z-30 flex items-center',
                  dropTarget.placement === 'before' ? 'top-0 -translate-y-1/2' : 'bottom-0 translate-y-1/2'
                )}
              >
                <div className='size-3 shrink-0 rounded-full bg-blue-400 ring-2 ring-background' />
                <div className='h-1 flex-1 bg-blue-400' />
                <span className='shrink-0 rounded-md border border-blue-400 bg-action-blue px-3 py-1 text-xs font-semibold text-action-blue-foreground shadow-lg'>
                  Drop {dashboardSectionLabels[dragPreview.id]} here
                </span>
                <div className='h-1 flex-1 bg-blue-400' />
              </div>
            )}
            {sections[id]}
            {isEditing && (
              <div className='absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  aria-label={`Hide ${dashboardSectionLabels[id]}`}
                  onClick={() => toggleSection(id)}
                >
                  <X />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  aria-label={`Move ${dashboardSectionLabels[id]} up`}
                  disabled={index === 0}
                  onClick={() => moveSection(id, -1)}
                >
                  <ArrowUp />
                </Button>
                <button
                  type='button'
                  aria-label={`Drag ${dashboardSectionLabels[id]} to reorder`}
                  title='Drag to reorder, or use the up and down arrow keys'
                  className='flex size-9 touch-none items-center justify-center cursor-grab active:cursor-grabbing rounded-md text-muted-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring'
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                      event.preventDefault()
                      moveSection(id, event.key === 'ArrowUp' ? -1 : 1)
                    } else if (event.key === 'Escape') {
                      clearDrag()
                    }
                  }}
                  onPointerDown={(event) => {
                    if (event.button !== 0) return
                    dragRef.current = { id, startY: event.clientY }
                    event.currentTarget.setPointerCapture(event.pointerId)
                  }}
                  onPointerMove={(event) => {
                    const drag = dragRef.current
                    if (!drag || Math.abs(event.clientY - drag.startY) < 5) return
                    setDragPreview({ id: drag.id, x: event.clientX, y: event.clientY })
                    const element = document
                      .elementFromPoint(event.clientX, event.clientY)
                      ?.closest('[data-dashboard-section]')
                    const target = visible.find(
                      (sectionId) => sectionId === element?.getAttribute('data-dashboard-section')
                    )
                    if (!element || !target || target === drag.id || !containerRef.current?.contains(element)) {
                      setDropTarget(null)
                      return
                    }
                    const bounds = element.getBoundingClientRect()
                    setDropTarget({
                      id: target,
                      placement: event.clientY < bounds.top + bounds.height / 2 ? 'before' : 'after',
                    })
                  }}
                  onPointerUp={() => {
                    if (dragRef.current && dropTarget) {
                      updateLayout(
                        moveDashboardSection(layout, dragRef.current.id, dropTarget.id, dropTarget.placement),
                        `${dashboardSectionLabels[dragRef.current.id]} moved ${dropTarget.placement} ${dashboardSectionLabels[dropTarget.id]}.`
                      )
                    }
                    clearDrag()
                  }}
                  onLostPointerCapture={clearDrag}
                  onPointerCancel={clearDrag}
                >
                  <GripVertical className='size-5' />
                </button>
                <Button
                  variant='ghost'
                  size='icon'
                  aria-label={`Move ${dashboardSectionLabels[id]} down`}
                  disabled={index === visible.length - 1}
                  onClick={() => moveSection(id, 1)}
                >
                  <ArrowDown />
                </Button>
              </div>
            )}
          </section>
        ))}
      </div>
      {isEditing && dragPreview && (
        <div
          data-dashboard-drag-preview
          aria-hidden='true'
          className='pointer-events-none fixed z-[100] flex items-center gap-2 rounded-lg border border-blue-400 bg-action-blue px-4 py-3 text-sm font-semibold text-action-blue-foreground shadow-xl'
          style={{
            left: Math.max(8, Math.min(dragPreview.x - 180, window.innerWidth - 260)),
            top: Math.max(8, dragPreview.y - 56),
          }}
        >
          <GripVertical className='size-5' />
          {dashboardSectionLabels[dragPreview.id]}
        </div>
      )}
    </div>
  )
}
