'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { routes } from '@/config/routes'
import { cn } from '@/utils/clsxm'
import { releases, type Release, type ReleaseTag } from '../data/releases'
import { useState, useEffect } from 'react'
import { useActiveRelease } from '@/hooks/use-active-release'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

const tagStyles: Record<ReleaseTag, string> = {
  New: 'bg-cyan-200 border-cyan-400 text-cyan-800 dark:bg-cyan-900 dark:border-cyan-600 dark:text-cyan-300',
  Improved:
    'bg-orange-200 border-orange-400 text-orange-800 dark:bg-orange-900 dark:border-orange-300 dark:text-orange-300',
  V2: 'bg-violet-200 border-violet-400 text-violet-800 dark:bg-violet-900 dark:border-violet-600 dark:text-violet-300',
}

const tagTooltips: Record<ReleaseTag, string> = {
  New: 'Brand new functionality',
  Improved: 'Existing functionality that has been enhanced or refined.',
  V2: 'Version 2 of existing functionality that was available in legacy.ror.nhn.no',
}

const VIEWED_RELEASES_KEY = 'release:viewed'
const getReleaseKey = (release: Release) =>
  release.id ?? `${release.year}-${release.month}-${release.day}-${release.title}`

function ReleaseTags({ tags }: { tags: ReleaseTag[] }) {
  return tags.map((tag) => (
    <Tooltip key={tag}>
      <TooltipTrigger asChild>
        <span
          className={cn(
            'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium cursor-default',
            tagStyles[tag]
          )}
        >
          {tag}
        </span>
      </TooltipTrigger>
      <TooltipContent>{tagTooltips[tag]}</TooltipContent>
    </Tooltip>
  ))
}

export const ReleaseCard = ({ view }: { view: 'dashboard' | 'release-notes' }) => {
  const [collapsed, setCollapsed] = useState(false)
  const isCollapsed = view === 'dashboard' && collapsed
  const { setActiveRelease } = useActiveRelease()
  const [resolvedHrefs, setResolvedHrefs] = useState<Record<number, string>>({})
  const [viewedReleases, setViewedReleases] = useState<string[]>([])
  const latestRelease = releases[0]
  const unreadCount = releases.filter((release) => !viewedReleases.includes(getReleaseKey(release))).length
  const expandLabel = unreadCount > 0 ? `${unreadCount} updates${unreadCount === 1 ? '' : 's'}` : 'Recent updates'

  useEffect(() => {
    const saved = localStorage.getItem(VIEWED_RELEASES_KEY)
    if (!saved) return
    try {
      const parsed: unknown = JSON.parse(saved)
      if (!Array.isArray(parsed) || !parsed.every((id): id is string => typeof id === 'string')) {
        throw new Error('Viewed releases must be an array of release identifiers')
      }
      setViewedReleases(parsed)
    } catch (error) {
      console.error('Failed to load viewed releases:', error)
    }
  }, [])

  const handleReleaseClick = (release: Release) => {
    const key = getReleaseKey(release)
    if (!viewedReleases.includes(key)) {
      const next = [...viewedReleases, key]
      localStorage.setItem(VIEWED_RELEASES_KEY, JSON.stringify(next))
      setViewedReleases(next)
    }
    if (release.id) setActiveRelease(release.id)
  }

  useEffect(() => {
    if (view === 'dashboard') {
      setCollapsed(localStorage.getItem('releaseCardCollapsed') === 'true')
    }
  }, [view])

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('releaseCardCollapsed', String(next))
  }

  useEffect(() => {
    const releasesToShow = view === 'dashboard' ? releases.slice(0, 4) : releases
    releasesToShow.forEach((release, i) => {
      if (release.resolveHref) {
        release.resolveHref().then((href) => {
          setResolvedHrefs((prev) => ({ ...prev, [i]: href }))
        })
      }
    })
  }, [view])

  return (
    <div className='bg-(--r-layer) rounded-lg px-6 pt-2 pb-2 w-full'>
      {/* Header */}
      <div className={cn('flex flex-wrap items-center justify-between gap-3', isCollapsed ? '' : 'mb-4')}>
        {latestRelease && (
          <div className='flex flex-1 items-center gap-2 min-w-0'>
            <div className='flex gap-1 shrink-0'>
              <ReleaseTags tags={latestRelease.tags} />
            </div>
            <Link
              href={resolvedHrefs[0] ?? latestRelease.href}
              onClick={() => handleReleaseClick(latestRelease)}
              className='text-sm min-w-0 hover:underline'
            >
              <span className='font-medium'>{latestRelease.title}</span>
              <span className='mx-3 text-muted-foreground'>{'\u2014'}</span>
              <span className='text-muted-foreground'>{latestRelease.description}</span>
            </Link>
          </div>
        )}
        {view === 'dashboard' && (
          <button
            onClick={toggleCollapsed}
            className='flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors'
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? (
              <>
                <ChevronDown className='size-4' />
                {expandLabel}
              </>
            ) : (
              <>
                <ChevronUp className='size-4' /> Hide releases
              </>
            )}
          </button>
        )}
      </div>

      {/* Release rows */}
      {!isCollapsed && (
        <div className='flex flex-col'>
          {(view === 'dashboard' ? releases.slice(0, 4) : releases).map((release, i) => (
            <Link
              key={i}
              href={resolvedHrefs[i] ?? release.href}
              onClick={() => handleReleaseClick(release)}
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
                <ReleaseTags tags={release.tags} />
                <ArrowRight className='size-4 text-muted-foreground group-hover:text-foreground transition-colors' />
              </div>
            </Link>
          ))}
        </div>
      )}

      {view === 'dashboard' && !isCollapsed && (
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
