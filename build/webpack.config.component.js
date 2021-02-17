/*
 * @Author: shuhongxie
 * @Date: 2021-02-08 20:28:45
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-17 17:04:59
 * @FilePath: /fat-ui/build/webpack.config.component.js
 */
const path = require('path')
const Components = require('../config/component.json')
// json配置多入口
const VueLoaderPlugin = require('vue-loader/dist/plugin').default
// css压缩提炼
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 自动清除webpack打包后的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// treeshaking
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: Components,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd', // 兼容cmd amd commonjs模式
    libraryExport: 'default' // 导出默认的default
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
            // options: {
            //   hmr: process.env.NODE_ENV === 'development'
            // }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(vue)$/,
        loader: 'vue-loader',
        options: {}
      },
      // 转换ts
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // 转换ES2020 可选链操作符(?.)
              plugins: ['@babel/plugin-proposal-optional-chaining']
            }
          },
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/TS\.vue$/] }
          }
        ]
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // 转换ES2020 可选链操作符(?.)
              plugins: ['@babel/plugin-proposal-optional-chaining']
            }
          },
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/TS\.vue$/] }
          }
        ]
      }
    ]
  },
  optimization: {
    // minimizer: [
    //   new UglifyJsPlugin()
    // ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // 类似于 webpackOptions.output 中的选项
      // 所有选项都是可选的
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css'
    })
  ]
}
