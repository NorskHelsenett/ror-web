/*
 * FILE OVERVIEW:
 *
 * A header component for displaying resource information, including a title,
 * navigation tabs, and a status area.
 */

'use client'

import { cn } from '@/utils/clsxm'
import { NavigationTabs } from '@/components/ui/navigation-tabs'

interface ResourceHeaderProps {
  className?: string
  title: string
  tabs: { label: string; href: string }[]
  rightContent: React.ReactNode
  lightmodeColor: string
  darkmodeColor: string
  titleSize?: string // optional override
}

/**
 * Renders a resource header section with a title, navigation tabs, and an optional right-aligned content area.
 *
 * @param className - Additional CSS classes to apply to the root container.
 * @param title - The main title displayed in the header.
 * @param tabs - An array of tab items to render in the navigation section.
 * @param rightContent - Optional React node to display in the right section (e.g., status, actions).
 * @param lightmodeColor - CSS classes for background or text color in light mode.
 * @param darkmodeColor - CSS classes for background or text color in dark mode.
 * @param titleSize - Optional CSS classes to control the size of the title text. Defaults to 'text-4xl sm:text-[4rem]'.
 */
export const ResourceHeader = ({
  className,
  title,
  tabs,
  rightContent,
  lightmodeColor,
  darkmodeColor,
  titleSize = 'text-4xl sm:text-[4rem]',
}: ResourceHeaderProps) => {
  return (
    <div className={cn(className, 'relative flex h-48 w-full border-b')}>
      {/* Left section with title + tabs */}
      <div className='flex flex-col justify-between w-full h-full z-10'>
        <h1 className={cn('text-center sm:text-left mx-auto sm:mx-12 my-auto sm:self-start', titleSize)}>{title}</h1>
        <NavigationTabs className='mb-0' items={tabs} tabColor={cn(lightmodeColor, darkmodeColor)} />
      </div>

      {/* Right section (status area) */}
      <div
        className={cn(
          'absolute right-0 top-0 h-full w-full flex items-center text-black dark:text-white',
          'xl:[clip-path:polygon(760px_0,100%_0,100%_100%,920px_100%)] xl:pl-[940px]',
          'lg:[clip-path:polygon(560px_0,100%_0,100%_100%,680px_100%)] lg:pl-[720px]',
          'md:[clip-path:polygon(480px_0,100%_0,100%_100%,580px_100%)] md:pl-[620px]',
          '[clip-path:polygon(0_0,100%_0,100%_calc(100%-44px),0_calc(100%-44px))]',
          lightmodeColor,
          darkmodeColor
        )}
      >
        {rightContent}
      </div>
    </div>
  )
}
