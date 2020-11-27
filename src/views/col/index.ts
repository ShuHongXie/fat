import { App } from 'vue'
import col from './index.vue'

col.install = (app: App) => {
  app.component(col.name, col)
}
export default col
