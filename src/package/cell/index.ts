import { App } from 'vue'
import cell from './index.vue'

cell.install = (app: App) => {
  app.component(cell.name, cell)
}
export default cell
