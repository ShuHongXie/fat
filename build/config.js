/*
 * @Author: shuhongxie
 * @Date: 2021-03-03 22:13:38
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 22:20:20
 * @FilePath: /fat-ui/build/config.js
 */
const path = require('path')
const fs = require('fs')
// json配置多入口
const Components = require('../config/component.json')
const nodeExternals = require('webpack-node-externals')
// 存储所有文件方法
const utilList = []
/**
 * @Description: 查找所有ts文件，过滤.DS_store和文件夹
 * @Author: shuhongxie
 * @param {*} dirname
 */
function findUtilsFile(dirname) {
  const file = fs.readdirSync(path.resolve(__dirname, `../src/${dirname}`))
  file.forEach(file => {
    if (!/\.ts$/.test(file) && !/^\./.test(file)) {
      findUtilsFile(`utils/${file}`)
    } else if (/\.ts$/.test(file) && !/^\./.test(file)) {
      utilList.push(file)
    }
  })
}
findUtilsFile('utils')
// 存储所有不打包文件
let externals = {}

// 不打包的组件
Object.keys(Components).forEach(name => {
  externals[`fat-ui/package/${name}`] = `fat-ui/lib/${name}`
})

// 不打包的方法
utilList.forEach(name => {
  externals[`fat-ui/utils/${name}`] = `fat-ui/lib/utils/${name}`
})

externals = [
  Object.assign(
    {
      vue: 'vue'
    },
    externals
  ),
  nodeExternals()
]
// console.log(externals)
exports.externals = externals

exports.alias = {
  'fat-ui': path.resolve(__dirname, '../src'),
  vue: '@vue/runtime-dom'
}
