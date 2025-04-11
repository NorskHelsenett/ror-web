'use client'
import type { ReactNode } from 'react'
import { AppShellContextProvider } from '@/components/layout/app-shell/app-shell-provider'
import { TooltipProvider } from '@ror/react/components/tooltip'
import dynamic from 'next/dynamic'
const MSWProvider = dynamic(() => import('./mock-provider'), { ssr: false })

interface ProvidersProps {
  children: ReactNode
  defaultSidebarOpen: boolean
}

export function Providers({ children, defaultSidebarOpen }: ProvidersProps) {
  return (
    <MSWProvider>
      <AppShellContextProvider defaultSidebarOpen={defaultSidebarOpen}>
        <TooltipProvider>{children}</TooltipProvider>
      </AppShellContextProvider>
    </MSWProvider>
  )
}
