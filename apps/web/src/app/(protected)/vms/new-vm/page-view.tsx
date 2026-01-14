'use client'

import { CreateVmForm, Datacenter, Image, Extensions } from '@/features/vms/types/create-vm'
import { useCallback, useState } from 'react'
import { Controller, Path } from 'react-hook-form'
import { useCreateVmForm } from '@/features/vms/hooks/use-create-vm-form'
import { addTag, removeTag } from '@/features/cluster/utils/tags'
import { useRouter } from 'next/navigation'
import { FormSection } from '@/features/cluster/components/create-cluster/form-section'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/select'
// import { Slider } from "@/components/shadcn/slider"
import { SliderWithInput } from '@/components/shadcn/slider'
import { MultiselectExtensions } from '@/features/vms/components/create-vm/multiselect-extensions'
import { datacenters, images } from '@/features/vms/config/create-vm-values'
import { WizardContentType } from '@/types/wizard-content-type'
import { TagsSection } from '@/features/cluster/components/create-cluster/tags-section'
import { Wizard } from '@/components/ui/wizard'
import { Input } from '@/components/shadcn/input'

const stepFields: Array<Array<Path<CreateVmForm>>> = [
  ['name', 'project', 'workspace', 'region', 'serviceId', 'size', 'image'],
  ['extensions'],
  ['securityBaseline', 'osConfig'],
  [],
  [],
]

export const PageView = () => {
  const [tagKey, setTagKey] = useState('')
  const [tagValue, setTagValue] = useState('')

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

  const RegionInput = useCallback(() => {
    return (
      <FormSection title='Datacenter' error={errors.region && errors.region.message}>
        <Controller
          control={control}
          name='region'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select region...'}</SelectTrigger>
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
  }, [errors.region, control])

  const ServiceIdInput = useCallback(() => {
    return (
      <FormSection title='Service ID' error={errors.serviceId && errors.serviceId.message}>
        <Input {...register('serviceId', { required: 'Service ID is required' })} placeholder='Enter service ID...' />
      </FormSection>
    )
  }, [errors.serviceId, register])

  const SizeInput = useCallback(() => {
    return (
      <FormSection title='Size' error={errors.size && errors.size.message}>
        <Controller
          control={control}
          name='size'
          defaultValue={20}
          render={({ field }) => (
            <SliderWithInput
              value={field.value || 20}
              onValueChange={field.onChange}
              min={10}
              max={500}
              step={10}
              label='GB'
            />
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
    return (
      <FormSection title='Security baseline'>
        <Input
          {...register('securityBaseline', { required: 'Security baseline is required' })}
          placeholder='Enter security baseline...'
        />
      </FormSection>
    )
  }, [errors.securityBaseline, register])

  const OsConfigInput = useCallback(() => {
    return (
      <FormSection title='OS Config'>
        <Input {...register('osConfig', { required: 'OS Config is required' })} placeholder='Enter OS Config...' />
      </FormSection>
    )
  }, [errors.osConfig, register])

  const ExtensionsInput = useCallback(() => {
    return (
      <MultiselectExtensions
        control={control as any}
        error={errors.extensions ? String(errors.extensions.message || errors.extensions) : undefined}
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
              <td className='font-semibold py-1 pr-4'>VM Size</td>
              <td>{sizeWatch || 20} GB</td>
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
            {/* <tr>
                        <td className='font-semibold py-1 pr-4'>Security Baseline</td>
                        <td>{securityBaselineWatch || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className='font-semibold py-1 pr-4'>OS Config</td>
                        <td>{osConfigWatch || 'N/A'}</td>
                    </tr> */}
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

  const content: WizardContentType[] = [
    {
      title: 'Basic',
      wizardContent: (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <NameInput />
          <ProjectInput />
          <WorkspaceInput />
          <ServiceIdInput />
          <RegionInput />
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
        </div>
      ),
    },
  ]

  return <Wizard<CreateVmForm> content={content} trigger={trigger} stepFields={stepFields} />
}
