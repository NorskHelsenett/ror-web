import { ReactNode } from 'react'
import { AppShellLeftPanel } from './left-panel'
import { Navigation } from './navigation/navigation'
import { LeftPanelToggleButton } from './left-panel-toggle'
import { Profile } from './profile'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { getDarkModePreferenceAction, saveDarkModePreferenceAction } from '@/utils/dark-mode.actions'

interface AppShellProps {
  children: ReactNode
}

export async function AppShell({ children }: AppShellProps) {
  const colorScheme = await getDarkModePreferenceAction()
  return (
    <div className='grid grid-cols-[max-content_auto]'>
      <AppShellLeftPanel>
        <div className='p-2'>
          <Logo />
        </div>
        <div className='p-3 flex flex-col gap-y-4'>
          <Navigation />
        </div>
        <div className='p-3 mt-auto flex flex-col @min-[6rem]:flex-row items-center justify-between gap-2'>
          <Profile />
          <div className='flex flex-col @min-[6rem]:flex-row items-center justify-end gap-2'>
            <ThemeToggle colorScheme={colorScheme} onSavePreferenceAction={saveDarkModePreferenceAction} />
            <LeftPanelToggleButton />
          </div>
        </div>
      </AppShellLeftPanel>
      <div className='h-screen overflow-y-auto bg-background'>{children}</div>
    </div>
  )
}
