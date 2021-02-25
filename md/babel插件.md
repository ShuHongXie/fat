## 定制自己的 Fat-ui 组件库之如何编写自己的按需加载 babel 插件

作为一名前端开发工程师 我一直想拥有自己的一套组件库，最近把 Fat-ui 的几个组件已经完成，现在将之前的按需加载 babel 插件编写过程记录下来

> 可以下载我的 babel-plugin-dynamic 库查看代码：npm i babel-plugin-dynamic -D

> Tip: 对下文不懂的可以参考[`babel插件入门`](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-babylon)

### 本质

按需加载原理其实就是运用 commonjs 单独引入打包后的 js 文件和 css 文件，代码转换如下

/more

```js
// 参照我自己的Fat-ui组件 转换前
import { cell } from 'fat-ui'

// 转换后
var cell = require('fat-ui/lib/cell')
require('fat-ui/style/cell.css')
```

### 了解 babel 编译过程

babel 编译过程分为三个阶段：

> 源代码 -> AST -> 转换过的 AST -> 转换过的代码

转换过程对应着几个不同的包,而这些包都包含在@babel/core 核心包内

- @babel/parser：解析 js 代码,转换成 AST 语法
- @babel/traverse：遍历 AST 语法，对 AST 进行遍历操作，生成新的 AST
- @babel/generator：把 AST 代码转换成 js 代码
- @babel/types：提供的一个工具函数来创建一个 AST 节点

### 开始写代码

#### 先看源代码转换成 AST 前后的样子

```js
// 转换前
import { cell, dialog } from 'fat-ui'

// 转换后
{
  "type": "Program",
  "start": 0,
  "end": 37,
  "body": [
    {
      "type": "ImportDeclaration",
      "start": 0,
      "end": 37,
      "specifiers": [
        {
          "type": "ImportSpecifier",
          "start": 9,
          "end": 13,
          "imported": {
            "type": "Identifier",
            "start": 9,
            "end": 13,
            "name": "cell"
          },
          "local": {
            "type": "Identifier",
            "start": 9,
            "end": 13,
            "name": "cell"
          }
        },
        {
          "type": "ImportSpecifier",
          "start": 15,
          "end": 21,
          "imported": {
            "type": "Identifier",
            "start": 15,
            "end": 21,
            "name": "dialog"
          },
          "local": {
            "type": "Identifier",
            "start": 15,
            "end": 21,
            "name": "dialog"
          }
        }
      ],
      "source": {
        "type": "Literal",
        "start": 29,
        "end": 37,
        "value": "fat-ui",
        "raw": "'fat-ui'"
      }
    }
  ],
  "sourceType": "module"
}
```

从上图可以分析得出

- ImportDeclaration：import 语句定义
- ImportSpecifier：cell,dialog 括号语句定义
- Identifier：括号内语句定义内容
- source 下面的 Literal： 源包名称

#### 根据这一我们可以编写自己的转换逻辑,

```js
const t = require('@babel/types')
/*
  访问者是一个用于 AST 遍历的跨语言的模式。 简单的说它们就是一个对象，定义了用于在一个树状结构中获取具体节点的方法
*/
const visitor = {
  // 当在树中遇见一个 ImportDeclaration 的时候会调用ImportDeclaration()
  ImportDeclaration(path, { opts }) {
    const { node } = path
    // babel配置文件时传入的自定义参数
    const frameworkName = node.source.value
    let requireStr = []
    // 判断当前框架是否是配置的指定框架 并且节点树的第一个导入是否是模块导入而不是默认导入
    if (
      frameworkName === opts.frameworkName &&
      node.specifiers[0].type === 'ImportSpecifier' &&
      node.specifiers.map(item => t.isImportSpecifier(item))
    ) {
      node.specifiers.forEach((item, index) => {
        if (index === 0) {
        }
        // 生成require语句
        requireStr.push(
          t.VariableDeclaration('var', [
            t.VariableDeclarator(
              t.Identifier(item.imported.name),
              t.callExpression(t.identifier('require'), [
                t.stringLiteral(`${frameworkName}/lib/${item.imported.name.toLowerCase()}`)
              ])
            )
          ])
        )
        requireStr.push(
          t.callExpression(t.identifier('require'), [
            t.stringLiteral(`${frameworkName}/lib/style/${item.imported.name.toLowerCase()}.css`)
          ])
        )
      })
      // 替换语句
      path.replaceWithMultiple(requireStr)
    }
  }
}
// 作为一个common.js模块导出
module.exports = function () {
  return {
    // 访问者模式
    visitor
  }
}
```

#### package.json 发布包

```js
{
  ...
  "main": "index.js",
  ...
}
```

#### 使用 babel.config.js 引用

```js
module.exports = {
  plugins: [
    [
      'dynamic',
      {
        frameworkName: 'fat-ui'
      }
    ]
  ]
}
```
