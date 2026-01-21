import { cn } from '@/utils/clsxm'
import { CircleCheck, TriangleAlert, Skull, CircleHelp } from 'lucide-react'
import { HealthStatus } from '../types/health-status'

/**
 * Maps each `HealthStatus` to its corresponding visual representation.
 *
 * Each entry contains:
 * - `icon`: A ReactNode representing the status icon.
 * - `colors`: An array of Tailwind CSS class names for background colors, supporting both light and dark themes.
 *
 * Statuses:
 * - `ok` and `working`: Use a checkmark icon and cyan colors.
 * - `warning`: Uses a triangle alert icon and orange colors.
 * - `error`: Uses a skull icon and red colors.
 * - `unknown`: Uses a help icon and gray colors.
 */
const healthVisuals: Record<HealthStatus, { icon: React.ReactNode; colors: string[] }> = {
  ok: {
    icon: <CircleCheck />,
    colors: ['bg-cyan-500', 'dark:bg-cyan-600'],
  },
  working: {
    icon: <CircleCheck />,
    colors: ['bg-cyan-500', 'dark:bg-cyan-600'],
  },
  warning: {
    icon: <TriangleAlert />,
    colors: ['bg-orange-500', 'dark:bg-orange-600'],
  },
  error: {
    icon: <Skull />,
    colors: ['bg-[#EF4444]', 'dark:bg-[#ED2828]'],
  },
  unknown: {
    icon: <CircleHelp />,
    colors: ['bg-gray-500', 'dark:bg-gray-600'],
  },
}

/**
 * Props for the HealthCircle component.
 *
 * @property {string} [className] - Optional CSS class name to apply to the component.
 * @property {Object} [healthCondition] - The health condition data to display.
 * @property {string | null | undefined} [healthCondition.message] - Optional message describing the health condition.
 * @property {string | null | undefined} [healthCondition.type] - Optional type of the health condition.
 * @property {HealthStatus | null | undefined} [healthCondition.status] - Optional status of the health condition.
 * @property {string | null | undefined} [healthCondition.lastTransitionTime] - Optional timestamp of the last status transition.
 * @property {string | null | undefined} [healthCondition.reason] - Optional reason for the current health condition.
 */
interface HealthCircleProps {
  className?: string
  healthCondition:
    | {
        message?: string | null | undefined
        type?: string | null | undefined
        status?: HealthStatus | null | undefined
        lastTransitionTime?: string | null | undefined
        reason?: string | null | undefined
      }
    | undefined
}

/**
 * Renders a circular health indicator with a status icon and color.
 *
 * @param {HealthCircleProps} props - The props for the HealthCircle component.
 * @param {string} [props.className] - Additional CSS classes to apply to the outer circle.
 * @param {object} [props.healthCondition] - The health condition object containing the status.
 * @param {string} [props.healthCondition.status] - The status of the health condition (e.g., 'healthy', 'warning', 'critical', etc.).
 */
export const HealthCircle = ({ className, healthCondition }: HealthCircleProps) => {
  const status = healthCondition?.status ?? 'unknown'
  const { colors, icon } = healthVisuals[status] ?? healthVisuals.unknown

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full border-[4px] border-neutral-100',
        'w-10 h-10',
        className
      )}
    >
      <div className={cn('flex items-center justify-center rounded-full w-full h-full', ...colors)}>{icon}</div>
    </div>
  )
}
