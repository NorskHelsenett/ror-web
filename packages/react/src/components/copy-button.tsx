'use client'
import { Copy } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { Tooltip } from './tooltip'
import { Button, ButtonSize } from './button'

export interface CopyButtonProps {
  /**
   * Specify the string that displays when hovering over the button
   */
  tooltip?: string

  /**
   * Specify the string that is displayed when the button is clicked and the content is copied
   */
  feedback?: string

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  feedbackTimeout?: number

  /**
   * Specify a callback function that is called when the button is clicked
   */
  onClick?: () => void

  /**
   * How large should the copy button be?
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Specify an optional className to be applied to the button
   */
  className?: string

  /**
   * You can specify a child to be rendered inside the button as a replacement for the default copy icon
   */
  children?: ReactNode
}

const DEFAULT_TOOLTIP_LABEL = 'Copy to clipboard'
const DEFAULT_TOOLTIP_FEEDBACK = 'Copied!'
const DEFAULT_FEEDBACK_TIMEOUT = 2000

export function CopyButton({
  tooltip = DEFAULT_TOOLTIP_LABEL,
  feedback = DEFAULT_TOOLTIP_FEEDBACK,
  feedbackTimeout = DEFAULT_FEEDBACK_TIMEOUT,
  onClick,
  className,
  children,
  size = 'md',
}: CopyButtonProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleOnClick = () => {
    setShowFeedback(true)
    setTooltipOpen(true)

    if (typeof onClick === 'function') {
      onClick()
    }

    timeoutRef.current = setTimeout(() => {
      setShowFeedback(false)
    }, feedbackTimeout)
  }

  const handleOnMouseEnter = () => {
    setTooltipOpen(true)
  }

  const handleOnMouseLeave = () => {
    setTooltipOpen(false)
  }

  const tooltipLabel = showFeedback ? feedback : tooltip
  const classes = clsx('r-copy-btn', className)

  return (
    <Tooltip content={tooltipLabel} open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <Button
        icon={<Copy />}
        iconOnly
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleOnClick}
        className={classes}
        size={size}
      >
        {children}
      </Button>
    </Tooltip>
  )
}
