'use client'

import type { User } from 'next-auth'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import { User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from '@/features/auth/components/sign-out-button'
import s from './profile.module.scss'

interface ProfileClientProps {
  user?: Partial<User>
  className?: string
}

export function ProfileClient({ user, className }: ProfileClientProps) {
  if (!user) return null

  return (
    <div className={`${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <div className={s.profile}>
            <div className={s.avatar}>
              <UserIcon className='text-neutral-800 dark:text-neutral-200 size-5' />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent collisionPadding={8} sideOffset={4}>
            <div className={s.popover}>
              <ul className={s.menu}>
                <li>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </ul>
            </div>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  )
}
