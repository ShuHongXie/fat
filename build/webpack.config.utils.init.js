/*
 * @Author: shuhongxie
 * @Date: 2021-03-04 21:04:33
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 21:41:52
 * @FilePath: /fat-ui/build/webpack.config.utils.init.js
 */
/*
 * @Author: shuhongxie
 * @Date: 2021-02-08 20:28:45
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 16:04:07
 * @FilePath: /fat-ui/build/webpack.config.component.js
 */
const path = require('path')
const config = require('./config')
// 自动清除webpack打包后的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 插件和loader用时分析
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin()

module.exports = smp.wrap({
  mode: 'production',
  entry: {
    bem: './src/utils/init/bem.ts',
    component: './src/utils/init/component.ts',
    index: './src/utils/init/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../lib/utils/init'),
    filename: '[name].js',
    libraryTarget: 'umd', // 兼容cmd amd commonjs模式,
    umdNamedDefine: true,
    globalObject: 'typeof self !== "undefined" ? self : this'
  },
  resolve: {
    extensions: ['.ts'],
    alias: config.alias
  },
  externals: config.externals,
  module: {
    rules: [
      // 转换ts
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     // 开启缓存加载
          //     cacheDirectory: true,
          //     presets: [
          //       [
          //         '@babel/preset-env'
          //         // {
          //         //   useBuiltIns: 'usage'
          //         // }
          //       ]
          //     ]
          //     // // 转换ES2020 可选链操作符(?.)
          //     // plugins: [
          //     //   require('@babel/plugin-proposal-optional-chaining'),
          //     //   [
          //     //     '@babel/plugin-transform-runtime',
          //     //     {
          //     //       corejs: 3,
          //     //       useESModules: true
          //     //     }
          //     //   ]
          //     // ]
          //   }
          // },
          {
            loader: 'ts-loader',
            options: {
              // appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
              // configFile: path.resolve(__dirname, '../tsconfig.component.json')
            }
          }
        ]
      }
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     compilerOptions: {
      //       // isCustomElement: tag => {
      //       //   return tag === 'custom'
      //       // }
      //       preserveWhitespace: false
      //     }
      //     // loaders: {
      //     //   ts: 'babel-loader!ts-loader',
      //     //   tsx: 'babel-loader!ts-loader'
      //     // }
      //   }
      // }
    ]
  },
  plugins: [
    // new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
})
