import { Accordion } from '../shadcn/accordion'
import { ReactNode } from 'react'

interface AccordionTableRowProps {
  handleAccordionChange?: (value: string) => void | Promise<void>
  children: ReactNode
}

export const accordionItemStyling = 'border-b-0'
export const accordionTriggerStyling = 'px-6 py-4 hover:no-underline hover:bg-muted/40 data-[state=open]:bg-muted/40'
export const triggerOuterDivStyling = 'flex items-center gap-4 flex-1 min-w-0'
export const triggerTitleStyling = 'w-48 shrink-0 truncate text-base font-semibold'
export const accordionContentStyling = 'px-6 pb-4'
export const contentTitleStyling = 'text-sm text-muted-foreground mb-3 mt-2'
export const contentRowsStyling = 'flex flex-col gap-2'

export const AccordionTriggerRowElement = ({
  title,
  text,
  className,
}: {
  title: string
  text: string
  className?: string
}) => (
  <div className={className}>
    <b>{title}</b>
    <p>{text}</p>
  </div>
)

export const AccordionContentRow = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) => (
  <div className='flex items-center gap-4 px-4 py-3 rounded-lg border border-(--r-border-subtle) bg-card'>
    {icon}
    <span className='w-44 shrink-0 truncate text-sm font-medium'>{title}</span>
    {children}
  </div>
)

export const AccordionTableRow = ({ handleAccordionChange, children }: AccordionTableRowProps) => {
  return (
    <div className='rounded-xl border border-(--r-border-subtle) bg-card overflow-hidden'>
      <Accordion type='single' collapsible onValueChange={handleAccordionChange}>
        {children}
      </Accordion>
    </div>
  )
}
