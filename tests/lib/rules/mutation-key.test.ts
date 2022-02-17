import { rule, name } from '../../../lib/rules/mutation-key';
import { createRuleTester, normalizeIndent } from '../test-utils';

const ruleTester = createRuleTester();

ruleTester.run(name, rule, {
  valid: [
    {
      code: normalizeIndent`
        useMutation()
      `,
    },
    {
      code: normalizeIndent`
        import { useMutation } from 'react-query'
        useMutation()
      `,
    },
    {
      code: normalizeIndent`
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          mutationKey: 'test'
        })
      `,
    },
    {
      code: normalizeIndent`
      import { useMutation } from 'react-query'
      useMutation(mutationFn, {
        mutationKey: 'test'
      })
      `,
    },
    {
      code: normalizeIndent`
      import { useMutation } from 'react-query'
      const { mutate } = useMutation(mutationFn, {
        mutationKey: 'test'
      })
      `,
    },
    {
      code: normalizeIndent`
        import { useMutation } from 'somewhere-else'
        useMutation({
          onError,
        })
      `,
    },
  ],

  invalid: [
    {
      code: normalizeIndent`
        import { useMutation } from 'react-query'
        useMutation(mutationFn)
      `,
      errors: [{ messageId: 'missingMutationKey' }],
    },
    {
      code: normalizeIndent`
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          onError,
        })
      `,
      errors: [{ messageId: 'missingMutationKey' }],
    },
    {
      code: normalizeIndent`
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          mutationKey: undefined,
          onError,
        })
      `,
      errors: [{ messageId: 'falsyMutationKey' }],
    },
    {
      code: normalizeIndent`
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          mutationKey: null,
          onError,
        })
      `,
      errors: [{ messageId: 'falsyMutationKey' }],
    },
  ],
});
