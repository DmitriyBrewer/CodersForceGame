module.exports = {
  ignorePatterns: ['dist/'],
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['react', '@typescript-eslint', 'import', 'prettier', 'css-modules'],
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx']
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__SERVER_PORT__']
      }
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: ['external', 'internal'],
        pathGroups: [
          {
            pattern: '@/constants',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/pages/**',
            group: 'internal'
          },
          {
            pattern: '@/widgets/**',
            group: 'internal'
          },
          {
            pattern: '@/features/**',
            group: 'internal'
          },
          {
            pattern: '@/entities/**',
            group: 'internal'
          },
          {
            pattern: '@/shared/**',
            group: 'internal'
          }
        ]
      }
    ],
    'prettier/prettier': 'error',
    // TODO: feature/feature/cfg-70 разрешаю использовать state.nameParam = value напряму без return {...state, namePara: value}
    'no-param-reassign': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-unused-vars': 'off',
    'css-modules/no-unused-class': [2],
    'css-modules/no-undef-class': [2]
  }
}
