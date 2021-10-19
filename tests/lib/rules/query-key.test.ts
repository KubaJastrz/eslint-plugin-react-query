import { rule, name } from '../../../lib/rules/query-key';
import { createRuleTester } from '../test-utils';

const ruleTester = createRuleTester();

ruleTester.run(name, rule, {
  valid: [
    {
      code: `
        useQuery()
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery()
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery(queryKey, queryFn)
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        const response = useQuery(queryKey, queryFn)
      `,
    },
    {
      code: `
        import { useQuery } from 'somewhere-else'
        useQuery({
          queryFn,
        })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery({
          queryFn,
          queryKey,
        })
      `,
    },
  ],

  invalid: [
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery({})
      `,
      errors: [{ messageId: 'missingQueryKey', line: 3, column: 9 }],
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery({
          queryFn,
        })
      `,
      errors: [{ messageId: 'missingQueryKey', line: 3, column: 9 }],
    },
  ],
});
