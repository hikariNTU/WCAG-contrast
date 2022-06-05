module.exports = {
  extends: [
    '../../.eslintrc.js',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/require-default-prop': 0,
    'vue/script-setup-uses-vars': 1,
  },
  globals: {
    PKG_VERSION: 'readonly',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}
