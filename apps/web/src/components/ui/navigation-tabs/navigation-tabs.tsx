'use client'

import { MotionConfig, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import s from './navigation-tabs.module.scss'
import clsxm from '@/utils/clsxm'

interface TabItem {
  label: string
  href: string
  icon?: React.ReactNode
}
interface NavigationTabsProps {
  className?: string
  items: TabItem[]
  tabColor?: string
  contextLabel?: string // e.g. "Cluster"
}

export function NavigationTabs({ items, className, tabColor, contextLabel = 'Cluster' }: NavigationTabsProps) {
  const currentPath = usePathname()
  const classes = clsx('r-tabs', s.navigation, className)

  return (
    <nav aria-label={`${contextLabel} sections`} className={classes}>
      <MotionConfig transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}>
        <ul>
          {items.map((item) => {
            const isActive =
              currentPath === item.href ||
              (currentPath.startsWith(`${item.href}/`) &&
                !items.some(
                  (other) =>
                    other.href !== item.href &&
                    currentPath.startsWith(`${other.href}/`) &&
                    other.href.length > item.href.length
                ))

            return (
              <motion.li
                key={item.href}
                layout
                className={clsx('r-tab__item', s.navigationItem, {
                  'r-tab__item--active': isActive,
                  [s.active]: isActive,
                })}
              >
                <Link href={item.href} aria-current={isActive ? 'page' : undefined}>
                  <span className='sr-only'>
                    {contextLabel} {item.label}
                  </span>
                  <span aria-hidden='true' className='inline-flex items-center'>
                    {item.label}
                    {item.icon && <span className='ml-1'>{item.icon}</span>}
                  </span>
                  {isActive ? (
                    <motion.div
                      layoutId='active-indicator'
                      className={clsxm('r-tab-indicator r-tab-indicator--active', s.activeIndicator, tabColor)}
                    />
                  ) : null}
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </MotionConfig>
    </nav>
  )
}
