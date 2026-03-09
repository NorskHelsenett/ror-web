import { useState } from 'react'
import { RegionProviderPriceTable } from './region-provider-price-table'
import { useRppValues } from '../../hooks/use-rpp-values'
import { optionsAzure, optionsTalos, optionsTanzu, regions, providers } from '../../config/create-cluster-values'
import { flexGap4 } from '../../config/create-cluster-styling'
import { ProviderRow, RegionProviderMatrixTable } from './region-provider-matrix-table'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/select'
import { CreateClusterForm } from '../../types/create-cluster'
import { cn } from '@/utils/clsxm'

type RPPProps = {
  control: Control<CreateClusterForm>
  setValue: UseFormSetValue<CreateClusterForm>
}

export const RegionProviderPriceSection = ({ control, setValue }: RPPProps) => {
  const [hoverRow, setHoverRow] = useState<number | null>(null)
  const [hoverCol, setHoverCol] = useState<number | null>(null)

  const { tempProvider, tempRegion } = useRppValues(control)

  const rows: ProviderRow[] = [
    { label: 'Talos', providerKey: 'talos', rowIndex: 1, options: optionsTalos },
    { label: 'Tanzu', providerKey: 'tanzu', rowIndex: 2, options: optionsTanzu },
    { label: 'Azure', providerKey: 'azure', rowIndex: 3, options: optionsAzure },
  ]

  return (
    <div className={flexGap4}>
      <h2 className={cn('text-3xl', 'sm:text-3xl', 'md:text-5xl')}>Region, Provider &amp; Price</h2>

      <div className={cn('hidden', 'sm:flex sm:flex-row sm:gap-2')}>
        <Controller
          name='tempProvider'
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select provider'}</SelectTrigger>
              <SelectContent>
                {providers.map((p) => (
                  <SelectItem key={p.key} value={p.key}>
                    {p.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name='tempRegion'
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select region'}</SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r.key} value={r.key}>
                    {r.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <RegionProviderMatrixTable
        regions={regions}
        tempRegion={tempRegion}
        tempProvider={tempProvider}
        setTempRegion={(r) => setValue('tempRegion', r)}
        setTempProvider={(p) => setValue('tempProvider', p)}
        rows={rows}
        hoverRow={hoverRow}
        hoverCol={hoverCol}
        setHoverRow={setHoverRow}
        setHoverCol={setHoverCol}
      />

      <RegionProviderPriceTable control={control} setValue={setValue} />
    </div>
  )
}
