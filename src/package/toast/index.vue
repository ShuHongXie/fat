<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-02-05 17:12:28
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/views/toast/index.vue
-->
<template>
  <teleport :to="options.teleport">
    <fat-popup
      v-model:visible="options.visible"
      :mask="options.mask"
      :lock-scroll="options.forbidClick"
      :click-mask-close="options.closeOnClickMask"
      @opened="options.onOpened()"
      @closed="options.onClose()"
      @click="closeIt"
      :className="`${initBem({
        [(options.type === 'text' || options.type === 'html') && options.icon
          ? ''
          : options.type]: '',
        [options.position]: ''
      })}
        ${Array.isArray(options.className) ? options.className.join(' ') : options.className}
      `"
    >
      <slot>
        <!-- <div :class="iconClass" v-if="options.dangerouslyUseHTMLString" v-html="icon"></div> -->
        <fat-loading text="" v-if="options.type === 'loading'" />
        <fat-icon name="select" v-if="options.type === 'success'" />
        <fat-icon name="close" v-if="options.type === 'fail'" />
        <fat-icon
          :name="options.icon"
          v-if="(options.type === 'text' || options.type === 'html') && options.icon"
        />
      </slot>
      <span :class="initBem('text')" v-if="options.type !== 'html'">{{ options.message }}</span>
      <div :class="initBem('text')" v-html="options.message" v-else></div>
    </fat-popup>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, watch } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  import lockFunc from '@/utils/use/useLockScroll'
  import useLockTouch from '@/utils/use/useLockTouch'
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

      // 监听关闭
      watch(
        () => options.closed,
        n => {
          n ? (options.visible = false) : null
        }
      )

      // 全局禁用 加滚动锁和触摸锁
      watch(
        () => options.forbidClick,
        n => {
          const [lock, unlock] = lockFunc(options.forbidClick)
          const [touchLock, unTouchLock] = useLockTouch(options.forbidClick)
          if (n) {
            lock()
            touchLock()
          } else {
            unlock()
            unTouchLock()
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
