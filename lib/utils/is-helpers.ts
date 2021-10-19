import type { TSESTree } from '@typescript-eslint/experimental-utils';

export function isPropertyValueNull(property: TSESTree.Property) {
  const { value } = property;
  return value.type === 'Literal' && value.value === null;
}

export function isPropertyValueUndefined(property: TSESTree.Property) {
  const { value } = property;
  return value.type === 'Identifier' && value.name === 'undefined';
}
