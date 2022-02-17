import { rule, name } from '../../../lib/rules/prefer-query-object-syntax';
import { createRuleTester, normalizeIndent } from '../test-utils';

const ruleTester = createRuleTester();

ruleTester.run(name, rule, {
  valid: [
    {
      code: normalizeIndent`
        useQuery()
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery()
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        const result = useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'somewhere-else'
        useQuery(queryKey, queryFn, { enabled })
      `,
    },
  ],

  invalid: [
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery('data')
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data' })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery(queryKey)
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery(queryKey, queryFn)
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      // no autofix
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery('data', () => fetchData())
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data', queryFn: () => fetchData() })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery(queryKey, queryFn, { enabled })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery('data', () => fetchData(), { enabled: false })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data', queryFn: () => fetchData(), enabled: false })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery(queryKey, { queryFn, enabled })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey, queryFn, enabled })
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery('data', { queryFn: () => fetchData(), enabled: false })
      `,
      errors: [{ messageId: 'preferObjectSyntax' }],
      output: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({ queryKey: 'data', queryFn: () => fetchData(), enabled: false })
      `,
    },
  ],
});
