[Back to README](README.md)

# How to - implement mock data

## What is mocking?

Mocking is used to have a structured dataset to test against during development. A mock is an imitation of the response to an API call. If possible, a good way to create a mock is to copy the response of the related API call. If that is not a possibility, one can make one from a data object.

NB!: this can obviously only be done if the API response does not contain any sensitive data. If it does, that has to be changed.

## Tools

Tools like faker, machine and sub can be used to create well made mock, that cannot be traced back to sensitive data.

## How to implement mock data?

We have a directory, [`apps/web/__mocks__/data`](/apps/web/__mocks__/data). Here one can implement the mock for a data set. Setup is like this:

```ts
export const mockName = {}
```

It is usually a good idea to use the schema from `@ror/js-api-client`, to ensure that you have the correct data structure.

This is an example of how a mock can look:

```ts
import { PriceListSchema } from '@ror/js-api-client'

const prices: PriceListSchema = [
  {
    id: '62b1ad7161ecad60301b45aa',
    machineClass: 'best-effort-xsmall',
    price: 958,
  },
  {
    id: '62b1ad7161ecad60301b45ab',
    machineClass: 'best-effort-small',
    price: 1038,
  },
  {
    id: '62b1ad7161ecad60301b45ac',
    machineClass: 'best-effort-medium',
    price: 1199,
  },
]

export default prices
```

`mockName` should be changed to something that makes sense for your mocking. Then the mocking can be placed inside this object.

## Handlers/

Depending on the endpoint you use, you might need to implement or change a handler.

### v1 endpoint

If you are using the v1 endpoint, you need to implement your own handler. Here it is recommended to check out the [clusters handler](/apps/web/__mocks__/handlers/clusters.ts), [prices handler](/apps/web/__mocks__/handlers/prices.ts) or [projects handler](/apps/web/__mocks__/handlers/projects.ts).

### v2 endpoint

If you are using the v2 endpoint, you need to add functionality to the [v2-resources handler](/apps/web/__mocks__handlers/v2-resources.ts).

Here you must check if the call you are using is already defined (for example if you are using `'GET' v2/resources`).

If this is the case, you need to add the case of your mock as a case in the switch, like can already be seen in the file. Then the response needs to be defined, and returned as a `HttpResponse`.

If the call you are using is not already defined, it needs to be added to the handler.
