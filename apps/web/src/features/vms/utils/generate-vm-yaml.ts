import type { CreateVmForm } from '../types/create-vm'
import { convertToVitiMachineClass, renderTagsYaml } from '@/features/cluster/config/create-cluster-helpers'

const s = (v: unknown) => (v == null ? '' : String(v))

export function buildVmYaml(v: CreateVmForm) {
  const name = s(v.name)
  const project = s(v.project)
  const workspace = s(v.workspace)
  const region = s(v.region)
  const serviceId = s(v.serviceId)
  const size = s(v.size)
  const image = s(v.image)
  const extensions = v.extensions ?? {}
  const securityBaseline = v.securityBaseline ?? {}
  const osConfig = v.osConfig ?? {}
  const tags = v.tags ?? {}

  // Convert extensions, securityBaseline, and osConfig to arrays for YAML output
  const extensionsList = Object.keys(extensions)
  const securityBaselineList = Object.keys(securityBaseline)
  const osConfigList = Object.keys(osConfig)

  return `
    apiVersion: vitistack.io/v1alpha1
    kind: Machine
    metadata:
    name: ${name}
    namespace: ${workspace}
    labels:
        cluster.vitistack.io/cluster-name: ${project}
        vitistack.io/machine-template: ${convertToVitiMachineClass(size)}
        vitistack.io/service-id: ${serviceId} ---check
        vitistack.io/region: ${region} ---check
    spec:
    template: ${convertToVitiMachineClass(size)} ---check

    resources:
        cpu: ---check
            cores: ${2}
            threads: ${2}
            sockets: ${1}
        memory:
            size: "${size}Gi" ---check

    disks:
    - name: "primary-disk"
        size: "${size}Gi"
        storageClass: "fast-ssd"
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
            type: "${image === 'windows9Server64Guest' ? 'pc-q35' : 'pc-i440fx'}"
        features:
            acpi: true
            apic: true
            hyperv: true
        firmware:
        bootloader:
            efi: true
            secureBoot: false

    status:
        phase: "Succeeded"
        conditions: "ListConditions" --check
        vmName: ${name}
        vmiName: ${name}-vmi
        ipAddress: "4523423523423"
        nodeName: "nodeName"
        lastUpdated: "2023-10-01T12:00:00Z"
        resourceVersion: "123456789"
`.trim()
}
