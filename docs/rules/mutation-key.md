# Enforce mutationKey to be present in useMutation call (`mutation-key`)

When using [`useMutation`](https://react-query.tanstack.com/reference/useMutation), it's beneficial to specify `mutationKey` property to distinguish mutations in React Query devtools.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import { useMutation } from 'react-query';

useMutation(mutationFn);

useMutation(mutationFn, {
  onError,
});
```

Examples of **correct** code for this rule:

```js
import { useMutation } from 'react-query';

useMutation(mutationFn, {
  mutationKey: 'mutate',
  onError,
});
```

## When Not To Use It

If you use default mutation keys or don't use React Query devtools, then you will not need this rule.

## Attributes

- [x] ✅ Recommended
- [ ] 🔧 Fixable
