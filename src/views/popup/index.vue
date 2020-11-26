<template>
  <teleport :to="teleport">
    <transition :name="position === 'center' ? `fat-fade` : `fat-popup-slide-${position}`">
      <div
        v-if="visible"
        :class="
          initBem({
            [position]: position,
            [round ? 'round' : '']: round
          })
        "
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
  <fat-mask :show="mask" :duration="duration" :teleport="teleport" :visible="visible" />
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, onMounted, provide, readonly } from 'vue'
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
      // 是否显示遮罩层
      mask: {
        type: Boolean,
        default: true
      },
      // 圆角
      round: {
        type: Boolean,
        default: false
      },
      // 是否点击圆角的时候关闭
      clickMaskClose: {
        type: Boolean,
        default: false
      },
      // 锁定背景滚动
      lockScroll: {
        type: Boolean,
        default: true
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('popup'))

      // 关闭弹窗
      const handleMaskClick = () => {
        if (props.clickMaskClose) {
          console.log(emit)
          emit('update:visible', false)
        }
      }
      // 注入
      provide('clickMaskClose', props.clickMaskClose)
      provide('maskClickEvent', handleMaskClick)

      //
      onMounted(() => {
        const DomBody = document.querySelector('body')
        console.log(DomBody?.classList.length)
        if (DomBody?.classList.contains('fat-overflow-hidden')) {
        }
        // console.log(document.querySelector('body')?.classList)
        // .addClassList
      })

      return {
        initBem
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
