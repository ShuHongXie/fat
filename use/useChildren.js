import _extends from '@babel/runtime/helpers/esm/extends'
import { isVNode, provide, reactive, getCurrentInstance } from 'vue'
export function flattenVNodes(children) {
  const result = []

  const traverse = function traverse(children) {
    if (Array.isArray(children)) {
      children.forEach(function (child) {
        if (isVNode(child)) {
          let _child$component

          result.push(child)

          if ((_child$component = child.component) != null && _child$component.subTree) {
            traverse(child.component.subTree.children)
          }

          if (child.children) {
            traverse(child.children)
          }
        }
      })
    }
  }

  traverse(children)
  return result
} // sort children instances by vnodes order

export function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree.children)
  internalChildren.sort(function (a, b) {
    return vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode)
  })
  const orderedPublicChildren = internalChildren.map(function (item) {
    return item.proxy
  })
  publicChildren.sort(function (a, b) {
    const indexA = orderedPublicChildren.indexOf(a)
    const indexB = orderedPublicChildren.indexOf(b)
    return indexA - indexB
  })
}
export function useChildren(key) {
  const publicChildren = reactive([])
  const internalChildren = reactive([])
  const parent = getCurrentInstance()

  const linkChildren = function linkChildren(value) {
    const link = function link(child) {
      if (child.proxy) {
        internalChildren.push(child)
        publicChildren.push(child.proxy)
        sortChildren(parent, publicChildren, internalChildren)
      }
    }

    const unlink = function unlink(child) {
      const index = internalChildren.indexOf(child)
      publicChildren.splice(index, 1)
      internalChildren.splice(index, 1)
    }
    provide(
      key,
      _extends(
        {
          link: link,
          unlink: unlink,
          children: publicChildren,
          internalChildren: internalChildren
        },
        value
      )
    )
  }

  return {
    children: publicChildren,
    linkChildren: linkChildren
  }
}
