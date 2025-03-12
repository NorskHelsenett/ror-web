import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef, CSSProperties, ReactElement, ReactNode } from 'react'

/**
 * The steps in the spacing scale
 * {@link packages/styles/scss/spacing.scss}
 */
type SPACING_STEPS = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Provide a custom element type to render as the outermost element in
   * the Stack component. By default, this component will render a `div`.
   */
  as?: ReactElement['type']

  /**
   * Provide the elements that will be rendered as children inside of the Stack
   * component. These elements will have having spacing between them according
   * to the `gap` and `orientation` prop
   */
  children?: ReactNode

  /**
   * Provide a custom class name to be used by the outermost element rendered by
   * Stack
   */
  className?: string

  /**
   * Provide a custom value or step from the spacing scale to be used
   * as the gap in the layout
   */
  gap?: string | SPACING_STEPS

  /**
   * Specify the orientation of them items in the Stack
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Specify custom style properties
   */
  style?: CSSProperties
}

export function Stack({
  as: Comp = 'div',
  children,
  className: customClassName,
  gap = 0,
  orientation = 'vertical',
  style: customStyle,
  ...rest
}: StackProps) {
  const numericGap = typeof gap === 'number' ? gap.toString() : ''

  const className = clsx('r-stack', customClassName, {
    [`r-stack--${orientation}`]: true,
    [`r-stack--scale-${numericGap}`]: typeof gap === 'number' && gap > 0,
  })

  const style: CSSProperties & { '--r-stack-gap'?: string } = {
    ...customStyle,
  }

  if (typeof gap === 'string') {
    style[`--r-stack-gap`] = gap
  }

  return (
    <Comp {...rest} className={className} style={style}>
      {children}
    </Comp>
  )
}
