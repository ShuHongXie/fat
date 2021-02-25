<!--
 * @Author: shuhongxie
 * @Date: 2021-02-23 17:00:28
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-23 17:55:19
 * @FilePath: /fat-ui/md/fat-ui声明文件编写.md
-->

## 前言

自己的 Fat-ui 组件库和 babel 按需加载插件写完之后，也抽空把 d.ts 声明文件一起做了，现在将编写和配置过程记录下来

## 第一步

首先分析下 Vue3 插件注册时的部分源代码

```js
// 文件地址： vue-next/packages/runtime-core/src/apiCreateApp.ts

// 创建一个存储所有插件的列表
const installedPlugins = new Set()
// use方法使用插件
use(plugin: Plugin, ...options: any[]) {
  // 如果列表里面已经注册了 那么就提示
  if (installedPlugins.has(plugin)) {
    __DEV__ && warn(`Plugin has already been applied to target app.`)
  // 如果插件的install是一个函数 那么推入插件列表 并且直接执行install
  } else if (plugin && isFunction(plugin.install)) {
    installedPlugins.add(plugin)
    plugin.install(app, ...options)
    // 如果插件是一个函数 那么也是直接执行 因为插件注册有2种方式
    // 1.对象里面带install函数
    // 2.函数
  } else if (isFunction(plugin)) {
    installedPlugins.add(plugin)
    plugin(app, ...options)
  } else if (__DEV__) {
    ...
  }
  return app
},
```

/more

从上图可知插件里面需要注册一个 install 方法

## 第二步

首先需要定义全局组件注册的 d.ts

```js
/// index.d.ts
import { App } from 'vue'
// 定义了一个class
export class FatComponent {
  static name: string
  // 传入App实例
  static install: (app: App) => any
}

export class button extends FatComponent {}
```

## 第三步

通过上面的 d.ts 编写后 就可以直接在 package.json 的 typings 指定声明文件的地址了, 声明之后就可以直接打包

```js
{
  "typings": "types/index.d.ts",
  ...
}
```
