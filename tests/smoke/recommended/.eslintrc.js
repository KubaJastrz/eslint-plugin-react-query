module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeature: {
      jsx: true,
    },
  },
  env: {
    es6: true,
  },

  plugins: ['react-query'],
  extends: ['plugin:react-query/recommended'],
};
