import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/shadcn/tooltip'
import { CopyButton } from '@/components/ui/copy-button'
import Link from 'next/link'
import copy from 'clipboard-copy'

interface IdItem {
  id: string
  href?: string
}

interface IdListTooltipProps {
  ids: (string | IdItem)[]
  label: string
  triggerText?: string
  triggerElement?: React.ReactNode
}

export const IdListTooltip = ({ ids, label, triggerText, triggerElement }: IdListTooltipProps) => {
  const displayText = triggerText || `View ${label.toLowerCase()}`
  const countIds = ids.length

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerElement || <span className='underline '>{displayText}</span>}</TooltipTrigger>
        <TooltipContent>
          <div className='space-y-2 max-w-xs'>
            <div className='font-semibold text-sm'>{label}:</div>
            <div className='space-y-1'>
              {ids.slice(0, 3).map((item, index) => {
                const id = typeof item === 'string' ? item : item.id
                const href = typeof item === 'string' ? undefined : item.href

                if (href) {
                  return (
                    <Link
                      key={index}
                      href={href}
                      className='font-mono text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline block'
                    >
                      {id}
                    </Link>
                  )
                }
                return (
                  <div key={index} className='font-mono text-xs'>
                    {id}
                  </div>
                )
              })}
              {countIds > 3 && <div className='font-mono text-xs text-gray-500 italic'>{countIds - 3} more runs</div>}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const ActiveTargetsTooltip = ({
  ids,
  triggerElement,
}: {
  ids: (string | IdItem)[]
  triggerElement?: React.ReactNode
}) => {
  const copyActiveTargets = (e?: React.MouseEvent) => {
    e?.preventDefault()
    void copy(ids.map((id) => (typeof id === 'string' ? id : id.id)).join('\n'))
  }

  return (
    <>
      <IdListTooltip ids={ids} label='Active Targets' triggerElement={triggerElement} />
      <CopyButton onClick={copyActiveTargets} />
    </>
  )
}
