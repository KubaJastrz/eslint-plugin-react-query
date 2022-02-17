import { rule, name } from '../../../lib/rules/query-key';
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
        useQuery(queryKey, queryFn)
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        const response = useQuery(queryKey, queryFn)
      `,
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'somewhere-else'
        useQuery({
          queryFn,
        })
      `,
    },
    {
      code: normalizeIndent`
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
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({})
      `,
      errors: [{ messageId: 'missingQueryKey' }],
    },
    {
      code: normalizeIndent`
        import { useQuery } from 'react-query'
        useQuery({
          queryFn,
        })
      `,
      errors: [{ messageId: 'missingQueryKey' }],
    },
  ],
});
