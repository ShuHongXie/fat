/*
 * @Author: shuhongxie
 * @Date: 2021-02-17 21:19:41
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-21 01:02:49
 * @FilePath: /fat-ui/src/package/mask/index.ts
 */
import { App } from 'vue'
import mask from './src/index.vue'

mask.install = (app: App) => {
  app.component(mask.name, mask)
}
export default mask

// const str: Array<string> = ['特殊', 'xx ']
// export default str
