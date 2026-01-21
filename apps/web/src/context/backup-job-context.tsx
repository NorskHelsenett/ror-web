'use client'

import type { BackupJob } from '@ror/js-api-client'
import { createContext, useContext } from 'react'

export interface BackupJobContextData {
  backupJob: BackupJob
}

const BackupJobContext = createContext<BackupJobContextData | undefined>(undefined)

export const useBackupJobContext = (): BackupJobContextData => {
  const context = useContext(BackupJobContext)
  if (!context) {
    throw new Error('useBackupJobContext must be used inside a BackupJobProvider')
  }
  return context
}

interface BackupJobProviderProps {
  value: BackupJobContextData
  children: React.ReactNode
}

export const BackupJobProvider: React.FC<BackupJobProviderProps> = ({ value, children }) => {
  return <BackupJobContext.Provider value={value}>{children}</BackupJobContext.Provider>
}
