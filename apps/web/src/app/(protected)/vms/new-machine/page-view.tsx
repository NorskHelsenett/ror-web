'use client'

import { CreateMachineForm } from '@/features/machine/types/create-machine'
import { useCreateMachineForm } from '@/features/machine/hooks/use-create-machine-form'
import { Form } from '@/components/shadcn/form'
import { Controller, Path } from 'react-hook-form'
import { FormSection } from '@/features/cluster/components/create-cluster/form-section'
import { useCallback, useMemo, useState } from 'react'
import { addTag, removeTag } from '@/features/cluster/utils/tags'
import { toast } from 'sonner'
import { ChevronDownIcon, ChevronUpIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'

import { routes } from '@/config/routes'
import { buildMachineYaml } from '@/features/machine/utils/generate-machine-yaml'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/shadcn/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import { TagsSection } from '@/features/cluster/components/create-cluster/tags-section'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/shadcn/collapsible'
import { sizes } from '@/features/vms/config/create-vm-values'
import { cn } from '@/utils/clsxm'
import { CodeSnippet } from '@/components/ui/code-snippet'
import { Button } from '@/components/shadcn/button'
import { WizardContentType } from '@/types/wizard-content-type'
import { Wizard } from '@/components/ui/wizard'
import { buildMachineSpec } from '@/features/machine/utils/input-helper'
import { persistMockCreatedMachine } from '@/features/machine/services/mock-machine-storage'

const stepFields: Array<Array<Path<CreateMachineForm>>> = [
  // ['name', 'machineClass', 'machineType'],
  ['name', 'machineClass', 'serialNumber', 'serviceId'],
  ['os', 'providerConfig', 'provider', 'environment'],
  ['size'],
  ['network'],
  [],
  [],
]

const serviceIdOptions = [
  { value: 'hn', label: 'Helsenorge' },
  { value: 'npe', label: 'NPE Brukerportal' },
  { value: 'es', label: 'HDIR Esaks' },
]

export const PageView = () => {
  const [numberOfMachines, setNumberOfMachines] = useState(1)
  const [showNumberOfMachines, setShowNumberOfMachines] = useState(false)

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

  const osWatch = watch('os')
  const providerWatch = watch('provider')
  const providerConfigWatch = watch('providerConfig')

  const serviceIdWatch = watch('serviceId')
  const environmentWatch = watch('environment')
  const nameWatch = watch('name')
  const machineClassWatch = watch('machineClass')
  const machineTypeWatch = watch('machineType')
  const networkWatch = watch('network')
  const sizeWatch = watch('size')
  const tagsWatch = watch('tags')

  const serviceIdLabel = useMemo(() => {
    const selected = serviceIdOptions.find((option) => option.value === serviceIdWatch)
    return selected?.label ?? 'Select service ID...'
  }, [serviceIdWatch])

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

  // ------------------------------ Page 1 ------------------------------------------------------------------------------
  const NameInput = useCallback(() => {
    return (
      <FormSection title='Name' error={errors.name && errors.name.message}>
        <Input {...register('name', { required: 'Name is required' })} placeholder='Enter name...' />
      </FormSection>
    )
  }, [errors.name, register])

  // const ServiceIdInput = useCallback(() => {
  //   return (
  //     <FormSection title='Service ID' error={errors.serviceId && errors.serviceId.message}>
  //       <Input {...register('serviceId')} placeholder='Enter service ID...' />
  //     </FormSection>
  //   )
  // }, [errors.serviceId, register])

  const ServiceIdInput = useCallback(() => {
    return (
      <FormSection title='Service ID' error={errors.serviceId && errors.serviceId.message}>
        <Controller
          control={control}
          name='serviceId'
          defaultValue=''
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select service ID...'}</SelectTrigger>
              <SelectContent>
                {serviceIdOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
                {/* Future: dynamically load available machine classes */}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.serviceId, control])

  // const MachineClassInput = useCallback(() => {
  //   return (
  //     <FormSection title='Machine class' error={errors.machineClass && errors.machineClass.message}>
  //       <Input
  //         {...register('machineClass', { required: 'Machine Class is required' })}
  //         placeholder='Enter machine class...'
  //       />
  //     </FormSection>
  //   )
  // }, [errors.machineClass, register])

  const MachineClassInput = useCallback(() => {
    return (
      <FormSection title='Machine class' error={errors.machineClass && errors.machineClass.message}>
        <Controller
          control={control}
          name='machineClass'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select machine class...'}</SelectTrigger>
              <SelectContent>
                <SelectItem value='small'>Small</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='large'>Large</SelectItem>
                {/* Future: dynamically load available machine classes */}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.machineClass, control])

  //This will determine if the user will create multiple duplicate machines, and will therefore need to add numbers on the generated name
  const NumberOfMachines = useCallback(() => {
    return (
      <div className='border rounded-lg p-4 mt-2'>
        <Collapsible open={showNumberOfMachines} onOpenChange={setShowNumberOfMachines}>
          <div className='mb-1 flex items-center justify-between gap-2'>
            <p className='text-sm text-muted-foreground'>
              Do you want to create more than one machine? The machines will be duplicates.
            </p>
            <CollapsibleTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-7 w-7 shrink-0'
                aria-label={showNumberOfMachines ? 'Collapse number of machines' : 'Expand number of machines'}
              >
                {showNumberOfMachines ? <ChevronUpIcon className='h-4 w-4' /> : <ChevronDownIcon className='h-4 w-4' />}
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className='mt-1'>
            <div className='grid grid-cols-[1fr_auto] items-center rounded-md '>
              <p className='text-sm font-medium'>Number of machines</p>
              <Input
                type='text'
                inputMode='numeric'
                defaultValue='1'
                onBlur={(e) => {
                  const parsed = parseInt(e.target.value.replace(/[^0-9]/g, ''))
                  const valid = isNaN(parsed) || parsed < 1 ? 1 : parsed
                  e.target.value = String(valid)
                  setNumberOfMachines(valid)
                }}
                placeholder='1'
                className='w-24'
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }, [showNumberOfMachines])

  // const MachineTypeInput = useCallback(() => {
  //   return (
  //     <FormSection title='Machine type' error={errors.machineType && errors.machineType.message}>
  //       <Input
  //         {...register('machineType', { required: 'Machine Type is required' })}
  //         placeholder='Enter machine type...'
  //       />
  //     </FormSection>
  //   )
  // }, [errors.machineType, register])

  const GeneratedName = ({ baseName, serviceId, count }: { baseName: string; serviceId: string; count: number }) => {
    if (!baseName && !serviceId) return null
    const pad = (n: number) => String(n).padStart(2, '0')
    const base = `${baseName}-${serviceId}`
    const display = count > 1 ? `${base}-(${pad(1)}-${pad(count)})` : base
    return (
      <div className='text-center'>
        <p className='text-sm font-semibold text-muted-foreground mb-1'>
          Generated machine name{count > 1 ? 's' : ''}:
        </p>
        <p className='font-mono text-sm'>{display}</p>
      </div>
    )
  }

  // ------------------------------ Page 2 ------------------------------------------------------------------------------

  // ------------------------------ Page 3 ------------------------------------------------------------------------------
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

  const vmCount = showNumberOfMachines ? numberOfMachines : 1
  const generatedNameSummary = useMemo(() => {
    if (!nameWatch && !serviceIdWatch) return 'N/A'

    const pad = (n: number) => String(n).padStart(2, '0')
    const base = `${nameWatch}-${serviceIdWatch}`

    return vmCount > 1 ? `${base}-(${pad(1)}-${pad(vmCount)})` : base
  }, [nameWatch, serviceIdWatch, vmCount])

  const Summary = () => {
    return (
      <div className='w-fit'>
        <h3 className={cn('mx-auto w-fit text-3xl', 'sm:text-3xl', 'md:text-5xl')}>Summary</h3>
        <div className={cn('border rounded-lg p-4 overflow-hidden my-4', 'w-full', 'sm:w-96')}>
          <table className={cn('border-separate border-spacing-0 w-full', 'text-sm', 'sm:text-md')}>
            <tbody>
              {/* <SummaryTableRow title='Name' content={nameWatch || 'N/A'} /> */}
              <SummaryTableRow title='Generated name' content={generatedNameSummary} />
              <SummaryTableRow title='Numbers created' content={vmCount} />
              <SummaryTableRow title='Machine class' content={machineClassWatch || 'N/A'} />
              <SummaryTableRow title='Machine type' content={machineTypeWatch || 'N/A'} />
              <SummaryTableRow title='Size' content={sizeWatch || 'N/A'} />
              <SummaryTableRow title='Network' content={networkWatch || 'N/A'} />
              <tr>
                <td className='font-semibold pt-1 pb-3 pr-4 align-top'>Tags</td>
                <td>
                  <p>serviceId: {serviceIdLabel}</p>
                  <p>environment: {environmentWatch || 'N/A'}</p>
                  {Object.entries(tagsWatch ?? {}).length > 0 &&
                    Object.entries(tagsWatch ?? {}).map(([key, value]) => (
                      <p key={key}>
                        {key}: {value}
                      </p>
                    ))}
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
        <div className='flex flex-col gap-6 w-fit mx-auto'>
          <NumberOfMachines />
          <div className={cn('flex w-fit', 'flex-col gap-4', 'sm:flex-row sm:gap-12')}>
            <NameInput />
            <ServiceIdInput />
            <MachineClassInput />
            {/* <MachineTypeInput /> */}
          </div>
          <div className='text-center'>
            <GeneratedName baseName={nameWatch} serviceId={serviceIdWatch} count={vmCount} />
          </div>
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
