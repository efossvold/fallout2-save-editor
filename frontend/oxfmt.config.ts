import { defineConfig } from 'oxlint'

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  experimentalSortImports: {
    groups: [
      'type-import',
      ['value-builtin', 'value-external'],
      'type-internal',
      'value-internal',
      ['type-parent', 'type-sibling', 'type-index'],
      ['value-parent', 'value-sibling', 'value-index'],
      'unknown',
    ],
  },
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
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
