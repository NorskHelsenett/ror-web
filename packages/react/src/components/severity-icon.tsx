import { CircleDashed, Diamond, Square, Triangle, TriangleRight } from 'lucide-react'
import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

export type SeverityName = 'critical' | 'high' | 'medium' | 'low' | 'none'

const iconTypes = {
  critical: TriangleRight,
  high: Triangle,
  medium: Diamond,
  low: Square,
  none: CircleDashed,
}

function getKind(score: number | undefined): SeverityName {
  if (!score) return 'none'
  if (score >= 0 && score <= 3.9) return 'low'
  if (score >= 4 && score <= 6.9) return 'medium'
  if (score >= 7 && score <= 8.9) return 'high'
  if (score >= 9 && score <= 10) return 'critical'
  return 'none'
}

const labels = new Map<SeverityName, string>([
  ['critical', 'Critical'],
  ['high', 'High'],
  ['medium', 'Medium'],
  ['low', 'Low'],
  ['none', 'None'],
])

export interface SeverityIconProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Specify an optional className to add.
   */
  className?: string

  /**
   * Specify the level of vulnerability
   * Must comply with the CVSS specification, e.g. a number between 0 and 10.
   */
  score?: number

  /**
   * Override the label next to the icon
   */
  label?: string

  /**
   * Specify whether or not a label should be displayed
   */
  disableLabel?: boolean

  /**
   * Specify the size of the Icon Indicator. Defaults to "md".
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Display an appropriate icon and label based on the provided score (0-10).
 *
 * @remarks
 * This component is designed with the vulnerability CVSS score system in mind.
 *
 * The score follows the following levels of severity:
 * - Critical: 9.0 - 10.0
 * - High: 7.0 - 8.9
 * - Medium: 4.0 - 6.9
 * - Low: 0.0 - 3.9
 * - None: 0.0 - 0.0
 */
export function SeverityIcon({
  className,
  score,
  label: overrideLabel,
  disableLabel,
  size = 'md',
  ...rest
}: SeverityIconProps) {
  const kind = getKind(score)

  const classes = clsx(
    `r-severity-icon`,
    {
      [`r-severity-icon--${size}`]: size,
      [`r-severity-icon--${kind}`]: kind,
    },
    className
  )

  const IconForKind = iconTypes[kind]
  const label = overrideLabel ?? labels.get(kind)

  return (
    <div className={classes} {...rest}>
      <IconForKind className='r-severity-icon__icon' />
      {!disableLabel ? <span className='r-severity-icon__label'>{label}</span> : null}
    </div>
  )
}
