<template>
  <teleport :to="teleport">
    <transition name="fat-fade">
      <div
        :class="[initBem(), className]"
        :style="{
          zIndex,
          animationDuration: `${duration}s`,
          ...customStyle
        }"
        v-show="visible && show"
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
        default: 0
      },
      // 控制显隐
      visible: {
        type: Boolean,
        default: false
      },
      // 默认挂载节点
      teleport: {
        type: String,
        default: 'body'
      },
      // 动画过渡时间
      duration: {
        type: String,
        default: '.3'
      },
      // 父组件控制 不对外开放
      show: {
        type: Boolean,
        default: true
      },
      // 自定义类名
      className: {
        type: String,
        default: ''
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default: () => {}
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
