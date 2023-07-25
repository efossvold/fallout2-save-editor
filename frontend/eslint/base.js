module.exports = {
  extends: ['eslint-config-airbnb', 'prettier'],
  plugins: ['import', 'prettier', 'unused-imports'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'babel-module': {},
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
    serviceworker: true,
  },
  ignorePatterns: ['!.eslintrc.js'],
  rules: {
    // 'arrow-parens': ['error', 'as-needed'],
    // 'arrow-body-style': 'warn',
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    'eol-last': 'off',
    'function-paren-newline': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-quotes': ['off'],
    'max-len': ['off'],
    'no-void': 'off',
    // 'no-case-declarations': 'error',
    'no-console': 'off',
    'no-multiple-empty-lines': 'off',
    'no-param-reassign': ['off'],
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-empty-pattern': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': 'off',
    'object-property-newline': 'off',
    'padded-blocks': 'off',
    'default-case': 'error',
    'default-param-last': 'off',
    'no-fallthrough': 'error',
    quotes: ['off'],
    radix: 'off',
    semi: 'off',
    'spaced-comment': 'off',
    'dot-notation': 'off',
    'consistent-return': 'off',
    indent: 'off', // done by prettier
    'no-return-await': 'off',
    'no-debugger': 'off',
    'no-use-before-define': [0, 'nofunc'],
    // 'no-const-assign': 2,
    // 'no-unused-vars': [
    //   1,
    //   { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    // ],

    'unused-imports/no-unused-imports': 'error',

    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        exports: 'only-multiline',
        imports: 'only-multiline',
        objects: 'only-multiline',
        functions: 'ignore',
      },
    ],

    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],

    'import/order': 'warn',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      // {
      //   "selector": "ForOfStatement",
      //   "message": "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations."
      // },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
  globals: {},
}
