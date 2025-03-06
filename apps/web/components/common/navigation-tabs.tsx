'use client'
import { MotionConfig, motion } from 'motion/react'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import s from './navigation-tabs.module.scss'
import clsxm from '@/utils/clsxm'

interface TabItem {
  label: string
  href: string
}

interface NavigationTabsProps {
  className?: string
  items: TabItem[]
}

export function NavigationTabs({ items, className }: NavigationTabsProps) {
  const currentPath = usePathname()

  const classes = clsx('r-tabs', s.navigation, className)

  return (
    <nav aria-label='Tabs' className={classes}>
      <MotionConfig transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}>
        <ul>
          {items.map((item) => {
            const key = item.href
            const isActive = item.href === currentPath
            const classes = clsx('r-tab__item', s.navigationItem, {
              'r-tab__item--active': isActive,
              [s.active]: isActive,
            })
            return (
              <motion.li key={key} layout className={classes}>
                <Link href={item.href}>
                  <span>{item.label}</span>
                  {isActive ? (
                    <motion.div
                      layoutId='active-indicator'
                      className={clsxm('r-tab-indicator r-tab-indicator--active', s.activeIndicator)}
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
