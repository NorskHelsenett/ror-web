'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@ror/react/components/button'
import { routes } from '@/config/routes'

export function SignOutButton() {
  return (
    <Button
      type='button'
      variant='ghost'
      size='sm'
      className='text-sm'
      onClick={() => signOut({ callbackUrl: routes.auth.signIn.getHref() })}
    >
      Sign out
    </Button>
  )
}
