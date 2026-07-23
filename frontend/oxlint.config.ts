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
    // oxlint-tailwindcss
    tailwindcss: {
      entryPoint: 'frontend/src/style/base.css',
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
    {
      name: 'react-you-might-not-need-an-effect-js',
      specifier: 'eslint-plugin-react-you-might-not-need-an-effect',
    },
    'oxlint-tailwindcss',
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
     * React useEffect rules
     */
    'react-you-might-not-need-an-effect-js/no-derived-state': 'warn',
    'react-you-might-not-need-an-effect-js/no-chain-state-updates': 'warn',
    'react-you-might-not-need-an-effect-js/no-event-handler': 'warn',
    'react-you-might-not-need-an-effect-js/no-adjust-state-on-prop-change': 'warn',
    'react-you-might-not-need-an-effect-js/no-reset-all-state-on-prop-change': 'warn',
    'react-you-might-not-need-an-effect-js/no-pass-live-state-to-parent': 'warn',
    'react-you-might-not-need-an-effect-js/no-pass-data-to-parent': 'warn',
    'react-you-might-not-need-an-effect-js/no-initialize-state': 'warn',

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
        '@typescript-eslint/consistent-return': 'warn',
        '@typescript-eslint/strict-void-return': 'off',
        'import/no-nodejs-modules': 'error',
        'jsx-a11y/no-autofocus': 'warn',
        'jsx-a11y/prefer-tag-over-role': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-max-depth': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/react-compiler': 'error',
        'react/react-in-jsx-scope': 'off',

        // Disable - solved by react-compilter
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react-perf/jsx-no-new-object-as-prop': 'off',

        // tailwind-plugin
        // Correctness — catch real bugs
        'tailwindcss/no-conflicting-classes': 'error',
        'tailwindcss/no-deprecated-classes': 'error',
        'tailwindcss/no-duplicate-classes': 'warn',
        'tailwindcss/no-unknown-classes': 'warn',

        // Modernization — keep classes in current canonical form
        'tailwindcss/enforce-canonical': 'warn',
        'tailwindcss/no-unnecessary-arbitrary-value': 'warn',

        // Style and consistency
        'tailwindcss/enforce-sort-order': 'warn',
        'tailwindcss/consistent-variant-order': 'warn',
        'tailwindcss/enforce-consistent-important-position': 'warn',
        'tailwindcss/no-unnecessary-whitespace': 'warn',
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
