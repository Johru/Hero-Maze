module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/no-inferrable-types':'off',
    'prefer-const':'off'
  },
};
