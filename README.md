# sample-prisma-nested-update

A sample project showing that the order of operations in nested queries that contain two or more operations matter.
For example, compare the two examples below for the `create` and `deleteMany`.

```typescript
await prisma.user.update({
  data: {
    posts: {
      create: [...],
      deleteMany: [...],
    },
  },
  include: {...},
  where: {...},
})
```

```typescript
await prisma.user.update({
  data: {
    posts: {
      deleteMany: [...],
      create: [...],
    },
  },
  include: {...},
  where: {...},
})
```
