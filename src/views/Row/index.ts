import { App } from 'vue'
import row from './row'

row.install = (app: App) => {
  app.component(row.name, row)
}
export default row
