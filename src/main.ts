import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'
import {
  Checkbox,
  Icon,
  CheckboxGroup,
  RadioGroup,
  Radio,
  AddressEdit
} from 'vant'

createApp(App)
  .use(store)
  .use(router)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Icon)
  .use(AddressEdit)
  .mount('#app')
