import { useForm } from 'react-hook-form'
import { CreateVmForm } from '../types/create-vm'

export const useCreateVmForm = () => {
  return useForm<CreateVmForm>({
    defaultValues: {
      name: '',
      project: '',
      workspace: '',
      region: '',
      serviceId: '',
      size: 0,
      image: '',
      extensions: {},
      securityBaseline: {},
      osConfig: {},
      tags: {},
    },
  })
}
