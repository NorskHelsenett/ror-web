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

  // Used for new components
  Table: <Table className='size-5 text-emerald-700 dark:text-emerald-400' />,

  // Used for new functionality
  Filter: <Filter className='size-5 text-violet-700 dark:text-violet-400' />,

  // Used for major new features - at this time VMs and Cluster enhancements
  Server: <Server className='size-5 text-cyan-700 dark:text-cyan-400' />,

  // Bug is used when there has been a fixed a bug in previous release
  Bug: <Bug className='size-5 text-orange-700 dark:text-orange-400' />,
}

/**
 * Add new releases to the top of this array.
 * The dashboard will automatically show the 4 most recent.
 */
export const releases: Release[] = [
  {
    id: 'resizable-tables',
    day: 5,
    month: 'AUG',
    year: 2026,
    icon: icons.Filter,
    iconBg: 'bg-violet-200 dark:bg-violet-950',
    title: 'Resizable tables',
    description:
      'The user is now able to resize the columns of tables in the size they prefer. The sizes will be saved in local storage and will be used the next time the user visits the page.',
    tags: ['Improved'],
    href: routes.app.clusters.getHref(),
  },
  {
    id: 'rediect-from-search-on-dashboard',
    day: 4,
    month: 'AUG',
    year: 2026,
    icon: icons.Filter,
    iconBg: 'bg-violet-200 dark:bg-violet-950',
    title: 'Redirect from search on dashboard',
    description:
      'In the dashboard search bar, the user is able to click on one of the vms/clusters in the results list and be redirected to the correct page.',
    tags: ['Improved'],
    href: routes.app.dashboard.getHref(),
  },
  {
    id: 'node-pools-cluster-tab',
    day: 21,
    month: 'JUL',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-200 dark:bg-blue-950',
    title: 'Node pools on cluster page',
    description:
      'Moved from legacy.ror.nhn.no. View node pools for a specific cluster on the cluster page under the node pools tab.',
    tags: ['New', 'V2'],
    href: routes.app.clusters.getHref(),
    resolveHref: async () => {
      const uid = await getFirstClusterUid()
      return uid ? routes.app.clusterNodePools.getHref(uid) : routes.app.clusters.getHref()
    },
  },
  {
    id: 'datacenter-table',
    day: 20,
    month: 'JUL',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-200 dark:bg-blue-950',
    title: 'Datacenter page',
    description: 'Added data for datacenters on datacenter page.',
    tags: ['New', 'V2'],
    href: routes.app.dataCenters.getHref(),
  },
  {
    id: 'projects-page',
    day: 17,
    month: 'JUL',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-200 dark:bg-blue-950',
    title: 'Projects page',
    description: 'Moved from legacy.ror.nhn.no. View projects.',
    tags: ['New', 'V2'],
    href: routes.app.projects.getHref(),
  },
  {
    id: 'statistics-page',
    day: 17,
    month: 'JUL',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-200 dark:bg-blue-950',
    title: 'Statistics page',
    description: 'Moved from legacy.ror.nhn.no. View statistics of several different metrics.',
    tags: ['New', 'V2'],
    href: routes.app.statistics.getHref(),
  },
  {
    id: 'vulnerability-page',
    day: 14,
    month: 'JUL',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-200 dark:bg-blue-950',
    title: 'Vulnerability integration',
    description: 'Integrated against SPAM-tool. View your vulnerabilities in SPAM.',
    tags: ['New'],
    href: 'https://spam.sikkerhet.nhn.no/clusters',
  },
  {
    id: 'workspace-page',
    day: 6,
    month: 'JUL',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-200 dark:bg-blue-950',
    title: 'Workspace page',
    description:
      'Moved from legacy.ror.nhn.no. Browse workspaces and inspect their clusters with search, sorting, and filters for datacenter, machine class, and storage class.',
    tags: ['New', 'V2'],
    href: routes.app.workspaces.getHref(),
  },
  {
    id: 'policy-reports-cluster-tab',
    day: 24,
    month: 'JUN',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-200 dark:bg-blue-950',
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
    iconBg: 'bg-blue-200 dark:bg-blue-950',
    title: 'Policy reports page',
    description:
      'Moved from legacy.ror.nhn.no. View policy reports across clusters and namespaces, filterable by severity, category, and result status.',
    tags: ['New', 'V2'],
    href: routes.app.policyReports.getHref(),
  },
]
