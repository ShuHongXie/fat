import { createApp } from 'vue'
import type { ComponentOptionsWithObjectProps } from 'vue'

export default function mountComponent(config: ComponentOptionsWithObjectProps) {
  // 创建实例
  const instance = createApp(config)
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
