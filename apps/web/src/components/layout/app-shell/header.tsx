import { SidebarTrigger } from '@/components/shadcn/sidebar'
import { cn } from '@/utils/clsxm'
import type { ReactNode } from 'react'

interface HeaderProps {
  className?: string
  title?: string
  actions?: ReactNode
}

export const Header = ({ className, title = 'ROR', actions }: HeaderProps) => {
  return (
    <header className={cn('w-full h-28 px-12 py-2 border-b flex items-center gap-4', className)}>
      <SidebarTrigger className='sm:hidden' aria-label='Open sidebar' />
      <h1 className='text-center text-4xl sm:text-5xl md:text-[4rem]'>{title}</h1>
      {actions && <div className='ml-auto shrink-0'>{actions}</div>}
    </header>
  )
}
