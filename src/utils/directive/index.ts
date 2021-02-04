/*
 * @Author: shuhongxie
 * @Date: 2021-02-04 16:14:11
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-04 23:23:03
 * @FilePath: /fat-ui/src/utils/directive/index.ts
 */
import { App } from 'vue'

export default (app: App) => {
  // v-lazy 图片懒加载指令 beforeHandImage 初始化的图片
  app.directive('lazy', {
    mounted(el, binding, vnode, oldVnode) {
      console.log('开始挂载图片懒加载指令==============')

      console.log(el, binding, vnode, oldVnode)
      console.log(el.getAttribute('lazy-init-img') || 'http://www.ay1.cc/img?w=300&h=300')

      // 默认图片
      const beforeHandImage =
        el.getAttribute('lazy-init-img') || 'http://www.ay1.cc/img?w=300&h=300'
      // 屏幕高度
      const contentHeight = document.body.clientHeight
      // 图片高度大于当前屏幕就替换调原始图片
      if (el.offsetTop > contentHeight) {
        !binding.arg
          ? el.setAttribute('src', beforeHandImage)
          : (el.style.backgroundImage = `url("${binding.value}")`)
        // 没有就直接赋值当前图片
      } else {
        !binding.arg
          ? el.setAttribute('src', beforeHandImage)
          : (el.style.backgroundImage = `url("${binding.value}")`)
      }

      window.addEventListener('scroll', () => {
        const scrollTop =
          document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop + contentHeight > el.offsetTop) {
          if (!binding.arg) {
            el.setAttribute('src', binding.value)
          } else if (binding.arg === 'background') {
            el.style.backgroundImage = `url("${binding.value}")`
          }
        }
      })
    },
    unmounted() {
      window.removeEventListener('scroll', null)
    }
  })
}
