'use client'

import { useRef } from 'react'
import copy from 'clipboard-copy'
import { Layer } from '@ror/react'
import { CopyButton } from './copy-button'

type CodeSnippetType = 'single' | 'inline' | 'multi'

export interface CodeSnippetProps {
  type: CodeSnippetType
  hideCopyButton?: boolean
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties & { '--code-snippet-multi-max-height'?: string }
}

export function CodeSnippet({ type, hideCopyButton = false, className = '', style, children }: CodeSnippetProps) {
  const codeElementRef = useRef<HTMLElement | null>(null)

  const handleOnCopyClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    e?.nativeEvent.stopImmediatePropagation()
    e?.preventDefault()
    if (!codeElementRef.current) return
    void copy(codeElementRef.current.innerText)
  }

  // Tailwind classes for styling
  const base = 'text-sm font-mono bg-[var(--r-layer)] scrollbar-hide rounded px-2 py-1 text-[10px] rounded-lg'
  const inlineClass = 'inline overflow-auto h-[40px]'
  const blockClass = 'w-full overflow-auto min-h-[20rem] max-h-[var(--code-snippet-multi-max-height,60rem)]'
  const wrapperClass = 'relative'

  if (type === 'inline') {
    return hideCopyButton ? (
      <Layer level={2}>
        <span className={`${base} ${inlineClass} ${className}`} style={style}>
          <code ref={codeElementRef}>{children}</code>
        </span>
      </Layer>
    ) : (
      <Layer level={2}>
        <CopyButton className={`${base} ${inlineClass} ${className}`} onClick={handleOnCopyClick}>
          <code ref={codeElementRef} style={style}>
            {children}
          </code>
        </CopyButton>
      </Layer>
    )
  }

  return (
    <Layer level={2}>
      <div className={`${wrapperClass} ${className}`} style={style}>
        <div
          role='textbox'
          tabIndex={0}
          aria-label='Code snippet'
          aria-readonly='true'
          className={`${base} ${blockClass} py-3`}
        >
          <pre>
            <code ref={codeElementRef}>{children}</code>
          </pre>
        </div>
        {!hideCopyButton && (
          <CopyButton
            size='lg'
            onClick={handleOnCopyClick}
            className='absolute top-0 right-0 text-muted-foreground hover:text-foreground'
          />
        )}
      </div>
    </Layer>
  )
}
