import { http, HttpResponse } from 'msw'
import nodes from '../data/nodes'
import { ingressesResponse } from '../data/ingresses'
import { clustersVersion2 } from '../data/clusters'
import datacenters from '../data/datacenters'
import { vulnerabilityReports } from '../data/vulnerability-reports'
import { mockVms } from '../data/vms'
import { mockBackupJobs } from '../data/backup-job'
import { mockBackupRuns } from '../data/backup-run'

type Resource = (typeof clustersVersion2.resources)[number]
type NotFound = { message: string }
type ResourceVm = (typeof mockVms.resources)[number]

/**
 * Define mock handlers for v2 resource-related endpoints
 */
export const v2ResourcesHandlers = [
  // Handle GET requests to /v2/resources with optional ?kind= query param
  http.get('http://localhost:10000/v2/resources', ({ request }) => {
    // Parse the URL from the incoming request
    const url = new URL(request.url)

    // Extract the 'kind' query parameter (e.g., 'KubernetesCluster', 'Node', 'Ingress')
    const kind = url.searchParams.get('kind')

    // Return mock data based on the requested kind
    switch (kind) {
      case 'KubernetesCluster': {
        const limit = Number(url.searchParams.get('limit') || 50)
        const offset = Number(url.searchParams.get('offset') || 0)
        const allClusters = clustersVersion2.resources
        return HttpResponse.json({ resources: allClusters.slice(offset, offset + limit) })
      }
      case 'Node':
        return HttpResponse.json(nodes) // Return all node data
      case 'Ingress':
        return HttpResponse.json(ingressesResponse) // Return all ingress data
      case 'Datacenter':
        return HttpResponse.json(datacenters) // Return all datacenter data
      case 'VulnerabilityReport':
        return HttpResponse.json(vulnerabilityReports) // Return all vulnerability report data
      case 'VirtualMachine': {
        const limit = Number(url.searchParams.get('limit') || 50)
        const offset = Number(url.searchParams.get('offset') || 0)
        const allVMs = mockVms.resources
        return HttpResponse.json({ resources: allVMs.slice(offset, offset + limit) })
      }
      case 'BackupJob': {
        const limit = Number(url.searchParams.get('limit') || 50)
        const offset = Number(url.searchParams.get('offset') || 0)
        const allBackupJobs = mockBackupJobs.resources
        return HttpResponse.json({ resources: allBackupJobs.slice(offset, offset + limit) })
      }
      case 'BackupRun': {
        const limit = Number(url.searchParams.get('limit') || 50)
        const offset = Number(url.searchParams.get('offset') || 0)
        const allBackupRuns = mockBackupRuns.resources
        return HttpResponse.json({ resources: allBackupRuns.slice(offset, offset + limit) })
      }
      default:
        return HttpResponse.json(null) // If unknown kind, return null
    }
  }),

  // Handle GET requests to /v2/resources/uid/:id to fetch a resource by unique ID
  http.get('http://localhost:10000/v2/resources/uid/:id', ({ params }) => {
    const { id } = params // Extract the resource ID from the URL

    // Find a cluster resource with the matching clusterId
    const cluster = clustersVersion2.resources.find(
      (res) => res.kind === 'KubernetesCluster' && res.kubernetescluster?.spec?.data.clusterId === id
    )

    // Return 404 if not found
    if (!cluster) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    // Return the found cluster resource
    return HttpResponse.json(cluster)
  }),

  http.put<{ id: string }, Resource | NotFound, Resource | NotFound>(
    'http://localhost:10000/v2/resources/uid/:id',
    async ({ params, request }) => {
      const { id } = params
      const updated = (await request.json()) as Resource

      const i = clustersVersion2.resources.findIndex(
        (res) => res.kind === 'KubernetesCluster' && res.kubernetescluster?.spec?.data?.clusterId === id
      )
      if (i === -1) {
        return HttpResponse.json<NotFound>({ message: 'Not found' }, { status: 404 })
      }

      clustersVersion2.resources[i] = updated
      return HttpResponse.json<Resource>(updated, { status: 200 })
    }
  ),
]
