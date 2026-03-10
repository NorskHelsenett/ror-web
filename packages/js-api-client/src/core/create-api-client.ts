import type { ApiClientConfig } from '../types/config'
import { generateRequest } from './request'
import { createKubernetesClusterService } from '../services/kubernetes-cluster'
import { createNodesService } from '../services/nodes'
import { createUsersService } from '../services/users'
import { createIngressesService } from '../services/ingresses'
import { createPodsService } from '../services/pods'
import { createConfigurationService } from '../services/configurations'
import { createDeploymentService } from '../services/deployments'
import { createServiceService } from '../services/services'
import { createVulnerabilityReportService } from '../services/vulnerability-reports'
import { createDaemonSetService } from '../services/deamon-sets'
import { createReplicaSetService } from '../services/replica-sets'
import { createPriceService } from '../services/prices'
import { createDatacentersService } from '../services/datacenters'
import { createVirtualMachineService } from '../services/vm'
import { createBackupJobService } from '../services/backup-job'
import { createBackupRunService } from '../services/backup-run'
import { createProjectService } from '../services/projects'
import { createVirtualMachineVulnerabilityService as createVirtualMachineVulnerabilityInfoService } from '../services/vm-vulnerability-info'
import { createAclService } from '../services/acls'
import { createApiKeyService } from '../services/api-keys'

function setDefaultHeaders(config: ApiClientConfig): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.accessToken}`,
    ...config.headers,
  }
}

export function createApiClient(config: ApiClientConfig) {
  /**
   * Setup default configuration
   */
  const defaultConfig: ApiClientConfig = {
    ...config,
    headers: setDefaultHeaders(config),
  }

  /**
   * Generate a request function that we can use to setup our different services
   * This is our core function that handles the request and response lifecycle
   */
  const request = generateRequest(defaultConfig)

  /**
   * Create our different services
   */
  const services = {
    acl: createAclService(request),
    apiKey: createApiKeyService(request),
    configuration: createConfigurationService(request),
    daemonSet: createDaemonSetService(request),
    datacenter: createDatacentersService(request),
    deployment: createDeploymentService(request),
    ingresses: createIngressesService(request),
    kubernetesClusters: createKubernetesClusterService(request),
    nodes: createNodesService(request),
    pods: createPodsService(request),
    prices: createPriceService(request),
    projects: createProjectService(request),
    replicaSet: createReplicaSetService(request),
    service: createServiceService(request),
    users: createUsersService(request),
    vulnerabilityReport: createVulnerabilityReportService(request),
    virtualMachine: createVirtualMachineService(request),
    virtualMachineVulnerabilityInfo: createVirtualMachineVulnerabilityInfoService(request),
    backupJob: createBackupJobService(request),
    backupRun: createBackupRunService(request),
  }

  return services
}
