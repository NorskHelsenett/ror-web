import { http, HttpResponse } from 'msw'
import nodes from '../data/nodes'
import { ingressesResponse } from '../data/ingresses'
import { clustersVersion2 } from '../data/clusters'
import datacenters from '../data/datacenters'
import { vulnerabilityReports } from '../data/vulnerability-reports'
import { mockVms } from '../data/vms'
import { mockVmVulnerabilityInfo } from '../data/vms-vulnerability-info'
import { mockBackupJobs } from '../data/backup-job'
import { mockBackupRuns } from '../data/backup-run'

type Resource = (typeof clustersVersion2.resources)[number]
type NotFound = { message: string }
type ResourceVm = (typeof mockVms.resources)[number]
type ResourceBackupJob = (typeof mockBackupJobs.resources)[number]
type ResourceBackupRun = (typeof mockBackupRuns.resources)[number]

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

    const ownerSubject = url.searchParams.get('ownerSubject')

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
        const filtersParam = url.searchParams.get('filters')
        let filteredVMs = mockVms.resources as ResourceVm[]

        const getVmFieldValue = (vm: ResourceVm, field: string): string | undefined => {
          switch (field) {
            case 'virtualmachine.spec.name':
              return vm.virtualmachine?.spec?.name ?? ''
            case 'virtualmachine.provider':
              return vm.virtualmachine?.provider ?? ''
            case 'virtualmachine.status.tags.team.value':
              return vm.virtualmachine?.status?.tags?.team?.value ?? ''
            case 'virtualmachine.status.tags.team.description':
              return vm.virtualmachine?.status?.tags?.team?.description ?? ''
            case 'virtualmachine.status.tags.serviceId.value':
            case 'virtualmachine.status.tags.service-id.value':
              return vm.virtualmachine?.status?.tags?.serviceId?.value ?? ''
            case 'virtualmachine.status.tags.serviceId.description':
            case 'virtualmachine.status.tags.service-id.description':
              return vm.virtualmachine?.status?.tags?.serviceId?.description ?? ''
            default:
              return undefined
          }
        }

        if (filtersParam) {
          try {
            const filters = JSON.parse(filtersParam) as {
              field: string
              value: string
              type: string
              operator: string
            }[]

            for (const filter of filters) {
              if (filter.operator !== 'regexp') continue

              const regex = new RegExp(filter.value, 'i')
              filteredVMs = filteredVMs.filter((vm) => {
                const fieldValue = getVmFieldValue(vm, filter.field)
                if (fieldValue === undefined) return true
                return regex.test(fieldValue)
              })
            }
          } catch {
            // Ignore malformed filters
          }
        }

        return HttpResponse.json({ resources: filteredVMs.slice(offset, offset + limit) })
      }
      case 'VirtualMachineVulnerabilityInfo': {
        let resources = mockVmVulnerabilityInfo.resources

        if (ownerSubject) {
          resources = resources.filter((resource) => resource.rormeta?.ownerref?.subject === ownerSubject)
        }

        return HttpResponse.json({ resources })
      }
      case 'BackupJob': {
        const limit = Number(url.searchParams.get('limit') || 50)
        const offset = Number(url.searchParams.get('offset') || 0)
        const filtersParam = url.searchParams.get('filters')
        let filteredBackupJobs = mockBackupJobs.resources as ResourceBackupJob[]
        //const allBackupJobs = mockBackupJobs.resources

        if (filtersParam) {
          try {
            const filters = JSON.parse(filtersParam) as {
              field: string
              value: string
              type: string
              operator: string
            }[]

            const idFields = new Set(['backupjob.id', 'vm.backupjob.id'])
            const nameFields = new Set([
              'backupjob.status.resourceBackupJobSpec.name',
              'vm.backupjob.status.resourceBackupJobSpec.name',
              'backupjob.name',
              'vm.backupjob.name',
            ])

            const idRegexes: RegExp[] = []
            const nameRegexes: RegExp[] = []

            for (const filter of filters) {
              if (filter.operator !== 'regexp') continue

              const regex = new RegExp(filter.value, 'i')
              if (idFields.has(filter.field)) idRegexes.push(regex)
              if (nameFields.has(filter.field)) nameRegexes.push(regex)
            }

            if (idRegexes.length > 0 || nameRegexes.length > 0) {
              filteredBackupJobs = filteredBackupJobs.filter((backupjob) => {
                const id = backupjob?.backupjob?.id ?? ''
                const name = backupjob?.backupjob?.status?.resourceBackupJobSpec?.name ?? ''

                const matchesId = idRegexes.some((regex) => regex.test(id))
                const matchesName = nameRegexes.some((regex) => regex.test(name))

                return matchesId || matchesName
              })
            }
          } catch {
            // Ignore malformed filters
          }
        }

        return HttpResponse.json({ resources: filteredBackupJobs.slice(offset, offset + limit) })
      }
      case 'BackupRun': {
        const limit = Number(url.searchParams.get('limit') || 50)
        const offset = Number(url.searchParams.get('offset') || 0)
        const filtersParam = url.searchParams.get('filters')
        let filteredBackupRuns = mockBackupRuns.resources as ResourceBackupRun[]

        if (filtersParam) {
          try {
            const filters = JSON.parse(filtersParam) as {
              field: string
              value: string
              type: string
              operator: string
            }[]

            const idFields = new Set(['backuprun.id', 'vm.backuprun.id'])
            const sourceFields = new Set(['backuprun.source', 'vm.backuprun.source'])
            const backupJobIdFields = new Set(['backuprun.status.backupJobId', 'vm.backuprun.status.backupJobId'])

            const idRegexes: RegExp[] = []
            const sourceRegexes: RegExp[] = []
            const backupJobIdRegexes: RegExp[] = []

            for (const filter of filters) {
              if (filter.operator !== 'regexp') continue

              const regex = new RegExp(filter.value, 'i')
              if (idFields.has(filter.field)) idRegexes.push(regex)
              if (sourceFields.has(filter.field)) sourceRegexes.push(regex)
              if (backupJobIdFields.has(filter.field)) backupJobIdRegexes.push(regex)
            }

            if (idRegexes.length > 0 || sourceRegexes.length > 0 || backupJobIdRegexes.length > 0) {
              filteredBackupRuns = filteredBackupRuns.filter((backupRun) => {
                const id = backupRun?.backuprun?.id ?? ''
                const source = backupRun?.backuprun?.source ?? ''
                const backupJobId = backupRun?.backuprun?.status?.backupJobId ?? ''

                const matchesId = idRegexes.some((regex) => regex.test(id))
                const matchesSource = sourceRegexes.some((regex) => regex.test(source))
                const matchesBackupJobId = backupJobIdRegexes.some((regex) => regex.test(backupJobId))

                return matchesId || matchesSource || matchesBackupJobId
              })
            }
          } catch {
            // Ignore malformed filters
          }
        }

        //const allBackupRuns = mockBackupRuns.resources
        return HttpResponse.json({ resources: filteredBackupRuns.slice(offset, offset + limit) })
      }

      default:
        return HttpResponse.json({ message: 'Kind not supported in mock' }, { status: 400 })
    }
  }),
  // Handle GET requests to /v2/resources/uid/:id to fetch a resource by unique ID
  http.get('http://localhost:10000/v2/resources/uid/:id', ({ params }) => {
    const { id } = params // Extract the resource ID from the URL

    // Find a cluster resource with the matching clusterId
    const cluster = clustersVersion2.resources.find(
      (res) => res.kind === 'KubernetesCluster' && res.metadata.uid === id
    )

    const clusterInArray = []
    clusterInArray.push(cluster)

    // Return 404 if not found
    if (!clusterInArray) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    // Return the found cluster resource
    return HttpResponse.json(clusterInArray)
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
