/*
 * @Author: shuhongxie
 * @Date: 2021-02-04 16:14:11
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-05 17:26:33
 * @FilePath: /fat-ui/src/utils/directive/index.ts
 */
import { App, nextTick, DirectiveBinding } from 'vue'

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
  // console.log(
  //   el,
  //   binding,
  //   el.offsetTop,
  //   el.getBoundingClientRect().top,
  //   document.documentElement.scrollTop
  // )
  console.log('开始挂载图片懒加载指令==============>')
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
    if (scrollTop + contentHeight > elOffsetTop) {
      setStyle(binding.arg, el, binding.value)
    }
  })
}

export default (app: App) => {
  // v-lazy 图片懒加载指令 beforeHandImage 初始化的图片
  app.directive('lazy', {
    mounted(el, binding, vnode, oldVnode) {
      initLazy(el, binding)
    },
    updated(el, binding) {
      nextTick(() => {
        initLazy(el, binding)
      })
    },
    unmounted() {
      window.removeEventListener('scroll', null)
    }
  })
}
