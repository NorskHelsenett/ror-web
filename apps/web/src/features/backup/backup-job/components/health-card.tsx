import { cn } from '@/utils/clsxm'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDashed,
  HelpCircle,
  LoaderCircle,
  PauseCircle,
  Trash2,
  XCircle,
} from 'lucide-react'

export type HealthCardType =
  | 'summary'
  | 'status'
  | 'total'
  | 'active'
  | 'paused'
  | 'inactive'
  | 'deleted'
  | 'succeeded'
  | 'successful'
  | 'succeded'
  | 'failed'
  | 'running'
  | 'warning'
  | 'unknown'

type HealthCardVisual = {
  Icon: LucideIcon
  iconClassName: string
  containerClassName: string
  spin?: boolean
}

const normalizeHealthCardType = (
  type?: HealthCardType
): Exclude<HealthCardType, 'successful' | 'succeded' | 'summary' | 'status'> => {
  if (!type) return 'unknown'
  if (type === 'summary') return 'total'
  if (type === 'status') return 'warning'
  if (type === 'successful' || type === 'succeded') return 'succeeded'
  return type
}

const getHealthCardVisual = (type?: HealthCardType): HealthCardVisual => {
  const normalizedType = normalizeHealthCardType(type)
  switch (normalizedType) {
    case 'total':
      return {
        Icon: BriefcaseBusiness,
        iconClassName: 'text-blue-600',
        containerClassName: 'bg-blue-500/15',
      }
    case 'active':
    case 'succeeded':
      return {
        Icon: CheckCircle2,
        iconClassName: 'text-green-600',
        containerClassName: 'bg-green-500/15',
      }
    case 'paused':
      return {
        Icon: PauseCircle,
        iconClassName: 'text-amber-600',
        containerClassName: 'bg-amber-500/15',
      }
    case 'inactive':
      return {
        Icon: CircleDashed,
        iconClassName: 'text-slate-500',
        containerClassName: 'bg-slate-500/15',
      }
    case 'deleted':
      return {
        Icon: Trash2,
        iconClassName: 'text-rose-600',
        containerClassName: 'bg-rose-500/15',
      }
    case 'failed':
      return {
        Icon: XCircle,
        iconClassName: 'text-red-600',
        containerClassName: 'bg-red-500/15',
      }
    case 'running':
      return {
        Icon: LoaderCircle,
        iconClassName: 'text-sky-600',
        containerClassName: 'bg-sky-500/15',
        spin: true,
      }
    case 'warning':
      return {
        Icon: AlertTriangle,
        iconClassName: 'text-amber-600',
        containerClassName: 'bg-amber-500/15',
      }
    case 'unknown':
    default:
      return {
        Icon: HelpCircle,
        iconClassName: 'text-gray-500',
        containerClassName: 'bg-gray-500/15',
      }
  }
}

function HealthCard({
  className,
  size,
  type,
  resource,
  ...props
}: React.ComponentProps<'div'> & { size?: 'sm' | 'md' | 'lg' } & { type?: HealthCardType } & {
  resource?: 'backupJob' | 'backupRun'
}) {
  const normalizedType = normalizeHealthCardType(type)

  return (
    <div
      data-slot='card'
      data-size={size}
      data-type={normalizedType}
      data-resource={resource}
      className={cn(
        'group/card relative flex flex-col gap-2 overflow-hidden rounded-xl bg-card py-2 text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className
      )}
      {...props}
    />
  )
}

const HealthCardIcon = ({
  className,
  type,
  placement = 'inline',
  children,
  ...props
}: React.ComponentProps<'div'> & { type?: HealthCardType; placement?: 'inline' | 'corner' }) => {
  const visual = getHealthCardVisual(type)
  const Icon = visual.Icon
  const isCorner = placement === 'corner'

  return (
    <div
      data-slot='card-icon'
      data-type={normalizeHealthCardType(type)}
      data-placement={placement}
      className={cn(
        isCorner
          ? 'absolute right-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-bl-2xl rounded-tr-xl'
          : 'flex h-11 w-11 items-center justify-center rounded-full',
        visual.containerClassName,
        className
      )}
      {...props}
    >
      {children ?? (
        <Icon
          className={cn(isCorner ? 'h-6 w-6' : 'h-5 w-5', visual.iconClassName, visual.spin && 'animate-spin')}
          aria-hidden='true'
        />
      )}
    </div>
  )
}

const HealthCardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot='card-header' className={cn('@container/card-header h-8', className)} {...props} />
}

const HealthCardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot='card-title' className={cn('leading-none font-semibold', className)} {...props} />
}

const HealthCardContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot='card-content' className={cn('px-6 group-data-[size=sm]/card:px-4', className)} {...props} />
}

export { HealthCard, HealthCardHeader, HealthCardTitle, HealthCardContent, HealthCardIcon }
