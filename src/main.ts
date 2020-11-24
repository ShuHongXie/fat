import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'
import { Checkbox, Icon, CheckboxGroup, RadioGroup, Radio, AddressEdit } from 'vant'
import fat from './index'
console.log(fat)

createApp(App)
  .use(store)
  .use(router)
  .use(fat)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Icon)
  .use(AddressEdit)
  .mount('#app')
