import { TSESTree } from '@typescript-eslint/utils';
import { getInnermostScope, isIdentifier } from '@typescript-eslint/utils/dist/ast-utils';
import {
  isFunctionLikeExpression,
  isQueryFnProperty,
  isQueryKeyProperty,
  isUseQueryIdentifier,
} from '../utils/ast-helpers';
import { createRule } from '../utils/create-rule';
import { filterTruthyArray } from '../utils/filter-array';

export const name = 'query-key';

export const rule = createRule({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: 'Verify the list of dynamic dependencies in the queryKey of useQuery hook',
      recommended: 'error',
    },
    messages: {
      missingKeyValues: `Query key is missing {{ keys }}`,
    },
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],

  create(context, _, helpers) {
    let queryKeyArray: TSESTree.Identifier[] = [];
    let queryFnBody: TSESTree.BlockStatement | TSESTree.Expression | undefined;
    let queryFnBodyIdentifiers: TSESTree.Identifier[] = [];

    const { scopeManager } = context.getSourceCode();
    if (!scopeManager) return {};
    const { globalScope } = scopeManager;
    if (!globalScope) return {};

    return {
      CallExpression(node) {
        const isUseQuery =
          isUseQueryIdentifier(node.callee) && helpers.isReactQueryImport(node.callee);
        if (!isUseQuery) {
          return;
        }

        const firstArgument = node.arguments[0];
        const secondArgument = node.arguments[1];
        if (!firstArgument) {
          return;
        }

        // useQuery({ queryKey: ... })
        if (firstArgument.type === 'ObjectExpression') {
          const queryKeyProperty = firstArgument.properties.find(isQueryKeyProperty);
          // queryKey missing
          if (!queryKeyProperty) {
            return;
          }

          // useQuery({ queryKey: [test, 'test'] })
          if (
            queryKeyProperty.value.type === 'ArrayExpression' &&
            queryKeyProperty.value.elements.length > 0
          ) {
            const identifiers = queryKeyProperty.value.elements.filter(isIdentifier);
            queryKeyArray = queryKeyArray.concat(identifiers);
          }
        }

        // useQuery([test, 'test'])
        else if (firstArgument.type === 'ArrayExpression' && firstArgument.elements.length > 0) {
          const identifiers = firstArgument.elements.filter(isIdentifier);
          queryKeyArray = queryKeyArray.concat(identifiers);
        }

        // useQuery({ queryFn: ... })
        if (firstArgument.type === 'ObjectExpression') {
          const queryFnProperty = firstArgument.properties.find(isQueryFnProperty);
          // queryFn missing
          if (!queryFnProperty) {
            return;
          }

          if (isFunctionLikeExpression(queryFnProperty.value)) {
            queryFnBody = queryFnProperty.value.body;
          }
        }

        // useQuery(queryKey, queryFn)
        else if (secondArgument && isFunctionLikeExpression(secondArgument)) {
          queryFnBody = secondArgument.body;
        }

        // no queryFn found or queryFn is a reference
        if (!queryFnBody) {
          return;
        }

        if (queryFnBody.type === 'BlockStatement') {
          const componentScope = getInnermostScope(globalScope, node);
          const queryFnScope = scopeManager.acquire(queryFnBody.parent!);
          if (!queryFnScope) return;

          const queryFnReferences = filterTruthyArray(
            queryFnScope.references.map((reference) => reference.resolved),
          );
          console.log(queryFnReferences);
        }
      },
    };
  },
});
