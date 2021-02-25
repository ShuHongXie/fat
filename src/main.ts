/*
 * @Author: shuhongxie
 * @Date: 2020-09-24 15:52:53
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-25 17:56:36
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
console.log(col)
// console.log(fat)
// console.log(Toast)
const func = (args: any) => {
  console.log('进入开始调用')
  console.log(args.render.toString())
}
func(App)

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
