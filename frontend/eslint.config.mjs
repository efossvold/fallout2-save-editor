// @ts-nocheck
import eslint from '@eslint/js'
import pluginVitest from '@vitest/eslint-plugin'
import configPrettier from 'eslint-config-prettier'
import pluginCypress from 'eslint-plugin-cypress'
import importPlugin from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginMocha from 'eslint-plugin-mocha'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import youMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import pluginUnicorn from 'eslint-plugin-unicorn'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import globals from 'globals'
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint'

const GLOB_TS = ['**/*.{ts,tsx,cts,mts}']

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.recommendedTypeChecked,
  pluginUnicorn.configs['flat/recommended'],
  importPlugin.flatConfigs.typescript,
  importPlugin.flatConfigs.recommended,
  configPrettier,

  {
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    files: GLOB_TS,
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': GLOB_TS,
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      /**
       * base
       */
      'no-extra-boolean-cast': 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-destructuring': 'warn',
      'prefer-object-spread': 'warn',
      'prefer-spread': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'arrow-body-style': 'warn',
      'require-await': 'error',
      curly: 'warn',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',

      /**
       * base typescript
       */
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      /**
       * Unicorn
       */
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/number-literal-case': 'off', // conflics with prettier

      /**
       * import
       */
      'import/first': 'error',
      'import/order': 'error',
      'import/no-cycle': ['warn', { ignoreExternal: true, disableScc: true }],
      'import/no-unused-modules': 'warn',
      'import/no-named-as-default': 'off',
      'import/prefer-default-export': 'off',
      // "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      // "import/no-duplicates": ["error", { "prefer-inline": false, considerQueryString: true }],

      // Disable rules already checked by typescript-eslint
      'import/namespace': 'off',
      'import/named': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',

      /**
       * unused-imports
       */
      'unused-imports/no-unused-imports': 'error',
    },
  },

  /**
   * React
   */
  {
    files: ['**/*.tsx'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-you-might-not-need-an-effect': youMightNotNeedAnEffect,
    },
    extends: [
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginJsxA11y.flatConfigs.recommended,
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/no-misused-promises': 'off',
      // "jsx-a11y/no-autofocus": "off",
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-you-might-not-need-an-effect/you-might-not-need-an-effect': 'warn',
    },
  },

  /**
   * Cypress
   */
  {
    files: ['**/*.cy.tsx'],
    plugins: { cypress: pluginCypress, mocha: pluginMocha },
    languageOptions: {
      globals: pluginCypress.environments.globals.globals,
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      ...pluginMocha.configs.flat.recommended.rules,
      'mocha/no-mocha-arrows': 0,
    },
  },

  /**
   * Vitest
   */
  {
    files: ['**/*.test.ts'],
    plugins: { vitest: pluginVitest },
    languageOptions: {
      globals: pluginVitest.environments.env.globals,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      ...pluginVitest.configs.all.rules,
      'vitest/no-hooks': 0,
      'vitest/prefer-expect-assertions': 0,
    },
  },

  /**
   * Don't typescript lint standard js files
   */
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    ...tseslint.configs.disableTypeChecked,
  },

  /*
   * Ignored files
   */
  {
    ignores: [
      '.idea',
      '.vscode',
      // Build files
      'build',
      'dist',
      'wailsjs',
      // Node
      'node_modules',
      // VS Code history plugin
      '.history',
      // Cypress,
      'cypress/coverage',
      'cypress/reports',
    ],
  },
)
