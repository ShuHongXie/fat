/*
 * @Author: shuhongxie
 * @Date: 2021-01-20 17:06:50
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-01 17:55:16
 * @FilePath: /fat-ui/src/views/toast/index.ts
 */
import { App, createVNode, render, getCurrentInstance } from 'vue'
import type { DefineComponent, Plugin } from 'vue'
import toast from './index.vue'
import mountComponent from '@/utils/general/mountComponent.ts'
console.log(toast)

toast.install = (app: App) => {
  app.component(toast.name, toast)
}

export type InitOptions = {
  message?: string // 提示信息
  icon?: string // 当前渲染的图片
  dangerouslyUseHTMLString?: boolean // 是否使用v-html渲染
  duration?: number // 持续时间
  iconType?: string // 当前的icon类型  scroll/null
  timer?: any // 存储当前定时器
  visible?: boolean // 显示隐藏
  closed?: boolean // 隐藏的标识
  transition?: string // 过渡动画名字
  teleport?: string //挂载位置
  type?: string // 类型
  className?: string // 自定义类名
  position?: string // 位置
  forbidClick?: boolean // 背景点击
}

const initOptions: InitOptions = {
  message: '',
  icon: '',
  dangerouslyUseHTMLString: true,
  duration: 3000,
  iconType: '',
  timer: null,
  visible: false,
  closed: false,
  transition: 'fat-fade',
  teleport: 'body',
  type: 'text',
  className: '',
  position: 'middle',
  forbidClick: false
}

/**
 * @Description: 实例队列
 * @Author: shuhongxie
 */
const queue: any = [] // 缓存队列

/**
 * @Description: 选项融合
 * @Author: shuhongxie
 * @param {string} option
 */
const parseOption = (option: string | InitOptions) => {
  if (typeof option === 'string') {
    option = { message: option }
  }
  return Object.assign({}, initOptions, option)
}

/**
 * @Description: 创建队列
 * @Author: shuhongxie
 * @param {*} any
 */
const createToastInstance = (): any => {
  const { vm, unmount } = mountComponent(toast)
  // vm.component?.proxy.options = finalOptions
  queue.push({
    instance: vm,
    unmount
  })

  return queue[queue.length - 1]
}

/**
 * @Description: Toast组件实例
 * @Author: shuhongxie
 * @param {any} ops
 */
function Toast(ops?: any): any {
  const { instance } = createToastInstance()
  const options = parseOption(ops)
  instance?.component?.proxy.initOptions(options)
  return instance
}

Toast.install = (app: App, options: any) => {
  app.use(toast.install)
  app.config.globalProperties.$toast = Toast
}
;['loading', 'success', 'fail'].forEach((type: string) => {
  Toast[type] = (options: InitOptions) => {
    return Toast({
      type,
      ...options
    })
  }
})

export default Toast
