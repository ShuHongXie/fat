/*
 * @Author: shuhongxie
 * @Date: 2020-09-24 15:45:31
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-07 20:03:03
 * @FilePath: /fat-ui/babel.config.js
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ],
    ['@vue/babel-plugin-jsx']
  ]
}
