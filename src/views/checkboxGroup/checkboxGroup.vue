<template>
  <div></div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, onMounted, inject } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Checkbox`,
    props: {
      zIndex: {
        type: Number,
        default: 0
      }
    },
    setup() {
      const [initBem] = reactive(init('mask'))
      const shouldClose = inject('clickMaskClose')
      const maskClick = inject('maskClickEvent')
      return {
        initBem,
        shouldClose,
        maskClick
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
