'use client'
import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import clsxm from '@/utils/clsxm'
import { useAppShellContext } from './use-app-shell'

interface AppShellLeftPanelProps {
  children: ReactNode
}

// The variants add 1px to account for the border width
const variants = {
  expanded: {
    '--left-panel-width': 'calc(16rem + 1px)',
  },
  collapsed: {
    '--left-panel-width': 'calc(3rem + 1px)',
  },
}

export function AppShellLeftPanel({ children }: AppShellLeftPanelProps) {
  const { leftPanelExpanded } = useAppShellContext()
  const classes = clsxm(
    '@container w-(--left-panel-width) bg-background text-primary h-screen border-r border-subtle transition-width duration-200 hide-scrollbar overflow-y-auto'
  )
  return (
    <motion.div
      initial={leftPanelExpanded ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.1 }}
      variants={variants}
      animate={leftPanelExpanded ? 'expanded' : 'collapsed'}
      className={classes}
    >
      <div className='flex flex-col h-full'>{children}</div>
    </motion.div>
  )
}
