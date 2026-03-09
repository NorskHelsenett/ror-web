import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/utils/clsxm'

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number | null
  indicatorColor?: string
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, indicatorColor, ...props }, ref) => {
    const safeValue = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : 0

    return (
      <ProgressPrimitive.Root
        ref={ref}
        data-slot='progress'
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot='progress-indicator'
          className={cn('h-full w-full flex-1 transition-all bg-primary', indicatorColor)}
          style={{ transform: `translateX(-${100 - safeValue}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  }
)

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
export type { ProgressProps }
