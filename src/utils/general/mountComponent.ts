import { createApp, defineComponent } from 'vue'
import type { Component } from 'vue'

export default function mountComponent(container: Component) {
  // 创建实例
  const instance = createApp(container)
  // 创建元素
  const div = document.createElement('div')
  document.body.appendChild(div)
  // 挂载
  instance.mount(div)

  return {
    instance,
    unmount: () => {
      instance.unmount(div), document.body.removeChild(div)
    }
  }
}
