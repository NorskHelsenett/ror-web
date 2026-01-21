import { useForm } from 'react-hook-form'
import type { CreateClusterForm } from '../types/create-cluster'

export function useCreateClusterForm() {
  return useForm<CreateClusterForm>({
    defaultValues: {
      tags: {},
      tempProvider: '',
      tempRegion: '',
      provider: '',
      region: '',
      wpClass: 'best-effort-medium',
      cp: 3,
      wpNumber: 3,
    },
  })
}
