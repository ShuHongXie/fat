import { inject, getCurrentInstance, onUnmounted, computed } from 'vue'
import type { ComponentInternalInstance } from 'vue'
// import interface { ProvidePrototype } from '@/utils/use/useParent'

export declare interface ProvidePrototype {
  addLink(children: ComponentInternalInstance | null): void
  removeLink(children: ComponentInternalInstance | null): void
  insideChildren: ComponentInternalInstance[]
  publicChildren: ComponentInternalInstance[]
  [key: string]: any
}

export default function useParent(key: string) {
  console.log(key)
  const parent = inject<ProvidePrototype | null>(key, null)
  const current = getCurrentInstance()
  console.log(parent, current)
  if (parent && current) {
    console.log('---')
    const { addLink, removeLink, insideChildren, ...rest } = parent
    parent.addLink(current)
    onUnmounted(() => {
      parent.removeLink(current)
    })
    console.log(insideChildren, current)
    const index = computed(() => insideChildren.indexOf(current))
    console.log(index)
    return {
      parent: rest,
      index
    }
  }

  return {}
}
