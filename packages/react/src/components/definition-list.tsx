import { clsx } from 'clsx'
import { ReactNode } from 'react'

export interface DefinitionListProps {
  children: ReactNode
  className?: string
}

export function DefinitionList({ className, children }: DefinitionListProps) {
  const classes = clsx('r-dl', className)
  return <dl className={classes}>{children}</dl>
}

export function DefinitionTerm({ className, children }: { className?: string; children: ReactNode }) {
  const classes = clsx('r-dl__term', className)
  return <dt className={classes}>{children}</dt>
}

export function DefinitionDescription({ className, children }: { className?: string; children: ReactNode }) {
  const classes = clsx('dl__description', className)
  return <dd className={classes}>{children}</dd>
}
