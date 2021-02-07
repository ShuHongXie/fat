/*
 * @Author: shuhongxie
 * @Date: 2021-02-07 14:30:39
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-07 20:21:26
 * @FilePath: /fat-ui/src/views/button/index.ts
 */
import { App } from 'vue'
import button from './button.tsx'

button.install = (app: App) => {
  app.component(button.name, button)
}
export default button
