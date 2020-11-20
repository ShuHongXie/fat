import { defineComponent, ComponentOptionsWithObjectProps, App } from 'vue'

function initStr(name: string): string {
  return name
}

export default function initComponent(name: string) {
  return function(sfc: ComponentOptionsWithObjectProps) {
    sfc.name = name
    sfc.install = (app: App) => {
      app.component(`${name}`, sfc)
    }

    return defineComponent(sfc)
  }
}
