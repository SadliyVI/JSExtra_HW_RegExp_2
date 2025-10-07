import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
  // Игнорируем каталоги сборки
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**']
  },

  // Базовые рекомендованные правила ESLint
  js.configs.recommended,

  // Конфигурация Prettier (чтобы ESLint и Prettier не конфликтовали)
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'none',
          printWidth: 120,
          endOfLine: 'lf'
        }
      ]
    }
  },

  // Основные правила для JS-файлов
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2023,
        ...globals.jest
      }
    },
    rules: {
      // Качество кода
      strict: ['error', 'global'],
      eqeqeq: 'error',
      curly: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['warn', { args: 'after-used', ignoreRestSiblings: true }],
      'no-console': 'warn',

      // Стиль и читаемость
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'max-len': ['error', { code: 120 }]
    }
  }
];
