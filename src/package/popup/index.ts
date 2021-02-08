/*
 * @Author: shuhongxie
 * @Date: 2020-11-24 20:11:54
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-01-25 19:17:18
 * @FilePath: /fat-ui/src/views/popup/index.ts
 */
import { App } from 'vue'
import popup from './index.vue'

popup.install = (app: App) => {
  app.component(popup.name, popup)
}

export default popup
