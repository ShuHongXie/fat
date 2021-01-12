import { App } from 'vue'
import checkboxGroup from './index.vue'

checkboxGroup.install = (app: App) => {
  app.component(checkboxGroup.name, checkboxGroup)
}
export default checkboxGroup
