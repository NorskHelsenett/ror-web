import { routes } from '@/config/routes'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarHeader } from './shadcn/sidebar'

export function AppSidebarHeader() {
  return (
    <SidebarHeader className='flex flex-row items-center'>
      <Link href={routes.app.clusters.getHref()}>
        <Image src='/logo.svg' alt='ROR logo' width={40} height={40} className='w-10 h-fit scale-100' />
      </Link>
      <h1 className='text-4xl text-blue-900 dark:text-inherit font-semibold group-data-[collapsible=icon]:hidden'>
        ROR
      </h1>
    </SidebarHeader>
  )
}
