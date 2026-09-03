'use client'

import { signOut } from 'next-auth/react'
import { routes } from '@/config/routes'

export function SignOutButton() {
  return (
    <button
      type='button'
      className='text-sm outline-none'
      onClick={() => signOut({ callbackUrl: routes.auth.signIn.getHref() })}
    >
      Sign out
    </button>
  )
}
