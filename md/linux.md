<!--
 * @Author: shuhongxie
 * @Date: 2021-02-23 17:07:30
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-23 17:07:30
 * @FilePath: /fat-ui/md/linux.md
-->

## 前言

博客即将部署, 在这里记录下自己 node 环境的配置方法

## 第一步

进入[Node 官网下载页](http://nodejs.cn/download/)，chrome 按下 F12 进入控制台，点击元素获取下载连接
或者也可以通过 QQ 浏览器自带的下载器,点击右键提取下载链接

/more

## 第二步

使用 Centos(或者其他 linux 服务器)的 wget 命令，如果没有 wget 命令就使用自带的 yum 命令下载 wget(如下)

> yum install -y wget

下载完 wget 之后就可以直接下载 Node

> wget https://npm.taobao.org/mirrors/node/v12.13.1/node-v12.13.1-linux-x64.tar.xz

## 第三步

使用 tar 命令解压安装包

> tar -xvf node-v12.13.1-linux-x64.tar.xz

## 第四步

直接使用软连接方式全局配置 Node 和 npm

```js
ln -s /usr/local/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/nodejs/bin/node /usr/local/bin/
```

## 第五步

控制台直接 node -v 或者 npm -v 打印 Node 版本
