import { useForm } from 'react-hook-form'
import type { CreateClusterForm } from '../types/create-cluster'

export function useCreateClusterForm(orderer: string) {
  return useForm<CreateClusterForm>({
    defaultValues: {
      orderer,
      name: '',
      project: '',
      namespace: '',
      environment: '',
      serviceId: '',
      serialNumber: '',
      fullname: '',
      clusterId: '',
      techRepUpn: '',
      techRepEmail: '',
      techRepPhone: '',
      slackChannels: '',
      accessGroups: '',
      team: '',
      sensitivity: '',
      criticality: '',
      lcm: 'dag',
      cp: 3,
      wpName: '',
      numOfNodes: 1,
      wpNumber: 1,
      highAvailability: false,
      machineClass: '',
      wpClass: '',
      tags: [],
      region: 'east',
      other: '',
    },
  })
}
