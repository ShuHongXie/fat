/*
 * @Author: shuhongxie
 * @Date: 2021-02-23 11:22:48
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-23 14:41:04
 * @FilePath: /fat-ui/types/toast.d.ts
 */
import { TeleportProps, VNode } from 'vue'

type ToastMessage = string | number
type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'html'
type ToastPosition = 'top' | 'middle' | 'bottom'

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

export interface Toast {
  (options: ToastOptions | ToastMessage): VNode
  loading(options?: ToastOptions | ToastMessage): void
  success(options?: ToastOptions | ToastMessage): void
  fail(options?: ToastOptions | ToastMessage): void
  clear(all?: boolean): void
  install(): void
  setDefaultOptions(options?: ToastOptions): void
  resetDefaultOptions(options?: string): void
  allowMultiple(allow: boolean): void
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: Toast
  }
}

export const Toast: Toast
