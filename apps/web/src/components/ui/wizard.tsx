import { cn } from '@/utils/clsxm'
import { useState } from 'react'
import { Button } from '../shadcn/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FieldValues, Path, UseFormTrigger } from 'react-hook-form'
import { WizardContentType } from '@/types/wizard-content-type'

interface WizardProps<TFieldValues extends FieldValues> {
  className?: string
  content: WizardContentType[]
  trigger: UseFormTrigger<TFieldValues>
  stepFields: Array<Array<Path<TFieldValues>>>
}

type ItemState = 'inactive' | 'active' | 'wasActive'

const HorizontalLine = ({ className }: { className?: string }) => {
  return <span className={cn('mx-4 h-px w-16 border-b', className)} />
}

const Circle = ({ className, circleNum }: { className?: string; circleNum: number }) => {
  return (
    <div className={cn('rounded-full border h-16 w-16 flex justify-center items-center', className)}>
      <p>{circleNum}</p>
    </div>
  )
}

const StepTitle = ({ title, className }: { title: string; className?: string }) => {
  return <p className={className}>{title}</p>
}

function getItemState(index: number, active: number, maxReached: number): ItemState {
  if (index === active) return 'active'
  if (index <= maxReached) return 'wasActive'
  return 'inactive'
}

const WizardItem = ({
  title,
  circleNum,
  withLine,
  itemState,
  clickable,
  onClick,
}: {
  title: string
  circleNum: number
  withLine: boolean
  itemState: ItemState
  clickable: boolean
  onClick?: () => void
}) => {
  const isActive = itemState === 'active'
  const isReached = itemState !== 'inactive'

  const circleClass = cn('mr-4', isReached && 'border-blue-600', isActive && 'bg-blue-600')

  const titleClass = cn(isReached && 'text-blue-600')
  const lineClass = cn(clickable && 'border-blue-600')

  return (
    <button
      type='button'
      onClick={clickable ? onClick : undefined}
      disabled={!clickable}
      aria-disabled={!clickable}
      aria-current={isActive ? 'step' : undefined}
      className={cn(
        'flex items-center min-w-56 text-left',
        clickable ? 'cursor-pointer' : 'cursor-not-allowed text-gray-600'
      )}
    >
      <Circle circleNum={circleNum} className={circleClass} />
      <StepTitle title={title} className={titleClass} />
      {withLine && <HorizontalLine className={lineClass} />}
    </button>
  )
}

export const Wizard = <TFieldValues extends FieldValues>({
  className,
  content,
  trigger,
  stepFields,
}: WizardProps<TFieldValues>) => {
  const [active, setActive] = useState(0)
  const [maxReached, setMaxReached] = useState(0)

  const goNext = async () => {
    const fields = stepFields[active] ?? []
    const ok = fields.length === 0 ? true : await trigger(fields, { shouldFocus: true })
    if (!ok) return

    const next = Math.min(active + 1, content.length - 1)
    setActive(next)
    setMaxReached((m) => Math.max(m, next))
  }

  const goToStep = (index: number) => {
    if (index <= maxReached) setActive(index)
  }

  return (
    <div className={cn(className, 'py-4')}>
      <div className='flex flex-wrap justify-center gap-y-6 pb-4 border-b'>
        {content.map((c, index) => {
          const state = getItemState(index, active, maxReached)
          const clickable = index <= maxReached

          return (
            <WizardItem
              key={index}
              title={c.title}
              circleNum={index + 1}
              withLine={index !== content.length - 1}
              itemState={state}
              clickable={clickable}
              onClick={() => goToStep(index)}
              aria-label={`Step ${index + 1}: ${c.title}`}
            />
          )
        })}
      </div>

      <div className='p-12'>
        {content[active]?.wizardContent}

        <div className='flex gap-4 justify-center mt-16'>
          {active > 0 && (
            <Button variant='outline' type='button' aria-label='Previous step' onClick={() => setActive((p) => p - 1)}>
              <ArrowLeft />
            </Button>
          )}
          {active < content.length - 1 && (
            <Button type='button' aria-label='Next step' onClick={goNext}>
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
