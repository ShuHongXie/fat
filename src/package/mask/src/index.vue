<!--
 * @Author: shuhongxie
 * @Date: 2021-02-17 21:19:41
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-03 22:04:32
 * @FilePath: /fat-ui/src/package/mask/src/index.vue
-->
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
  import init from 'fat-ui/utils/init'
  import config from 'fat-ui/utils/config'
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
