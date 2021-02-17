/*
 * @Author: shuhongxie
 * @Date: 2021-01-25 20:12:29
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-15 20:40:49
 * @FilePath: /fat-ui/src/utils/general/mountComponents.ts
 */
import { createApp, App, defineComponent, render, createVNode } from 'vue'
import type { Component, VNode } from 'vue'

export type mountedCompoent = {
  instance: App<Element>
  clear: () => void
}

export default function mountComponent(app: App, container: Component): mountedCompoent {
  console.log(app, container)

  // 创建实例
  const instance = createApp(container)
  // const vm = createVNode(container, {})
  // vm.appContext = app?._context

  // 创建元素
  const div = document.createElement('div')
  // render(vm, div)
  document.body.appendChild(div)
  // 挂载
  instance.mount(div)

  return {
    instance,
    clear: () => {
      instance.unmount(div)
      document.body.removeChild(div)
    }
  }
}
