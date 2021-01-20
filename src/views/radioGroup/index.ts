import { App } from 'vue'
import radioGroup from './index.vue'

radioGroup.install = (app: App) => {
  app.component(radioGroup.name, radioGroup)
}
export default radioGroup
