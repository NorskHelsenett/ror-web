'use client'
import { Tooltip } from '@ror/react/components/tooltip'
import { useAppShellContext } from './use-app-shell'
import { saveLeftPanelPreferenceAction } from './app-shell-actions'

export function LeftPanelToggleButton() {
  const { leftPanelExpanded, onToggleLeftPanel } = useAppShellContext()

  const handleOnClick = () => {
    onToggleLeftPanel(!leftPanelExpanded)
    saveLeftPanelPreferenceAction(!leftPanelExpanded)
  }

  const tooltipText = leftPanelExpanded ? 'Hide Sidebar' : 'Show Sidebar'

  return (
    <Tooltip content={tooltipText}>
      <button
        className='w-7 h-7 shrink-0 cursor-pointer hover:bg-background-hover flex items-center justify-center justify-self-end rounded-sm border border-subtle'
        onClick={handleOnClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='w-5 h-5 text-(--r-icon-primary)'
          viewBox='0 0 24 24'
        >
          <rect width='18' height='18' x='3' y='3' rx='2'></rect>
          <path d='M9 3v18'></path>
        </svg>
      </button>
    </Tooltip>
  )
}
