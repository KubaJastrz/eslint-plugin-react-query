import { TSESLint } from '@typescript-eslint/experimental-utils';
import { rules } from '../rules';

function generateRecommendedConfig(allRules: Record<string, TSESLint.RuleModule<any, any>>) {
  return Object.entries(allRules).reduce((memo, [name, rule]) => {
    const { recommended } = rule.meta.docs || {};

    return {
      ...memo,
      ...(recommended ? { [`react-query/${name}`]: recommended } : {}),
    };
  }, {} as Record<string, 'error' | 'warn'>);
}

export const configs = {
  recommended: {
    plugins: ['react-query'],
    rules: generateRecommendedConfig(rules),
  },
};
