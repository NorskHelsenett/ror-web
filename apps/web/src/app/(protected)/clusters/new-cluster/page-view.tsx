'use client'

import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/select'
import { routes } from '@/config/routes'
import React, { useEffect, useMemo, useState } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CreateClusterForm } from '@/features/cluster/types/create-cluster'
import { errorTextStyling } from '@/features/cluster/config/create-cluster-styling'
import { FormSection } from '@/features/cluster/components/create-cluster/form-section'
import {
  criticalityOptions,
  environments,
  lcmOptions,
  machineClassOptions,
  regions,
  sensitivityOptions,
} from '@/features/cluster/config/create-cluster-values'
import { Wizard } from '@/components/ui/wizard'
import { useCreateClusterForm } from '@/features/cluster/hooks/use-create-cluster-form'
import { WizardContentType } from '@/types/wizard-content-type'
import { cn } from '@/utils/clsxm'
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/shadcn/combobox'
import { Form, FormControl, FormField, FormItem } from '@/components/shadcn/form'
import { ProjectType } from './page'
import { tagKeyValidator, tagValueValidator } from '@/features/cluster/utils/tags-validators'
import { TagsSection } from '@/features/cluster/components/create-cluster/tags-section'

type FieldKey = keyof CreateClusterForm

interface FieldRenderContext {
  control: Control<CreateClusterForm>
  register: UseFormRegister<CreateClusterForm>
  setValue: UseFormSetValue<CreateClusterForm>
  errors: FieldErrors<CreateClusterForm>
  getValues: UseFormGetValues<CreateClusterForm>
  trigger: UseFormTrigger<CreateClusterForm>
}

interface FieldConfig {
  key: FieldKey
  label: string
  step: number
  /** Set to false to keep a field out of the Summary. Most fields want to stay in. */
  summary?: boolean
  /** Turn a raw stored value (an option key, a boolean) into a readable summary string. */
  format?: (value: unknown, values: CreateClusterForm) => React.ReactNode
  render: (ctx: FieldRenderContext) => React.ReactNode
}

const fields: FieldConfig[] = [
  // --- Basics ---
  {
    key: 'serviceId',
    label: 'Service IDs',
    step: 0,
    render: ({ register, errors }) => (
      <FormSection error={errors.serviceId?.message} description='Separate by commas'>
        <Input
          {...register('serviceId', {
            required: 'One service ID is required',
            pattern: {
              value: /^\d+(?:\s*,\s*\d+)*$/,
              message: 'Service IDs must be numeric',
            },
          })}
          placeholder='Enter service IDs'
        />
      </FormSection>
    ),
  },
  {
    key: 'name',
    label: 'Name',
    step: 0,
    render: ({ register, errors }) => (
      <FormSection error={errors.name?.message}>
        <Input
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value: /^[A-Za-zÆØÅæøå0-9-]+$/,
              message: 'Must only contain letters, numbers and hypthens',
            },
          })}
          placeholder='Enter name...'
        />
      </FormSection>
    ),
  },
  {
    key: 'environment',
    label: 'Environment',
    step: 0,
    render: ({ control, errors, setValue, trigger }) => (
      <FormSection error={errors.environment?.message}>
        <Controller
          name='environment'
          control={control}
          rules={{ required: 'Environment is required' }}
          render={({ field }) => (
            <Select
              value={field.value ?? ''}
              onValueChange={(value) => {
                field.onChange(value)
                setValue('highAvailability', value === 'prod', { shouldDirty: true, shouldValidate: true })
                // highAvailability's own validation depends on environment
                // (prod requires "Yes") — re-check it now instead of only
                // when the user reaches the Infrastructure step.
                trigger('highAvailability')
              }}
            >
              <SelectTrigger className='w-52'>{field.value || 'Select environment'}</SelectTrigger>
              <SelectContent>
                {environments.map((environment) => (
                  <SelectItem key={environment.key} value={environment.key}>
                    {environment.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    ),
  },

  // --- Ownership ---
  {
    key: 'accessGroups',
    label: 'Access groups',
    step: 1,
    render: ({ register, errors }) => (
      <FormSection error={errors.accessGroups?.message} description='Separate by commas'>
        <Input
          {...register('accessGroups', {
            pattern: {
              value: /^[^,\s](?:[^,]*[^,\s])?(?:\s*,\s*[^,\s](?:[^,]*[^,\s])?)*$/,
              message: 'Enter one or more access groups separated by commas',
            },
          })}
          placeholder='Enter access groups'
        />
      </FormSection>
    ),
  },
  {
    key: 'team',
    label: 'Team',
    step: 1,
    render: ({ register, errors }) => (
      <FormSection error={errors.team?.message}>
        <Input {...register('team', { required: 'Team is required' })} placeholder='Enter team...' />
      </FormSection>
    ),
  },
  {
    key: 'slackChannels',
    label: 'Slack channels',
    step: 1,
    render: ({ register, errors }) => (
      <FormSection error={errors.slackChannels?.message} description='Separate by commas'>
        <Input
          {...register('slackChannels', {
            required: 'At least one Slack channel is required',
            pattern: {
              value: /^[^,\s](?:[^,]*[^,\s])?(?:\s*,\s*[^,\s](?:[^,]*[^,\s])?)*$/,
              message: 'Enter one or more Slack channels separated by commas',
            },
          })}
          placeholder='Enter Slack channels'
        />
      </FormSection>
    ),
  },
  {
    key: 'techRepEmail',
    label: 'Techrep email',
    step: 1,
    render: ({ register, errors }) => (
      <FormSection error={errors.techRepEmail?.message}>
        <Input
          type='email'
          {...register('techRepEmail', {
            required: 'Technical rep email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          placeholder='Enter technical rep email...'
        />
      </FormSection>
    ),
  },
  {
    key: 'techRepPhone',
    label: 'Techrep number',
    step: 1,
    render: ({ register, errors }) => (
      <FormSection error={errors.techRepPhone?.message}>
        <Input
          type='tel'
          {...register('techRepPhone', {
            required: 'Technical rep phone is required',
            pattern: {
              value: /^(?=(?:\D*\d){7,15}\D*$)\+?[\d\s()-]+$/,
              message: 'Enter a valid phone number',
            },
          })}
          placeholder='Enter technical rep phone number...'
        />
      </FormSection>
    ),
  },

  // --- Metadata ---
  {
    key: 'sensitivity',
    label: 'Sensitivity',
    step: 2,
    render: ({ control, errors }) => (
      <FormSection error={errors.sensitivity?.message}>
        <Controller
          name='sensitivity'
          control={control}
          rules={{ required: 'Sensitivity is required' }}
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select sensitivity'}</SelectTrigger>
              <SelectContent>
                {sensitivityOptions.map((opt) => (
                  <SelectItem key={String(opt.key)} value={opt.key}>
                    {opt.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    ),
  },
  {
    key: 'criticality',
    label: 'Criticality',
    step: 2,
    render: ({ control, errors }) => (
      <FormSection error={errors.criticality?.message}>
        <Controller
          name='criticality'
          control={control}
          rules={{ required: 'Criticality is required' }}
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select criticality'}</SelectTrigger>
              <SelectContent>
                {criticalityOptions.map((opt) => (
                  <SelectItem key={opt.key} value={opt.key}>
                    {opt.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    ),
  },
  {
    key: 'lcm',
    label: 'LCM',
    step: 2,
    format: (value) => lcmOptions.find((o) => o.key === value)?.display ?? String(value ?? ''),
    render: ({ control, errors }) => (
      <FormSection error={errors.lcm?.message}>
        <Controller
          name='lcm'
          control={control}
          rules={{ required: 'LCM is required' }}
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select LCM'}</SelectTrigger>
              <SelectContent>
                {lcmOptions.map((opt) => (
                  <SelectItem key={opt.key} value={opt.key}>
                    {opt.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    ),
  },
  {
    key: 'other',
    label: 'Other',
    step: 2,
    render: ({ register, errors }) => (
      <FormSection error={errors.other?.message} className='w-full'>
        <textarea
          {...register('other')}
          rows={3}
          placeholder='Enter additional information...'
          className='border-input min-h-24 w-full resize-y rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm'
        />
      </FormSection>
    ),
  },

  // --- Infrastructure ---
  {
    key: 'region',
    label: 'Region',
    step: 3,
    format: (value) => regions.find((r) => r.key === value)?.display ?? String(value ?? ''),
    render: ({ control, errors }) => (
      <FormSection error={errors.region?.message}>
        <Controller
          name='region'
          control={control}
          rules={{ required: 'Region is required' }}
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select Region'}</SelectTrigger>
              <SelectContent>
                {regions.map((opt) => (
                  <SelectItem key={opt.key} value={opt.key}>
                    {opt.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    ),
  },
  {
    key: 'machineClass',
    label: 'Machine class',
    step: 3,
    format: (value) => machineClassOptions.find((o) => o.key === value)?.display ?? String(value ?? ''),
    render: ({ control, errors }) => (
      <FormSection error={errors.machineClass?.message}>
        <Controller
          name='machineClass'
          control={control}
          rules={{ required: 'Machine class is required' }}
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger className='w-52'>{field.value || 'Select machine class'}</SelectTrigger>
              <SelectContent>
                {machineClassOptions.map((opt) => (
                  <SelectItem key={opt.key} value={opt.key}>
                    {opt.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormSection>
    ),
  },
  {
    key: 'wpName',
    label: 'Worker pool name',
    step: 3,
    render: ({ register, errors }) => (
      <FormSection error={errors.wpName?.message}>
        <Input
          {...register('wpName', { required: 'Worker pool name is required' })}
          placeholder='Enter worker pool name...'
        />
      </FormSection>
    ),
  },
  {
    key: 'numOfNodes',
    label: 'Num of nodes',
    step: 3,
    render: ({ register, errors }) => (
      <FormSection error={errors.numOfNodes?.message}>
        <Input
          {...register('numOfNodes', {
            required: 'Number of nodes is required',
            valueAsNumber: true,
            validate: (value) => !Number.isNaN(value) || 'Number of nodes must be a valid number',
            min: { value: 1, message: 'Number of nodes must be at least 1' },
          })}
          type='number'
          placeholder='Enter num of nodes...'
        />
      </FormSection>
    ),
  },
]

const fieldMap = new Map(fields.map((f) => [f.key, f]))

// project, namespace and tags are handled outside the registry (they need
// external lookup data / a custom multi-value UI), but they still need to be
// validated on the right wizard step.
const stepFields: Array<Array<Path<CreateClusterForm>>> = [[], [], [], [], []]
fields.forEach((f) => {
  if (!stepFields[f.step]) stepFields[f.step] = []
  stepFields[f.step].push(f.key as Path<CreateClusterForm>)
})
stepFields[0].push('project', 'namespace')

// ---------------------------------------------------------------------------

interface NewClusterProps {
  projects: ProjectType[]
  namespacesNames: string[]
  clusterIdSuffix: string
  orderer: string
}

interface SimpleProjectType {
  label: string
  value: string // id
}

interface MachineProfile {
  displayName: string
  category: 'Standard' | 'CPU' | 'Memory'
  default: string
  cpuCores: number
  cpuSockets: number
  cpuThreads: number
  gpuCores: number | null
  memory: string
  enabled: string
}

const machineProfiles: MachineProfile[] = [
  {
    displayName: 'Best Effort Medium',
    category: 'Standard',
    default: 'false',
    cpuCores: 2,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '8Gi',
    enabled: 'true',
  },
  {
    displayName: 'GPU',
    category: 'Standard',
    default: 'false',
    cpuCores: 4,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: 1024,
    memory: '16Gi',
    enabled: 'false',
  },
  {
    displayName: 'Large',
    category: 'Standard',
    default: 'false',
    cpuCores: 4,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '32Gi',
    enabled: 'true',
  },
  {
    displayName: 'Large CPU',
    category: 'CPU',
    default: 'false',
    cpuCores: 4,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '8Gi',
    enabled: 'true',
  },
  {
    displayName: 'Large Memory',
    category: 'Memory',
    default: 'false',
    cpuCores: 4,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '64Gi',
    enabled: 'true',
  },
  {
    displayName: 'Medium',
    category: 'Standard',
    default: 'true',
    cpuCores: 4,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '16Gi',
    enabled: 'true',
  },
  {
    displayName: 'Medium CPUBIG',
    category: 'Standard',
    default: 'false',
    cpuCores: 6,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '16Gi',
    enabled: 'true',
  },
  {
    displayName: 'Small',
    category: 'Standard',
    default: 'false',
    cpuCores: 2,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '8Gi',
    enabled: 'true',
  },
  {
    displayName: 'XLarge',
    category: 'Memory',
    default: 'false',
    cpuCores: 4,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '48Gi',
    enabled: 'true',
  },
  {
    displayName: 'XLarge CPU',
    category: 'CPU',
    default: 'false',
    cpuCores: 8,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '16Gi',
    enabled: 'true',
  },
  {
    displayName: 'XXLarge CPU',
    category: 'CPU',
    default: 'false',
    cpuCores: 16,
    cpuSockets: 1,
    cpuThreads: 1,
    gpuCores: null,
    memory: '16Gi',
    enabled: 'true',
  },
]

const columns: { key: keyof MachineProfile; label: string }[] = [
  { key: 'displayName', label: 'Display name' },
  { key: 'category', label: 'Category' },
  { key: 'default', label: 'Default' },
  { key: 'cpuCores', label: 'CPU cores' },
  { key: 'cpuSockets', label: 'CPU sockets' },
  { key: 'cpuThreads', label: 'CPU threads' },
  { key: 'gpuCores', label: 'GPU cores' },
  { key: 'memory', label: 'Memory' },
  { key: 'enabled', label: 'Enabled' },
]

function MachineProfileTable() {
  return (
    <div className='overflow-hidden rounded-lg border w-fit mt-12'>
      <table className='table-fixed'>
        <thead>
          <tr className='border-b'>
            <th rowSpan={2} className='px-2.5 py-1 border-r'>
              Display name
            </th>
            <th rowSpan={2} className='px-2.5 py-1 border-r'>
              Category
            </th>
            <th rowSpan={2} className='px-2.5 py-1 border-r'>
              Default
            </th>
            <th colSpan={3} className='px-2.5 py-1 border-r'>
              CPU
            </th>
            <th rowSpan={2} className='px-2.5 py-1 border-r'>
              GPU
              <br />
              cores
            </th>
            <th rowSpan={2} className='px-2.5 py-1 border-r'>
              Memory
            </th>
            <th rowSpan={2} className='px-2.5 py-1 '>
              Enabled
            </th>
          </tr>
          <tr className='border-b'>
            <th className='px-2 py-1 border-r'>Cores</th>
            <th className='px-2 py-1 border-r'>Sockets</th>
            <th className='px-2 py-1 border-r'>Threads</th>
          </tr>
        </thead>
        <tbody>
          {machineProfiles.map((profile, rowIndex) => (
            <tr key={profile.displayName} className={rowIndex < machineProfiles.length - 1 ? 'border-b' : ''}>
              {columns.map((col, i) => (
                <td
                  key={col.key}
                  className={cn(
                    i < columns.length - 1 && 'border-r',
                    'px-2 py-1',
                    ((i > 1 && i < 7) || i === 8) && 'text-center'
                  )}
                >
                  {profile[col.key] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ProjectInput({
  control,
  projects,
}: {
  control: Control<CreateClusterForm>
  projects: ProjectType[] | undefined
}) {
  const simpleProjects: SimpleProjectType[] = React.useMemo(
    () => (projects ?? []).map((p) => ({ label: p.name, value: p.id })),
    [projects]
  )

  const projectIdSet = React.useMemo(() => new Set(simpleProjects.map((p) => p.value)), [simpleProjects])

  return (
    <section className={cn('flex flex-col gap-4')}>
      <FormField
        control={control}
        name='project'
        rules={{
          required: 'Project is required',
          validate: (value) => {
            if (!value) return 'Project is required'
            return projectIdSet.has(value) || 'Please select a valid project'
          },
        }}
        render={({ field, fieldState }) => {
          const selected = simpleProjects.find((p) => p.value === (field.value ?? '')) ?? null

          return (
            <FormItem>
              <FormControl>
                <Combobox<SimpleProjectType>
                  items={simpleProjects}
                  value={selected}
                  onValueChange={(p) => field.onChange(p?.value ?? '')}
                  itemToStringValue={(p) => p?.label ?? ''}
                >
                  <ComboboxInput showTrigger={false} className='max-w-52 -mb-2' placeholder='Search project...' />

                  <ComboboxContent className='max-w-52'>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      <ComboboxCollection>
                        {(p) => (
                          <ComboboxItem key={p.value} value={p}>
                            {p.label}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              {fieldState.error?.message ? (
                <span className={errorTextStyling}>{fieldState.error.message}</span>
              ) : (
                <span>Project must exist</span>
              )}
            </FormItem>
          )
        }}
      />
    </section>
  )
}

function NamespaceInput({ control, namespaces }: { control: Control<CreateClusterForm>; namespaces: string[] }) {
  return (
    <section className={cn('flex flex-col gap-4')}>
      <FormField
        control={control}
        name='namespace'
        rules={{
          required: 'Namespace is required',
          validate: (value) => {
            if (!value) return 'Namespace is required'
            return namespaces.includes(value) || 'Please select a valid namespace'
          },
        }}
        render={({ field, fieldState }) => {
          const selected = namespaces.find((p) => p === (field.value ?? '')) ?? null

          return (
            <FormItem>
              <FormControl>
                <Combobox<string>
                  items={namespaces}
                  value={selected}
                  onValueChange={(p) => field.onChange(p ?? '')}
                  itemToStringValue={(p) => p ?? ''}
                >
                  <ComboboxInput showTrigger={false} className='max-w-52 -mb-2' placeholder='Search namespace...' />

                  <ComboboxContent className='max-w-52'>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      <ComboboxCollection>
                        {(p, index) => (
                          <ComboboxItem key={index} value={p}>
                            {p}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FormControl>

              {fieldState.error?.message ? (
                <span className={errorTextStyling}>{fieldState.error.message}</span>
              ) : (
                <span>Namespace must exist</span>
              )}
            </FormItem>
          )
        }}
      />
    </section>
  )
}

const SummaryTableRow = ({ title, content }: { title: string; content: React.ReactNode }) => (
  <tr>
    <td className='font-semibold py-1 pr-4'>{title}</td>
    <td>{content}</td>
  </tr>
)

export const PageView = ({ projects, clusterIdSuffix, namespacesNames, orderer }: NewClusterProps) => {
  // States
  const [tagKey, setTagKey] = useState('')
  const [tagValue, setTagValue] = useState('')

  // Hooks
  const form = useCreateClusterForm(orderer)
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = form

  const formValues = watch()
  const tagsWatch = Array.isArray(formValues.tags) ? formValues.tags : []
  const slackChannelsWatch = String(formValues.slackChannels ?? '')
    .split(',')
    .map((channel) => channel.trim())
    .filter(Boolean)
  const accessGroupsWatch = String(formValues.accessGroups ?? '')
    .split(',')
    .map((group) => group.trim())
    .filter(Boolean)

  const projectId = formValues.project
  const projectName = useMemo(() => {
    if (!projectId) return ''
    return projects?.find((p) => p.id === projectId)?.name ?? projectId
  }, [projectId, projects])

  // Handlers
  const handleAddTag = () => {
    const k = tagKey.trim()
    const v = tagValue.trim()

    const keyError = tagKeyValidator(k)
    const valueError = tagValueValidator(v)

    if (keyError || valueError) return
    if (!k || !v) return

    if (tagsWatch.some((t) => t.key === k)) {
      toast.error('A tag with this key already exists.')
      return
    }

    const next = [...tagsWatch, { key: k, value: v }] // preserves insertion order

    setValue('tags', next, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    setTagKey('')
    setTagValue('')
  }

  const handleRemoveTag = (key: string) => {
    setValue(
      'tags',
      tagsWatch.filter((t) => t.key !== key),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      }
    )
  }

  const fullname = useMemo(() => {
    const rawEnv = String(formValues.environment ?? '').trim()
    const envPrefix = rawEnv.charAt(0)

    let n = String(formValues.name ?? '').trim()

    if (!envPrefix || !/[A-Za-z]/.test(envPrefix)) return ''
    if (!n) return ''

    // Remove -p, -t, -q or -d prefix
    n = n.replace(/^[ptqd]-/, '')

    return `${envPrefix}-${n}`
  }, [formValues.environment, formValues.name])

  const clusterId = useMemo(() => {
    if (!fullname) return ''
    return `${fullname}-${clusterIdSuffix}`
  }, [fullname, clusterIdSuffix])

  useEffect(() => {
    setValue('fullname', fullname, { shouldValidate: true, shouldDirty: false })
    setValue('clusterId', clusterId, { shouldValidate: true, shouldDirty: false })
  }, [fullname, clusterId, setValue])

  // Helper functions for form
  const onSubmit = async () => {
    try {
      const response = await fetch('/api/create-cluster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createClusterPayload),
      })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      toast.success('Cluster request sent')
      router.push(`${routes.app.clusters.getHref()}?creating-cluster=true`)
    } catch {
      toast.error('Failed to send cluster request')
    }
  }

  // Routing
  const router = useRouter()

  const renderField = (key: FieldKey) => {
    const cfg = fieldMap.get(key)
    if (!cfg) return null
    return (
      <div className={cn('text-wrap', key === 'other' && 'col-span-3 w-full')} key={key}>
        {cfg.render({ control, register, setValue, errors, getValues, trigger })}
      </div>
    )
  }
  const fieldLabel = (key: FieldKey) => fieldMap.get(key)?.label ?? ''

  const createClusterPayload = useMemo(
    () => ({
      orderer: orderer || '',
      project: projectName,
      name: formValues.fullname || '',
      datacenter: regions.find((region) => region.key === formValues.region)?.display.trim() || '',
      team: formValues.team || '',
      environment: formValues.environment || '',
      namespace: formValues.namespace || '',
      machine_class: formValues.machineClass || '',
      nodes: String(formValues.numOfNodes ?? ''),
      high_availability: formValues.highAvailability ? 'Ja - For Produksjons-cluster!' : 'Nei - Gjelder test/qa/dev',
      criticality: formValues.criticality || '',
      sensitivity: formValues.sensitivity || '',
      service_id: formValues.serviceId || '',
      lcm: formValues.lcm || '',
      tech_contact_upn: formValues.techRepEmail || '',
      tech_contact_email: formValues.techRepEmail || '',
      tech_contact_phone: formValues.techRepPhone || '',
      slack_channel: formValues.slackChannels || '',
      access_groups: formValues.accessGroups || '',
      other: formValues.other || '',
    }),
    [formValues, orderer, projectName]
  )

  const Summary = () => (
    <div className='w-fit'>
      <h3 className={cn('mx-auto w-fit text-3xl', 'sm:text-3xl', 'md:text-5xl')}>Summary</h3>
      <div className={cn('border rounded-lg p-4 overflow-hidden my-4', 'w-full', 'sm:w-96')}>
        <table className={cn('border-separate border-spacing-0 w-full', 'text-sm', 'sm:text-md')}>
          <tbody>
            <SummaryTableRow title='Project' content={projectName} />
            <SummaryTableRow title='Namespace' content={String(formValues.namespace ?? '')} />
            <SummaryTableRow title='Service ID' content={String(formValues.serviceId ?? '')} />
            <SummaryTableRow title='Cluster name' content={fullname} />
            <SummaryTableRow title='Cluster ID' content={clusterId} />
            <SummaryTableRow title='Environment' content={String(formValues.environment ?? '')} />
            <SummaryTableRow title='Team' content={String(formValues.team ?? '')} />
            <tr>
              <td className='font-semibold pt-1 pb-3 pr-4 align-top'>Slack channels</td>
              <td className='py-1'>
                {slackChannelsWatch.length === 0 ? (
                  <span className='italic opacity-70'>No slack channels</span>
                ) : (
                  slackChannelsWatch.map((channel) => <p key={channel}>{channel}</p>)
                )}
              </td>
            </tr>
            <tr>
              <td className='font-semibold py-1 pr-4 align-top'>Access groups</td>
              <td className='py-1'>
                {accessGroupsWatch.length === 0 ? (
                  <span className='italic opacity-70'>No access groups</span>
                ) : (
                  accessGroupsWatch.map((group) => <p key={group}>{group}</p>)
                )}
              </td>
            </tr>
            <SummaryTableRow title='Techrep email' content={String(formValues.techRepEmail ?? '')} />
            <SummaryTableRow title='Techrep number' content={String(formValues.techRepPhone ?? '')} />
            <SummaryTableRow title='Sensitivity' content={String(formValues.sensitivity ?? '')} />
            <SummaryTableRow title='Criticality' content={String(formValues.criticality ?? '')} />
            <SummaryTableRow title='LCM' content={String(formValues.lcm ?? '')} />
            <SummaryTableRow title='Other' content={String(formValues.other ?? 'No additional information')} />

            <tr>
              <td className='font-semibold pt-1 pb-3 pr-4 align-top'>Tags</td>
              <td>
                {tagsWatch.length === 0 ? (
                  <span className='italic opacity-70'>No tags</span>
                ) : (
                  tagsWatch.map(({ key, value }) => (
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

  // Wizard

  // BASICS: name, project, service ID, namespace, environment
  // OWNERSHIP: owner, technical responsible, slack channel
  // METADATA: sensitivity, criticality, life cycle management, tags
  // INFRASTRUCTURE: region, machine class, num of nodes, worker pool name

  const content: WizardContentType[] = [
    {
      title: 'Basics',
      wizardContent: (
        <div key='basics' className='w-fit mx-auto'>
          <div className={cn('grid grid-cols-3 gap-x-8 gap-y-4 w-fit')}>
            <h3 className='text-3xl'>Project</h3>
            <h3 className='text-3xl'>Namespace</h3>
            <h3 className='text-3xl'>{fieldLabel('serviceId')}</h3>
            <ProjectInput control={control} projects={projects} />
            <NamespaceInput control={control} namespaces={namespacesNames} />
            {renderField('serviceId')}

            <div className='col-span-3' />

            <h3 className='text-3xl'>{fieldLabel('name')}</h3>
            <h3 className='text-3xl'>{fieldLabel('environment')}</h3>
            <div />
            {renderField('name')}
            {renderField('environment')}
          </div>
          <p className='w-183 mt-12'>
            The project and namespace must be available before the cluster is created. Please contact support if you
            wish to use a new project or namespace.
          </p>
          {fullname && clusterId && (
            <div className='mt-4 text-xl text-center'>
              <div>
                Full cluster name: <b>{fullname}</b>
              </div>
              <div className='mt-2'>
                Cluster ID: <b>{clusterId}</b>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Ownership',
      wizardContent: (
        <div key='ownership' className='w-fit mx-auto'>
          <div className={cn('grid grid-cols-3 gap-x-8 gap-y-6 w-fit')}>
            <h3 className='text-3xl'>{fieldLabel('team')}</h3>
            <h3 className='text-3xl'>{fieldLabel('slackChannels')}</h3>
            <h3 className='text-3xl'>{fieldLabel('accessGroups')}</h3>
            {renderField('team')}
            {renderField('slackChannels')}
            {renderField('accessGroups')}

            <h3 className='text-3xl'>{fieldLabel('techRepEmail')}</h3>
            <h3 className='text-3xl'>{fieldLabel('techRepPhone')}</h3>
            <div />
            {renderField('techRepEmail')}
            {renderField('techRepPhone')}
          </div>
        </div>
      ),
    },
    {
      title: 'Metadata',
      wizardContent: (
        <div key='metadata' className='w-fit mx-auto'>
          <div className={cn('grid grid-cols-3 gap-x-8 gap-y-4 w-fit mb-8')}>
            <h3 className='text-3xl'>{fieldLabel('sensitivity')}</h3>
            <h3 className='text-3xl'>{fieldLabel('criticality')}</h3>
            <h3 className='text-3xl'>{fieldLabel('lcm')}</h3>

            {renderField('sensitivity')}
            {renderField('criticality')}
            {renderField('lcm')}

            <h3 className='text-3xl'>{fieldLabel('other')}</h3>
            <div />
            <div />
            {renderField('other')}
          </div>

          <TagsSection
            tags={tagsWatch}
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
      title: 'Infrastructure',
      wizardContent: (
        <div key='infrastructure' className='w-fit mx-auto'>
          <div className={cn('grid grid-cols-3 gap-x-8 gap-y-4 w-fit mb-8')}>
            <h3 className='text-3xl'>{fieldLabel('region')}</h3>
            <h3 className='text-3xl'>{fieldLabel('machineClass')}</h3>
            <h3 className='text-3xl'>{fieldLabel('numOfNodes')}</h3>
            {renderField('region')}
            {renderField('machineClass')}
            {renderField('numOfNodes')}
            <h3 className='text-3xl'>{fieldLabel('wpName')}</h3>
            <div />
            <div />

            {renderField('wpName')}
          </div>

          <MachineProfileTable />
        </div>
      ),
    },
    {
      title: 'Summary',
      wizardContent: (
        <div key='summary' className='w-fit mx-auto'>
          <Summary />
        </div>
      ),
    },
  ]

  return (
    <Form {...form}>
      <Wizard<CreateClusterForm>
        content={content}
        trigger={trigger}
        stepFields={stepFields}
        summary={<Summary />}
        finalStepAction={
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Button type='submit' className={cn('text-xs', 'sm:text-sm')}>
              Create cluster
            </Button>
          </form>
        }
      />
    </Form>
  )
}
