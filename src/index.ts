/*
 * @Author: shuhongxie
 * @Date: 2020-11-24 16:11:03
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-17 22:59:43
 * @FilePath: /fat-ui/src/index.ts
 */
import './style/index.scss'
import { App } from 'vue'

import directive from './utils/directive'

import mask from './package/mask/index'
import popup from './package/popup/index.ts'
import row from './package/row/index.ts'
import col from './package/col/index.ts'
import icon from './package/icon/index.ts'
import cell from './package/cell/index.ts'
import checkbox from './package/checkbox/index.ts'
import checkboxGroup from './package/checkboxGroup/index.ts'
import radio from './package/radio/index.ts'
import radioGroup from './package/radioGroup/index.ts'
import loading from './package/loading/index.ts'
import toast from './package/toast/index.ts'
import image from './package/image'
import button from './package/button'
import dialog from './package/dialog'
const components = [
  mask,
  popup,
  row,
  col,
  icon,
  cell,
  checkbox,
  checkboxGroup,
  radio,
  radioGroup,
  loading,
  toast,
  image,
  button,
  dialog
]

function install(app: App) {
  // 组件注册
  components.forEach(item => {
    app.use(item.install)
  })
  // 指令注册
  directive(app)
  // app.use(directive)
}

export default { install }
