<template>
  <div :class="initBem()">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Col`,
    props: {
      span: {
        type: Number,
        default: 0
      },
      tag: {
        type: String,
        default: 'div'
      }
    },
    setup(props, { attrs, slots, emit }) {
      const [initBem] = reactive(init('row'))
      return {
        initBem
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
