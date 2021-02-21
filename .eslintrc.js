/*
 * @Author: shuhongxie
 * @Date: 2020-09-24 15:45:31
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-15 21:13:09
 * @FilePath: /fat-ui/.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // 0: 不校验 1:警告 2:错误
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-empty': 'warn',
    'key-spacing': [2, { afterColon: true }], // 对象前空格
    'keyword-spacing': [2, { before: true }], // 关键字空格
    'object-property-newline': [2, { allowAllPropertiesOnSameLine: false }], // 对象换行
    semi: [2, 'never'],
    'no-prototype-builtins': 'off',
    quotes: [2, 'single'],
    'prettier/prettier': [
      'error',
      // 如果插件配置中修改了相关选项，
      // 则必须在此添加相对应的自定义规则否则就会出现编辑器格式化后ESlint检查无法通过的情况。
      {
        semi: false, // 是否需要分号
        singleQuote: true, // 是否启用单引号
        trailingComma: 'none', // 对象后面是否加逗号
        arrowParens: 'avoid', // 箭头函数参数是否必须加括号 always: 总是 avoid: 随意
        endOfLine: 'auto',
        eslintIntegratio: true,
        htmlWhitespaceSensitivity: 'ignore',
        vueIndentScriptAndStyle: true, // 缩进vue文件里面的 script,style标签里面的代码
        tabWidth: 2,
        printWidth: 100
      }
    ]
  }
}
