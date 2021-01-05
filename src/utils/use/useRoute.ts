import { getCurrentInstance, ComponentPublicInstance, PropType, ExtractPropTypes } from 'vue'
import type { RouteLocation, RouteLocationRaw } from 'vue-router'

export const routeProps = {
  to: [String, Object] as PropType<RouteLocation | RouteLocationRaw>,
  url: String,
  replace: Boolean
}
export type RouteProps = ExtractPropTypes<typeof routeProps>

const route = (vm: ComponentPublicInstance<RouteProps>) => {
  console.log(vm)
  const router = vm.$router
  const { to, url, replace } = vm
  if (router && to) {
    router.push(to)
  } else if (replace) {
    // router.replace(to)
  }
}

export const useRoute = () => {
  const vm = getCurrentInstance()!.proxy as ComponentPublicInstance<RouteProps>
  console.log(vm)
  return () => route(vm)
}
