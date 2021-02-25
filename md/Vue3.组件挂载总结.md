<!--
 * @Author: shuhongxie
 * @Date: 2021-02-24 15:14:50
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-24 19:50:59
 * @FilePath: /fat-ui/md/Vue3.组件挂载总结.md
-->

## 写这篇文章的原因

自己接触 Vue3 也有一段时间了 之前一直有看相关的源码，现在总结下 creatApp 到 mount 挂载中间发生了什么

> 下面的代码均为精简版 删掉了部分不相关的代码

## 查看入口文档

/more

```js
// vue-next/packages/runtime-dom/src/index.ts
/*
  nodeOps: packages/runtime-dom/src/nodeOps.ts
  patchProp: packages/runtime-dom/src/patchProp.ts
  renderOptions为 合并nodeOps和patchProp对象， 为后面vnode的patch操作提供一系列更新dom和内部属性的方法
*/
const rendererOptions = extend({ patchProp, forcePatchProp }, nodeOps)

let renderer: Renderer<Element> | HydrationRenderer

/*
  1.判断renderer值 实质上是执行了 packages/runtime-core/src/renderer.ts的 baseCreateRenderer里面所返回对象的里面的createApp方法
*/
function ensureRenderer() {
  return renderer || (renderer = createRenderer<Node, Element>(rendererOptions))
}
// 标准化组件
function normalizeContainer(
  container: Element | ShadowRoot | string
): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container)
    if (__DEV__ && !res) {
      warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      )
    }
    return res
  }
  return container as any
}

export const createApp = ((...args) => {
  // 实际调用了packages/runtime-core/src/apiCreateApp.ts的createAppAPI方法(柯里化函数)返回的createApp
  const app = ensureRenderer().createApp(...args)
  const { mount } = app
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    // 判断是否是真实的dom 如果不是就通过document.querySelector获取
    // 找不到就会报警告
    const container = normalizeContainer(containerOrSelector)
    // 没有找到dom节点就直接退出函数
    if (!container) return
    const component = app._component
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }
    // 挂载前清空内容
    container.innerHTML = ''
    // 执行挂载dom操作
    const proxy = mount(container)
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    // 返回vnode的proxy对象
    return proxy
  }
  return app
}) as CreateAppFunction<Element>
```

## 总结

> 从上图可知, ensureRenderer().createApp(...args)实际上直接调用了 createAppAPI 的 createApp 后，重写了 app 的 mount 方法，至于为什么要重写 mount 方法，主要还是应对后面的跨平台改造，mount 作为一个独立的跨平台处理函数，不应该带有特定的平台的逻辑，而这里仅仅针对 web，挂载前清空容器内容则是为了防止其他异常情况导致保存了该段代码，那么下面就分析下 createApp 做了什么

下面是主要源码注释

```js
// packages/runtime-core/src/apiCreateApp.ts
export function createAppContext(): AppContext {
  return {
    app: null as any,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: NO,
      errorHandler: undefined,
      warnHandler: undefined,
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
  }
}

export function createAppAPI<HostElement>(
  render: RootRenderFunction,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      __DEV__ && warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }
    // 返回一个app实例对象
    const context = createAppContext()
    // 创建一个存储所有插件的数组
    const installedPlugins = new Set()
    // 当前dom是否已经挂载
    let isMounted = false
    // 初始化app实例
    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,

      version,

      get config() {
        return context.config
      }
      // 初始化use方法 供插件使用
      use(plugin: Plugin, ...options: any[]) {
        // 这里详细看我另外一篇文章的分析
        //  http://xiesmallxie.cn/article/write-d.ts
        if (installedPlugins.has(plugin)) {
          __DEV__ && warn(`Plugin has already been applied to target app.`)
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin)
          plugin.install(app, ...options)
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin)
          plugin(app, ...options)
        } else if (__DEV__) {
          warn(
            `A plugin must either be a function or an object with an "install" ` +
              `function.`
          )
        }
        return app
      },
      // 初始化混合
      mixin(mixin: ComponentOptions) {
        if (__FEATURE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin)
            // global mixin with props/emits de-optimizes props/emits
            // normalization caching.
            if (mixin.props || mixin.emits) {
              context.deopt = true
            }
          } else if (__DEV__) {
            warn(
              'Mixin has already been applied to target app' +
                (mixin.name ? `: ${mixin.name}` : '')
            )
          }
        } else if (__DEV__) {
          warn('Mixins are only available in builds supporting Options API')
        }
        return app
      },
      // 初始化全局组件注册方法
      component(name: string, component?: Component): any {
        if (__DEV__) {
          validateComponentName(name, context.config)
        }
        if (!component) {
          return context.components[name]
        }
        if (__DEV__ && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`)
        }
        // 添加到执行上下文
        context.components[name] = component
        return app
      },
      // 初始化全局指令方法
      directive(name: string, directive?: Directive) {
        if (__DEV__) {
          validateDirectiveName(name)
        }

        if (!directive) {
          return context.directives[name] as any
        }
        // 添加到执行上下文
        context.directives[name] = directive
        return app
      },
      // 初始化节点挂载
      mount(rootContainer: HostElement, isHydrate?: boolean): any {
        // 没有挂载情况下会根据传入的组件创建vnode节点
        if (!isMounted) {
          const vnode = createVNode(
            // createApp传进来的组件创建了一个虚拟dom
            rootComponent as ConcreteComponent,
            rootProps
          )
          vnode.appContext = context
          // 是否是服务端渲染
          if (isHydrate && hydrate) {
            ...
          } else {
            // 如果不是服务端渲染的话 调用渲染函数渲染到挂载dom里面
            render(vnode, rootContainer)
          }
          // 挂载标识改变
          isMounted = true
          // app实例 创建挂载点标识
          app._container = rootContainer
          // for devtools and telemetry
          ;(rootContainer as any).__vue_app__ = app

          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            devtoolsInitApp(app, version)
          }

          return vnode.component!.proxy
        } else if (__DEV__) {
          // 开发环境下重复挂载报警
          ...
        }
      },
      // 初始化实例写在方法
      unmount() {
        if (isMounted) {
          // 清空节点
          render(null, app._container)
          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            devtoolsUnmountApp(app)
          }
        } else if (__DEV__) {
          ....
        }
      },
      // 根实例提供方法注入
      provide(key, value) {
        context.provides[key as string] = value

        return app
      },
    })

    return app
  }
}
```

## 总结

> createApp 里面创建了 context 实例，并且为 context 里面的 app 属性初始化了 use 方法提供全局插件挂载，mixin 方法提供全局逻辑混入，component 方法提供全局组件注册，directive 提供全局指令注册，mount,unmount 提供组件挂载/卸载功能等。同时将这个 4 个方法赋予 context,将 contxt 自己挂载在 app 属性的\_context 执行上下文中，并将其赋值给了一个新的 app 常量返回出去, mount 方法里面执行了 vnode 建立 => vnode 渲染的过程，最终交给 render 函数通过底层的 dom 操作插入到 rootContainer 里面，至于 render 函数的详细执行过程，给我一点时间整理。
