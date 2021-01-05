const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
function resolve(dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir)
}
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  productionSourceMap: false,
  // lintOnSave: true,
  // devServer: {
  //   port: process.env.VUE_APP_PORT,
  //   proxy: {
  //     [process.env.VUE_APP_BASE_API]: {
  //       target: `http://200.100.100.205:13002/terminal`,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         ['^' + process.env.VUE_APP_BASE_API]: ''
  //       }
  //     }
  //   }
  // },
  // CDN外部扩展
  // externals: {
  //   vue: 'Vue',
  //   'vue-router': 'VueRouter',
  //   vuex: 'Vuex'
  // },
  chainWebpack: config => {
    // 文件体积分析
    console.log(config.mode)
    if (config.mode === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }

    // 代码压缩
    config.plugin('compression-webpack-plugin').use(
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png$|\.woff$|\.eot$|\.ttf$|\.woff2$|/, // 需要压缩的文件类型
        threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      })
    )
    // 模板插入 增加白屏显示
    config.plugin('html-webpack-plugin').use(
      new HtmlWebpackPlugin({
        /**
        meta: {
          viewport: 'xxx = 1',
          // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          'theme-color': '#4285f4'
          // Will generate: <meta name="theme-color" content="#4285f4">
        },
         */
        template: 'template/loading.html' // 重写div=app
      })
    )
    // CDN
    // config.externals({
    //   'vue-router': 'VueRouter'
    // })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '*': resolve('src/assets/image')
      },
      extensions: ['*', '.js', '.json', '.vue', '.ts']
    }
  }
}
