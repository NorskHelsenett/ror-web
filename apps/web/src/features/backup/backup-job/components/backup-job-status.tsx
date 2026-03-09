'use client'

import { CheckCircle, CircleDashed, Pause, XCircle, AlertTriangle } from 'lucide-react'

export type BackupJobStatusType = 'active' | 'inactive' | 'paused' | 'deleted' | 'unknown'

interface BackupJobStatusProps {
  status: BackupJobStatusType
}

export const BackupJobStatus = ({ status }: BackupJobStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          Icon: CheckCircle,
          textColor: 'text-green-500',
          iconColor: 'text-green-500',
        }
      case 'inactive':
        return {
          Icon: CircleDashed,
          textColor: 'text-gray-500',
          iconColor: 'text-gray-500',
        }
      case 'paused':
        return {
          Icon: Pause,
          textColor: 'text-yellow-500',
          iconColor: 'text-yellow-500',
        }
      case 'deleted':
        return {
          Icon: XCircle,
          textColor: 'text-red-500',
          iconColor: 'text-red-500',
        }
      case 'unknown':
        return {
          Icon: AlertTriangle,
          textColor: 'text-orange-500',
          iconColor: 'text-orange-500',
        }
      default:
        return {
          Icon: null,
          textColor: 'text-gray-500',
          iconColor: 'text-gray-500',
        }
    }
  }

  const { Icon, textColor, iconColor } = getStatusConfig()

  return (
    <div className='flex items-center'>
      {Icon && <Icon className={`w-3 h-3 mr-2 ${iconColor}`} />}
      <span className={`capitalize text-sm ${textColor}`}>{status}</span>
    </div>
  )
}
