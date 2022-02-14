# Prefer object syntax for useQuery (`prefer-query-object-syntax`)

You can use [`useQuery`](https://react-query.tanstack.com/reference/useQuery) in two different ways.

Standard

```ts
useQuery(queryKey, queryFn?, options?)

// or

useQuery(options)
```

This rule prefers the second option, as it is more consistent with other React Query hooks, like `useQueries` or `useMutation`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import { useQuery } from 'react-query';

useQuery(queryKey, queryFn, {
  onSuccess,
});

useQuery(queryKey, {
  queryFn,
  onSuccess,
});
```

Examples of **correct** code for this rule:

```js
import { useQuery } from 'react-query';

useQuery({
  queryKey,
  queryFn,
  onSuccess,
});
```

## When Not To Use It

If you don't care about useQuery consistency, then you will not need this rule.

## Attributes

- [x] ✅ Recommended
- [x] 🔧 Fixable
