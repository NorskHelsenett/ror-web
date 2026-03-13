import { useForm } from 'react-hook-form'
import { CreateVmForm } from '../types/create-vm'

export const useCreateVmForm = () => {
  return useForm<CreateVmForm>({
    defaultValues: {
      name: '',
      project: '',
      workspace: '',
      provider: 'Vsphere',
      region: 'trondheim',
      datacenter: 'trd1',
      serviceId: 'example-id',
      size: 'small',
      image: '',
      extensions: {},
      securityBaseline: {},
      osConfig: {},
      tags: {},
    },
  })
}
