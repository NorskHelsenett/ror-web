import { auth } from '@/app/auth'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import s from './profile.module.scss'
import Link from 'next/link'

export async function Profile() {
  const session = await auth()

  if (!session?.user) return null
  if (session.user?.image && session.user.name) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className={s.profile}>
            <Image src={session.user.image} alt={session.user.name} width={32} height={32} className={s.avatar} />
          </div>
        </PopoverTrigger>
        <ProfilePopover />
      </Popover>
    )
  }

  if (session.user.name) {
    const initials = session.user.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className={s.profile}>
            <div className={s.avatar}>
              <span className={s.label}>{initials}</span>
            </div>
          </div>
        </PopoverTrigger>
        <ProfilePopover />
      </Popover>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={s.profile}>
          <div className={s.avatar}>
            <span className={s.label}>?</span>
          </div>
        </div>
      </PopoverTrigger>
      <ProfilePopover />
    </Popover>
  )
}

function ProfilePopover() {
  return (
    <PopoverPortal>
      <PopoverContent collisionPadding={8} sideOffset={4}>
        <div className={s.popover}>
          <nav>
            <ul className={s.menu}>
              <li>
                <Link href='/profile'>Profile</Link>
              </li>
              <li>
                <Link href='/api/auth/signout'>Sign out</Link>
              </li>
            </ul>
          </nav>
        </div>
      </PopoverContent>
    </PopoverPortal>
  )
}
