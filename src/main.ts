/*
 * @Author: shuhongxie
 * @Date: 2020-09-24 15:52:53
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-01-25 19:42:36
 * @FilePath: /fat-ui/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'
import './style/index.scss'
import { Checkbox, Icon, CheckboxGroup, RadioGroup, Radio, AddressEdit, Col, Row, Cell } from 'vant'
import fat from './index'
import toast from './views/toast/index.ts'
console.log(fat)
// console.log(toast)

export const app = createApp(App)
  .use(store)
  .use(router)
  .use(toast as any, { type: 'toast' })
  .use(fat)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Icon)
  .use(AddressEdit)
  .use(Col)
  .use(Cell)
  .use(Row)

app.config.globalProperties.$toast = toast
app.mount('#app')
