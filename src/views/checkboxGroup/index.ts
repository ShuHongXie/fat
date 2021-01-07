import { App } from 'vue'
import checkboxGroup from './checkboxGroup.vue'

checkboxGroup.install = (app: App) => {
  app.component(checkboxGroup.name, checkboxGroup)
}
export default checkboxGroup
