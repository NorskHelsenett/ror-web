'use client'

import { Sparkles, X } from 'lucide-react'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn/popover'
import { cn } from '@/utils/clsxm'
import { useActiveRelease } from '@/hooks/use-active-release'

interface ReleaseSpotlightProps {
  /** Must match the `id` field on the corresponding Release entry in releases.tsx */
  releaseId: string
  title: string
  description: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
}

/**
 * Wraps any element with a glowing highlight ring and an anchored popover
 * when the release matching `releaseId` is the currently active release.
 *
 * Usage:
 * ```tsx
 * <ReleaseSpotlight
 *   releaseId="policy-reports-page"
 *   title="Policy reports page"
 *   description="View policy reports across clusters and namespaces."
 * >
 *   <MyComponent />
 * </ReleaseSpotlight>
 * ```
 */
export function ReleaseSpotlight({
  releaseId,
  title,
  description,
  children,
  side = 'bottom',
  align = 'start',
  className,
}: ReleaseSpotlightProps) {
  const { activeReleaseId, clearActiveRelease } = useActiveRelease()
  const isActive = activeReleaseId === releaseId

  return (
    <Popover open={isActive}>
      <PopoverAnchor asChild>
        <div
          className={cn(
            'rounded-lg transition-shadow duration-300',
            isActive &&
              'ring-2 ring-cyan-400 ring-offset-2 ring-offset-background shadow-[0_0_16px_2px_rgba(34,211,238,0.25)]',
            className
          )}
        >
          {children}
        </div>
      </PopoverAnchor>
      <PopoverContent
        side={side}
        align={align}
        className='w-80'
        onInteractOutside={clearActiveRelease}
        onEscapeKeyDown={clearActiveRelease}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <Sparkles className='size-4 text-cyan-400 shrink-0' />
              <p className='font-semibold text-sm'>{title}</p>
            </div>
            <button
              onClick={clearActiveRelease}
              aria-label='Dismiss'
              className='text-muted-foreground hover:text-foreground transition-colors shrink-0'
            >
              <X className='size-4' />
            </button>
          </div>
          <p className='text-sm text-muted-foreground pl-6'>{description}</p>
          <div className='pl-6'>
            <button
              onClick={clearActiveRelease}
              className='text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors'
            >
              Got it ✓
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
