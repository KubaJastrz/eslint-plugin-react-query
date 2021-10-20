import fs from 'fs';
import path from 'path';

import type { TSESLint } from '@typescript-eslint/experimental-utils';

type RuleModule = TSESLint.RuleModule<string, unknown[]>;

const rulesDir = __dirname;
const excludesFiles = ['index'];

export const rules = fs
  .readdirSync(rulesDir)
  .map((rulePath) => path.parse(rulePath).name)
  .filter((ruleName) => !excludesFiles.includes(ruleName))
  .reduce<Record<string, RuleModule>>((allRules, ruleName) => {
    return {
      ...allRules,
      [ruleName]: require(path.join(rulesDir, ruleName)).rule,
    };
  }, {});
