# Contributing guide

## Project setup

### System requirements

- node 12+
- yarn 1x
- git

### Setup steps

1. [Fork and clone the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

2. Install dependencies

   ```sh
   yarn install
   ```

3. Run the development command
   ```sh
   yarn dev
   ```

[Jest](https://jestjs.io/) will open up in the console in the watch mode. As you make changes to the `lib` folder, changes will be tested automatically.

You can proceed to adding new eslint rules or changing existing ones.

## Working with eslint rules

To add a new rule, make sure it's previously discussed and accepted for implementation in the [GitHub Discussions](https://github.com/KubaJastrz/eslint-plugin-react-query/discussions/categories/new-rule).

### File structure

All rules should follow the directory structure:

```
eslint-plugin-react-query/
├── docs/
│   └── rules/
│       ├── ...
│       └── <rule-name>.md
├── lib/
│   └── rules/
│       ├── ...
│       └── <rule-name>.ts
└── tests/
    └── lib/
        └── rules/
            ├── ...
            └── <rule-name>.test.ts
```

`<rule-name>` is the `name` export of the rule module in kebab-case.

`// TODO: create file templates and generator`

The rule should also be present in the [README.md](README.md#supported-rules).

## Recommended config

The `react-query/recommended` config is generated automatically from the rule definition files.

```ts
export const rule = createRule({
  // ...
  meta: {
    type: 'problem',
    docs: {
      // Description should be the same as the page title of the rule in the `docs` folder
      description: 'Problem description',
      // Can be `warning` or `error`
      recommended: 'error',
    },
  },
});
```
