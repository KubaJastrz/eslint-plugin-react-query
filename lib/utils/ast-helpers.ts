import type { TSESTree } from '@typescript-eslint/experimental-utils';

export function isPropertyValueNull(property: TSESTree.Property) {
  const { value } = property;
  return value.type === 'Literal' && value.value === null;
}

export function isPropertyValueUndefined(property: TSESTree.Property) {
  const { value } = property;
  return value.type === 'Identifier' && value.name === 'undefined';
}

export function getRangeOfArguments(node: TSESTree.CallExpression): TSESTree.Range | undefined {
  const firstArgument = node.arguments[0];
  const lastArgument = node.arguments[node.arguments.length - 1];
  return firstArgument && lastArgument
    ? [firstArgument.range[0], lastArgument.range[1]]
    : undefined;
}
