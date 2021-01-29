module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
  ],
  // 校驗 .vue 文件
  plugins: ['vue'],
  globals: {
    TPDirect: true,
  },
  // 自定義規則
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    complexity: ['warn', { max: 10 }],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'never',
          component: 'never',
        },
        svg: 'never',
        math: 'never',
      },
    ],
    'vue/singleline-html-element-content-newline': 'off', // 單行html元素內容在新的一行
    'vue/multiline-html-element-content-newline': 'off', // 多行html元素內容在新的一行
    'vue/html-closing-bracket-newline': 'off', // html右括號在新的一行
  },
}
