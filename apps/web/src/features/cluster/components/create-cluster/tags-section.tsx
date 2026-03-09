import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { cn } from '@/utils/clsxm'
import { PlusIcon, Trash } from 'lucide-react'
import { Fragment, useState } from 'react'
import { errorTextStyling } from '../../config/create-cluster-styling'
import { tagKeyValidator, tagValueValidator } from '../../utils/tags-validators'

type TagsSectionProps = {
  tags: { key: string; value: string }[]
  tagKey: string
  tagValue: string
  setTagKey: (v: string) => void
  setTagValue: (v: string) => void
  addTag: () => void
  removeTag: (key: string) => void
}

export const TagsSection = ({
  tags,
  tagKey,
  tagValue,
  setTagKey,
  setTagValue,
  addTag,
  removeTag,
}: TagsSectionProps) => {
  const [tagKeyError, setTagKeyError] = useState<string | null>(null)
  const [tagValueError, setTagValueError] = useState<string | null>(null)
  const safeTags: { key: string; value: string }[] = Array.isArray(tags) ? tags : []
  return (
    <>
      <h3 className={cn('mx-auto w-fit mb-4 text-3xl', 'sm:text-3xl', 'md:text-5xl')}>Tags</h3>
      <section>
        <div
          className={cn(
            'hidden',
            'sm:grid sm:grid-cols-[10rem_10rem_auto] md:grid-cols-[15rem_15rem_auto] gap-y-4 items-center border p-4 rounded-lg'
          )}
        >
          <b>Key</b>
          <b>Value</b>
          <b></b>

          {safeTags.map(({ key, value }) => (
            <Fragment key={key}>
              <span>{key}</span>
              <span>{value}</span>
              <Button type='button' size='icon' variant='destructive' onClick={() => removeTag(key)}>
                <Trash />
              </Button>
            </Fragment>
          ))}

          <Input
            className='sm:w-36 md:w-auto'
            placeholder='Enter key...'
            value={tagKey}
            onChange={(e) => {
              const next = e.target.value
              setTagKey(e.target.value)
              setTagKeyError(tagKeyValidator(next))
            }}
          />
          <Input
            className='sm:w-36 md:w-auto'
            placeholder='Enter value...'
            value={tagValue}
            onChange={(e) => {
              const next = e.target.value
              setTagValue(e.target.value)
              setTagValueError(tagValueValidator(next))
            }}
          />

          <Button
            type='button'
            className='w-20'
            onClick={addTag}
            disabled={!tagKey.trim() || !tagValue.trim() || !!tagKeyError || !!tagValueError}
          >
            <PlusIcon /> Add
          </Button>
          <p className={errorTextStyling}>{tagKeyError}</p>
          <p className={errorTextStyling}>{tagValueError}</p>
        </div>
      </section>
      <section>
        <div className='sm:hidden items-center border p-4 rounded-lg'>
          <b>Key</b>
          <Input
            placeholder='Enter key...'
            value={tagKey}
            onChange={(e) => {
              const next = e.target.value
              setTagKey(e.target.value)
              setTagKeyError(tagKeyValidator(next))
            }}
          />
          {tagKeyError ? <p className={errorTextStyling}>{tagKeyError}</p> : null}
          <b>Value</b>
          <Input
            placeholder='Enter value...'
            value={tagValue}
            onChange={(e) => {
              const next = e.target.value
              setTagValue(e.target.value)
              setTagValueError(tagValueValidator(next))
            }}
          />
          {tagValueError ? <p className={errorTextStyling}>{tagValueError}</p> : null}
          <Button
            type='button'
            className='w-20'
            onClick={addTag}
            disabled={!tagKey.trim() || !tagValue.trim() || !!tagKeyError || !!tagValueError}
          >
            <PlusIcon /> Add
          </Button>

          {safeTags.map(({ key, value }) => (
            <div key={key} className='flex justify-between items-center'>
              <span>
                {key}: {value}
              </span>
              <Button type='button' size='icon' variant='destructive' onClick={() => removeTag(key)}>
                <Trash />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
