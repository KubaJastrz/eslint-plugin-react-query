import { ESLintUtils } from '@typescript-eslint/utils';
import { detectReactQueryImports, EnhancedCreate } from './detect-react-query-imports';

const getDocsUrl = (ruleName: string): string =>
  `https://github.com/KubaJastrz/eslint-plugin-react-query/tree/master/docs/rules/${ruleName}.md`;

type EslintRule = Omit<Parameters<ReturnType<typeof ESLintUtils.RuleCreator>>[0], 'create'> & {
  create: EnhancedCreate;
};

export function createRule({ create, ...rest }: EslintRule) {
  return ESLintUtils.RuleCreator(getDocsUrl)({
    ...rest,
    create: detectReactQueryImports(create),
  });
}
