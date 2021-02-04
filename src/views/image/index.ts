/*
 * @Author: shuhongxie
 * @Date: 2021-02-04 15:56:15
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-04 15:56:26
 * @FilePath: /fat-ui/src/views/image/index.ts
 */
import { App } from 'vue'
import image from './index.vue'

image.install = (app: App) => {
  app.component(image.name, image)
}
export default image
