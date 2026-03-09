'use client'

import { CreateApiKeyRequest, CreateApiKeyRequestSchema, CreateApiKeyResponse } from '@ror/js-api-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createApiKey } from '../services/create-api-key'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/button'
import { CodeSnippet } from '@/components/ui/code-snippet'
import { Label } from '@/components/shadcn/label'
import { Input } from '@/components/shadcn/input'
import { Calendar } from '@/components/shadcn/calendar'
import { RotateCcw } from 'lucide-react'

type CreateApiKeyFormProps = {
  onCreated?: () => void
  onFinish?: () => void
}

const TTL_PRESETS: { label: string; ttl: number | undefined }[] = [
  { label: '7 days', ttl: 7 * 24 * 60 * 60 },
  { label: '30 days', ttl: 30 * 24 * 60 * 60 },
  { label: '90 days', ttl: 90 * 24 * 60 * 60 },
  { label: 'No expiration', ttl: Number.MAX_SAFE_INTEGER },
]

const calculateTTL = (date: Date): number => {
  const now = new Date()
  const targetMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  const ttlMs = targetMidnight.getTime() - now.getTime()
  return Math.max(0, Math.floor(ttlMs / 1000))
}

export const CreateApiKeyForm = ({ onCreated, onFinish }: CreateApiKeyFormProps) => {
  const [date, setDate] = useState<Date>(new Date())
  const [showCustom, setShowCustom] = useState<boolean>(false)
  const [created, setCreated] = useState<null | CreateApiKeyResponse>(null)

  const resetForm = () => {
    form.reset()
    setShowCustom(false)
    setDate(new Date())
  }

  const form = useForm<CreateApiKeyRequest>({
    resolver: zodResolver(CreateApiKeyRequestSchema),
    defaultValues: {
      name: '',
      ttl: 7 * 24 * 60 * 60,
    },
    mode: 'onChange',
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: CreateApiKeyRequest) {
    try {
      const res = await createApiKey(values)
      setCreated({ token: res.token, expires: res.expires })
      onCreated?.()
      toast.success('API key was created')
    } catch {
      toast.error('Could not create API key')
    }
  }

  if (created) {
    return (
      <div className='my-4 space-y-3'>
        <div className='rounded-md border p-3'>
          <div className='font-medium'>API key created</div>
          <p>
            The key will only be shown once. Copy it and save it somewhere safe. To use the API key, add a request
            header <code className='mx-1 px-2 py-0.5 border rounded-md font-mono text-sm align-middle'>X-API-KEY</code>{' '}
            and set the API key as the value. See the{' '}
            <a
              href='https://api.ror.nhn.no/swagger/index.html'
              className='inline align-baseline text-blue-600 hover:underline'
            >
              Swagger documentation
            </a>{' '}
            for the API endpoints.
          </p>

          <div className='mt-3 flex flex-col gap-2'>
            <CodeSnippet type='single'>{created.token}</CodeSnippet>

            <div className='flex flex-wrap gap-2'>
              <Button
                type='button'
                variant='default'
                onClick={() => {
                  setCreated(null)
                  form.reset()
                  onFinish?.()
                }}
              >
                Finish
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setCreated(null)
                  resetForm()
                }}
              >
                Create new key
              </Button>
            </div>

            <div className='text-xs text-muted-foreground'>
              Expires: {created.expires ? new Date(created.expires).toLocaleString() : 'Never'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <div className='flex justify-between mt-8 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>API key name</Label>
          <Input id='name' {...form.register('name')} />
          {form.formState.errors.name?.message && (
            <p className='text-sm text-destructive'>{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label>Expiration</Label>
          <div className='flex flex-wrap gap-2'>
            {TTL_PRESETS.map((p) => (
              <Button
                key={p.label}
                type='button'
                variant={form.watch('ttl') === p.ttl && !showCustom ? 'default' : 'outline'}
                disabled={isSubmitting}
                onClick={() => {
                  form.setValue('ttl', p.ttl, { shouldValidate: true, shouldDirty: true })
                  setShowCustom(false)
                }}
              >
                {p.label}
              </Button>
            ))}

            <Button
              key={'Custom'}
              type='button'
              variant={showCustom ? 'default' : 'outline'}
              disabled={isSubmitting}
              onClick={() => setShowCustom(true)}
            >
              Custom
            </Button>
          </div>

          <div className='flex items-center gap-3'>
            {showCustom && (
              <Calendar
                mode='single'
                required
                defaultMonth={date}
                selected={date}
                showWeekNumber
                className='rounded-lg'
                disabled={{ before: new Date(new Date().setHours(24, 0, 0, 0)) }}
                onSelect={(d) => {
                  if (!d) return
                  setDate(d)
                  form.setValue('ttl', calculateTTL(d), { shouldValidate: true, shouldDirty: true })
                }}
              />
            )}
          </div>

          {form.formState.errors.ttl?.message && (
            <p className='text-sm text-destructive'>{form.formState.errors.ttl.message}</p>
          )}
        </div>
      </div>

      <div className='flex gap-2 mb-8'>
        <Button type='submit' disabled={!form.formState.isValid || isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
        <Button
          type='button'
          variant='ghost'
          disabled={isSubmitting}
          onClick={() => resetForm()}
          className='hover:underline'
        >
          <RotateCcw />
          Reset
        </Button>
      </div>
    </form>
  )
}
