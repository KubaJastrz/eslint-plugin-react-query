import type { TSESTree } from '@typescript-eslint/utils';

export const ReactQueryIdentifiers = {
  UseQuery: 'useQuery',
  QueryKey: 'queryKey',
  QueryFn: 'queryFn',

  UseMutation: 'useMutation',
  MutationKey: 'mutationKey',
};

export function isUseQueryIdentifier(
  callee: TSESTree.LeftHandSideExpression,
): callee is TSESTree.Identifier {
  return callee.type === 'Identifier' && callee.name === ReactQueryIdentifiers.UseQuery;
}

export function isUseMutationIdentifier(
  callee: TSESTree.LeftHandSideExpression,
): callee is TSESTree.Identifier {
  return callee.type === 'Identifier' && callee.name === ReactQueryIdentifiers.UseMutation;
}

export function isQueryKeyProperty(
  property: TSESTree.ObjectLiteralElement,
): property is TSESTree.Property {
  return (
    property.type === 'Property' &&
    property.key.type === 'Identifier' &&
    property.key.name === ReactQueryIdentifiers.QueryKey
  );
}

export function isQueryFnProperty(
  property: TSESTree.ObjectLiteralElement,
): property is TSESTree.Property {
  return (
    property.type === 'Property' &&
    property.key.type === 'Identifier' &&
    property.key.name === ReactQueryIdentifiers.QueryFn
  );
}

export function isMutationKeyProperty(
  property: TSESTree.ObjectLiteralElement,
): property is TSESTree.Property {
  return (
    property.type === 'Property' &&
    property.key.type === 'Identifier' &&
    property.key.name === ReactQueryIdentifiers.MutationKey
  );
}

export function isPropertyValueNull(property: TSESTree.Property) {
  const { value } = property;
  return value.type === 'Literal' && value.value === null;
}

export function isPropertyValueUndefined(property: TSESTree.Property) {
  const { value } = property;
  return value.type === 'Identifier' && value.name === 'undefined';
}

export function isFunctionLikeExpression(
  node: TSESTree.CallExpressionArgument | TSESTree.Property['value'],
): node is TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression {
  return node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression';
}

export function getRangeOfArguments(node: TSESTree.CallExpression): TSESTree.Range | undefined {
  const firstArgument = node.arguments[0];
  const lastArgument = node.arguments[node.arguments.length - 1];
  return firstArgument && lastArgument
    ? [firstArgument.range[0], lastArgument.range[1]]
    : undefined;
}
