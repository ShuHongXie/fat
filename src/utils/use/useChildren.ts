import { provide, reactive, getCurrentInstance, VNode } from 'vue'
import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  VNodeNormalizedChildren,
  ComponentObjectPropsOptions
} from 'vue'

export type instance = ComponentInternalInstance | null
export declare interface ProvidePrototype {
  addLink(children: instance): void
  removeLink(children: instance): void
  insideChildren: Array<instance>
  publicChildren: Array<instance>
  props: ComponentObjectPropsOptions
  emit: void
}

/**
 * @description 存储所有Vnode节点
 * @author shuhongxie
 * @param {instance} parentInstance
 * @return {*}  {*}
 */
export const importVnode = (parentInstance: instance): any => {
  console.log(parentInstance)
  const list: Array<VNode> = []

  const deep = (children: VNodeNormalizedChildren | unknown) => {
    if (Array.isArray(children)) {
      for (const item of children) {
        list.push(item)
        item.component?.subTree ? deep(item.component.subTree.children) : null
        item.children ? deep(item.children) : null
      }
    }
  }
  deep(parentInstance?.subTree?.children)
  return list
}

export /**
 * @description 子级别vnode重排
 * @author shuhongxie
 * @param {instance} parent
 * @param {Array<instance>} insideChildren
 */
const sort = (
  parent: instance,
  insideChildren: Array<instance>,
  publicChildren: Array<ComponentPublicInstance | null>
): void => {
  const vNodeList = importVnode(parent)
  insideChildren.sort((a, b) => {
    return vNodeList.indexOf(a?.vnode) - vNodeList.indexOf(b?.vnode)
  })
  const orderByPublicChildren = insideChildren.map(item => item?.proxy)
  publicChildren.sort((a, b) => {
    const indexA = orderByPublicChildren.indexOf(a)
    const indexB = orderByPublicChildren.indexOf(b)
    return indexA - indexB
  })
}

export default function useChildren(name: string) {
  const publicChildren: Array<ComponentPublicInstance | null> = reactive([])
  const insideChildren: Array<instance> = reactive([])
  const parent = getCurrentInstance()

  const linkChildren = (params: any) => {
    /**
     * @description 绑定子级
     * @author shuhongxie
     * @param {instance} children
     */
    const addLink = (children: instance): void => {
      if (children?.proxy) {
        insideChildren.push(children)
        publicChildren.push(children.proxy)
        sort(parent, insideChildren, publicChildren)
      }
    }

    /**
     * @description 解绑子级
     * @author shuhongxie
     * @param {instance} instance
     */
    const removeLink = (children: instance) => {
      const index = insideChildren.indexOf(children)
      insideChildren.splice(index, 1)
      publicChildren.splice(index, 1)
    }
    provide(name, {
      addLink,
      removeLink,
      insideChildren,
      publicChildren,
      ...params
      // ...props
    })
  }

  return {
    children: publicChildren,
    linkChildren
  }
}
