'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card'
import copy from 'clipboard-copy'
import { Badge } from '@/components/shadcn/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs'
import type { BackupJob, BackupRun } from '@ror/js-api-client'
import type { VMWithBackupStatus } from '@/features/vms/backup/utils/map-backup-to-vm'
import {
  getBackupJobId,
  getBackupJobLocation,
  getBackupJobName,
  getBackupJobRetentionDuration,
  getBackupJobRetentionUnit,
  getBackupJobStartTime,
} from '@/features/vms/backup/utils/backup-job'
import {
  getBackupRunId,
  getBackupRunStartTime,
  getBackupRunEndTime,
  getBackupRunExpiryTime,
  getBackupRunInfo,
  getBackupRunMappedBackupJobId,
} from '@/features/vms/backup/utils/backup-run'
import { formatDistance, format, isAfter } from 'date-fns'
import { Clock, Calendar, HardDrive, AlertTriangle, CheckCircle, XCircle, LoaderCircle, Loader } from 'lucide-react'
import { CopyButton } from '@/components/ui/copy-button'
import Link from 'next/link'

interface BackupOverviewProps {
  vm: VMWithBackupStatus
  backupJobs: BackupJob[]
  backupRuns: BackupRun[]
}

const formatDateTime = (dateString: string) => {
  return format(new Date(dateString), "MMM dd, yyyy 'at' HH:mm")
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getStatusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'succeeded':
      return <CheckCircle className='w-4 h-4 text-green-500' />
    case 'failed':
      return <XCircle className='w-4 h-4 text-red-500' />
    case 'running':
      return <Loader className='w-4 h-4 text-blue-500 animate-spin' />
    default:
      return <AlertTriangle className='w-4 h-4 text-gray-400' />
  }
}

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'succeeded':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    case 'running':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  }
}

const getBackupStatusColor = (isActive: boolean, hasRuns: boolean, hasActiveJobs: boolean, latestStatus: string) => {
  if (isActive) {
    return getStatusColor(latestStatus)
  } else if (hasRuns) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
  } else if (hasActiveJobs) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
  }
}

const BackupJobCard: React.FC<{ job: BackupJob; index: number; backupRuns: BackupRun[] }> = ({
  job,
  index,
  backupRuns,
}) => {
  const backupJobId = getBackupJobId(job)
  const relatedBackupRuns = backupRuns.filter((run) => getBackupRunMappedBackupJobId(run) === backupJobId)

  return (
    <Card key={getBackupJobId(job) || index}>
      <CardHeader>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
              <HardDrive className='w-4 h-4' />
              <span className='font-medium uppercase tracking-wide'>Backup Job</span>
            </div>
            <div className='flex items-center gap-2'>
              <Badge variant='outline' className='font-mono text-xs '>
                <Link href={`/vms/backup/backup-jobs?backupJobId=${getBackupJobId(job)}`}>
                  <Badge
                    variant='default'
                    className='text-gray-800 dark:text-gray-200 font-mono text-xs cursor-pointer hover:underline dark:hover:underline transition-colors bg-transparent border-0 p-0'
                  >
                    {getBackupJobId(job)}
                  </Badge>
                </Link>

                <CopyButton
                  className='bg-transparent p-0 border-0 text-gray-400 transition-colors'
                  onClick={(e) => {
                    e.preventDefault()
                    void copy(getBackupJobId(job))
                  }}
                />
              </Badge>
            </div>
          </div>
          <CardTitle className='text-xl font-semibold flex items-center gap-1'>
            {getBackupJobName(job)}
            <CopyButton
              className='bg-transparent p-0 border-0 text-gray-400 transition-colors'
              onClick={(e) => {
                e.preventDefault()
                void copy(getBackupJobName(job))
              }}
            />
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              Location
            </label>
            <p className='text-sm font-medium'>{getBackupJobLocation(job) || 'N/A'}</p>
          </div>
          <div>
            <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              Retention
            </label>
            <p className='text-sm font-medium'>
              {getBackupJobRetentionDuration(job)} {getBackupJobRetentionUnit(job)}
            </p>
          </div>
        </div>

        {getBackupJobStartTime(job) && (
          <div>
            <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              Scheduled start time
            </label>
            <p className='text-sm font-medium'>{getBackupJobStartTime(job)}</p>
          </div>
        )}

        <div className='pt-2 border-t'>
          <div className='flex items-center justify-between text-sm'>
            <span className='font-medium text-gray-600 dark:text-gray-400'>Recent Runs</span>
            <span className='text-gray-500'>{relatedBackupRuns.length} total</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const BackupRunCard: React.FC<{ run: BackupRun; isLatest: boolean }> = ({ run, isLatest }) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const runInfo = getBackupRunInfo(run)
  const startTime = getBackupRunStartTime(run)
  const endTime = getBackupRunEndTime(run)
  const expiryTime = getBackupRunExpiryTime(run)
  const status = runInfo?.backupDestinations?.[0]?.status || 'Unknown'
  const isExpired = expiryTime ? isAfter(new Date(), new Date(expiryTime)) : false
  const backupJobId = getBackupRunMappedBackupJobId(run)

  return (
    <Card className={isLatest ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}>
      <CardHeader>
        <CardTitle className='text-lg flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {getStatusIcon(status)}
            <span>Backup Run</span>
            {isLatest && (
              <Badge className='bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-sm'>Latest</Badge>
            )}
          </div>
          <div className='flex items-center space-x-2 '>
            <Badge variant='outline' className='font-mono text-xs'>
              <Link href={`/vms/backup/backup-runs?backupRunId=${getBackupRunId(run)}`}>
                <Badge
                  variant='default'
                  className='text-gray-800 dark:text-gray-200 font-mono text-xs cursor-pointer hover:underline dark:hover:underline transition-colors bg-transparent border-0 p-0'
                >
                  {getBackupRunId(run)}
                </Badge>
              </Link>
              <div className='flex items-center gap-2'>
                <CopyButton
                  className='bg-transparent p-0 border-0 text-gray-400 transition-colors'
                  onClick={(e) => {
                    e.preventDefault()
                    void copy(getBackupRunId(run))
                  }}
                />
              </div>
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Always visible: Status and basic timing */}
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>Status</span>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
        <div className='pt-2 border-t'></div>
        {backupJobId && (
          <div className='space-y-1'>
            <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center space-x-1'>
              Backup job ID
            </label>
            <span className='text-sm font-medium items-center text-gray-900 dark:text-gray-100 flex gap-2'>
              {backupJobId}
              <CopyButton
                className='bg-transparent p-0 border-0 text-gray-400 transition-colors'
                onClick={(e) => {
                  e.preventDefault()
                  void copy(backupJobId)
                }}
              />
            </span>
          </div>
        )}
        {startTime && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center space-x-1'>
                <Calendar className='w-3 h-3' />
                <span>Started</span>
              </label>
              <p className='text-sm font-medium'>{formatDateTime(startTime)}</p>
            </div>
            {endTime && (
              <div>
                <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center space-x-1'>
                  <Calendar className='w-3 h-3' />
                  <span>Completed</span>
                </label>
                <p className='text-sm font-medium'>{formatDateTime(endTime)}</p>
              </div>
            )}
          </div>
        )}
        {expiryTime && (
          <div
            className={`p-3 rounded-lg border ${isExpired ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}
          >
            <div className='flex items-center space-x-2'>
              <AlertTriangle className={`w-4 h-4 ${isExpired ? 'text-red-500' : 'text-gray-400'}`} />
              <span
                className={`text-sm font-medium ${isExpired ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {isExpired ? 'Expired' : 'Expires'}: {formatDateTime(expiryTime)}
              </span>
            </div>
          </div>
        )}

        <div className='flex items-center justify-between pt-2 text-sm text-gray-500 dark:text-gray-400'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <svg
              className={`mr-1 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
            <span>{isExpanded ? 'Hide backup details' : 'Show backup details'}</span>
          </button>

          {!isExpanded && runInfo?.backupDestinations && (
            <span>
              {runInfo.backupDestinations.length} destination{runInfo.backupDestinations.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {isExpanded && (
          <div className='space-y-4 pt-2 border-t'>
            {runInfo?.size && (
              <div className='pt-2 '>
                <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block'>
                  Backup Size
                </label>
                <div className='grid grid-cols-3 gap-2 text-center'>
                  {runInfo.size.sourceSize && (
                    <div>
                      <div className='text-sm font-bold text-blue-600 dark:text-blue-400'>
                        {formatBytes(runInfo.size.sourceSize)}
                      </div>
                      <div className='text-xs text-gray-500'>Source</div>
                    </div>
                  )}
                  {runInfo.size.logicalSize && (
                    <div>
                      <div className='text-sm font-bold text-green-600 dark:text-green-400'>
                        {formatBytes(runInfo.size.logicalSize)}
                      </div>
                      <div className='text-xs text-gray-500'>Logical</div>
                    </div>
                  )}
                  {runInfo.size.physicalSize && (
                    <div>
                      <div className='text-sm font-bold text-purple-600 dark:text-purple-400'>
                        {formatBytes(runInfo.size.physicalSize)}
                      </div>
                      <div className='text-xs text-gray-500'>Physical</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {runInfo?.backupDestinations && runInfo.backupDestinations.length > 0 && (
              <div className='pt-2 border-t'>
                <label className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3 block'>
                  Backup Destinations
                </label>
                <div className='space-y-3'>
                  {runInfo.backupDestinations.map((destination, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700'
                    >
                      <div className='flex-1'>
                        <div className='flex items-center space-x-2 mb-1'>
                          <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {destination.name || 'Unnamed Destination'}
                          </span>
                          <Badge variant='outline' className='text-xs'>
                            {destination.type || 'Unknown'}
                          </Badge>
                        </div>
                        {destination.id && (
                          <div className='text-xs text-gray-500 dark:text-gray-400 font-mono'>ID: {destination.id}</div>
                        )}
                      </div>
                      <div className='flex items-center space-x-2'>
                        {getStatusIcon(destination.status || 'Unknown')}
                        <Badge className={`text-xs ${getStatusColor(destination.status || 'Unknown')}`}>
                          {destination.status || 'Unknown'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export const BackupOverview: React.FC<BackupOverviewProps> = ({ backupJobs, backupRuns }) => {
  const latestRun = React.useMemo(() => {
    if (backupRuns.length === 0) return null

    return backupRuns.reduce((latest, run) => {
      const runStartTime = getBackupRunStartTime(run)
      const latestStartTime = getBackupRunStartTime(latest)

      if (!runStartTime) return latest
      if (!latestStartTime) return run

      return new Date(runStartTime) > new Date(latestStartTime) ? run : latest
    })
  }, [backupRuns])

  const backupSummary = React.useMemo(() => {
    const hasActiveJob = backupJobs.length > 0
    const hasRuns = backupRuns.length > 0
    const latestRunInfo = latestRun ? getBackupRunInfo(latestRun) : null

    return {
      hasActiveJob,
      hasRuns,
      totalJobs: backupJobs.length,
      totalRuns: backupRuns.length,
      latestStatus: latestRunInfo?.backupDestinations?.[0]?.status || 'Unknown',
      isActive: hasActiveJob && hasRuns,
    }
  }, [backupJobs, backupRuns, latestRun])

  const BackupStatusCard = () => (
    <Card className='bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <HardDrive className='w-5 h-5' />
          <span>Backup Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>Current Status</span>
          <div className='flex items-center space-x-2'>
            {backupSummary.isActive ? (
              getStatusIcon(backupSummary.latestStatus)
            ) : backupSummary.hasRuns ? (
              <AlertTriangle className='w-4 h-4 text-amber-500' />
            ) : backupSummary.hasActiveJob ? (
              <LoaderCircle className='w-4 h-4 text-blue-500 animate-spin' />
            ) : (
              <XCircle className='w-4 h-4 text-gray-400' />
            )}
            <Badge
              className={getBackupStatusColor(
                backupSummary.isActive,
                backupSummary.hasRuns,
                backupSummary.hasActiveJob,
                backupSummary.latestStatus
              )}
            >
              {backupSummary.isActive
                ? 'Active'
                : backupSummary.hasRuns
                  ? 'Historical'
                  : backupSummary.hasActiveJob
                    ? 'Configured backup'
                    : 'No Backups'}
            </Badge>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 pt-2 border-t'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{backupSummary.totalJobs}</div>
            <div className='text-xs text-gray-500 uppercase tracking-wide'>Backup Jobs</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-600 dark:text-green-400'>{backupSummary.totalRuns}</div>
            <div className='text-xs text-gray-500 uppercase tracking-wide'>Backup Runs</div>
          </div>
        </div>

        {latestRun && (
          <div className='pt-2 border-t'>
            <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
              <Clock className='w-4 h-4' />
              <span>
                Last backup:{' '}
                {formatDistance(new Date(getBackupRunStartTime(latestRun)!), new Date(), { addSuffix: true })}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (backupJobs.length === 0 && backupRuns.length === 0) {
    return (
      <div className='flex items-center justify-center p-12 bg-gray-50 dark:bg-gray-900/20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700'>
        <div className='text-center space-y-3'>
          <HardDrive className='w-12 h-12 text-gray-400 mx-auto' />
          <h3 className='text-lg font-semibold text-gray-600 dark:text-gray-400'>No Backup Data</h3>
          <p className='text-gray-500 dark:text-gray-500 max-w-md'>
            No backup jobs or runs found for this VM. Backup configuration may not be set up yet.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6 mb-6'>
      <BackupStatusCard />
      <Tabs defaultValue={backupJobs.length > 0 ? 'jobs' : 'runs'} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='jobs' disabled={backupJobs.length === 0}>
            Backup Jobs ({backupJobs.length})
          </TabsTrigger>
          <TabsTrigger value='runs' disabled={backupRuns.length === 0}>
            Backup Runs ({backupRuns.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='jobs' className='space-y-4'>
          {backupJobs.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {backupJobs.map((job, index) => (
                <BackupJobCard key={getBackupJobId(job) || index} job={job} index={index} backupRuns={backupRuns} />
              ))}
            </div>
          ) : (
            <div className='text-center py-8 text-gray-500'>No backup jobs configured for this VM.</div>
          )}
        </TabsContent>

        <TabsContent value='runs' className='space-y-4'>
          {backupRuns.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {backupRuns
                .sort((a, b) => {
                  const aTime = getBackupRunStartTime(a)
                  const bTime = getBackupRunStartTime(b)
                  if (!aTime) return 1
                  if (!bTime) return -1
                  return new Date(bTime).getTime() - new Date(aTime).getTime()
                })
                .map((run, index) => (
                  <BackupRunCard key={getBackupRunId(run) || index} run={run} isLatest={run === latestRun} />
                ))}
            </div>
          ) : (
            <div className='text-center py-8 text-gray-500'>No backup runs found for this VM.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
