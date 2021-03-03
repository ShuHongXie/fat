/*
 * @Author: shuhongxie
 * @Date: 2020-09-24 15:52:53
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-01 16:11:14
 * @FilePath: /fat-ui/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'
import './style/index.scss'
// import {
//   Dialog,
//   Checkbox,
//   Icon,
//   CheckboxGroup,
//   RadioGroup,
//   Radio,
//   AddressEdit,
//   Col,
//   Row,
//   Cell
// } from 'vant'
import fat from './index'
import toast from './package/toast/index.ts'
import col from './package/col/index.ts'
import dialog from './package/dialog/index.ts'
import home from './views/Home.vue'
// console.log(col)
// // console.log(fat)
// // console.log(Toast)
// const func = (args: any) => {
//   console.log('进入开始调用')
//   console.log(args.render.toString())
// }
// func(App)
export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
let a = ShapeFlags.ELEMENT // 00000000000000000000000000000101
a |= ShapeFlags.TEXT_CHILDREN // 00000000000000000000000000000011

console.log(a)

export const app = createApp(App).use(store).use(router).use(fat)
// .use(Checkbox)
// .use(CheckboxGroup)
// .use(RadioGroup)
// .use(Radio)
// .use(Icon)
// .use(AddressEdit)
// .use(Col)
// .use(Cell)
// .use(Row)
// .use(toast as any)
// .use(Toast)
app.mount('#app')

console.log(app)
