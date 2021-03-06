/*
 * @Author: shuhongxie
 * @Date: 2021-01-25 20:12:29
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 22:27:43
 * @FilePath: /fat-ui/src/utils/general/mountComponent.ts
 */
import { createApp, App, defineComponent, render, createVNode } from 'vue'
import type { Component, VNode } from 'vue'

export type mountedCompoent = {
  instance: VNode
  clear: () => void
}

export default function mountComponent(app: App, container: Component): mountedCompoent {
  console.log(app, container)

  // 创建实例
  const instance = createApp(container)
  const vm = createVNode(container)
  console.log(app)
  console.log(vm)

  vm.appContext = app?._context

  // 创建元素
  const div = document.createElement('div')
  render(vm, div)
  document.body.appendChild(div)
  // 挂载
  instance.mount(div)

  return {
    instance: vm,
    clear: () => {
      instance.unmount()
      document.body.removeChild(div)
      setTimeout(() => {}, 0)
    }
  }
}
