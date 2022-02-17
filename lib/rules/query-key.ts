import { isQueryKeyProperty, isUseQueryIdentifier } from '../utils/ast-helpers';
import { createRule } from '../utils/create-rule';

export const name = 'query-key';

export const rule = createRule({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce queryKey to be present in useQuery object syntax',
      recommended: 'error',
    },
    messages: {
      missingQueryKey: `Property queryKey is required but missing`,
    },
    schema: [],
  },
  defaultOptions: [],

  create(context, _, helpers) {
    return {
      CallExpression(node) {
        const isUseQuery =
          isUseQueryIdentifier(node.callee) && helpers.isReactQueryImport(node.callee);
        if (!isUseQuery) {
          return;
        }

        const firstArgument = node.arguments[0];
        if (!firstArgument) {
          return;
        }

        const hasFirstObjectArgument = firstArgument.type === 'ObjectExpression';
        if (!hasFirstObjectArgument) {
          return;
        }

        const hasQueryKeyProperty = firstArgument.properties.find(isQueryKeyProperty);

        if (!hasQueryKeyProperty) {
          context.report({
            node,
            messageId: 'missingQueryKey',
          });
        }
      },
    };
  },
});
