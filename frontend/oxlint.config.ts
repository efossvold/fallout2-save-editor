//
import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: [
    'eslint',
    'typescript',
    'unicorn',
    'react',
    'react-perf',
    'oxc',
    'import',
    'jsx-a11y',
    'promise',
    'vitest',
  ],
  categories: {
    correctness: 'error',
    nursery: 'warn',
    pedantic: 'off',
    perf: 'warn',
    restriction: 'off',
    style: 'warn',
    suspicious: 'warn',
  },
  options: {
    typeAware: true,
    typeCheck: true,
    reportUnusedDisableDirectives: 'allow',
  },
  settings: {
    'jsx-a11y': {
      components: {},
      attributes: {},
    },
    react: {
      formComponents: [],
      linkComponents: [],
      componentWrapperFunctions: [],
    },
    vitest: {
      typecheck: false,
    },
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
    es2024: true,
  },
  globals: {},
  jsPlugins: [
    { name: 'react-hooks-js', specifier: 'eslint-plugin-react-hooks' },
    {
      name: 'react-you-might-not-need-an-effect-js',
      specifier: 'eslint-plugin-react-you-might-not-need-an-effect',
    },
  ],
  rules: {
    /**
     * Base javascript
     */
    'arrow-body-style': 'warn',
    curly: 'warn',
    'capitalized-comments': 'off',
    'no-non-null-assertion': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
    'no-var': 'error',
    'prefer-destructuring': 'warn',
    'prefer-object-spread': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',

    // Typescript/require-await is superior
    'require-await': 'off',

    /**
     * Base typescript
     */
    'typescript/await-thenable': 'error',
    'typescript/consistent-type-exports': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/no-empty-object-type': 'warn',
    'typescript/no-unnecessary-condition': 'error',
    'typescript/prefer-nullish-coalescing': 'error',
    'typescript/prefer-optional-chain': 'error',
    'typescript/require-await': 'error',
    'typescript/no-unsafe-type-assertion': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',

    /**
     * Import
     */
    'import/consistent-type-specifier-style': ['error'],
    'import/exports-last': 'off',
    'import/first': 'error',
    'import/group-exports': 'off',
    'import/no-cycle': ['warn', { ignoreExternal: true }],
    'import/no-named-export': 'off',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-unassigned-import': ['warn', { allow: ['**/*.css'] }],
    'import/prefer-default-export': 'off',

    /*
     * React-compiler rules
     */
    'react-hooks-js/config': 'error',
    'react-hooks-js/error-boundaries': 'error',
    'react-hooks-js/component-hook-factories': 'error',
    'react-hooks-js/gating': 'error',
    'react-hooks-js/globals': 'error',
    'react-hooks-js/immutability': 'error',
    'react-hooks-js/preserve-manual-memoization': 'error',
    'react-hooks-js/purity': 'error',
    'react-hooks-js/refs': 'error',
    'react-hooks-js/set-state-in-effect': 'error',
    'react-hooks-js/set-state-in-render': 'error',
    'react-hooks-js/static-components': 'error',
    'react-hooks-js/unsupported-syntax': 'warn',
    'react-hooks-js/use-memo': 'error',
    'react-hooks-js/incompatible-library': 'warn',

    /*
     * React-compiler rules
     */
    'react-you-might-not-need-an-effect-js/no-derived-state': 'warn',
    'react-you-might-not-need-an-effect-js/no-chain-state-updates': 'warn',
    'react-you-might-not-need-an-effect-js/no-event-handler': 'warn',
    'react-you-might-not-need-an-effect-js/no-adjust-state-on-prop-change': 'warn',
    'react-you-might-not-need-an-effect-js/no-reset-all-state-on-prop-change': 'warn',
    'react-you-might-not-need-an-effect-js/no-pass-live-state-to-parent': 'warn',
    'react-you-might-not-need-an-effect-js/no-pass-data-to-parent': 'warn',
    'react-you-might-not-need-an-effect-js/no-initialize-state': 'warn',
    'react-you-might-not-need-an-effect-js/no-empty-effect': 'warn',

    /**
     * Disable style-rules
     */
    'id-length': 'off',
    'init-declarations': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',

    // Conflicts with oxlint
    'unicorn/number-literal-case': 'off',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'import/no-nodejs-modules': 'error',
        'jsx-a11y/no-autofocus': 'warn',
        'jsx-a11y/prefer-tag-over-role': 'off',
        'react/jsx-max-depth': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/consistent-return': 'warn',
        '@typescript-eslint/strict-void-return': 'off',

        // Disable - solved by react-compilter
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react-perf/jsx-no-new-object-as-prop': 'off',
      },
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        'prefer-importing-vitest-globals': 'off',
        'vitest/no-hooks': 'off',
        // 'vitest/prefer-expect-assertions': 'off',
        'vitest/no-focused-tests': 'error',
        'jest/no-focused-tests': 'error',
      },
    },
  ],

  ignorePatterns: [
    '.idea',
    '.vscode',
    'build',
    'cypress/coverage',
    'cypress/reports',
    'dist',
    'eslint.config.mjs',
    'node_modules',
    'wailsjs',
  ],
})
