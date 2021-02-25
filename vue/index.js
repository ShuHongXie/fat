/*
 * @Author: shuhongxie
 * @Date: 2020-12-17 07:12:53
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-25 16:30:32
 * @FilePath: /fat-ui/vue/index.js
 */
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/vue.cjs.prod.js')
} else {
  window.console.log('开始')
  module.exports = require('./dist/vue.cjs.js')
}
