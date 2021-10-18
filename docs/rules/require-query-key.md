# Enforce queryKey to be present in useQuery object syntax (`react-query/require-query-key`)

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
