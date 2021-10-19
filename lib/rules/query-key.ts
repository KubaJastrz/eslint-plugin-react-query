import { createRule } from '../utils/create-rule';

const USE_QUERY = 'useQuery';
const QUERY_KEY = 'queryKey';

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
          node.callee.type === 'Identifier' &&
          node.callee.name === USE_QUERY &&
          helpers.isReactQueryImport(node.callee);
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

        const hasQueryKeyProperty = firstArgument.properties.find((property) => {
          return (
            property.type === 'Property' &&
            property.key.type === 'Identifier' &&
            property.key.name === QUERY_KEY
          );
        });

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
