import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { BackupRunResponseSchema } from '../schemas/backup-run'

export const createBackupRunService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async (otherParams: URLSearchParams) => {
    const params = new URLSearchParams(otherParams)
    params.set('apiversion', 'backup.ror.internal/v1alpha1')
    params.set('kind', 'BackupRun')

    const response = await request({
      method: 'GET',
      path: '/v2/resources',
      params,
    })

    return validateResponse(response, BackupRunResponseSchema)
  },
})
