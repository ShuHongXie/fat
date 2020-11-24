import { App } from 'vue'
import popup from './index.vue'

popup.install = (app: App) => {
  app.component(popup.name, popup)
}
export default popup
