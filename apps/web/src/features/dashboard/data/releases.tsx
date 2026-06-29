import { Bug, Server, LayoutDashboard, Table, Filter } from 'lucide-react'
import { routes } from '@/config/routes'
import type { ReactNode } from 'react'

export type ReleaseTag = 'New' | 'Improved' | 'Beta'

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
    id: 'policy-reports-cluster-tab',
    day: 24,
    month: 'JUN',
    year: 2026,
    icon: icons.LayoutDashboard,
    iconBg: 'bg-blue-950',
    title: 'Policy reports on cluster page',
    description:
      'Moved from legacy.ror.nhn.no. View policy reports for a specific cluster on the cluster page under policy reports tab.',
    tags: ['New', 'Beta'],
    href: '',
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
    tags: ['New', 'Beta'],
    href: routes.app.policyReports.getHref(),
  },
  {
    day: 10,
    month: 'JUN',
    year: 2026,
    icon: icons.Filter,
    iconBg: 'bg-violet-950',
    title: 'Copy button on KubernetesCluster',
    description:
      'Added copy button to copy the entire KubernetesCluster data. This release also removed the raw data tab from the cluster page',
    tags: ['Improved'],
    href: routes.app.clusters.getHref(),
  },
  {
    day: 3,
    month: 'JUN',
    year: 2026,
    icon: icons.Filter,
    iconBg: 'bg-violet-950',
    title: 'Search and filter on dashboard',
    description:
      'Easily search and filter data on the dashboard to find the information you need quickly. On search it is also possible to favorite clusters and VMs from the list of search results.',
    tags: ['New'],
    href: routes.app.dashboard.getHref(),
  },
]
