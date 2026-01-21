import { Control, useWatch } from 'react-hook-form'
import { CreateClusterForm } from '../types/create-cluster'

export const useRppValues = (control: Control<CreateClusterForm>) => {
  const [tempProvider, tempRegion, provider, region, wpClass, wpNumber, cp] = useWatch({
    control,
    name: ['tempProvider', 'tempRegion', 'provider', 'region', 'wpClass', 'wpNumber', 'cp'],
  })
  return { tempProvider, tempRegion, provider, region, wpClass, wpNumber, cp }
}
