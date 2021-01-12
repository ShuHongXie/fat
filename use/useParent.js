import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose'
import { inject, computed, onUnmounted, getCurrentInstance } from 'vue'
export function useParent(key) {
  const parent = inject(key, null)

  if (parent) {
    const instance = getCurrentInstance()

    if (instance) {
      const _link = parent.link,
        _unlink = parent.unlink,
        internalChildren = parent.internalChildren,
        rest = _objectWithoutPropertiesLoose(parent, ['link', 'unlink', 'internalChildren'])

      _link(instance)

      onUnmounted(function () {
        _unlink(instance)
      })
      const index = computed(function () {
        return internalChildren.indexOf(instance)
      })
      return {
        parent: rest,
        index: index
      }
    }
  }

  return {}
}
