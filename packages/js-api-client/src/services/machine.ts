import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { ResourceMachineResponseSchema } from '../schemas/machine'

export interface CloudInitConfigMapRef {
  name: string
  key?: string
}
export interface CloudInitSecretRef {
  name: string
  key?: string
}
export interface CloudInitConfig {
  type?: string
  userData?: string
  userDataBase64?: string
  networkData?: string
  networkDataBase64?: string
  userDataSecretRef?: CloudInitSecretRef
  networkDataSecretRef?: CloudInitSecretRef
  userDataConfigMapRef?: CloudInitConfigMapRef
  networkDataConfigMapRef?: CloudInitConfigMapRef
}
export interface MachineBackup {
  enabled?: boolean
  schedule?: string
  retentionDays?: number
}
export interface CredentialsReference {
  secretName?: string
  namespace?: string
}
export interface CloudProviderConfig {
  name?: string
  region?: string
  zone?: string
  config?: { [key: string]: string }
  credentialsRef?: CredentialsReference
}
export interface MachineOS {
  family?: string
  distribution?: string
  version?: string
  architecture?: string
  imageID?: string
  isoUri?: string
  imageFamily?: string
}
export interface NetworkInterface {
  name?: string
  subnet?: string
  securityGroups?: string[]
  primary?: boolean
}
export interface MachineNetwork {
  networkNamespaceName?: string
  vpc?: string
  subnet?: string
  assignPublicIP?: boolean
  privateIP?: string
  publicIP?: string
  interfaces?: NetworkInterface[]
}
export interface MachineSpecDisk {
  name?: string
  sizeGB?: number
  type?: string
  boot?: boolean
  device?: string
  encrypted?: boolean
  iops?: number
  throughput?: number
}
export interface MachineCPU {
  cores?: number
  threadsPerCore?: number
  sockets?: number
}
export interface MachineSpec {
  name?: string
  machineClass?: string
  machineType?: string
  cpu?: MachineCPU
  memory?: number
  disks?: MachineSpecDisk[]
  network?: MachineNetwork
  os?: MachineOS
  provider?: string
  providerConfig?: CloudProviderConfig
  sshKeys?: string[]
  userData?: string
  tags?: { [key: string]: string }
  securityGroups?: string[]
  monitoring?: boolean
  backup?: MachineBackup
  cloudInit?: CloudInitConfig
}

export const createMachineService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'machine.ror.internal/v1alpha1')
    params.set('kind', 'Machine')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, ResourceMachineResponseSchema)
  },
  createMachine: async (machineSpec: MachineSpec) => {},
})
