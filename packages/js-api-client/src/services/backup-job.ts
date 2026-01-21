import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { BackupJobResponseSchema } from '../schemas/backup-job'

export const createBackupJobService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'backup.ror.internal/v1alpha1')
    params.set('kind', 'BackupJob')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, BackupJobResponseSchema)
  },
})
