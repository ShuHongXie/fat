import { provide, reactive, getCurrentInstance } from 'vue'
import type { ComponentOptionsWithObjectProps } from 'vue'

export const importVnode = children => {}

export default function useChildren(name: string) {
  const publicChildren = reactive([])
  const insideChildren = reactive([])
  const parent = getCurrentInstance()

  const linkChildren = (children: ComponentOptionsWithObjectProps) => {
    const addLink = () => {}

    const removeLink = () => {}

    provide(
      name,
      Object.assign({
        addLink,
        removeLink,
        ...children
      })
    )
  }

  return {
    children: publicChildren,
    linkChildren
  }
}
