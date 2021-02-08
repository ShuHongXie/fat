import { App } from 'vue'
import col from './col.ts'

col.install = (app: App) => {
  app.component(col.name, col)
}
export default col
