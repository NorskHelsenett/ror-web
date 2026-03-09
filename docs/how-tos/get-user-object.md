[Back to README](README.md)

# How to - get the user object

Sometimes one need to use the user object. One can get the user object in a server component by doing:

```ts
const session = await authGuard()
const user = session.user
```
