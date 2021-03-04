/*
 * @Author: shuhongxie
 * @Date: 2021-02-08 20:28:45
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 22:23:56
 * @FilePath: /fat-ui/build/webpack.config.component.js
 */
const path = require('path')
const config = require('./config')
// ts类型检查
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// json配置多入口
const Components = require('../config/component.json')
// vue文件解析
const VueLoaderPlugin = require('vue-loader/dist/plugin').default
// css压缩提炼
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 自动清除webpack打包后的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 清除nodeModule里面的包
const nodeExternals = require('webpack-node-externals')
// 插件和loader用时分析
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin()
// js体积压缩
const TerserPlugin = require('terser-webpack-plugin')
// css tree-shaking
const PurgecssPlugin = require('purgecss-webpack-plugin')
// glob
const glob = require('glob')
const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = smp.wrap({
  mode: 'production',
  entry: Components,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    // chunkFilename: '[name].js',
    libraryTarget: 'umd', // 兼容cmd amd commonjs模式
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== "undefined" ? self : this'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.vue'],
    alias: config.alias
  },
  externals: config.externals,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader
          //   // options: {
          //   //   hmr: process.env.NODE_ENV === 'development'
          //   // }
          // },
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
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            //  绝对路径
            outputPath: '../lib/style/font/',
            //  url链接相对路径
            publicPath: '../style/font'
          }
        }
      },
      // 转换ts
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 开启缓存加载
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env'
                  // {
                  //   useBuiltIns: 'usage'
                  // }
                ]
              ],
              // // 转换ES2020 可选链操作符(?.)
              plugins: [
                require('@babel/plugin-proposal-optional-chaining'),
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: false,
                    useESModules: true
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
              configFile: path.resolve(__dirname, '../tsconfig.component.json')
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            // isCustomElement: tag => {
            //   return tag === 'custom'
            // }
            preserveWhitespace: false
          }
          // loaders: {
          //   ts: 'babel-loader!ts-loader',
          //   tsx: 'babel-loader!ts-loader'
          // }
        }
      }
    ]
  },
  optimization: {
    // minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     parallel: 4 // 开启 不主动指定的话，默认数值是当前电脑cpu数量的2倍减1
    //   })
    // ]
    // usedExports: true,
    //portableRecords: true,
    //runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all' // async 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
    //   // minSize: 10000, //合并前模块文件的体积
    //   // minChunks: 1, //最少被引用次数
    //   // maxAsyncRequests: 5,
    //   // maxInitialRequests: 3,
    //   // automaticNameDelimiter: '-', //自动命名连接符
    //   // cacheGroups: {
    //   //   vendors: {
    //   //     test: /[\\/]node_modules[\\/]/,
    //   //     minChunks: 1, //敲黑板
    //   //     priority: -10 //优先级更高
    //   //   },
    //   //   default: {
    //   //     name: 'commons',
    //   //     test: /[\\/]src[\\/]utils[\\/]/,
    //   //     minChunks: 2, //一般为非第三方公共模块
    //   //     priority: -9,
    //   //     reuseExistingChunk: true
    //   //   }
    //   // }
    // }
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   async: false
    // }),

    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
    // new MiniCssExtractPlugin({
    //   // 类似于 webpackOptions.output 中的选项
    //   // 所有选项都是可选的
    //   filename: '../lib/style/[name].css'
    //   // chunkFilename: '../lib/style/[id].css'
    // })
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }) // 注意是绝对路径匹配
    // })
  ]
})
