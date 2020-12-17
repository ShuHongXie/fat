<template>
  <div
    :class="
      initBem({
        [size === 'large' ? 'large' : '']: ''
      })
    "
  >
    <div :class="initBem('title')">
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
      size: {
        type: String,
        default: ''
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('cell'))
      const zIndexObj = reactive({
        popup: 0,
        mask: 0
      })

      // 挂载完
      onMounted(() => {})

      return {
        initBem,
        zIndexObj
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
