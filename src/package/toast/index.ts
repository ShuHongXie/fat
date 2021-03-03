/*
 * @Author: shuhongxie
 * @Date: 2021-01-20 17:06:50
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-23 14:39:18
 * @FilePath: /fat-ui/src/package/toast/index.ts
 */
import { App, createVNode, render, getCurrentInstance } from 'vue'
import { mountedCompoent } from 'fat-ui/utils/general/mountComponent'
import toast from './index.vue'
import mountComponent from 'fat-ui/utils/general/mountComponent.ts'
console.log(toast)

toast.install = (app: App) => {
  app.component(toast.name, toast)
}

export type ToastOptions = {
  message?: string // 提示信息
  icon?: string // 当前渲染的图片/图标
  iconPrefix?: string // 图标前缀
  mask?: boolean // 是否显示遮罩层
  dangerouslyUseHTMLString?: boolean // 是否使用v-html渲染
  duration?: number // 持续时间
  iconType?: string // 当前的icon类型  scroll/null
  timer?: any // 存储当前定时器
  visible?: boolean // 显示隐藏
  closed?: boolean // 隐藏的标识
  transition?: string // 过渡动画名字
  teleport?: string //挂载位置
  type?: string // 类型
  className?: string | string[] // 自定义类名
  position?: string // 位置
  forbidClick?: boolean // 是否禁止点击事件
  closeOnClickMask?: boolean // 是否点击遮罩层关闭
  closeOnClick?: boolean // 是否点击toast内容区域关闭toast
  onOpened?: () => void // 完全展示后的回调函数
  onClose?: () => void // 关闭时的回调
}

export type type = string[]

const OPTIONS: ToastOptions = {
  message: '',
  icon: '',
  dangerouslyUseHTMLString: true,
  duration: 3000,
  mask: false,
  iconType: '',
  timer: null,
  visible: false,
  closed: false,
  transition: 'fat-fade',
  teleport: 'body',
  type: 'text',
  className: '',
  position: 'middle',
  forbidClick: false,
  closeOnClick: false,
  closeOnClickMask: false,
  onOpened: () => {},
  onClose: () => {}
}

const initOptions: ToastOptions = {
  message: '',
  icon: '',
  dangerouslyUseHTMLString: true,
  duration: 3000,
  mask: false,
  iconType: '',
  timer: null,
  visible: false,
  closed: false,
  transition: 'fat-fade',
  teleport: 'body',
  type: 'text',
  className: '',
  position: 'middle',
  forbidClick: false,
  closeOnClick: false,
  closeOnClickMask: false,
  onOpened: () => {},
  onClose: () => {}
}

let queue: any = [] // 缓存实例队列
let appInstance: App | null = null // 存储App实例
let allowMultiple = false // 是否允许出现多个
const toastType: type = ['loading', 'success', 'fail']

/**
 * @Description: 选项融合
 * @Author: shuhongxie
 * @param {string} option
 */
const parseOption = (option: string | ToastOptions) => {
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
  const { instance, clear } = mountComponent(appInstance, toast)
  queue.push({
    instance,
    clear
  })
  return queue[queue.length - 1]
}

/**
 * @Description: Toast组件实例
 * @Author: shuhongxie
 * @param {any} ops
 */
function Toast(ops?: any): any {
  if (!allowMultiple && queue.length) {
    Toast.clear(true)
  }
  const { instance } = createToastInstance()
  console.log(instance)

  const options = parseOption(ops)
  instance?.component?.proxy.initOptions(options)
  return instance
}

/**
 * @Description: 插件注册
 * @Author: shuhongxie
 * @param {App} app
 */
Toast.install = (app: App) => {
  app.use(toast.install)
  appInstance = app
  app.config.globalProperties.$toast = Toast
}

/**
 * @Description: 是否允许多选
 * @Author: shuhongxie
 */
Toast.allowMultiple = (allow = false): void => {
  allowMultiple = allow
}

/**
 * @Description: 清除toast实例InitOptions
 * @Author: shuhongxie
 * @param {*} clearAll 是否清除全部
 */
Toast.clear = (clearAll = false) => {
  if (clearAll) {
    if (queue.length) {
      queue.forEach((item: mountedCompoent) => item.clear())
      queue = []
    }
  } else {
    if (queue.length) {
      queue[0].clear()
      queue.splice(0, 1)
    }
  }
}

/**
 * @Description: 修改全局默认设置 具体看
 * @Author: shuhongxie
 * @param {string} options
 */
Toast.setDefaultOptions = (options: string | ToastOptions) => {
  if (typeof options === 'string') {
    initOptions.type = options
  } else {
    for (const i in options) {
      initOptions[i] = options[i]
    }
  }
}

/**
 * @Description: 重置为默认设置
 * @Author: shuhongxie
 * @param {ToastOptions} optons
 */
Toast.resetDefaultOptions = () => {
  for (const i in OPTIONS) {
    initOptions[i] = OPTIONS[i]
  }
}

toastType.forEach((type: string) => {
  /**
   * @Description: 设置不同类型的toast实例
   * @Author: shuhongxie
   * @param {ToastOptions} options
   */
  Toast[type] = (options: ToastOptions) => {
    return Toast({
      type,
      ...options
    })
  }
})

export default Toast
