<template>
  <teleport :to="teleport">
    <transition
      :name="position === 'center' ? `fat-${transition}` : `fat-popup-slide-${position}`"
      @enter="$emit('open')"
      @after-enter="$emit('opened')"
      @leave="$emit('close')"
      @after-leave="$emit('closed')"
    >
      <div
        v-show="visible"
        :class="[
          initBem({
            [position]: position,
            [round ? 'round' : '']: round
          }),
          className
        ]"
        :style="{
          ...style,
          animationDuration: `${duration}s`,
          zIndex: zIndexObj.popup
        }"
        @click.stop="$emit('click')"
      >
        <slot>
          <div>{{ position }}</div>
        </slot>
      </div>
    </transition>
  </teleport>
  <fat-mask
    :show="mask"
    :duration="duration"
    :teleport="teleport"
    :visible="visible"
    :z-index="zIndexObj.mask"
    :custom-style="maskStyle"
    :class-name="maskClassName"
  />
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
  import lockFunc from '@/utils/use/useLockScroll'
  import maxZIndex from '@/utils/general/maxZIndex'
  import fatMask from '../mask'
  export default defineComponent({
    name: `${config.frameworkName}Popup`,
    components: {
      fatMask
    },
    props: {
      // z-index值
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
      },
      // 自定义类名
      className: {
        type: String,
        default: ''
      },
      // 过渡动画名称
      transition: {
        type: String,
        default: 'fade'
      },
      // 自定义遮罩层类名
      maskClassName: {
        type: String,
        default: ''
      },
      // 自定义遮罩层样式
      maskStyle: {
        type: Object,
        default: () => {}
      }
    },
    emits: ['open', 'close', 'opened', 'closed', 'click-mask', 'update:visible', 'click'],
    setup(props, { emit }) {
      const [initBem] = reactive(init('popup'))
      const [lock, unlock] = lockFunc(props.lockScroll)
      const zIndexObj = reactive({
        popup: 0,
        mask: 0
      })
      // 关闭弹窗
      const handleMaskClick = () => {
        console.log('开始关闭弹窗')
        console.log(props)

        emit('click-mask')
        if (props.clickMaskClose) {
          emit('update:visible', false)
        }
      }
      // 注入显示事件
      provide('clickMaskClose', props.clickMaskClose)
      provide('maskClickEvent', handleMaskClick)

      // 挂载完
      onMounted(() => {
        // z-index递增
        setTimeout(() => {
          zIndexObj.mask = maxZIndex()
          zIndexObj.popup = maxZIndex() + 1
        }, 0)
        // 背景滚动锁定
        props.lockScroll ? lock() : unlock()
      })

      // 监听显隐 控制背景滚动锁定
      watch(
        () => props.visible,
        n => {
          if (!n) unlock()
        }
      )

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
