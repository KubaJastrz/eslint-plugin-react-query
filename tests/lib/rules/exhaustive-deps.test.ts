import { rule, name } from '../../../lib/rules/exhaustive-deps';
import { createRuleTester, normalizeIndent } from '../test-utils';

const ruleTester = createRuleTester();

ruleTester.run(name, rule, {
  valid: [
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        function Component() {
          useQuery('static', queryFn)
        }
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        function Component() {
          useQuery('static', () => fetch())
        }
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        import staticDefault, { staticNamed } from 'static'
        function Component() {
          useQuery(['static', 'import'], () => fetch(staticDefault, staticNamed))
        }
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        const static1 = 42
        const static2 = 'string'
        const static3 = null
        let static4
        function Component() {
          useQuery(['static', 'outside'], () => fetch(static1, static2, static3, static4))
        }
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        function Component() {
          const static1 = 42
          const static2 = 'string'
          const static3 = null
          let static4
          useQuery(['static', 'inside'], () => fetch(static1, static2, static3, static4))
        }
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        function Component({ dynamic }) {
          const static = 42
          useQuery(['props', dynamic], () => fetch(static, dynamic))
        }
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        function Component() {
          const [state1, setState1] = React.useState();
          const [state2, dispatch2] = React.useReducer();
          const ref1 = React.useRef();
          const anything1 = useCustomRef();
          const [computed1] = [42];

          useQuery(
            ['hooks', state1, state2, ref1, anything1, computed1],
            () => fetch(state1, state2, ref1, anything1, computed1)
          )
        }
      `,
    },
  ],

  invalid: [
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        function Component({ dynamic }) {
          useQuery('static', () => { return fetch('static', dynamic) })
        }
      `,
      errors: [{ messageId: 'missingKeyValues', data: { keys: 'dynamic' } }],
      only: true,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        function Component({ dynamic }) {
          useQuery('static', () => fetch('static', dynamic))
        }
      `,
      errors: [{ messageId: 'missingKeyValues', data: { keys: 'dynamic' } }],
    },
  ],
});
