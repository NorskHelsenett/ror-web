import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import { negativeColors } from '@/utils/scale-colors'
import { Progress } from '@/components/shadcn/progress'

interface ResourceCardProps {
  capacity?: string
  used?: string
  percentage?: number | null
  showPercentage?: boolean
}

export function ResourceBar({ capacity, used, percentage, showPercentage = true }: ResourceCardProps) {
  const barColor = negativeColors(percentage ?? 0).join(' ')
  return (
    <div className='flex-1 min-w-0'>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='flex items-center'>
            <Progress value={percentage ?? 0} indicatorColor={barColor} className='flex-1 mr-1' />
            {showPercentage && (
              <span className='w-10 text-right text-sm text-muted-foreground tabular-nums'>
                {percentage == null ? '—' : `${percentage.toFixed(0)}%`}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Used: {used ?? 'data missing'}</p>
          <p>Capacity: {capacity ?? 'data missing'}</p>
          <p>Percentage: {percentage != null ? `${percentage}%` : 'data missing'}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
