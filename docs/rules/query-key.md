# Enforce queryKey to be present in useQuery object syntax (`eslint-plugin-react-query/query-key`)

When using [`useQuery`](https://react-query.tanstack.com/reference/useQuery) with object syntax, it's easy to forget about the `queryKey`, even though it is required property.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import { useQuery } from 'react-query';

useQuery({
  queryFn: () => fetchData(),
});
```

Examples of **correct** code for this rule:

```js
import { useQuery } from 'react-query';

useQuery({
  queryKey: 'data',
  queryFn: () => fetchData(),
});

useQuery('data', () => fetchData());
```

## When Not To Use It

If you use TypeScript with strict settings, then you will not need this rule.

## Attributes

- [x] ✅ Recommended
- [ ] 🔧 Fixable
