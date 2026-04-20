import { MachineCPU, MachineSpecDisk, MachineNetwork, NetworkInterface } from './machines'

interface SizeTemplate {
  cpu: MachineCPU
  memory: number // bytes
  disks: MachineSpecDisk[]
}

// interface NetworkTemplate {
//     networkNamespaceName: string
//     vpc: string
//     subnet: string
//     assignPublicIP: boolean
//     privateIP: string
//     publicIP: string
//     interfaces: NetworkInterfaceTemplate[]
// }

// interface NetworkInterfaceTemplate {
//     name: string
//     subnet: string
//     securityGroups: string[]
//     primary: boolean
// }

export const sizeTemplates: Record<string, SizeTemplate> = {
  small: {
    cpu: { cores: 1, threadsPerCore: 1, sockets: 1 },
    memory: 2147483648, // 2Gi
    disks: [
      {
        name: 'root',
        sizeGB: 20,
        type: 'standard',
        boot: true,
        device: 'dev/sda',
        encrypted: false,
        iops: 100,
        throughput: 125,
      },
    ],
  },
  medium: {
    cpu: { cores: 2, threadsPerCore: 1, sockets: 1 },
    memory: 4294967296, // 4Gi
    disks: [
      {
        name: 'root',
        sizeGB: 40,
        type: 'standard',
        boot: true,
        device: 'dev/sda',
        encrypted: false,
        iops: 100,
        throughput: 125,
      },
    ],
  },
  large: {
    cpu: { cores: 4, threadsPerCore: 1, sockets: 1 },
    memory: 8589934592, // 8Gi
    disks: [
      {
        name: 'root',
        sizeGB: 80,
        type: 'standard',
        boot: true,
        device: 'dev/sda',
        encrypted: false,
        iops: 100,
        throughput: 125,
      },
    ],
  },
}

export const networkInterfaceTemplates: Record<string, NetworkInterface> = {
  default: {
    name: 'primary',
    subnet: 'default', //burde hentes fra networkTemplates.default.subnet
    securityGroups: ['machinespecGroups'], //hentes fra machineSpec securityGroups??
    primary: true,
  },
}

export const networkTemplates: Record<string, MachineNetwork> = {
  default: {
    networkNamespaceName: 'default',
    vpc: 'default', //burde hentes fra networkNamespaceName
    subnet: 'default', //burde hentes fra networkNamespaceName
    assignPublicIP: false,
    privateIP: '', //som regel tom
    publicIP: '', //som regel tom
    interfaces: [networkInterfaceTemplates.default],
  },
  empty: {
    networkNamespaceName: '',
    vpc: '',
    subnet: '',
    assignPublicIP: false,
    privateIP: '',
    publicIP: '',
    interfaces: [],
  },
}

export const buildMachineSpec = (form: import('../types/create-machine').CreateMachineForm) => {
  const sizeTemplate = sizeTemplates[form.size]
  const networkTemplate = networkTemplates[form.network === 'default' ? 'default' : 'empty'] //hvis form.network er 'default', bruk networkTemplates.default, ellers fallback til empty
  return {
    name: form.name,
    machineClass: form.machineClass,
    machineType: form.machineType,
    cpu: sizeTemplate.cpu,
    memory: sizeTemplate.memory,
    disks: sizeTemplate.disks,
    network: networkTemplate,
    os: form.os,
    provider: form.provider,
    providerConfig: form.providerConfig,
    sshKeys: form.sshKeys ?? [],
    userData: form.userData,
    tags: {
      ...(form.tags ?? {}),
      ...(form.serviceId ? { serviceId: form.serviceId } : {}),
      ...(form.environment ? { environment: form.environment } : {}),
    },
    securityGroups: form.securityGroups ?? [],
    monitoring: form.monitoring ?? false,
    backup: form.backup,
    cloudInit: form.cloudInit,
  }
}
