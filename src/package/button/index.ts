/*
 * @Author: shuhongxie
 * @Date: 2021-02-07 14:30:39
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-08 23:29:41
 * @FilePath: /fat-ui/src/package/button/index.ts
 */
import { App } from 'vue'
import button from './button.tsx'

console.log(button)

button.install = (app: App) => {
  app.component(button.name, button)
}
export default button
