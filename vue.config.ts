const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
function resolve(dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // productionSourceMap: false,
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
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '*': resolve('src/assets/image')
      },
      extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: []
  }
  // css: {
  //   loaderOptions: {
  //     less: {
  //       // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
  //       lessOptions: {
  //         modifyVars: {
  //           // 直接覆盖变量
  //           // 'text-color': '#111',
  //           // 'border-color': '#eee',
  //           // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
  //           hack: `true; @import "~@/assets/reset.less";`
  //         }
  //       }
  //     }
  //   }
  // }
}
