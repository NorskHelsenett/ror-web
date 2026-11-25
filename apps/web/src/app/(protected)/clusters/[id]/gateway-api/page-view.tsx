'use client'

import { useClusterContext } from '@/context/cluster-context'
import { Gateway, GatewayListener, GatewayResource, HTTPRouteResource } from '@/features/cluster/types/gateway-api'
import { cn } from '@/utils/clsxm'
import { ChevronDown, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

function getHostnames(routes: HTTPRouteResource[], gateways: GatewayResource[]): string[] {
  const hostnames = new Set<string>()

  for (const route of routes) {
    const own = route.httproute.spec.hostnames ?? []
    if (own.length > 0) {
      own.forEach((h) => hostnames.add(h))
      continue
    }

    for (const ref of route.httproute.spec.parentRefs ?? []) {
      const namespace = ref.namespace ?? route.metadata.namespace
      const gateway = gateways.find((g) => g.metadata.name === ref.name && g.metadata.namespace === namespace)

      gateway?.gateway.spec.listeners
        ?.filter((l) => !ref.sectionName || l.name === ref.sectionName)
        .forEach((l) => l.hostname && hostnames.add(l.hostname))
    }
  }

  return [...hostnames].sort()
}

function getClusterIssuer(resource: GatewayResource): { issuer: string | null; staging: boolean } {
  const issuer = resource.metadata.annotations?.['cert-manager.io/cluster-issuer'] ?? null
  return { issuer, staging: issuer ? issuer.toLowerCase().includes('staging') : false }
}

function getAllowedFrom(resource: GatewayResource): string[] {
  const raw = resource.metadata.annotations?.['securitypolicies.vitistack.io/lists']
  return raw
    ? raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []
}

function getRouteAllowedFrom(route: HTTPRouteResource): string[] {
  // ← add here
  const raw = route.metadata.annotations?.['securitypolicies.vitistack.io/lists']
  return raw
    ? raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []
}

function getNetworkZone(gateway: Gateway): { zone: string | null; ipFamily: string | null } {
  const annotations = gateway.spec.infrastructure?.annotations
  return {
    zone: annotations?.['ipam.vitistack.io/zone'] ?? null,
    ipFamily: annotations?.['ipam.vitistack.io/ip-family'] ?? null,
  }
}

function getRoutesWithListeners(
  routes: HTTPRouteResource[],
  gateway: GatewayResource
): { route: HTTPRouteResource; listeners: GatewayListener[] }[] {
  return routes.map((r) => {
    const listeners = gateway.gateway.spec.listeners.filter((l) =>
      r.httproute.spec.parentRefs?.some((ref) => !ref.sectionName || ref.sectionName === l.name)
    )
    return { route: r, listeners }
  })
}

const GatewayCard = ({
  resource,
  routes,
  defaultOpen = false,
}: {
  resource: GatewayResource
  routes: HTTPRouteResource[]
  defaultOpen?: boolean
}) => {
  const { metadata, gateway } = resource
  const [open, setOpen] = useState(defaultOpen)
  const address = gateway.status?.addresses?.map((a) => a.value).join(' - ') || '-'
  const { issuer, staging } = getClusterIssuer(resource)
  const allowedFrom = getAllowedFrom(resource)
  const { zone, ipFamily } = getNetworkZone(gateway)

  const [openRoutes, setOpenRoutes] = useState<Set<string>>(new Set())
  const toggleRoute = (key: string) =>
    setOpenRoutes((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  const routesWithListeners = getRoutesWithListeners(routes, resource)

  return (
    <div className='rounded-lg border bg-accent overflow-hidden'>
      <button
        type='button'
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className='flex w-full text-sm items-center gap-3 p-4 text-left hover:bg-accent/40'
      >
        <span className='text-lg font-bold min-w-40'>{metadata.name}</span>
        <ExposurePill gateway={gateway} />
        <ProgrammedPill gateway={gateway} />
        <span className='font-mono w-32'>{address}</span>
        <span className='w-16'>
          <b>{routes.length}</b> routes
        </span>
        <span>
          Class <b className='font-mono'>{gateway.spec.gatewayClassName}</b>
        </span>
        <span className='ml-auto flex items-center gap-4 '>
          <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
        </span>
      </button>

      {open && (
        <div className='border-t divide-y'>
          <div className='p-4 space-y-3 text-sm'>
            <div className='flex items-center'>
              <b className='w-40'>Cluster issuer</b>
              {issuer ? (
                <span className='font-mono'>{issuer}</span>
              ) : (
                <span className='text-muted-foreground italic'>No cluster-issuer annotation</span>
              )}
              {staging && (
                <span className='ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-900 text-amber-200'>
                  Staging issuer
                </span>
              )}
            </div>

            <div className='flex items-start'>
              <b className='w-40'>Allowed from</b>
              {allowedFrom.length > 0 ? (
                <div className='flex flex-col gap-2'>
                  {allowedFrom.map((name) => (
                    <div key={name} className='font-mono'>
                      {name}
                    </div>
                  ))}
                </div>
              ) : (
                <span className='text-muted-foreground italic'>No allowlist on the gateway - set per route</span>
              )}
            </div>

            <div className='flex items-center'>
              <b className='w-40'>Network zone</b>
              <span className='font-mono'>
                {zone ?? 'Unknown zone'}
                {ipFamily ? ` • ${ipFamily.toUpperCase()}` : ''}
              </span>
            </div>
          </div>

          <div className='p-4 grid grid-cols-[auto_auto_auto_auto_auto_auto_auto]'>
            <h4 className='text-xs text-muted-foreground mb-2 ml-4.75 col-span-3'>ROUTES</h4>
            <h4 className='text-xs text-muted-foreground mb-2 col-span-4'>LISTENERS</h4>
            {routesWithListeners.map((rwl) => {
              const key = rwl.route.metadata.uid ?? rwl.route.metadata.name
              const isOpen = openRoutes.has(key)
              const allowedFrom = getRouteAllowedFrom(rwl.route)
              return (
                <React.Fragment key={key}>
                  <button type='button' onClick={() => toggleRoute(key)} className='flex gap-1.5 font-bold text-left'>
                    {allowedFrom.length > 0 ? (
                      <ChevronRight className={cn('size-3.5 transition-transform mt-1.5', isOpen && 'rotate-90')} />
                    ) : (
                      <span className='size-3.5' />
                    )}
                    {rwl.route.metadata.name}
                  </button>
                  <span>
                    {rwl.route.httproute.spec.rules?.length ?? 0} rule
                    {(rwl.route.httproute.spec.rules?.length ?? 0) === 1 ? '' : 's'}
                  </span>
                  <span>
                    {rwl.route.httproute.spec.hostnames?.length ?? 0} hostname
                    {(rwl.route.httproute.spec.hostnames?.length ?? 0) === 1 ? '' : 's'}
                  </span>
                  <span>
                    {rwl.listeners.map((l, i) => (
                      <div key={i}>{l.name}</div>
                    ))}
                  </span>
                  <span>
                    {rwl.listeners.map((l, i) => (
                      <div key={i}>{l.hostname}</div>
                    ))}
                  </span>
                  <span>
                    {rwl.listeners.map((l, i) => (
                      <div key={i}>{l.protocol}</div>
                    ))}
                  </span>
                  <span>
                    {rwl.listeners.map((l, i) => (
                      <div key={i}>:{l.port}</div>
                    ))}
                  </span>
                  {isOpen && (
                    <div className='col-span-7 pl-5 pb-2 text-xs text-muted-foreground flex'>
                      <span className='mr-2 min-w-24'>Allowed from:</span>
                      {allowedFrom.length > 0 ? (
                        <span className='w-full grid grid-cols-4'>
                          {allowedFrom.map((name) => (
                            <span key={name} className='font-mono mx-2'>
                              {name}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className='italic'>No allowlist set on this route</span>
                      )}
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
const GatewaySummaryCard = ({ title, num, subtext }: { title: string; num: number; subtext?: string }) => (
  <div className='border rounded-lg w-full p-4 bg-accent'>
    <h3 className='text-base mb-2 '>{title}</h3>
    <div>
      <span className='text-4xl font-bold mr-4'>{num}</span>
      <span className='mb-px'>{subtext}</span>
    </div>
  </div>
)

const ExposurePill = ({ gateway }: { gateway: Gateway }) => {
  const zone = gateway.spec.infrastructure?.annotations?.['ipam.vitistack.io/zone'] ?? ''

  let exposure = 'Unknown exposure'
  if (zone.startsWith('hnet')) exposure = 'Helsenett'
  if (zone === 'inet') exposure = 'Internett'

  return (
    <span className='px-2 py-0.5 w-fit min-w-24 text-sm flex justify-center items-center rounded-full bg-blue-700 dark:bg-blue-800'>
      {exposure}
    </span>
  )
}

const ProgrammedPill = ({ gateway }: { gateway: Gateway }) => {
  const condition = gateway.status?.conditions?.find((c) => c.type === 'Programmed')
  if (condition) {
    return (
      <span className='px-4 py-0.5 w-fit text-sm flex justify-center items-center rounded-full bg-emerald-700 dark:bg-emerald-800'>
        Programmed
      </span>
    )
  } else {
    return (
      <span className='px-4 py-0.5 w-fit text-sm flex justify-center items-center rounded-full bg-red-700 dark:bg-red-800'>
        Not programmed
      </span>
    )
  }
}

/**
 * Renders the node pools page view for a specific cluster.
 *
 * Displays a list of node pools with their details, and allows users to create new node pools or edit existing ones.
 * Each node pool row can be expanded to show the nodes within the pool.
 *
 * @returns {JSX.Element} The rendered node pools page view.
 */
export function PageView() {
  const { cluster } = useClusterContext()

  const gatewayResources: GatewayResource[] = (cluster.gateways?.fieldValue ?? []) as unknown as GatewayResource[]
  const httpRouteResources: HTTPRouteResource[] = (cluster.httpRoutes?.fieldValue ??
    []) as unknown as HTTPRouteResource[]

  return (
    <div>
      <div className='flex gap-4 mb-6'>
        <GatewaySummaryCard title={'Gateways'} num={cluster.gateways?.fieldValue?.length || 0} />
        <GatewaySummaryCard title={'HTTP routes'} num={cluster.httpRoutes?.fieldValue?.length || 0} />
        <GatewaySummaryCard title={'Hostnames'} num={getHostnames(httpRouteResources, gatewayResources).length} />
      </div>
      <div className='flex flex-col gap-2'>
        {gatewayResources.map((g) => {
          const routes = httpRouteResources.filter((r) =>
            r.httproute.spec.parentRefs?.some(
              (ref) => ref.name === g.metadata.name && (ref.namespace ?? r.metadata.namespace) === g.metadata.namespace
            )
          )

          return <GatewayCard key={g.metadata.uid} resource={g} routes={routes} />
        })}
      </div>
    </div>
  )
}
