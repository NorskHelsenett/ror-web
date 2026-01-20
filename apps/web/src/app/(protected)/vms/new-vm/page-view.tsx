'use client'

import { CreateVmForm } from '@/features/vms/types/create-vm'
import { useCallback, useState } from 'react'
import { Controller, Form, Path } from 'react-hook-form'
import { useCreateVmForm } from '@/features/vms/hooks/use-create-vm-form'
import { addTag, removeTag } from '@/features/cluster/utils/tags'
import { useRouter } from 'next/navigation'
import { FormSection } from '@/features/cluster/components/create-cluster/form-section'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/select'
import {
  providers,
  datacenters,
  regions,
  images,
  extensions,
  securityBaselines,
  osConfigs,
  sizes,
} from '@/features/vms/config/create-vm-values'
import { WizardContentType } from '@/types/wizard-content-type'
import { TagsSection } from '@/features/cluster/components/create-cluster/tags-section'
import { Wizard } from '@/components/ui/wizard'
import { Input } from '@/components/shadcn/input'
import { GenericMultiselect } from '@/components/ui/generic-multiselect'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { toast } from 'sonner'
import { routes } from '@/config/routes'
import { Button } from '@/components/shadcn/button'
import { CodeSnippet } from '@ror/react'
import { buildVmYaml } from '@/features/vms/utils/generate-vm-yaml'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'

const stepFields: Array<Array<Path<CreateVmForm>>> = [
  ['name', 'project'],
  ['region', 'datacenter', 'serviceId', 'provider', 'size', 'image'],
  ['extensions'],
  ['securityBaseline', 'osConfig'],
  [],
  [],
]

export const PageView = () => {
  const [tagKey, setTagKey] = useState('')
  const [tagValue, setTagValue] = useState('')
  const [yamlOpen, setYamlOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useCreateVmForm()

  //Watches
  const nameWatch = watch('name')
  const projectWatch = watch('project')
  const workspaceWatch = watch('workspace')
  const regionWatch = watch('region')
  const datacenterWatch = watch('datacenter')
  const providerWatch = watch('provider')
  const serviceIdWatch = watch('serviceId')
  const sizeWatch = watch('size')
  const imageWatch = watch('image')
  const extensionsWatch = watch('extensions')
  const securityBaselineWatch = watch('securityBaseline')
  const osConfigWatch = watch('osConfig')
  const tagsWatch = watch('tags')

  // Handlers
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
      await copyToClipboard(buildVmYaml(getValues()))
      toast.info('YAML copied to clipboard')
    } catch {
      toast.error('Failed to copy YAML')
    }
  }

  // Helper functions for form
  const onSubmit = async () => {
    copyYaml()
    router.push(`${routes.app.vms.getHref()}?creating-vm=true`)
  }

  //Router
  const router = useRouter()

  // Inputs
  const NameInput = useCallback(() => {
    return (
      <FormSection title='Name' error={errors.name && errors.name.message}>
        <Input {...register('name', { required: 'Name is required' })} placeholder='Enter name...' />
      </FormSection>
    )
  }, [errors.name, register])

  const ProjectInput = useCallback(() => {
    return (
      <FormSection title='Project' error={errors.project && errors.project.message}>
        <Input {...register('project', { required: 'Project is required' })} placeholder='Enter project...' />
      </FormSection>
    )
  }, [errors.project, register])

  const WorkspaceInput = useCallback(() => {
    return (
      <FormSection title='Workspace' error={errors.workspace && errors.workspace.message}>
        <Input {...register('workspace', { required: 'Workspace is required' })} placeholder='Enter workspace...' />
      </FormSection>
    )
  }, [errors.workspace, register])

  const ProviderInput = useCallback(() => {
    return (
      <FormSection title='Provider' error={errors.provider && errors.provider.message}>
        <Controller
          control={control}
          name='provider'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select provider...'}</SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.key} value={provider.key}>
                    {provider.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.provider, control])

  const RegionInput = useCallback(() => {
    return (
      <FormSection title='Region' error={errors.region && errors.region.message}>
        <Controller
          control={control}
          name='region'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select region...'}</SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.key} value={region.key}>
                    {region.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.region, control])

  const DatacenterInput = useCallback(() => {
    return (
      <FormSection title='Datacenter' error={errors.datacenter && errors.datacenter.message}>
        <Controller
          control={control}
          name='datacenter'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select datacenter...'}</SelectTrigger>
              <SelectContent>
                {datacenters.map((datacenter) => (
                  <SelectItem key={datacenter.key} value={datacenter.key}>
                    {datacenter.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.datacenter, control])

  const ServiceIdInput = useCallback(() => {
    return (
      <FormSection title='Service ID' error={errors.serviceId && errors.serviceId.message}>
        <Input {...register('serviceId', { required: 'Service ID is required' })} placeholder='Enter service ID...' />
      </FormSection>
    )
  }, [errors.serviceId, register])

  // const SizeInput = useCallback(() => {
  //   return (
  //     <FormSection title='Size' error={errors.size && errors.size.message}>
  //       <Controller
  //         control={control}
  //         name='size'
  //         defaultValue={20}
  //         render={({ field }) => (
  //           <SliderWithInput
  //             value={field.value || 20}
  //             onValueChange={field.onChange}
  //             min={10}
  //             max={500}
  //             step={10}
  //             label='GB'
  //           />
  //         )}
  //       />
  //     </FormSection>
  //   )
  // }, [errors.size, control])

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

  const ImageInput = useCallback(() => {
    return (
      <FormSection title='Image' error={errors.image && errors.image.message}>
        <Controller
          control={control}
          name='image'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select image...'}</SelectTrigger>
              <SelectContent>
                {images.map((image) => (
                  <SelectItem key={image.key} value={image.key}>
                    {image.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    )
  }, [errors.image, control])

  const SecurityBaselineInput = useCallback(() => {
    const securityBaselineOptions = securityBaselines.map((baseline) => ({
      value: baseline.key,
      label: baseline.display,
    }))

    return (
      <GenericMultiselect
        control={control}
        name='securityBaseline'
        title='Security baseline'
        options={securityBaselineOptions}
        placeholder='Select security baselines...'
        error={
          errors.securityBaseline && typeof errors.securityBaseline.message === 'string'
            ? errors.securityBaseline.message
            : undefined
        }
        hideClearAllButton={false}
      />
    )
  }, [control, errors.securityBaseline])

  const OsConfigInput = useCallback(() => {
    const osConfigOptions = osConfigs.map((config) => ({
      value: config.key,
      label: config.display,
    }))

    return (
      <GenericMultiselect
        control={control}
        name='osConfig'
        title='OS config'
        options={osConfigOptions}
        placeholder='Select OS configurations...'
        error={errors.osConfig && typeof errors.osConfig.message === 'string' ? errors.osConfig.message : undefined}
        hideClearAllButton={false}
      />
    )
  }, [control, errors.osConfig])

  const ExtensionsInput = useCallback(() => {
    const extensionOptions = extensions.map((extension) => ({
      value: extension.key,
      label: extension.display,
    }))

    return (
      <GenericMultiselect
        control={control}
        name='extensions'
        title='Extensions'
        options={extensionOptions}
        placeholder='Select extensions...'
        error={errors.extensions ? String(errors.extensions.message || errors.extensions) : undefined}
        hideClearAllButton={false}
      />
    )
  }, [control, errors.extensions])

  const Summary = () => {
    return (
      <>
        <h3 className='mx-auto w-fit'>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td className='font-semibold py-1 pr-4'>Name</td>
              <td>{nameWatch || 'N/A'}</td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Project</td>
              <td>{projectWatch || 'N/A'}</td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Workspace</td>
              <td>{workspaceWatch || 'N/A'}</td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Service ID</td>
              <td>{serviceIdWatch || 'N/A'}</td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Region</td>
              <td>{regionWatch || 'N/A'}</td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>VM Size</td>
              <td>{sizeWatch} </td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Image</td>
              <td>{imageWatch}</td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Extensions</td>
              <td>
                {extensionsWatch && Object.keys(extensionsWatch).length > 0
                  ? Object.keys(extensionsWatch).join(', ')
                  : 'None selected'}
              </td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Security baseline</td>
              <td>
                {securityBaselineWatch && Object.keys(securityBaselineWatch).length > 0
                  ? Object.keys(securityBaselineWatch).join(', ')
                  : 'None selected'}
              </td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>OS config</td>
              <td>
                {osConfigWatch && Object.keys(osConfigWatch).length > 0
                  ? Object.keys(osConfigWatch).join(', ')
                  : 'None selected'}
              </td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4'>Tags</td>
              <td>
                {Object.entries(tagsWatch).length === 0 ? (
                  <span className='italic opacity-70'>No tags</span>
                ) : (
                  Object.entries(tagsWatch).map(([key, value]) => (
                    <p key={key}>
                      {key}: {value}
                    </p>
                  ))
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }

  const VmYaml = () => {
    return (
      <section>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Button type='button' onClick={() => setYamlOpen(!yamlOpen)}>
            {yamlOpen ? 'Close YAML' : 'View YAML'}
          </Button>
          <Button type='button' className='mx-2' onClick={copyYaml}>
            Copy YAML
          </Button>
          <Button type='submit'>Create VM</Button>
          {yamlOpen && (
            <CodeSnippet
              type='multi'
              className='rounded-lg mt-2'
              style={{ '--code-snippet-multi-max-height': '27rem' }}
            >
              {buildVmYaml(getValues())}
            </CodeSnippet>
          )}
        </form>
      </section>
    )
  }

  const content: WizardContentType[] = [
    {
      title: 'Basic',
      wizardContent: (
        <div className='flex flex-row gap-24 justify-center'>
          <NameInput />
          <ProjectInput />
          {/* <WorkspaceInput /> */}
        </div>
      ),
    },
    {
      title: 'Config',
      wizardContent: (
        <div className='flex flex-row gap-24 justify-center'>
          <ProviderInput />
          <RegionInput />
          <DatacenterInput />
          <ServiceIdInput />
          <ImageInput />
          <SizeInput />
        </div>
      ),
    },
    {
      title: 'Extensions',
      wizardContent: (
        <div className='flex flex-row gap-24 justify-center'>
          <ExtensionsInput />
        </div>
      ),
    },
    {
      title: 'Security and Config',
      wizardContent: (
        <div className='flex flex-row gap-24 justify-center'>
          <SecurityBaselineInput />
          <OsConfigInput />
        </div>
      ),
    },
    {
      title: 'Tags',
      wizardContent: (
        <div className='w-fit mx-auto'>
          <TagsSection
            tags={tagsWatch ?? {}}
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
          <VmYaml />
        </div>
      ),
    },
  ]

  return <Wizard<CreateVmForm> content={content} trigger={trigger} stepFields={stepFields} />
}
