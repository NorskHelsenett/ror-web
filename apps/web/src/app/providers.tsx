import { getDarkModePreferenceAction } from '@/actions/dark-mode'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/shadcn/sidebar'
import { ColorSchemeProvider } from '@/context/color-theme-context'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import { MSWProvider } from './mock-provider'
import { Toaster } from 'sonner'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Wraps the children components with necessary providers.
 * @param param The children components to be wrapped by the providers.
 * @returns Children content with providers applied.
 */
export async function Providers({ children }: ProvidersProps) {
  const colorScheme = await getDarkModePreferenceAction()
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <MSWProvider>
      <ColorSchemeProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          {colorScheme ? <AppSidebar colorScheme={colorScheme} /> : null}
          <main className='flex-1 min-w-0'>{children}</main>
          <Toaster richColors position='bottom-right' theme={colorScheme} />
        </SidebarProvider>
      </ColorSchemeProvider>
    </MSWProvider>
  )
}
