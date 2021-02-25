## 前言

之前用习惯了别人的图片懒加载指令，现在自己也试着写了一个，在这里记录下自己过程中的心得体会，当前指令逻辑使用于 vue2 和 vue3

## 图片懒加载原理

使用 html 自定义数据先覆盖图片或者背景图的默认地址，从少图片资源加载，当滚动条拉动到可视区的时候才逐渐加载图片，从而提高网站性能
/more

## 目标

实现图片懒加载和背景图片的懒加载，并且支持自定义默认图片图片

## 开始

需要明白的两点

1. 需要设置一个自定义默认图片的自定义属性
2. 需要传入一个值设置当前是图片的懒加载还是背景图片的懒加载，背景图片需要从一开始就设定好宽度，才能计算

下面开始代码

```js
import { App, DirectiveBinding } from 'vue'

/**
 * @Description: 设置样式
 * @Author: shuhongxie
 * @param {any} arg 传入的类型
 * @param {HTMLElement} el DOM元素
 * @param {string} value 图片url值
 */
function setStyle(arg: any, el: HTMLElement, value: string) {
  !arg ? el.setAttribute('src', value) : (el.style.backgroundImage = `url("${value}")`)
}

/**
 * @Description: 初始化图片懒加载
 * @Author: shuhongxie
 * @param {HTMLElement} el DOM元素
 * @param {DirectiveBinding} binding
 */
function initLazy(el: HTMLElement, binding: DirectiveBinding) {
  // 默认图片
  const beforeHandImage = el.getAttribute('lazy-init-img') || 'http://www.ay1.cc/img?w=300&h=300'
  // 屏幕高度
  const contentHeight = document.body.clientHeight
  // 不使用offsetTop是因为如果父级有定位的话 那么offsetTop是相对于父级而不是浏览器窗口
  let elOffsetTop = el.getBoundingClientRect().top + document.documentElement.scrollTop

  // 图片高度大于当前屏幕就替换调原始图片
  if (elOffsetTop > contentHeight) {
    // 没有就直接赋值当前图片
    setStyle(binding.arg, el, beforeHandImage)
  } else {
    setStyle(binding.arg, el, binding.value)
  }

  window.addEventListener('scroll', () => {
    const scrollTop =
      document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    // 刷新完重新定义高度
    elOffsetTop = el.getBoundingClientRect().top + document.documentElement.scrollTop
    // 到达可视区就设置样式
    if (scrollTop + contentHeight > elOffsetTop) {
      setStyle(binding.arg, el, binding.value)
    }
  })
}

export default (app: App) => {
  // v-lazy 图片懒加载指令 beforeHandImage 初始化的图片
  app.directive('lazy', {
    mounted(el, binding, vnode, oldVnode) {
      setTimeout(() => {
        initLazy(el, binding)
      }, 0)
    },
    updated(el, binding) {
      setTimeout(() => {
        initLazy(el, binding)
      }, 0)
    },
    unmounted() {
      window.removeEventListener('scroll', null)
    }
  })
}
```

可以看到，上图通过定义个一个 lazy-init-img 的自定义属性和传入了一个 background 指令参数来切换成背景图模式，不传则是图片模式，通过使用
getBoundingClientRect 方法获取到浏览器的距离，在所有队列任务执行完之后重新计算高度，执行对应的逻辑
