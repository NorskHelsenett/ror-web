import { Health } from '@ror/js-api-client'
import { IconIndicator } from '@ror/react/components/icon-indicator'

interface HealthStatusProps {
  status: Health
  className?: string
}

export function HealthStatus({ status, className }: HealthStatusProps) {
  switch (status) {
    case Health.Healthy:
      return <IconIndicator kind='normal' label='Operational' className={className} />
    case Health.Unhealthy:
      return <IconIndicator kind='caution-minor' label='Unhealthy' className={className} />
    case Health.Bad:
      return <IconIndicator kind='caution-major' label='Smelly' className={className} />
    case Health.Unknown:
    default:
      return <IconIndicator kind='unknown' label='Unknown status' className={className} />
  }
}
