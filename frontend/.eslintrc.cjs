module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-console': ['off'],
    'no-nested-ternary': ['off'],
    'react/forbid-prop-types': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'jsx-a11y/img-redundant-alt': ['off'],
    'react/require-default-props': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'jsx-a11y/no-noninteractive-tabindex': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'react/jsx-no-constructed-context-values': ['off'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
