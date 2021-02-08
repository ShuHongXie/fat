import { App } from 'vue'
import row from './row.ts'

row.install = (app: App) => {
  app.component(row.name, row)
}
export default row
