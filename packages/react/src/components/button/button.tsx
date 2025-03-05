import { isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { BaseButton } from './button-base'
import { ButtonWithIconOnlyProps, IconOnlyButton } from './button-icon-only'
import { ButtonSize, ButtonVariant } from './constants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  icon?: ReactElement

  /**
   * Specify if the button is an icon-only button
   */
  iconOnly?: boolean

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

  /**
   * The content of the button to render
   */
  children?: ReactNode
}

function isButtonIconOnly(props: ButtonProps): props is ButtonWithIconOnlyProps {
  return 'iconOnly' in props && props.iconOnly === true && isValidElement(props.icon)
}

export function Button(props: ButtonProps = { variant: 'primary', size: 'md' }) {
  const { iconOnly, ...rest } = props
  if (isButtonIconOnly(props)) {
    return <IconOnlyButton icon={props.icon} {...rest} />
  }

  return <BaseButton {...rest} />
}
