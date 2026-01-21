import { IconCircleCheckFilled, IconCircleXFilled, IconExclamationCircle } from '@tabler/icons-react'

export type StatusType = 'powerOn' | 'powerOff' | 'undefined' | 'default'

interface StatusIconProps {
  status: string
  className?: string
  showAnimation?: boolean
  size?: number
}

export const PowerStatusIcon = ({ status, showAnimation = true, size = 18 }: StatusIconProps) => {
  const getStatusType = (status: string): StatusType => {
    // Power on
    if (status === 'poweredOn') {
      return 'powerOn'
    }

    // Power off
    if (status === 'poweredOff') {
      return 'powerOff'
    }
    if (status == 'undefined') {
      return 'undefined'
    }

    // Default case
    return 'default'
  }

  const renderIcon = () => {
    const statusType = getStatusType(status)
    const animationClass = showAnimation ? 'animate-pulse' : ''

    switch (statusType) {
      case 'powerOn':
        if (status === 'poweredOn') {
          return (
            <IconCircleCheckFilled
              size={size}
              className={`${animationClass} text-green-500 dark:text-green-300`}
              style={{ width: size, height: size }}
            />
          )
        }
      case 'powerOff':
        if (status === 'poweredOff') {
          return (
            <IconCircleXFilled
              size={size}
              className={`text-red-500 dark:text-red-400`}
              style={{ width: size, height: size }}
            />
          )
        }
      default:
        return (
          <IconExclamationCircle
            size={size}
            className={`text-gray-500 dark:text-gray-400`}
            style={{ width: size, height: size }}
          />
        )
    }
  }

  return renderIcon()
}
