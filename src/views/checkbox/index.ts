import { App } from 'vue'
import checkbox from './index.vue'

checkbox.install = (app: App) => {
  app.component(checkbox.name, checkbox)
}
export default checkbox
