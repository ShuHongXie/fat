/*
 * @Author: shuhongxie
 * @Date: 2020-11-24 16:11:03
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-07 20:21:53
 * @FilePath: /fat-ui/src/index.ts
 */
import { App } from 'vue'

import directive from './utils/directive'

import mask from './views/mask/index.ts'
import popup from './views/popup/index.ts'
import row from './views/row/index.ts'
import col from './views/col/index.ts'
import icon from './views/icon/index.ts'
import cell from './views/cell/index.ts'
import checkbox from './views/checkbox/index.ts'
import checkboxGroup from './views/checkboxGroup/index.ts'
import radio from './views/radio/index.ts'
import radioGroup from './views/radioGroup/index.ts'
import loading from './views/loading/index.ts'
import toast from './views/toast/index.ts'
import image from './views/image'
import button from './views/button'
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
  button
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
