<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-02-02 20:16:23
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/views/toast/index.vue
-->
<template>
  <teleport :to="options.teleport">
    <!-- <transition
      :name="options.transition"
      @after-enter="options.onOpened()"
      @after-leave="options.onClose()"
    > -->
    <fat-popup
      v-model:visible="options.visible"
      :mask="options.mask"
      :lock-scroll="options.forbidClick"
      :click-mask-close="options.closeOnClickMask"
      @opened="options.onOpened()"
      @closed="options.onClose()"
      @click="closeIt"
      :className="`${initBem({
        [options.type === 'text' && options.icon ? '' : options.type]: '',
        [options.position]: ''
      })}
        ${Array.isArray(options.className) ? options.className.join(' ') : options.className}
      `"
    >
      <!-- :click-mask-close="options.closeOnClick" -->
      <slot>
        <!-- <div :class="iconClass" v-if="options.dangerouslyUseHTMLString" v-html="icon"></div> -->
        <fat-loading text="" v-if="options.type === 'loading'" />
        <fat-icon name="select" v-if="options.type === 'success'" />
        <fat-icon name="close" v-if="options.type === 'fail'" />
        <fat-icon :name="options.icon" v-if="options.type === 'text' && options.icon" />
      </slot>
      <span :class="initBem('text')">{{ options.message }}</span>
    </fat-popup>
    <!-- <div
        :class="[
          initBem({
            [options.type === 'text' && options.icon ? '' : options.type]: '',
            [options.position]: ''
          }),
          Array.isArray(options.className) ? options.className.join(' ') : options.className
        ]"
        @click="closeIt"
        v-show="options.visible"
      >
        <slot>
          <fat-loading text="" v-if="options.type === 'loading'" />
          <fat-icon name="select" v-if="options.type === 'success'" />
          <fat-icon name="close" v-if="options.type === 'fail'" />
          <fat-icon :name="options.icon" v-if="options.type === 'text' && options.icon" />
        </slot>
        <span :class="initBem('text')">{{ options.message }}</span>
      </div> -->
    <!-- </transition> -->
  </teleport>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    onBeforeMount,
    inject,
    ref,
    getCurrentInstance,
    onMounted,
    watch
  } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  import { InitOptions } from './index'
  export default defineComponent({
    name: `${config.frameworkName}Toast`,
    props: {
      // 源数据
      modelValue: String
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('toast'))
      const options: InitOptions = reactive({
        message: '', // 提示信息
        icon: '', // 当前渲染的图片
        mask: false,
        dangerouslyUseHTMLString: true, // 是否使用v-html渲染
        duration: 3000, // 持续时间
        iconType: '', // 当前的icon类型  scroll/null
        timer: null, // 存储当前定时器
        visible: false, // 显示隐藏
        closed: false, // 隐藏的标识
        transition: 'fat-fade', // 过渡动画名字
        teleport: 'body', //挂载位置
        type: 'text', // 类型
        position: 'middle',
        forbidClick: false,
        closeOnClick: false,
        closeOnClickMask: false,
        className: '',
        onOpened: () => {},
        onClose: () => {}
      })

      /**
       * @Description: 合并所有参数
       * @Author: shuhongxie
       * @param {*} initOptions
       */
      const initOptions = (option: any) => {
        for (const k in options) {
          options[k] = option[k]
        }
        options.visible = true
      }

      /**
       * @Description: 关闭
       * @Author: shuhongxie
       * @param {*} close
       */
      const close = () => {
        options.closed = true
      }

      /**
       * @Description: 内容区域点击消失
       * @Author: shuhongxie
       * @param {*} closeIt
       */
      const closeIt = () => {
        if (options.closeOnClick) {
          close()
        }
      }

      /**
       * @Description: 打开
       * @Author: shuhongxie
       * @param {*} open
       */
      const open = (option: any) => {
        initOptions(option)
      }

      /**
       * @Description: 开始动画
       * @Author: shuhongxie
       * @param {*} startTimer
       */
      const startTimer = () => {
        if (options.duration > 0) {
          options.timer = setTimeout(() => {
            close()
          }, options.duration)
        }
      }

      onMounted(() => {
        // options.visible = true
        // startTimer()
      })

      watch(
        () => options.closed,
        n => {
          n ? (options.visible = false) : null
        }
      )

      watch(
        () => options.forbidClick,
        n => {
          console.log('监听forbidClick', n)

          if (n) {
            document.addEventListener(
              'touchstart',
              ev => {
                ev.preventDefault()
              },
              { passive: false }
            )
          } else {
            document.removeEventListener('touchstart', ev => {})
          }
        }
      )

      return {
        initBem,
        options,
        close,
        open,
        startTimer,
        initOptions,
        closeIt
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
