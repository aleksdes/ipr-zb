module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  plugins: ['@typescript-eslint'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'vue/valid-v-slot': 'off',
    'vue/no-unused-vars': 'warn',
    'vue/html-indent': ['warn', 2],
    'vue/html-quotes': ['warn', 'single'],

    // Проверка на самозакрывающийся тег или компонент
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // Проверка регистра для стиля именования компонентов в шаблоне
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
      },
    ],

    // Проверка нерегулярных пробелов
    'vue/no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false,
        skipHTMLAttributeValues: false,
        skipHTMLTextContents: false,
      },
    ],

    // Проверка на определенный регистр для имени компонента
    'vue/component-definition-name-casing': ['error', 'PascalCase'],

    // Проверка имени компонента — оно должно соответствовать имени файла, в котором он находится
    'vue/match-component-file-name': [
      'warn',
      {
        extensions: ['vue'],
        shouldMatchCase: true,
      },
    ],

    // Запретить дублирование имен полей
    'vue/no-dupe-keys': [
      'error',
      {
        groups: [],
      },
    ],

    // Порядок свойств в компонентах
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],

    quotes: ['warn', 'single'],
    semi: ['error', 'never'],
    'linebreak-style': 0,
    // "space-before-function-paren": ["error", "never"],
    'no-console': 0,
    'no-debugger': 'error',
    'comma-dangle': ['warn', 'always-multiline'],
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/require-v-for-key': 0,
    'no-case-declarations': 0,
    'vue/multi-word-component-names': 0,
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],

    // Проверка порядка атрибутов
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
