import { App } from 'vue'
import icon from './index.vue'

icon.install = (app: App) => {
  app.component(icon.name, icon)
}
export default icon
