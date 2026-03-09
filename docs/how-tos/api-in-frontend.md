[Back to README](README.md)

# How to - implement API call in frontend component

An API call has to be implemented in a server component. This means it can not state 'use client' at the top of the file.

One can get the API by using:

```ts
await getRorApi()
```

One has to know what service from `@ror/js-api-client`. In this example, we will say we want the `projects` service. Then, one has to know what API call one wants from the service, `list()` in this example. To list all projects, one would use:

```ts
const api = await getRorApi()
const res = await api.projects.list()
```

One can then use the result of the API call for whatever one wants.
