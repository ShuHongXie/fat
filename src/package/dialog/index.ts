/*
 * @Author: shuhongxie
 * @Date: 2021-01-20 17:06:50
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-18 14:02:41
 * @FilePath: /fat-ui/src/package/dialog/index.ts
 */
import { App, createVNode, render, getCurrentInstance, h, ref } from 'vue'
import dialog from './index.vue'
import mountComponent from '@/utils/general/mountComponent.ts'

dialog.install = (app: App) => {
  app.component(dialog.name, dialog)
}

// export default dialog

export type InitOptions = {
  visible?: boolean
  title?: string // 标题
  width?: number | string // 弹窗宽度，默认单位为px	320px
  message?: string // 文本内容
  messageAlign?: string // 内容对齐方式，可选值为left right	string	center
  theme?: string //	样式风格，可选值为round
  className?: string | string[] | object // 自定义类名
  showConfirmButton?: boolean //	是否展示确认按钮
  showCancelButton?: boolean //	是否展示取消按钮
  confirmButtonText?: string // 确认按钮文案
  confirmButtonColor?: string // 确认按钮颜色	#ee0a24
  cancelButtonText?: string //	取消按钮文案 取消
  cancelButtonColor?: string //	取消按钮颜色	black
  mask?: boolean // 是否展示遮罩层	boolean	true
  maskClass?: string | string[] | object // 自定义遮罩层类名
  maskStyle?: object // 自定义遮罩层样式
  closeOnPopstate?: boolean //	是否在页面回退时自动关闭	true
  closeOnClickMask?: any //	是否在点击遮罩层后关闭弹窗	false
  lockScroll?: boolean // 是否锁定背景滚动	true
  allowHtml?: boolean // 是否允许 message 内容中渲染 HTML	false
  beforeClose?: () => boolean //关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise	(action) => boolean | Promise	-
  transition?: string // 动画类名，等价于 transtion 的name属性
  teleport?: string // 指定挂载的节点，用法示例
}

export type type = string[]

const OPTIONS: InitOptions = {
  visible: true,
  title: '',
  width: '',
  message: '',
  messageAlign: '',
  theme: '',
  className: '',
  showConfirmButton: false,
  showCancelButton: false,
  confirmButtonText: '确认',
  confirmButtonColor: '#ee0a24',
  cancelButtonText: '取消',
  cancelButtonColor: 'black',
  mask: true,
  maskClass: '',
  maskStyle: {},
  closeOnPopstate: false,
  lockScroll: true,
  allowHtml: false,
  beforeClose: () => true,
  transition: '',
  teleport: 'body'
}

const initOptions: InitOptions = {
  visible: false,
  title: '',
  width: '',
  message: '',
  messageAlign: '',
  theme: '',
  className: '',
  showConfirmButton: true,
  showCancelButton: true,
  confirmButtonText: '确认',
  confirmButtonColor: '#ee0a24',
  cancelButtonText: '取消',
  cancelButtonColor: 'black',
  mask: true,
  maskClass: '',
  maskStyle: {},
  closeOnClickMask: false,
  closeOnPopstate: false,
  lockScroll: true,
  allowHtml: true,
  beforeClose: () => true,
  transition: 'scale',
  teleport: 'body'
}

let appInstance: App | null = null // 存储App实例
let initInstance: any = null
const dialogType: type = ['alert', 'confirm']

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
const createDialogInstance = (ops?: any): any => {
  const props = dialog.props
  for (const key in ops) {
    if (props.hasOwnProperty(key)) {
      props[key].default = ops[key]
    }
  }

  return mountComponent(appInstance, {
    ...dialog,
    props: {
      ...props,
      modelValue: {
        default: true,
        type: Boolean
      }
    }
  })
}

/**
 * @Description: Dialog组件实例
 * @Author: shuhongxie
 * @param {any} ops
 */
function Dialog(ops?: any): any {
  console.log('开始初始化dialog')
  const options = parseOption(ops)
  if (initInstance) {
    initInstance.clear()
  }
  initInstance = createDialogInstance(options)
  // instance?.component?.proxy.initOptions(options)
  // return instance
}

Dialog.close = () => {
  initInstance?.clear()
}

/**
 * @Description: 插件注册
 * @Author: shuhongxie
 * @param {App} app
 */
Dialog.install = (app: App) => {
  appInstance = app
  app.use(dialog.install)
  app.config.globalProperties.$dialog = Dialog
}

/**
 * @Description: 修改全局默认设置 具体看
 * @Author: shuhongxie
 * @param {string} options
 */
Dialog.setDefaultOptions = (options: InitOptions) => {
  for (const i in options) {
    initOptions[i] = options[i]
  }
}

/**
 * @Description: 重置为默认设置
 * @Author: shuhongxie
 * @param {InitOptions} optons
 */
Dialog.resetDefaultOptions = () => {
  for (const i in OPTIONS) {
    initOptions[i] = OPTIONS[i]
  }
}

dialogType.forEach((type: string) => {
  /**
   * @Description: 设置不同类型的dialog实例
   * @Author: shuhongxie
   * @param {InitOptions} options
   */
  Dialog[type] = (options: InitOptions) => {
    return Dialog({
      ...options,
      showCancelButton: type === 'confirm' ? true : false
    })
  }
})

export default Dialog
