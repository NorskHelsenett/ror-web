import { Bug, Server, LayoutDashboard, Table, Filter } from 'lucide-react'
import { routes } from '@/config/routes'
import { getFirstClusterUid } from '@/utils/cluster-actions'
import type { ReactNode } from 'react'

export type ReleaseTag = 'New' | 'Improved' | 'V2'

export interface Release {
  /** Stable slug used to activate a ReleaseSpotlight on the target page */
  id?: string
  day: number
  month: string
  year: number
  icon: ReactNode
  iconBg: string
  title: string
  description: string
  tags: ReleaseTag[]
  href: string
  /** Optional async resolver that overrides href once resolved */
  resolveHref?: () => Promise<string>
}

const icons = {
  // Used for new pages or dashboard layout
  LayoutDashboard: <LayoutDashboard className='size-5 text-blue-400' />,

  //Used for new components
  Table: <Table className='size-5 text-emerald-400' />,

  // Used for new functionality
  Filter: <Filter className='size-5 text-violet-400' />,

  // Used for major new features - at this time VMs and Cluster enhancements
  Server: <Server className='size-5 text-cyan-400' />,

  // Bug is used when there has been a fixed a bug in previous release
  Bug: <Bug className='size-5 text-orange-400' />,
}

/**
 * Add new releases to the top of this array.
 * The dashboard will automatically show the 4 most recent.
 */
export const releases: Release[] = [
  {
    id: 'cluster-table-updates',
    day: 29,
    month: 'JUN',
    year: 2026,
    icon: icons.Table,
    iconBg: 'bg-emerald-950',
    title: 'Cluster table updates',
    description: 'Added datacenter, CPU and memory to the cluster table.',
    tags: ['Improved'],
    href: routes.app.clusters.getHref(),
  },
  {
    id: 'policy-reports-cluster-tab',
    day: 24,
    month: 'JUN',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-950',
    title: 'Policy reports on cluster page',
    description:
      'Moved from legacy.ror.nhn.no. View policy reports for a specific cluster on the cluster page under policy reports tab.',
    tags: ['New', 'V2'],
    href: routes.app.clusters.getHref(),
    resolveHref: async () => {
      const uid = await getFirstClusterUid()
      return uid ? routes.app.clusterPolicies.getHref(uid) : routes.app.clusters.getHref()
    },
  },
  {
    id: 'policy-reports-page',
    day: 23,
    month: 'JUN',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-950',
    title: 'Policy reports page',
    description:
      'Moved from legacy.ror.nhn.no. View policy reports across clusters and namespaces, filterable by severity, category, and result status.',
    tags: ['New', 'V2'],
    href: routes.app.policyReports.getHref(),
  },
  {
    id: 'dashboard-updates',
    day: 3,
    month: 'JUN',
    year: 2026,
    icon: icons.Filter,
    iconBg: 'bg-violet-950',
    title: 'Dashboard updates',
    description:
      'The user can search on cluster and vms from the dashboard, and add VMs and clusters to favorites from the search results.',
    tags: ['New', 'Improved'],
    href: routes.app.dashboard.getHref(),
  },
  {
    id: 'favorite-cards',
    day: 29,
    month: 'MAY',
    year: 2026,
    icon: icons.Table,
    iconBg: 'bg-emerald-950',
    title: 'Favorite cards',
    description:
      'Added favorite cards to the dashboard. The user can add clusters and VMs to favorites, and they will be shown on the dashboard. The cards will also redirect to the cluster or VM page when clicked.',
    tags: ['New'],
    href: routes.app.dashboard.getHref(),
  },
]
