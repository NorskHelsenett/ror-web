import type { RequestOptions } from '../core/request'
import { validateResponse } from '../core/validation'
import { PriceListSchema } from '../schemas/price'

export const createPriceService = (request: (requestOptions: RequestOptions) => Promise<unknown>) => ({
  list: async () => {
    const response = await request({
      method: 'GET',
      path: '/v1/prices',
    })
    return validateResponse(response, PriceListSchema)
  },
})
