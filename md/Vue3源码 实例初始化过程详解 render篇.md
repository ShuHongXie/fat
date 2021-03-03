## 前言

前几天写了一篇 Vue3 实例过程详解，说现在需要时间整理出来, 现在把挂载期间 render 函数执行了什么，记录下来

## 开始分析

由上篇文章可知，调用 mount 之后，在 mount 方法里面调用了 createVNode 方法，并将执行上下午富裕虚拟 dom，再执行了 render(vnode, rootContainer), 下面的 createVNode 函数和 render 函数的执行详情

```js
// 以下面为例子
<template>
  <div :abc="1" :style="{ width: '300px' }">123</div>
</template>

// 实际上编译出的是
return function render(_ctx, _cache, $props, $setup, $data, $options) {
  with (_ctx) {
    ...

    return (_openBlock(), _createBlock("template", null, [
      _createVNode("div", {
        abc: 1,
        style: { width: '300px' }
      }, "123", 12 /* STYLE, PROPS */, ["abc"])
    ]))
  }
}
```

/more

由上面可知 实际上传入的参数是 ("div", {
abc: 1,
style: { width: '300px' }
}, "123", 12, ["abc"])

### 第一步 分析 createVNode 函数(packages/runtime-core/src/vnode.ts)

下面我会去除一些非必要的代码

```js
let vnodeArgsTransformer:
  | ((
      args: Parameters<typeof _createVNode>,
      instance: ComponentInternalInstance | null
    ) => Parameters<typeof _createVNode>)
  | undefined
// 进入createVNode会判断是否该是开发环境 是的话进入createVNodeWithArgsTransform
export const createVNode = (__DEV__
  ? createVNodeWithArgsTransform
  : _createVNode) as typeof _createVNode

// 接下来进入了是的话进入createVNodeWithArgsTransform之后，因为vnodeArgsTransformer实例上还是为null 所以实际上是调用了_craeteVNode
const createVNodeWithArgsTransform = (
  ...args: Parameters<typeof _createVNode>
): VNode => {
  return _createVNode(
    ...(vnodeArgsTransformer
      ? vnodeArgsTransformer(args, currentRenderingInstance)
      : args)
  )
}

// 下面分析下_createVNode
function _createVNode(
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag: number = 0,
  dynamicProps: string[] | null = null,
  isBlockNode = false
): VNode {
  // 如果类型为空或者不存在 就默认为注释节点
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment
  }
  // 如果接收的是一个已存在的Vnode 如<component :is="vnode"/> 就克隆返回这个node
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true /* mergeRef: true */)
    if (children) {
      normalizeChildren(cloned, children)
    }
    return cloned
  }
  // 类组件处理
  if (isClassComponent(type)) {
    type = type.__vccOpts
  }
  // 初始化props 特殊处理props里面的style和class 具体看packages/shared/src/normalizeProp.ts处理方式
  if (props) {
    if (isProxy(props) || InternalObjectKey in props) {
      props = extend({}, props)
    }
    let { class: klass, style } = props
    if (klass && !isString(klass)) {
      // 如果是数组就拼在一起  详细看normalizeClass
      props.class = normalizeClass(klass)
    }
    // 是对象就合并
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style)
      }
      props.style = normalizeStyle(style)
    }
  }
  //
  // 默认mount阶段 isString = true  shapeFlag = ShapeFlags.ELEMENT
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : __FEATURE_SUSPENSE__ && isSuspense(type)
    ? ShapeFlags.SUSPENSE
    : isTeleport(type)
    ? ShapeFlags.TELEPORT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : 0
  // 直接创建vnode结构
  const vnode: VNode = {
    __v_isVNode: true,
    [ReactiveFlags.SKIP]: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    children: null,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
  }
  // 遍历确认children类型 实际上修改了vnode.children
  normalizeChildren(vnode, children)

  ...
  return vnode
}
```

## 阶段总结

目前可知，调用顺序为 createVNode --> createVNodeWithArgsTransform --> \_createVNode, 其中\_createVNode 根据传入的 type 值进行了不同的处理，并且在 props 属性有值的情况下，对普通属性，class，style 进行了格式化，并且定义了 shapeFlag，这个 key 存储着传入组件的形状标识，最后返回了整个 vnode 对象，下面分析下 render 函数

## 第二步 分析 render 函数(packages/runtime-core/src/renderer.ts)

mount 里面的第二步是调用了 render(vnode, rootContainer)，先进入 render

```js
// 第一次进入时vnode实际是#app所以会进入patch函数
const render: RootRenderFunction = (vnode, container) => {
  // 第一次进入vnode不为null
  if (vnode == null) {
    // 挂载的dom没有_vnode属性 初始化前是没有 初始化后下方自动添加了
    if (container._vnode) {
      unmount(container._vnode, null, null, true)
    }
  } else {
    // 进入patch
    patch(container._vnode || null, vnode, container)
  }
  flushPostFlushCbs()
  container._vnode = vnode
}
// 进入patch因为 container.vnode不存在 所以实际 参数n1 = null, 继而进入processElement函数
const patch: PatchFn = (
  n1,
  n2,
  container,
  anchor = null,
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  optimized = false
) => {
  // 对比 如果存在并且是不同 卸载旧的树
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1)
    unmount(n1, parentComponent, parentSuspense, true)
    n1 = null
  }
  // 初始的PatchFlags为0
  if (n2.patchFlag === PatchFlags.BAIL) {
    optimized = false
    n2.dynamicChildren = null
  }
  // 初始化时type: div ref = vnode.props , shapeFlag: Element
  const { type, ref, shapeFlag } = n2
  switch (type) {
    case Text:
      ...
      break
    case Comment:
      ...
      break
    case Static:
      ...
      break
    case Fragment:
      ...
      break
    default:
      // 默认进入这里
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        )
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        ...
      } else if (shapeFlag & ShapeFlags.TELEPORT) {
        ...
      } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
        ...
      } else if (__DEV__) {
        ...
      }
  }

  // set ref
  if (ref != null && parentComponent) {
    setRef(ref, n1 && n1.ref, parentSuspense, n2)
  }
}

// 进入processElement之后 因为n1 = null 所以又进入了mountElement
const processElement = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  isSVG = isSVG || (n2.type as string) === 'svg'
  // 默认n1 = null 进入mountElement
  if (n1 == null) {
    mountElement(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
  } else {
    patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized)
  }
}

// packages/runtime-dom/src/nodeOps.ts
insert: (child, parent, anchor) => {
  parent.insertBefore(child, anchor || null)
}

// 进入mountElement
const mountElement = (
    vnode: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    optimized: boolean
  ) => {
    let el: RendererElement
    let vnodeHook: VNodeHook | undefined | null
    const {
      type,
      props,
      shapeFlag,
      transition,
      scopeId,
      patchFlag,
      dirs,
    } = vnode
    if (
      !__DEV__ &&
      vnode.el &&
      hostCloneNode !== undefined &&
      patchFlag === PatchFlags.HOISTED
    ) {
      ...
    } else {
      // el/vnode.el = hostCreateElement('div') 创建了一个div
      el = vnode.el = hostCreateElement(
        vnode.type as string,
        isSVG,
        props && props.is
      )

      // 创建text节点 插入el
      if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(el, vnode.children as string)
      } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(
          vnode.children as VNodeArrayChildren,
          el,
          null,
          parentComponent,
          parentSuspense,
          isSVG && type !== 'foreignObject',
          optimized || !!vnode.dynamicChildren
        )
      }
      // 初始化created
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'created')
      }
      // props
      if (props) {
        for (const key in props) {
          if (!isReservedProp(key)) {
            hostPatchProp(
              el,
              key,
              null,
              props[key],
              isSVG,
              vnode.children as VNode[],
              parentComponent,
              parentSuspense,
              unmountChildren
            )
          }
        }
        if ((vnodeHook = props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode)
        }
      }
      // scopeId
      setScopeId(el, scopeId, vnode, parentComponent)
    }
    // 定义__vnode和__vueParentComponent
    if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
      Object.defineProperty(el, '__vnode', {
        value: vnode,
        enumerable: false,
      })
      Object.defineProperty(el, '__vueParentComponent', {
        value: parentComponent,
        enumerable: false,
      })
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount')
    }
    // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
    // #1689 For inside suspense + suspense resolved case, just call it
    const needCallTransitionHooks =
      (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
      transition &&
      !transition.persisted
    if (needCallTransitionHooks) {
      transition!.beforeEnter(el)
    }
    // 插入节点 到这里正式插入成功
    hostInsert(el, container, anchor)
    if (
      (vnodeHook = props && props.onVnodeMounted) ||
      needCallTransitionHooks ||
      dirs
    ) {
      // 插入队列之后 触发mounted
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode)
        needCallTransitionHooks && transition!.enter(el)
        dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted')
      }, parentSuspense)
    }
  }

```

## 阶段总结

目前可知，调用 render 顺序为 patch --> processElement --> mountElement --> hostInsert，在进入 patch 函数后判断 shapeFlag 进入 mountElement 后，调用 hostCreateElement 传入 type 创建了 el 标签，并且调用 hostInsert 里面的原生方法插入到 container 里面

## 不足之处

里面许多位运算符的语法和详细判断我还没仔细看 如果有哪里不太对的地方，希望大家在底部进行留言讨论，帮我改正，谢谢。
