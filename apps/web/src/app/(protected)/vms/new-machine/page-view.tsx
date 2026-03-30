'use client'

import { CreateMachineForm } from '@/features/machine/types/create-machine'
import { useCreateMachineForm } from '@/features/machine/hooks/use-create-machine-form'
import { Form } from '@/components/shadcn/form'
import { Controller, Path } from 'react-hook-form'
import { FormSection } from '@/features/cluster/components/create-cluster/form-section'
import { useCallback, useMemo, useState } from 'react'
import { addTag, removeTag } from '@/features/cluster/utils/tags'
import { toast } from 'sonner'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

import { routes } from '@/config/routes'
import { buildMachineYaml } from '@/features/machine/utils/generate-machine-yaml'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/shadcn/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import { TagsSection } from '@/features/cluster/components/create-cluster/tags-section'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/select'
import { sizes } from '@/features/vms/config/create-vm-values'
import { cn } from '@/utils/clsxm'
import { CodeSnippet } from '@/components/ui/code-snippet'
import { Button } from '@/components/shadcn/button'
import { WizardContentType } from '@/types/wizard-content-type'
import { Wizard } from '@/components/ui/wizard'
import { buildMachineSpec } from '@/features/machine/utils/input-helper'
import { persistMockCreatedMachine } from '@/features/machine/services/mock-machine-storage'

const stepFields: Array<Array<Path<CreateMachineForm>>> = [
  ['name', 'machineClass', 'machineType'],
  ['size'],
  ['network'],
  [],
  [],
]

export const PageView = () => {
  const [tagKey, setTagKey] = useState('')
  const [tagValue, setTagValue] = useState('')
  const [yamlOpen, setYamlOpen] = useState(false)

  const form = useCreateMachineForm()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = form

  const nameWatch = watch('name')
  const machineClassWatch = watch('machineClass')
  const machineTypeWatch = watch('machineType')
  const networkWatch = watch('network')
  const sizeWatch = watch('size')
  const tagsWatch = watch('tags')

  const handleAddTag = () => {
    if (!tagKey.trim() || !tagValue.trim()) return
    setValue('tags', addTag(tagsWatch ?? {}, tagKey, tagValue), { shouldDirty: true })
    setTagKey('')
    setTagValue('')
  }

  const handleRemoveTag = (key: string) => {
    setValue('tags', removeTag(tagsWatch ?? {}, key), { shouldDirty: true })
  }

  // YAML
  const copyYaml = async () => {
    try {
      await copyToClipboard(buildMachineYaml(getValues()))
      toast.info('YAML copied to clipboard')
    } catch {
      toast.error('Failed to copy YAML')
    }
  }

  // Helper functions for form
  const onSubmit = async () => {
    const values = getValues()
    const machineSpec = buildMachineSpec(values)
    persistMockCreatedMachine(machineSpec)
    console.log('Machine object to be sent to API:', machineSpec)
    // TODO: call your API here with machineSpec
    await copyYaml()
    router.push(`${routes.app.vms.getHref()}?creating-vm=true&resource=machine`)
  }

  //Router
  const router = useRouter()

  const NameInput = useCallback(() => {
    return (
      <FormSection title='Name' error={errors.name && errors.name.message}>
        <Input {...register('name', { required: 'Name is required' })} placeholder='Enter name...' />
      </FormSection>
    )
  }, [errors.name, register])

  const MachineClassInput = useCallback(() => {
    return (
      <FormSection title='Machine Class' error={errors.machineClass && errors.machineClass.message}>
        <Input
          {...register('machineClass', { required: 'Machine Class is required' })}
          placeholder='Enter machine class...'
        />
      </FormSection>
    )
  }, [errors.machineClass, register])

  const MachineTypeInput = useCallback(() => {
    return (
      <FormSection title='Machine Type' error={errors.machineType && errors.machineType.message}>
        <Input
          {...register('machineType', { required: 'Machine Type is required' })}
          placeholder='Enter machine type...'
        />
      </FormSection>
    )
  }, [errors.machineType, register])

  const SizeInput = useCallback(() => {
    return (
      <FormSection
        title={
          <div className='flex items-center gap-1'>
            Size
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <QuestionMarkCircledIcon className='w-4 h-4 text-gray-500' />
                </TooltipTrigger>
                <TooltipContent className='max-w-xs'>
                  <div className='space-y-2 text-sm'>
                    <div className='font-semibold'>VM Size Options:</div>
                    <div className='space-y-1'>
                      <div>
                        <span className='font-medium'>Small: 1 CPU, 2GB RAM, 20GB Disk</span>{' '}
                      </div>
                      <div>
                        <span className='font-medium'>Medium: 2 CPU, 4GB RAM, 40GB Disk</span>
                      </div>
                      <div>
                        <span className='font-medium'>Large: 4 CPU, 8GB RAM, 80GB Disk</span>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        }
        error={errors.size && errors.size.message}
      >
        <Controller
          control={control}
          name='size'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select size...'}</SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size.key} value={size.key}>
                    {size.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.size, control])

  const NetworkInput = useCallback(() => {
    return (
      <FormSection title='Network' error={errors.network && errors.network.message}>
        <Controller
          control={control}
          name='network'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select network...'}</SelectTrigger>
              <SelectContent>
                <SelectItem value='default'>Default</SelectItem>
                {/* Future: dynamically load available networks */}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.network, control])

  const SummaryTableRow = ({ title, content }: { title: string; content: string | number }) => (
    <tr>
      <td className='font-semibold py-1 pr-4'>{title}</td>
      <td>{content}</td>
    </tr>
  )

  const Summary = () => {
    return (
      <div className='w-fit'>
        <h3 className={cn('mx-auto w-fit text-3xl', 'sm:text-3xl', 'md:text-5xl')}>Summary</h3>
        <div className={cn('border rounded-lg p-4 overflow-hidden my-4', 'w-full', 'sm:w-96')}>
          <table className={cn('border-separate border-spacing-0 w-full', 'text-sm', 'sm:text-md')}>
            <tbody>
              <SummaryTableRow title='Name' content={nameWatch || 'N/A'} />
              <SummaryTableRow title='Machine class' content={machineClassWatch || 'N/A'} />
              <SummaryTableRow title='Machine type' content={machineTypeWatch || 'N/A'} />
              <SummaryTableRow title='Size' content={sizeWatch || 'N/A'} />
              <SummaryTableRow title='Network' content={networkWatch || 'N/A'} />
              <tr>
                <td className='font-semibold pt-1 pb-3 pr-4 align-top'>Tags</td>
                <td>
                  {Object.entries(tagsWatch ?? {}).length === 0 ? (
                    <span className='italic opacity-70'>No tags</span>
                  ) : (
                    Object.entries(tagsWatch ?? {}).map(([key, value]) => (
                      <p key={key}>
                        {key}: {value}
                      </p>
                    ))
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const machineYaml = useMemo(() => {
    const values = getValues()
    return buildMachineYaml({ ...values })
  }, [getValues, nameWatch, machineClassWatch, machineTypeWatch, sizeWatch, networkWatch, tagsWatch])

  const MachineYaml = () => {
    return (
      <section className='w-fit mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Button type='button' className={cn('text-xs', 'sm:text-sm')} onClick={() => setYamlOpen(!yamlOpen)}>
            {yamlOpen ? 'Close YAML' : 'View YAML'}
          </Button>
          <Button type='button' className={cn('mx-2', 'text-xs', 'sm:text-sm')} onClick={copyYaml}>
            Copy YAML
          </Button>
          <Button type='submit' className={cn('text-xs', 'sm:text-sm')}>
            Create Machine
          </Button>
          {yamlOpen && (
            <CodeSnippet
              type='multi'
              className='rounded-lg mt-2'
              style={{ '--code-snippet-multi-max-height': '40rem' }}
            >
              {machineYaml}
            </CodeSnippet>
          )}
        </form>
      </section>
    )
  }

  const content: WizardContentType[] = [
    {
      title: 'Basics',
      wizardContent: (
        <div className={cn('flex gap-24 w-fit mx-auto', 'flex-col gap-4', 'sm:flex-row sm:gap-24')}>
          <NameInput />
          <MachineClassInput />
          <MachineTypeInput />
        </div>
      ),
    },
    {
      title: 'Size',
      wizardContent: (
        <div className='flex flex-row gap-24 justify-center'>
          <SizeInput />
        </div>
      ),
    },
    {
      title: 'Network',
      wizardContent: (
        <div className='flex flex-row gap-24 justify-center'>
          <NetworkInput />
        </div>
      ),
    },
    {
      title: 'Tags',
      wizardContent: (
        <div className='w-fit mx-auto'>
          <TagsSection
            tags={Object.entries(tagsWatch ?? {}).map(([key, value]) => ({ key, value }))}
            tagKey={tagKey}
            tagValue={tagValue}
            setTagKey={setTagKey}
            setTagValue={setTagValue}
            addTag={handleAddTag}
            removeTag={handleRemoveTag}
          />
        </div>
      ),
    },
    {
      title: 'Summary',
      wizardContent: (
        <div className='w-fit mx-auto'>
          <Summary />
          <MachineYaml />
        </div>
      ),
    },
  ]

  //console.log('Machine created with values:', getValues())

  return (
    <Form {...form}>
      <Wizard<CreateMachineForm> content={content} trigger={trigger} stepFields={stepFields} summary={<Summary />} />
    </Form>
  )
}
