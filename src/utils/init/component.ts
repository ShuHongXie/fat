/*
 * @Author: shuhongxie
 * @Date: 2020-11-24 14:35:37
 * @Last Modified by: shuhongxie
 * @Last Modified time: 2020-11-24 16:27:18
 */
import { defineComponent, ComponentOptionsWithObjectProps, App } from 'vue'
import config from '@/utils/config'

/**
 * @description 初始化组件
 * @author shuhongxie
 * @export
 * @param {string} name
 * @return {*}
 */
export default function initComponents(name: string) {
  return function(sfc: ComponentOptionsWithObjectProps) {
    sfc.name = `${config.frameworkName}-${name}`
    console.log(sfc.name)
    sfc.install = (app: App) => {
      app.component(`${sfc.name}`, sfc)
    }

    return defineComponent(sfc)
  } as typeof defineComponent
}
