module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/function-component-definition': [
          2,
          { namedComponents: 'arrow-function' },
        ],
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        'react/button-has-type': 'off',
        'react/destructuring-assignment': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',

        // 'react/jsx-uses-react': 'off',
        // 'react/jsx-uses-vars': 'off',

        'react/no-array-index-key': 'off',

        'react/jsx-no-useless-fragment': 'off',
        // 'react/jsx-no-useless-fragment': [
        //   1,
        //   {
        //     allowExpressions: true,
        //   },
        // ],
        'react/jsx-closing-tag-location': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/jsx-filename-extension': [
          1,
          {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        ],

        'jsx-a11y/label-has-associated-control': [
          2,
          {
            assert: 'either',
          },
        ],
      },
    },
  ],
}
