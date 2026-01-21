import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { PlusIcon, Trash } from 'lucide-react'
import { Fragment } from 'react'

type TagsSectionProps = {
  tags: Record<string, string>
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
  return (
    <section>
      <h3>Tags</h3>
      <div className='grid grid-cols-[15rem_15rem_auto] gap-y-4 items-center'>
        <b>Key</b>
        <b>Value</b>
        <b></b>

        {Object.entries(tags).map(([key, value]) => (
          <Fragment key={key}>
            <span>{key}</span>
            <span>{value}</span>
            <Button type='button' size='icon' variant='destructive' onClick={() => removeTag(key)}>
              <Trash />
            </Button>
          </Fragment>
        ))}

        <Input placeholder='Enter key...' value={tagKey} onChange={(e) => setTagKey(e.target.value)} />
        <Input placeholder='Enter value...' value={tagValue} onChange={(e) => setTagValue(e.target.value)} />

        <Button type='button' className='w-20' onClick={addTag} disabled={!tagKey.trim() || !tagValue.trim()}>
          <PlusIcon /> Add
        </Button>
      </div>
    </section>
  )
}
