const { resolve } = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.mjs'],
      parserOptions: {
        ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
          jsx: true,
        },
        useJSXTextNode: true,
        tsconfigRootDir: `${__dirname}/..`,
        project: ['tsconfig.json'],
      },
      extends: [
        './base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // 'prettier/@typescript-eslint',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/default-param-last': 'warn',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        //   1,
        //   {
        //     args: 'after-used',
        //     argsIgnorePattern: '^_',
        //     varsIgnorePattern: '^_',
        //   },
        // ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'none',
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/ban-types': [
          'warn',
          {
            types: {
              object:
                "Don't use `object` as a type. The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)). Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.",
            },
          },
        ],

        // Disable the following rules to speed up linting
        '@typescript-eslint/no-for-in-array': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',

        '@typescript-eslint/no-unsafe-assignment': 'off',
        // TODO: Enable
        '@typescript-eslint/no-unsafe-argument': 'off',

        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        // '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
        ],
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
    {
      files: ['*.tsx', '*.cy.tsx', '*.test.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
