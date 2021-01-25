/*
 * @Author: shuhongxie
 * @Date: 2021-01-20 17:06:50
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-01-25 19:53:41
 * @FilePath: /fat-ui/src/views/toast/index.ts
 */
import { App, createVNode, render, getCurrentInstance } from 'vue'
import type { DefineComponent, Plugin } from 'vue'
import toast from './index.vue'
import mountComponent from '@/utils/general/mountComponent.ts'

toast.install = (app: App) => {
  app.component(toast.name, toast)
}

// export default toast

const queue = []

class Toast {
  install: any
  instance: any
  constructor(options?: any) {
    this.instance = this.init()
    this.install = this.installFunc
  }

  init() {
    const { instance, unmount } = mountComponent({
      props: {},
      setup() {
        // getCurrentInstance()?.render = () => toast
      }
    })
    console.log(getCurrentInstance())
    // ;(getCurrentInstance() as any).render = () => toast
    // return toast
  }

  open() {
    console.log('现在开启了open')
  }

  /**
   * @Description: toast初始化
   * @Author: shuhongxie
   * @param {App} app
   */
  installFunc(app: App, options: any) {
    // app.component(toast.name, toast)
    // app.use(toast.install)
    // app.config.globalProperties.$toast = open

    app.provide('toast', options)
  }
}

const toastConstructor = new Toast()
export default toastConstructor
