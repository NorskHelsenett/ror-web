import { Slot } from '@radix-ui/react-slot'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { MAX_LEVEL, MIN_LEVEL, type LayerLevel, levels } from '../utils/layer'

interface LayerProps {
  /**
   * Layering level tokens - 0, 1, 2
   * @default 0
   */
  layer?: LayerLevel

  /**
   * Children to be rendered within the layer.
   */
  children?: ReactNode

  /**
   * Merge props onto its immediate child.
   * Useful for rendering for instance a Link instead of a button.
   * @docs {@link https://www.radix-ui.com/primitives/docs/utilities/slot}
   */
  asChild?: boolean
}

export function Layer({ layer = 0, asChild = false, children }: LayerProps) {
  const value = Math.max(MIN_LEVEL, Math.min(layer, MAX_LEVEL))
  const Comp = asChild ? Slot : 'div'
  const layerName = `r-layer--${levels[value]}`
  const classes = clsx({
    [layerName]: value,
  })
  return <Comp className={classes}>{children}</Comp>
}
