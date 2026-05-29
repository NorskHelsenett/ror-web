import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import {
  // Boxes,
  ChartColumn,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  CornerUpLeft,
  Settings2,
  Monitor,
  Boxes,
  House,
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

const oldRorBaseUrl = 'https://ror.nhn.no/'

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
  {
    title: 'Overview',
    icon: House,
    isActive: true,
    items: [
      {
        title: routes.app.dashboard.label,
        url: routes.app.dashboard.getHref(),
      },
    ],
  },
  {
    title: 'Clusters',
    icon: Boxes,
    isActive: true,
    items: [
      {
        title: routes.app.clusters.label,
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
        title: routes.app.vms.label,
        url: routes.app.vms.getHref(),
      },
      {
        title: routes.app.backupJobs.label,
        url: routes.app.backupJobs.getHref(),
      },
      {
        title: routes.app.backupRuns.label,
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
        url: `${oldRorBaseUrl}https://ror.nhn.no/metrics`, // TODO: revert to routes.app.statistics.getHref() when backend is available
      },
    ],
  },
  {
    title: 'Economy',
    icon: CircleDollarSign,
    isActive: true,
    items: [
      {
        title: routes.app.priceList.label,
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
        title: 'Datacenters',
        url: `${oldRorBaseUrl}admin/datacenter`, // TODO: revert back to routes.app.dataCenters.getHref() when backend is ready
      },
      {
        title: 'Policy reports',
        url: `${oldRorBaseUrl}admin/policyreports`,
      },
      //         {
      //             title: 'Admin price list',
      //             url: '#',
      //         },
      {
        title: 'Projects',
        url: `${oldRorBaseUrl}admin/projects`,
      },
      {
        title: 'Vulnerability reports',
        url: `${oldRorBaseUrl}admin/vulnerabilityreports`,
      },
      {
        title: 'Workspaces',
        url: `${oldRorBaseUrl}workspaces`,
      },
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
      {
        title: 'API Documentation',
        url: 'https://api.ror.nhn.no/swagger/index.html',
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
        url: oldRorBaseUrl,
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
