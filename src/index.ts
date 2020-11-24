import { App } from 'vue'

import mask from './views/mask/index.ts'
import popup from './views/popup/index.ts'
const components = [mask, popup]

function install(app: App) {
  console.log(app, components)
  components.forEach(item => {
    app.use(item.install)
  })
}

export default { install }
