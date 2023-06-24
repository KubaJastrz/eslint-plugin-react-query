<h3>⚠️ PROJECT ARCHIVED ⚠️</h3>

The development has been moved to `@tanstack/eslint-plugin-query`.

New codebase: https://github.com/TanStack/query/blob/main/packages/eslint-plugin-query

NPM: https://www.npmjs.com/package/@tanstack/eslint-plugin-query

---

<br>
<br>

# ESLint Plugin React Query

Community ESLint rules for <a href="https://react-query.tanstack.com/">React Query</a>.

<a href="https://github.com/KubaJastrz/eslint-plugin-react-query/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-success?style=flat" alt="License MIT" /></a>
<a href="https://www.npmjs.com/package/eslint-plugin-react-query"><img src="https://img.shields.io/npm/v/eslint-plugin-react-query.svg?style=flat" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/eslint-plugin-react-query"><img src="https://img.shields.io/npm/dm/eslint-plugin-react-query.svg?style=flat" alt="NPM Downloads" /></a>

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

| Name                                                                     | Description                                              | ✅  | 🔧  |
| ------------------------------------------------------------------------ | -------------------------------------------------------- | --- | --- |
| [`mutation-key`](docs/rules/mutation-key.md)                             | Enforce mutationKey to be present in useMutation call    | ✅  |     |
| [`prefer-query-object-syntax`](docs/rules/prefer-query-object-syntax.md) | Prefer object syntax for useQuery                        | ✅  | 🔧  |
| [`query-key`](docs/rules/query-key.md)                                   | Enforce queryKey to be present in useQuery object syntax | ✅  |     |

## Contributing

Check out [CONTRIBUTING.md](CONTRIBUTING.md) for information on how to contribute to the project.

## Attributions

Big thanks to [Testing Library](https://github.com/testing-library/eslint-plugin-testing-library/) team for the code inspiration.
