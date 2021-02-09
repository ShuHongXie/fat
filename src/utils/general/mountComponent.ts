/*
 * @Author: shuhongxie
 * @Date: 2021-01-25 20:12:29
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-09 21:02:43
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
  const vm = createVNode(container, {})
  vm.appContext = app?._context
  console.log('11', vm)

  // 创建元素
  const div = document.createElement('div')
  console.log('2')
  render(vm, div)
  console.log('22')
  document.body.appendChild(div)
  // 挂载
  instance.mount(div)
  console.log(vm)

  return {
    instance: vm,
    clear: () => {
      instance.unmount(div)
      document.body.removeChild(div)
      setTimeout(() => {}, 0)
    }
  }
}
