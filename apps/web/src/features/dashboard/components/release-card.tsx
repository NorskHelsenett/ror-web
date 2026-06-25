'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { routes } from '@/config/routes'
import { cn } from '@/utils/clsxm'
import { releases, type ReleaseTag } from '../data/releases'
import { useState } from 'react'

const tagStyles: Record<ReleaseTag, string> = {
  New: 'bg-cyan-900 border-cyan-600 text-cyan-300',
  Improved: 'bg-orange-900 border-orange-300 text-orange-300',
  Beta: 'bg-violet-900 border-violet-600 text-violet-300',
}

export const ReleaseCard = ({ view }: { view: 'dashboard' | 'release-notes' }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='bg-(--r-layer) rounded-lg px-6 pt-5 pb-2 w-full'>
      {/* Header */}
      <div className={cn('flex items-center justify-between', collapsed ? '' : 'mb-4')}>
        <div className='flex items-center gap-2'>
          <span className='size-2.5 rounded-full bg-cyan-400 animate-pulse' />
          <span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>What&apos;s new</span>
        </div>
        {view === 'dashboard' && (
          <button
            onClick={() => setCollapsed((c) => !c)}
            className='flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors'
            aria-label={collapsed ? 'Expand' : 'Hide'}
          >
            {collapsed ? (
              <>
                <ChevronDown className='size-4' /> Expand
              </>
            ) : (
              <>
                <ChevronUp className='size-4' /> Hide
              </>
            )}
          </button>
        )}
      </div>

      {/* Release rows */}
      {!collapsed && (
        <div className='flex flex-col'>
          {(view === 'dashboard' ? releases.slice(0, 4) : releases).map((release, i) => (
            <Link
              key={i}
              href={release.href}
              className='flex items-center gap-4 py-4 group hover:bg-muted/5 -mx-6 px-6 transition-colors border-t border-border'
            >
              {/* Date */}
              <div className='w-9 text-center shrink-0'>
                <p className='text-lg font-semibold leading-tight tabular-nums'>
                  {String(release.day).padStart(2, '0')}
                </p>
                <p className='text-[11px] text-muted-foreground uppercase tracking-wide'>{release.month}</p>
              </div>

              {/* Icon */}
              <div className={cn('size-9 rounded-lg flex items-center justify-center shrink-0', release.iconBg)}>
                {release.icon}
              </div>

              {/* Title + description */}
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-sm'>{release.title}</p>
                <p className='text-xs text-muted-foreground mt-0.5'>{release.description}</p>
              </div>

              {/* Tags + arrow */}
              <div className='flex items-center gap-2 shrink-0'>
                {release.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
                      tagStyles[tag]
                    )}
                  >
                    {tag}
                  </span>
                ))}
                <ArrowRight className='size-4 text-muted-foreground group-hover:text-foreground transition-colors' />
              </div>
            </Link>
          ))}
        </div>
      )}

      {view === 'dashboard' && !collapsed && (
        <Link
          href={routes.app.releaseNotes.getHref()}
          className='flex items-center justify-center gap-1 py-3 mt-1 border-t border-border text-sm text-muted-foreground hover:text-foreground transition-colors'
        >
          All releases <ArrowRight className='size-4' />
        </Link>
      )}
    </div>
  )
}
