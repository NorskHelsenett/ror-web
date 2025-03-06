'use client'
import { clsx } from 'clsx'
import { useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import copy from 'clipboard-copy'
import { CopyButton } from './copy-button'

type CodeSnippetType = 'single' | 'inline' | 'multi'

export interface CodeSnippetProps {
  /**
   * Provide the type of Code Snippet
   */
  type: CodeSnippetType

  /**
   * Specify whether or not a copy button should be displayed
   */
  hideCopyButton?: boolean

  /**
   * Specify an optional className to be applied
   */
  className?: string

  /**
   * The content to display
   */
  children: ReactNode

  /**
   * Specify inline CSS to be applied
   */
  style?: CSSProperties & { '--code-snippet-multi-max-height': string }
}

export function CodeSnippet({ type, hideCopyButton = false, className, style, children }: CodeSnippetProps) {
  const codeElementRef = useRef<HTMLElement | null>(null)
  const baseClass = 'r-code-snippet'
  const classes = clsx(baseClass, className, {
    [`${baseClass}--single`]: type === 'single',
    [`${baseClass}--inline`]: type === 'inline',
    [`${baseClass}--multi`]: type === 'multi',
  })

  const handleOnCopyClick = () => {
    if (!codeElementRef.current) return
    const innerText = codeElementRef.current.innerText
    void copy(innerText)
  }

  if (type === 'inline') {
    if (hideCopyButton) {
      return (
        <span className={classes} style={style}>
          <code ref={codeElementRef} className={`${baseClass}__inline-code`}>
            {children}
          </code>
        </span>
      )
    }

    return (
      <CopyButton className={classes} onClick={handleOnCopyClick}>
        <code ref={codeElementRef} style={style} className={`${baseClass}__inline-code`}>
          {children}
        </code>
      </CopyButton>
    )
  }

  return (
    <div className={classes} style={style}>
      <div
        role='textbox'
        tabIndex={0}
        className={`${baseClass}__container`}
        aria-label='Copy to clipboard'
        aria-readonly='true'
      >
        <pre>
          <code ref={codeElementRef}>{children}</code>
        </pre>
      </div>
      {type === 'single' ? <div className={`${baseClass}__overflow-indicator--right`} /> : null}
      {!hideCopyButton ? (
        <CopyButton size='lg' className={`${baseClass}__copy-btn`} onClick={handleOnCopyClick} />
      ) : null}
    </div>
  )
}
