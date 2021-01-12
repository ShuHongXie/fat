import { getCurrentInstance, inject, provide, ref } from 'vue'
import type { ComponentInternalInstance } from 'vue'

type findParentInstanceResp = (
  instance: ComponentInternalInstance | null,
  name: string
) => ComponentInternalInstance | null | undefined

type parentInstance = { [key: string]: any }
type parentInstancex = ComponentInternalInstance | null | undefined

/**
 * @description 递归获取固定类名的父级实例
 * @author shuhongxie
 * @param {*} instance 父级实例
 * @param {*} name 父级class名称
 * @return {*}
 */
export const findParentInstance: findParentInstanceResp = (instance, name) => {
  console.log(instance?.parent?.type.name, name)
  if (instance?.parent && instance.parent.type.name === name) {
    return instance
  } else if (instance?.parent && instance.parent.type.name !== name) {
    findParentInstance(instance.parent, name)
  } else if (!instance?.parent) {
    return null
  }
}

export default function useParent(parentInstanceName: string): any {
  const parent: any = ref(null)

  parent.value = findParentInstance(getCurrentInstance(), parentInstanceName)
  return {
    parent: parent.value
  }
}
