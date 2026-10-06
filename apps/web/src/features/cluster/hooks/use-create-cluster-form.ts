import { useForm } from 'react-hook-form'
import type { CreateClusterForm } from '../types/create-cluster'

export function useCreateClusterForm() {
  return useForm<CreateClusterForm>({
    defaultValues: {
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
      lcm: 'Dag (i arbeidstid, kl 0800 - 1600)',
      cp: 3,
      wpName: '',
      numOfNodes: 1,
      wpNumber: 1,
      highAvailability: false,
      machineClass: '',
      wpClass: '',
      tags: [],
      region: '',
      other: '',
    },
  })
}
