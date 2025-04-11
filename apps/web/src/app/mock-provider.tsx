'use client'

import { Suspense, use } from 'react'
import type { ReactNode } from 'react'
import { handlers } from '@/__mocks__/handlers'
import { onUnhandledRequest } from '@/__mocks__/utils/on-unhandled-request'

/**
 * EXPERIMENTAL
 * This mocking provider is currently under development by mswjs.
 * Follow https://github.com/mswjs/examples/pull/101/files/eb017b0976cbab722e5af5e8077261581fe328af#diff-859b459f1e0f3f07086e1d0016ed0b442c2c0cabefea8f7e651759b1f4d14882
 * for more information.
 */

const mockingEnabledPromise =
  typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MOCKING_ENABLED === 'true'
    ? import('@/__mocks__/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: onUnhandledRequest,
        })

        worker.use(...handlers)

        console.log(worker.listHandlers())
      })
    : Promise.resolve()

interface MswProviderProps {
  children: ReactNode
}

// We export an anonymous function in order to knowlingly break fast-refresg
// @see https://github.com/mswjs/examples/pull/101#discussion_r1825856123
// eslint-disable-next-line
export default ({ children }: MswProviderProps) => {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={<span>Loading msw…</span>}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  use(mockingEnabledPromise)
  return children
}
