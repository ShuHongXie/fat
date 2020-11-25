<template>
  <teleport :to="teleport">
    <transition :name="position === 'center' ? `fat-fade` : `fat-popup-slide-${position}`">
      <div
        v-if="visible"
        :class="initBem({ [position]: 'p' })"
        :style="{
          ...style,
          animationDuration: `${duration}s`
        }"
      >
        <slot>
          <div>{{ position }}</div>
        </slot>
      </div>
    </transition>
  </teleport>
  <fat-mask :show="overlay" :duration="duration" :teleport="teleport" :visible="visible" />
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, onMounted } from 'vue'
  import mask from '../mask/src/index.vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Popup`,
    props: {
      zIndex: {
        type: Number,
        default: 2
      },
      // 显隐
      visible: {
        type: Boolean,
        default: false
      },
      // 挂载点
      teleport: {
        type: String,
        default: 'body'
      },
      // 位置 top | bottom | right | left
      position: {
        type: String,
        default: 'center'
      },
      // 样式
      style: {
        type: Object,
        default: () => {}
      },
      // 动画持续时间
      duration: {
        type: [String, Number],
        default: '.3'
      },
      // 是否显示弹窗
      overlay: {
        type: Boolean,
        default: true
      }
    },
    setup() {
      console.log(mask)
      const [initBem] = reactive(init('popup'))
      return {
        initBem
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
