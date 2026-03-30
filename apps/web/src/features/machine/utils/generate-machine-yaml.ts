import type { CreateMachineForm } from '../types/create-machine'
import { convertToVitiMachineClass, renderTagsYaml } from '@/features/cluster/config/create-cluster-helpers'

const s = (v: unknown) => (v == null ? '' : String(v))

export const buildMachineYaml = (v: CreateMachineForm) => {
  const name = s(v.name)
  const machineClass = s(v.machineClass)
  const machineType = s(v.machineType)
  const size = s(v.size)
  const tags = v.tags ?? {}
  const tagsArray = Object.entries(tags).map(([key, value]) => ({ key, value }))

  const smallTemplate = `resources:
    cpu:
        cores: ${1}
        threads: ${1}
        sockets: ${1}
    memory: 
        size: "2Gi"
    disks:
    - name: "root"
        size: "20Gi"
        storageClass: "default"`

  const mediumTemplate = `resources:
    cpu:
        cores: ${2}
        threads: ${1}
        sockets: ${1}
    memory:
        size: "4Gi"
    disks:
    - name: "root"
        size: "40Gi"
        storageClass: "default"`

  const largeTemplate = `resources:
    cpu:
        cores: ${4}
        threads: ${1}
        sockets: ${1}
    memory:
        size: "8Gi"
    disks:
    - name: "root"
        size: "80Gi"
        storageClass: "default"`

  return `
    apiVersion: vitistack.io/v1alpha1
    kind: Machine
    metadata:
        name: ${name}
        namespace: 'workspace
        labels:
            cluster.vitistack.io/cluster-name: 'CLusterName'
            vitistack.io/machine-template: ${convertToVitiMachineClass(size)}
    spec:
        template: ${size}
        ${size === 'small' ? smallTemplate : size === 'medium' ? mediumTemplate : size === 'large' ? largeTemplate : ''}
            accessMode: "ReadWriteOnce"
            volumeMode: "Filesystem"
        networks:
        - name: "default"
            networkName: "default-network"
            model: "virtio"

        bootOrder: 
        - "disk"

        cloudInit:
            userData: |
            networkData: |
            secretRef:
                name: "secretName"
                key: "secretKey"

        domain:
            machine:
                type: "pc-i440fx"
            features:
                acpi: true
                apic: true
                hyperv: true
            firmware:
            bootloader:
                efi: true
                secureBoot: false
        ${renderTagsYaml(tagsArray)}

    status:
        phase: "Succeeded"
        conditions: "ListConditions"
        vmName: ${name}
        vmiName: ${name}-vmi
        ipAddress: "4523423523423"
        nodeName: "nodeName"
        lastUpdated: "2023-10-01T12:00:00Z"
        resourceVersion: "123456789"
`.trim()
}
