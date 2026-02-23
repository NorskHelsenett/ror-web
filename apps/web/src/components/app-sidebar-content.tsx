import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import {
  Boxes,
  ChartColumn,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  CornerUpLeft,
  Settings2,
  Monitor,
} from 'lucide-react'
import Link from 'next/link'
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from './shadcn/sidebar'
import { routes } from '@/config/routes'

export type SidebarItem = { title: string } | { title: string; url: string }

interface Section {
  title: string
  icon: React.ElementType
  isActive: boolean
  items: SidebarItem[]
}

// Comment out to test VM in Beta
//const vmsEnabled = process.env.NEXT_PUBLIC_VMS_ENABLED === 'true'
const vmsEnabled = true

/*
 * TODO: Add sections as they are created
 */
const sections: Section[] = [
  //   {
  //     title: "Favorites",
  //     icon: Star,
  //     isActive: true,
  //     items: [
  //       {
  //         title: "No current favorites",
  //       }
  //     ]
  //   },
  //   {
  //     title: "Overview",
  //     icon: House,
  //     isActive: true,
  //     items: [
  //       {
  //         title: "Overview",
  //         url: "#",
  //       }
  //     ]
  //   },
  {
    title: 'Clusters',
    icon: Boxes,
    isActive: true,
    items: [
      {
        title: 'Clusters',
        url: routes.app.clusters.getHref(),
      },
    ],
  },
  vmsEnabled && {
    title: 'Virtual machines',
    icon: Monitor,
    isActive: true,
    items: [
      {
        title: 'Virtual machines',
        url: routes.app.vms.getHref(),
      },
      {
        title: 'Backup jobs',
        url: routes.app.backupJobs.getHref(),
      },
      {
        title: 'Backup runs',
        url: routes.app.backupRuns.getHref(),
      },
    ],
  },
  {
    title: 'Statistics',
    icon: ChartColumn,
    isActive: true,
    items: [
      {
        title: 'Statistics',
        url: routes.app.statistics.getHref(),
      },
    ],
  },
  {
    title: 'Economy',
    icon: CircleDollarSign,
    isActive: true,
    items: [
      {
        title: 'Price list',
        url: routes.app.priceList.getHref(),
      },
    ],
  },
  {
    title: 'Administration',
    icon: Settings2,
    isActive: true,
    items: [
      {
        title: 'Data centers',
        url: routes.app.dataCenters.getHref(),
      },
      //         {
      //             title: 'Policy reports',
      //             url: '#',
      //         },
      //         {
      //             title: 'Admin price list',
      //             url: '#',
      //         },
      //         {
      //             title: 'Projects',
      //             url: '#',
      //         },
      //         {
      //             title: 'Vulnerability reports',
      //             url: '#',
      //         },
      //         {
      //             title: 'Workspaces',
      //             url: '#',
      //         },
    ],
  },
  {
    title: 'Help',
    icon: CircleHelp,
    isActive: true,
    items: [
      {
        title: 'Documentation',
        url: 'https://docs.nhn.no/',
      },
      // {
      //   title: "About",
      //   url: "#",
      // },
      // {
      //   title: "Release notes",
      //   url: "#",
      // }
    ],
  },
  {
    title: 'Legacy',
    icon: CornerUpLeft,
    isActive: true,
    items: [
      {
        title: 'Old ROR',
        url: 'https://ror.nhn.no/',
      },
    ],
  },
].filter(Boolean) as Section[]

export function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup className=''>
        <SidebarMenu>
          {sections.map((section, index) => (
            <Collapsible asChild defaultOpen={section.isActive} className='group/collapsible' key={index}>
              <SidebarMenuItem>
                {section.items.length === 1 ? (
                  <div className='flex flex-row items-center'>
                    <SidebarMenuButton asChild popoverContent={{ title: section.title, items: section.items }}>
                      {'url' in section.items[0] ? (
                        <Link
                          href={section.items[0].url}
                          aria-current={section.isActive ? 'page' : undefined}
                          className='flex items-center gap-2'
                        >
                          <section.icon />
                          <span>{section.items[0].title}</span>
                        </Link>
                      ) : (
                        <span className='flex items-center gap-2'>
                          <section.icon />
                          <span>{section.items[0].title}</span>
                        </span>
                      )}
                    </SidebarMenuButton>
                  </div>
                ) : (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton popoverContent={{ title: section.title, items: section.items }}>
                      <section.icon />
                      <span>{section.title}</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                )}

                {section.items.length !== 1 && (
                  <CollapsibleContent className='overflow-hidden transition-all ease-in-out data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down'>
                    <SidebarMenuSub>
                      {section.items.map((item, index) => (
                        <SidebarMenuSubItem key={index}>
                          <SidebarMenuButton asChild>
                            {'url' in item ? <Link href={item.url}>{item.title}</Link> : <span>{item.title}</span>}
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}
