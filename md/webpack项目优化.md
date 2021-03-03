<!--
 * @Author: shuhongxie
 * @Date: 2021-03-03 11:23:34
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-03 11:42:49
 * @FilePath: /fat-ui/md/webpack项目优化.md
-->

## 优化手段

1. SpeedMeasureWebpackPlugin 插件分析时间
2. webpack-bundle-analyzer 体积分析
3. tree-shaking 字面意思是摇晃树，就是把树上坏掉的叶子摇下来，就是死码清除（即没有被用到的代码）
   某个模块或文件，的某个方法被用到了，整个模块都会被打包都 bundle 文件中去，tree-shaking 会把没有用到的方法去除，在 uglify 阶段清除
   仅支持 es6 语法 webpack 4 中设置 production 默认开启了此项优化
4. thread-loader 加速构建
