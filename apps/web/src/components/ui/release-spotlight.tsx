'use client'

import { Sparkles, X } from 'lucide-react'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn/popover'
import { cn } from '@/utils/clsxm'
import { useActiveRelease } from '@/hooks/use-active-release'

interface ReleaseSpotlightProps {
  /** Must match the `id` field on the corresponding Release entry in releases.tsx */
  releaseId: string
  /** Which step in the tour this spotlight represents (1-based) */
  step: number
  /** Total number of steps in this release's tour */
  totalSteps: number
  title: string
  description: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
}

/**
 * Wraps any element with a glowing highlight ring and an anchored step-by-step popover
 * when its step is the currently active one for the given release.
 *
 * - "Next →" advances to the next step.
 * - "Got it ✓" (last step), X, Escape, or clicking outside clears the whole tour.
 */
export function ReleaseSpotlight({
  releaseId,
  step,
  totalSteps,
  title,
  description,
  children,
  side = 'bottom',
  align = 'start',
  className,
}: ReleaseSpotlightProps) {
  const { activeRelease, advanceStep, clearActiveRelease } = useActiveRelease()
  const isActive = activeRelease?.releaseId === releaseId && activeRelease?.step === step
  const isLast = step === totalSteps

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
        onEscapeKeyDown={clearActiveRelease}
        // onInteractOutside is intentionally omitted: focus restoration when a step closes
        // would immediately fire it on the next step's freshly-opened popover, killing the tour.
        // Dismissal is handled explicitly via the X button and Escape key.
      >
        <div className='flex flex-col gap-3'>
          {/* Header */}
          <div className='flex items-start justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <Sparkles className='size-4 text-cyan-400 shrink-0' />
              <p className='font-semibold text-sm'>{title}</p>
            </div>
            <button
              onClick={clearActiveRelease}
              aria-label='Dismiss tour'
              className='text-muted-foreground hover:text-foreground transition-colors shrink-0'
            >
              <X className='size-4' />
            </button>
          </div>

          {/* Description */}
          <p className='text-sm text-muted-foreground pl-6'>{description}</p>

          {/* Footer: step dots + action button */}
          <div className='flex items-center pl-6'>
            <div className='flex items-center gap-1 flex-1'>
              {Array.from({ length: totalSteps }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    'size-1.5 rounded-full transition-colors',
                    i + 1 === step ? 'bg-cyan-400' : 'bg-muted-foreground/30'
                  )}
                />
              ))}
            </div>
            <button
              onClick={isLast ? clearActiveRelease : advanceStep}
              className='text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors'
            >
              {isLast ? 'Got it ✓' : 'Next →'}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
