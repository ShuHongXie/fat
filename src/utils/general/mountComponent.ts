/*
 * @Author: shuhongxie
 * @Date: 2021-01-25 20:12:29
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-02 14:58:12
 * @FilePath: /fat-ui/src/utils/general/mountComponent.ts
 */
import { createApp, App, defineComponent, render, createVNode } from 'vue'
import type { Component } from 'vue'

export default function mountComponent(app, container: Component) {
  // 创建实例
  const instance = createApp(container)
  const vm = createVNode(container, {})
  vm.appContext = app?._context
  // 创建元素
  const div = document.createElement('div')
  render(vm, div)
  // console.log(app)
  document.body.appendChild(div)
  // 挂载
  // instance.mount(div)
  console.log(app)

  return {
    vm,
    unmount: () => {
      document.body.removeChild(div)
    }
  }
}
