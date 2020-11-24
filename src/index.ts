import { App } from 'vue'

import mask from './views/mask/index.ts'

const components = [mask]

function install(app: App) {
  console.log(app, components)
  components.forEach(item => {
    app.use(item.install)
  })
}

export default { install }
