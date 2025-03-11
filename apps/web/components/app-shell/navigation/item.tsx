'use client'
import Link from 'next/link'
import { MouseEventHandler, useCallback, useState, type ReactNode } from 'react'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import { useDebounce } from '@uidotdev/usehooks'

import s from './item.module.scss'
import fo from './flyout.module.scss'

import { Route } from './routes'
import { useAppShellContext } from '../use-app-shell'
import clsxm from '@/utils/clsxm'

interface NavigationItemProps {
  label: string
  href?: string
  items?: Route[]
  icon?: ReactNode
  className?: string
  defaultOpen?: boolean
}

export function NavigationItem({ label, href, icon, items }: NavigationItemProps) {
  const { leftPanelExpanded } = useAppShellContext()
  const [flyoverOpen, setFlyoverOpen] = useState(false)
  const [staticOpen, setStaticOpen] = useState(false)

  const debouncedFlyoverOpen = useDebounce(flyoverOpen, 200)

  /**
   * Control mechanism of the popover, used in conjuction with the "open" property on the Popover component
   */
  const handleOnOpenChange = (open: boolean) => {
    setFlyoverOpen(open)
  }

  /**
   * We only want to toggle the static menu if the left panel is expanded
   */
  const handleOnTriggerClick = useCallback(() => {
    if (leftPanelExpanded) {
      setStaticOpen((prevState) => !prevState)
    }
  }, [leftPanelExpanded])

  const handleOnTriggerMouseOver = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    // Dont open the flyover if the static menu is open (when the left panel is expanded)
    // for all other scenarios open the flyover
    if (staticOpen && leftPanelExpanded) return
    setFlyoverOpen(true)
  }, [staticOpen, leftPanelExpanded])

  const handleOnTriggerMouseLeave = useCallback(() => {
    setFlyoverOpen(false)
  }, [])

  const handleOnContentMouseEnter = () => {
    setFlyoverOpen(true)
  }

  const handleOnContentMouseLeave = () => {
    setFlyoverOpen(false)
  }

  const shouldShowStaticMenu = leftPanelExpanded && staticOpen

  /**
   * A navigation item with a sub navigation behaves differently
   * we render the sub navigation as a popover using radix-ui on certain interactions
   */
  if (Array.isArray(items) && items.length > 0) {
    return (
      <Popover open={debouncedFlyoverOpen} onOpenChange={handleOnOpenChange}>
        <li className={s.item}>
          <PopoverTrigger asChild>
            <button
              className={s.trigger}
              onClick={handleOnTriggerClick}
              onMouseOver={handleOnTriggerMouseOver}
              onMouseLeave={handleOnTriggerMouseLeave}
            >
              {icon}
              <span className={s.label}>{label}</span>
              <svg
                aria-hidden='true'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                viewBox='0 0 24 24'
                className={s.caret}
                data-expanded={shouldShowStaticMenu}
              >
                <path d='m9 18 6-6-6-6'></path>
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              className={fo.flyout}
              side='right'
              align='center'
              sideOffset={12}
              onMouseEnter={handleOnContentMouseEnter}
              onMouseLeave={handleOnContentMouseLeave}
            >
              <ul className={fo.flyoutMenu}>
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </PopoverPortal>
          <div
            className={clsxm(s.staticMenu, {
              [s.collapsed]: !shouldShowStaticMenu,
            })}
          >
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </Popover>
    )
  }

  if (!href) {
    throw new Error('href must be provided for a navigation item without children')
  }

  return (
    <li className={s.item}>
      <Link href={href} className={s.menuItem}>
        {icon}
        <span className={s.label}>{label}</span>
      </Link>
    </li>
  )
}
