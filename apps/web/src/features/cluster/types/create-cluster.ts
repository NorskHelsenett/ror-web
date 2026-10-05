export interface CreateClusterForm {
  name: string
  project: string
  namespace: string
  environment: string
  serviceId: string
  serialNumber: string
  fullname: string
  clusterId: string
  techRepUpn: string
  techRepEmail: string
  techRepPhone: string
  slackChannels: string
  accessGroups: string
  team: string
  sensitivity: string
  criticality: string
  lcm: 'Dag (i arbeidstid, kl 0800 - 1600)' | 'Kveld (utenfor arbeidstid, kl 1600 - 2359)'
  cp: number
  wpName: string
  numOfNodes: number
  wpNumber: number
  highAvailability: boolean
  machineClass: string
  wpClass: string
  tags: { key: string; value: string }[]
  region: Region
  other: string
}

export type Region = '' | 'east' | 'west' | 'central'

export interface FormSectionProps {
  error?: string
  children: React.ReactNode
  description?: string
  className?: string
}
