import { createRule } from '../utils/create-rule';
import { isPropertyValueNull, isPropertyValueUndefined } from '../utils/is-helpers';

const USE_MUTATION = 'useMutation';
const MUTATION_KEY = 'mutationKey';

export const name = 'mutation-key';

export const rule = createRule({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce mutationKey to be present in useMutation options',
      recommended: 'error',
    },
    messages: {
      missingMutationKey: `Property mutationKey is required but missing`,
      falsyMutationKey: `Property mutationKey cannot be empty`,
    },
    schema: [],
  },
  defaultOptions: [],

  create(context, _, helpers) {
    return {
      CallExpression(node) {
        const isUseMutation =
          node.callee.type === 'Identifier' &&
          node.callee.name === USE_MUTATION &&
          helpers.isReactQueryImport(node.callee);

        if (!isUseMutation) {
          return;
        }

        const mutationFnArgument = node.arguments[0];
        if (!mutationFnArgument) {
          return;
        }

        const optionsArgument = node.arguments[1];
        if (!optionsArgument) {
          context.report({
            node,
            messageId: 'missingMutationKey',
          });
          return;
        }

        const hasOptionsArgument = optionsArgument.type === 'ObjectExpression';
        if (!hasOptionsArgument) {
          return;
        }

        const mutationKeyProperty = optionsArgument.properties.find((property) => {
          return (
            property.type === 'Property' &&
            property.key.type === 'Identifier' &&
            property.key.name === MUTATION_KEY
          );
        });

        if (!mutationKeyProperty) {
          context.report({
            node,
            messageId: 'missingMutationKey',
          });
          return;
        }

        if (
          mutationKeyProperty.type === 'Property' &&
          (isPropertyValueNull(mutationKeyProperty) ||
            isPropertyValueUndefined(mutationKeyProperty))
        ) {
          context.report({
            node: mutationKeyProperty,
            messageId: 'falsyMutationKey',
          });
        }
      },
    };
  },
});
