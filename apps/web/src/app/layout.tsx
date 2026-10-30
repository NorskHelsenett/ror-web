import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter, Ubuntu_Mono } from 'next/font/google'
import { clsx } from 'clsx'
import { PublicEnvScript } from 'next-runtime-env'
import { getDarkModePreferenceAction } from '@/actions/dark-mode'
import { onUnhandledRequest } from '@/__mocks__/utils/on-unhandled-request'
import '@/styles/tailwind.css'
import '@/styles/globals.scss'
import { Providers } from './providers'
import { RenderApiError } from '@/utils/renderApiError'
import { ColorScheme } from '@/utils/dark-mode'

/**
 * Register the server-side mock server
 */
if (process.env.NEXT_PUBLIC_MOCKING_ENABLED === 'true') {
  const { server } = await import('@/__mocks__/node')
  server.listen({
    onUnhandledRequest: onUnhandledRequest,
  })
}

/**
 * Inter font
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--r-font-family-sans',
})

/**
 * Ubuntu Mono font
 */
const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--r-font-family-mono',
})

export const metadata: Metadata = {
  title: 'ROR',
  description: 'ROR (Release Operate Report)',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  try {
    // Retrieve the user's preferred color scheme
    // otherwise it defaults to "system"
    const theme = await getDarkModePreferenceAction()

    const classes = clsx(inter.variable, ubuntuMono.variable, {
      dark: theme === ColorScheme.Dark || theme === ColorScheme.DarkBlack,
      light: theme === ColorScheme.Light,
    })

    return (
      <html lang='en' className={classes} data-color-scheme={theme}>
        <head>
          <PublicEnvScript />
        </head>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    )
  } catch (error) {
    return RenderApiError(error)
  }
}
