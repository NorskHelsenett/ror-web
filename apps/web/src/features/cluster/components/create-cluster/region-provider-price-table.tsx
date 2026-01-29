import { Fragment } from 'react'
import { Button } from '@/components/shadcn/button'
import { errorTextStyling, tableBoldText } from '@/features/cluster/config/create-cluster-styling'
import { priceForCluster, table2DisplayCondition } from '@/features/cluster/config/create-cluster-helpers'
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form'
import { CreateClusterForm, Provider, Region } from '@/features/cluster/types/create-cluster'
import { useRppValues } from '@/features/cluster/hooks/use-rpp-values'
import { options } from '@/features/cluster/config/create-cluster-values'
import { cn } from '@/utils/clsxm'
import { Check } from 'lucide-react'

type Props = {
  control: Control<CreateClusterForm>
  setValue: UseFormSetValue<CreateClusterForm>
}

export function RegionProviderPriceTable({ control, setValue }: Props) {
  const { tempProvider, tempRegion, provider, region, wpClass, wpNumber, cp } = useRppValues(control)
  const { errors } = useFormState({ control })

  const choose = (p: Provider, r: Region) => {
    setValue('provider', p, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    setValue('region', r, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }

  return (
    <div className='w-full sm:w-lg'>
      <p className='mb-2'>
        Price is calculated for 3 control planes, 3 workers and the machine class best-effort-medium
      </p>
      <div className={cn('w-full overflow-hidden rounded-lg border sm:w-lg')}>
        <table className='w-full table-fixed'>
          <thead>
            <tr className='border-b'>
              <th className='border-r py-2 w-16'>Option</th>
              <th className={cn('border-r py-2 w-14')}>Price</th>
              <th className='w-8'>Pick</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option, key) => {
              if (!table2DisplayCondition(option.provider, option.region, tempProvider, tempRegion)) return null

              const isChosen = provider === option.provider && region === option.region

              return (
                <Fragment key={key}>
                  <tr className='border-b last:border-b-0'>
                    <th className={cn(tableBoldText, 'w-16 border-r')}>
                      {option.provider} - {option.region}
                    </th>

                    <td className={cn('border-r text-center p-2 w-14')}>
                      {priceForCluster(option.provider, wpClass, wpNumber, cp)}
                    </td>

                    <td className='text-center p-2 w-8'>
                      {isChosen ? (
                        <span className='p-1 border rounded-md border-emerald-500 dark:border-emerald-600 text-sm'>
                          <Check />
                        </span>
                      ) : (
                        <Button
                          type='button'
                          aria-label={`Choose ${option.provider} - ${option.region}`}
                          onClick={() => choose(option.provider, option.region)}
                        >
                          <span className={cn('hidden', 'sm:block')}>Choose</span>
                        </Button>
                      )}
                    </td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      <Controller
        name='provider'
        control={control}
        rules={{ required: 'Provider is required' }}
        render={({ field }) => <input type='hidden' {...field} />}
      />

      <Controller
        name='region'
        control={control}
        rules={{ required: 'Region is required' }}
        render={({ field }) => <input type='hidden' {...field} />}
      />

      {(errors.provider || errors.region) && (
        <div className='mt-2'>
          {errors.provider && <p className={errorTextStyling}>{errors.provider.message as string}</p>}
          {errors.region && <p className={errorTextStyling}>{errors.region.message as string}</p>}
        </div>
      )}
    </div>
  )
}
