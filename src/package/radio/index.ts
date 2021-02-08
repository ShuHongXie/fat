import { App } from 'vue'
import radio from './index.vue'

radio.install = (app: App) => {
  app.component(radio.name, radio)
}
export default radio
