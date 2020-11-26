<template>
  <teleport :to="teleport">
    <transition name="fat-fade">
      <div
        :class="initBem()"
        :style="{
          zIndex,
          animationDuration: `${duration}s`
        }"
        v-if="visible && show"
        @click="maskClick"
      ></div>
    </transition>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, onMounted, inject } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Mask`,
    props: {
      zIndex: {
        type: Number,
        default: 2
      },
      visible: {
        type: Boolean,
        default: false
      },
      teleport: {
        type: String,
        default: 'body'
      },
      duration: {
        type: String,
        default: '.3'
      },
      show: {
        type: Boolean,
        default: true
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
