/*
 * @Author: shuhongxie
 * @Date: 2021-02-01 21:27:56
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-01 21:28:10
 * @FilePath: /fat-ui/src/views/loading/index.ts
 */
import { App } from 'vue'
import loading from './index.vue'

loading.install = (app: App) => {
  app.component(loading.name, loading)
}
export default loading
