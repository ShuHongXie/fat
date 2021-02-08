import { App } from 'vue'
import mask from './src/index.vue'

mask.install = (app: App) => {
  app.component(mask.name, mask)
}
export default mask
