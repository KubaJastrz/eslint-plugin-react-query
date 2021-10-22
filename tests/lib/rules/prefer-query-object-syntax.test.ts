import { rule, name } from '../../../lib/rules/prefer-query-object-syntax';
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
        useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        const result = useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: `
        import { useQuery } from 'somewhere-else'
        useQuery(queryKey, queryFn, { enabled })
      `,
    },
  ],

  invalid: [
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery('data')
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data' })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery(queryKey)
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery(queryKey, queryFn)
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey, queryFn })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery('data', () => fetchData())
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data', queryFn: () => fetchData() })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery(queryKey, queryFn, { enabled })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery('data', () => fetchData(), { enabled: false })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data', queryFn: () => fetchData(), enabled: false })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery(queryKey, { queryFn, enabled })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: `
        import { useQuery } from 'react-query'
        useQuery('data', { queryFn: () => fetchData(), enabled: false })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: `
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data', queryFn: () => fetchData(), enabled: false })
      `,
    },
  ],
});
