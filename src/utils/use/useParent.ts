import { inject, getCurrentInstance, onUnmounted, computed } from 'vue'
import type { ComponentInternalInstance } from 'vue'
// import interface { ProvidePrototype } from 'fat-ui/utils/use/useParent'

export declare interface ProvidePrototype {
  addLink(children: ComponentInternalInstance | null): void
  removeLink(children: ComponentInternalInstance | null): void
  insideChildren: ComponentInternalInstance[]
  publicChildren: ComponentInternalInstance[]
  [key: string]: any
}

export default function useParent(key: string) {
  const parent = inject<ProvidePrototype | null>(key, null)
  const current = getCurrentInstance()
  if (parent && current) {
    const { addLink, removeLink, insideChildren, ...rest } = parent
    parent.addLink(current)

    onUnmounted(() => {
      parent.removeLink(current)
    })
    const index = computed(() => insideChildren.indexOf(current))

    return {
      parent: rest,
      index
    }
  }

  return {}
}
