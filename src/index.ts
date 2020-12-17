import { App } from 'vue'

import mask from './views/mask/index.ts'
import popup from './views/popup/index.ts'
import row from './views/row/index.ts'
import col from './views/col/index.ts'
import icon from './views/icon/index.ts'
import cell from './views/cell/index.ts'
const components = [mask, popup, row, col, icon, cell]

function install(app: App) {
  console.log(app, components)
  components.forEach(item => {
    app.use(item.install)
  })
}

export default { install }
