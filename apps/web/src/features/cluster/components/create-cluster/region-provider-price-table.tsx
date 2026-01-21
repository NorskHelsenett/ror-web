import { Fragment } from 'react'
import { Button } from '@/components/shadcn/button'
import { errorTextStyling, outerTableStyling, tableBoldText } from '@/features/cluster/config/create-cluster-styling'
import {
  priceForCluster,
  table2DisplayCondition,
  tableClusterPriceDescription,
} from '@/features/cluster/config/create-cluster-helpers'
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form'
import { CreateClusterForm, Provider, Region } from '@/features/cluster/types/create-cluster'
import { useRppValues } from '@/features/cluster/hooks/use-rpp-values'
import { options } from '@/features/cluster/config/create-cluster-values'

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
    <div className='w-2xl'>
      <table className={outerTableStyling}>
        <tbody>
          {options.map((option, key) => {
            if (!table2DisplayCondition(option.provider, option.region, tempProvider, tempRegion)) return null

            const isChosen = provider === option.provider && region === option.region

            return (
              <Fragment key={key}>
                <tr>
                  <td className={tableBoldText}>
                    {option.provider} - {option.region}
                  </td>

                  <td rowSpan={2} className='border border-gray-300 text-right p-2 min-w-44'>
                    {wpClass}
                    <br />
                    {priceForCluster(option.provider, wpClass, wpNumber, cp)}
                  </td>

                  <td rowSpan={2} className='border border-gray-300 text-center p-2 min-w-28'>
                    {isChosen ? (
                      <span className='px-3 py-2 border rounded-md border-emerald-500 dark:border-emerald-600 text-sm'>
                        Chosen
                      </span>
                    ) : (
                      <Button type='button' onClick={() => choose(option.provider, option.region)}>
                        Choose
                      </Button>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className='p-2 min-w-60'>{tableClusterPriceDescription(cp, wpNumber)}</td>
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </table>

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
