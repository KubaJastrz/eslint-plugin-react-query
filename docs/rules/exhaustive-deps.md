# xx (`eslint-plugin-react-query/exhaustive-deps`)

xx.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import { useQuery } from 'react-query';

const staticUrl = 'http://example.com';

function Component({ dynamicVar }) {
  useQuery(['data'], () => fetch(dynamicVar));
  useQuery(['data'], () => fetch(staticUrl + dynamicVar));
}
```

Examples of **correct** code for this rule:

```js
import { useQuery } from 'react-query';

// basically everything that is defined outside of the Component is __static__
const staticUrl = 'http://example.com';

function Component({ dynamicVar }) {
  // all variables defined inside Component (or from props) are __dynamic__
  useQuery(['data', dynamicVar], () => fetch(dynamicVar));
  useQuery(['data', dynamicVar], () => fetch(staticUrl + dynamicVar));

  // using only static variables is also fine
  useQuery(['data'], () => fetch(staticUrl));
}
```

## When Not To Use It

xx, then you will not need this rule.

## Attributes

- [x] ✅ Recommended
- [x] 🔧 Fixable
