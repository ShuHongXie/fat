import { defineComponent } from 'vue'
import initBem from './bem'
import initComponents from './component'

export default function init(name: string) {
  return [initBem(name), initComponents(name)] as const
}
