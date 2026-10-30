export const dashboardSectionIds = ['releases', 'greeting', 'search', 'overview', 'clusters', 'vms'] as const
export type DashboardSectionId = (typeof dashboardSectionIds)[number]

export const dashboardSectionLabels: Record<DashboardSectionId, string> = {
  releases: 'Releases',
  greeting: 'Greeting',
  search: 'Search',
  overview: 'Overview',
  clusters: 'Favorite clusters',
  vms: 'Favorite VMs',
}

export interface DashboardLayoutPreference {
  order: DashboardSectionId[]
  hidden: DashboardSectionId[]
}

export const DASHBOARD_LAYOUT_KEY = 'dashboard:layout'

export function defaultDashboardLayout(): DashboardLayoutPreference {
  return { order: [...dashboardSectionIds], hidden: [] }
}

function isSectionId(value: unknown): value is DashboardSectionId {
  return dashboardSectionIds.some((id) => id === value)
}

export function parseDashboardLayout(value: string): DashboardLayoutPreference {
  const parsed: unknown = JSON.parse(value)
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('order' in parsed) ||
    !('hidden' in parsed) ||
    !Array.isArray(parsed.order) ||
    !Array.isArray(parsed.hidden) ||
    !parsed.order.every(isSectionId) ||
    !parsed.hidden.every(isSectionId)
  ) {
    throw new Error('Invalid dashboard layout preference')
  }
  return {
    order: [
      ...new Set([
        ...(parsed.order.includes('releases') ? [] : (['releases'] as const)),
        ...parsed.order,
        ...dashboardSectionIds,
      ]),
    ],
    hidden: [...new Set(parsed.hidden)],
  }
}

export function moveDashboardSection(
  layout: DashboardLayoutPreference,
  source: DashboardSectionId,
  target: DashboardSectionId,
  placement: 'before' | 'after'
): DashboardLayoutPreference {
  if (source === target) return layout
  const order = layout.order.filter((id) => id !== source)
  const targetIndex = order.indexOf(target)
  order.splice(targetIndex + (placement === 'after' ? 1 : 0), 0, source)
  return { ...layout, order }
}
