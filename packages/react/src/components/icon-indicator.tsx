import {
  Ban,
  AlertTriangle,
  DiamondMinus,
  CircleCheckBig,
  CircleCheck,
  CircleDashed,
  CircleEllipsis,
  LoaderCircle,
  CircleDotDashed,
  CircleHelp,
  Info,
} from 'lucide-react'
import { clsx } from 'clsx'
import { forwardRef, Ref } from 'react'

export type IconIndicatorKind =
  | 'failed'
  | 'caution-major'
  | 'caution-minor'
  | 'undefined'
  | 'succeeded'
  | 'normal'
  | 'in-progress'
  | 'incomplete'
  | 'not-started'
  | 'pending'
  | 'unknown'
  | 'informative'

const iconTypes = {
  failed: Ban,
  ['caution-major']: AlertTriangle,
  ['caution-minor']: AlertTriangle,
  undefined: DiamondMinus,
  succeeded: CircleCheckBig,
  normal: CircleCheck,
  ['in-progress']: LoaderCircle,
  incomplete: CircleDotDashed,
  ['not-started']: CircleDashed,
  pending: CircleEllipsis,
  unknown: CircleHelp,
  informative: Info,
}

interface IconIndicatorProps {
  /**
   * Specify an optional className to add.
   */
  className?: string

  /**
   * Specify the kind of icon to be used
   */
  kind: IconIndicatorKind

  /**
   * Label next to the icon
   */
  label: string

  /**
   * Specify the size of the Icon Indicator. Defaults to 16.
   */
  size?: 'md' | 'lg'
}

export const IconIndicator = forwardRef(function IconIndicatorContent(
  { className: customClassName, kind, label, size = 'md', ...rest }: IconIndicatorProps,
  ref: Ref<HTMLDivElement>
) {
  const classes = clsx(`r-icon-indicator`, customClassName, {
    [`r-icon-indicator--${size}`]: size,
    [`r-icon-indicator--${kind}`]: kind,
  })

  const IconForKind = iconTypes[kind]

  return (
    <div className={classes} ref={ref} {...rest}>
      <IconForKind size={size} className='r-icon-indicator__icon' />
      <span className='r-icon-indicator__label'>{label}</span>
    </div>
  )
})
