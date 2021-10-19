<h1 align="center">ESLint Plugin React Query</h1>

<p align="center">Community ESLint rules for <a href="https://react-query.tanstack.com/">React Query</a>.</p>

<p align="center">
    <a href="https://github.com/KubaJastrz/eslint-plugin-react-query/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-success?style=flat" alt="License MIT" /></a>
    <a href="https://www.npmjs.com/package/eslint-plugin-react-query"><img src="https://img.shields.io/npm/v/eslint-plugin-react-query.svg?style=flat" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/eslint-plugin-react-query"><img src="https://img.shields.io/npm/dm/eslint-plugin-react-query.svg?style=flat" alt="NPM Downloads" /></a>
</p>

## Quick Start

### Installation

Install the plugin:

```bash
npm install --save-dev eslint-plugin-react-query
```

### Usage

Add `react-query` to `plugins` field in your `.eslintrc` configuration file:

```json
{
  "plugins": ["react-query"],
  "rules": {
    "react-query/rule-name": "error"
  }
}
```

You can also use recommended rules with this plugin:

```json
{
  "extends": ["plugin:react-query/recommended"]
}
```

## Supported Rules

**Key**: ✅ = recommended, 🔧 = fixable

| Name                                   | Description                                              | ✅  | 🔧  |
| -------------------------------------- | -------------------------------------------------------- | --- | --- |
| [`query-key`](docs/rules/query-key.md) | Enforce queryKey to be present in useQuery object syntax | ✅  |     |

## Attributions

Big thanks to [Testing Library](https://github.com/testing-library/eslint-plugin-testing-library/) team for the code inspiration.
