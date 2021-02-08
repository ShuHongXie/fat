<template>
  <div
    @click="jump"
    :class="
      initBem({
        [size === 'large' ? 'large' : '']: ''
      })
    "
  >
    <div :class="initBem('title')">
      <slot name="icon">
        <fat-icon name="arrow-up-circle" />
      </slot>
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <div :class="initBem('label')">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>
    <div :class="initBem('value')">
      <slot>
        <span>{{ value }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    computed,
    watchEffect,
    onMounted,
    provide,
    readonly,
    onUnmounted,
    watch,
    nextTick,
    ref
  } from 'vue'
  import { useRoute, routeProps } from '@/utils/use/useRoute'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Cell`,
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 显示值
      value: {
        type: String,
        default: ''
      },
      // label值
      label: {
        type: String,
        default: ''
      },
      // 大小 large/''
      size: {
        type: String,
        default: ''
      },
      ...routeProps
      // // 跳转地址 类vue路由
      // to: {
      //   type: [String, Object],
      //   default: ''
      // },
      // // 跳转url
      // url: {
      //   type: String,
      //   default: ''
      // },
      // // 是否覆盖当前链接
      // replace: {
      //   type: Boolean,
      //   default: false
      // }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('cell'))
      const route = useRoute()
      const zIndexObj = reactive({
        popup: 0,
        mask: 0
      })

      const jump = () => {
        if (!props.to && !props.url) return
        if (props.url) {
          location.href = props.url
          return
        }
        if (props.to || props.replace) {
          route()
          // this.$router.replace(props.to)
        }
      }

      // 挂载完
      onMounted(() => {})

      return {
        initBem,
        jump,
        zIndexObj
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
