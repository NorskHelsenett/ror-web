import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonSize, ButtonVariant } from './constants'

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * How large should the button be?
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * What style of the button should be used?
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * Any additional classNames for customization
   */
  className?: string

  /**
   * The icon to be displayed inside the button.
   */
  icon?: ReactNode

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled?: boolean

  /**
   * Merge props onto its immediate child.
   * Useful for rendering for instance a Link instead of a button.
   * @docs {@link https://www.radix-ui.com/primitives/docs/utilities/slot}
   */
  asChild?: boolean
}

/**
 * The base button component that all other button variants are built on.
 * @private
 */
export function BaseButton(props: BaseButtonProps) {
  const { size = 'md', variant = 'primary', className, children, asChild = false, ...rest } = props
  const classes = clsx(
    'r-btn',
    {
      [`r-btn--${size}`]: true,
      /**
       * The primary variant is the default and doesn't need a modifier class.
       */
      [`r-btn--${variant}`]: variant,
    },
    className
  )

  // TODO: Implement rendering of an icon inside the button together with the children

  const Comp = asChild ? Slot : 'button'

  return (
    <Comp className={classes} {...rest}>
      {children}
    </Comp>
  )
}
