import { clsx } from 'clsx'
import { ReactNode } from 'react'

export interface DefinitionListProps {
  /**
   * Specify an optional className to be applied to the button
   */
  className?: string

  /**
   * Specify the direction of the definition list
   */
  direction?: 'horizontal' | 'vertical'

  children: ReactNode
}

export function DefinitionList({ className, direction = 'horizontal', children }: DefinitionListProps) {
  const classes = clsx(
    'r-dl',
    {
      'r-dl--horizontal': direction === 'horizontal',
      'r-dl--vertical': direction === 'vertical',
    },
    className
  )
  return <dl className={classes}>{children}</dl>
}

export function DefinitionTerm({ className, children }: { className?: string; children: ReactNode }) {
  const classes = clsx('r-dl__term', className)
  return <dt className={classes}>{children}</dt>
}

export function DefinitionDescription({ className, children }: { className?: string; children: ReactNode }) {
  const classes = clsx('r-dl__description', className)
  return <dd className={classes}>{children}</dd>
}
