import { rule, name } from '../../../lib/rules/mutation-key';
import { createRuleTester } from '../test-utils';

const ruleTester = createRuleTester();

ruleTester.run(name, rule, {
  valid: [
    {
      code: `
        useMutation()
      `,
    },
    {
      code: `
        import { useMutation } from 'react-query'
        useMutation()
      `,
    },
    {
      code: `
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          mutationKey: 'test'
        })
      `,
    },
    {
      code: `
      import { useMutation } from 'react-query'
      useMutation(mutationFn, {
        mutationKey: 'test'
      })
      `,
    },
    {
      code: `
      import { useMutation } from 'react-query'
      const { mutate } = useMutation(mutationFn, {
        mutationKey: 'test'
      })
      `,
    },
    {
      code: `
        import { useMutation } from 'somewhere-else'
        useMutation({
          onError,
        })
      `,
    },
  ],

  invalid: [
    {
      code: `
        import { useMutation } from 'react-query'
        useMutation(mutationFn)
      `,
      errors: [{ messageId: 'missingMutationKey' }],
    },
    {
      code: `
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          onError,
        })
      `,
      errors: [{ messageId: 'missingMutationKey' }],
    },
    {
      code: `
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          mutationKey: undefined,
          onError,
        })
      `,
      errors: [{ messageId: 'falsyMutationKey', line: 4, endLine: 4, column: 11, endColumn: 33 }],
    },
    {
      code: `
        import { useMutation } from 'react-query'
        useMutation(mutationFn, {
          mutationKey: null,
          onError,
        })
      `,
      errors: [{ messageId: 'falsyMutationKey', line: 4, endLine: 4, column: 11, endColumn: 28 }],
    },
  ],
});
