<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-02-01 18:12:19
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/views/toast/index.vue
-->
<template>
  <teleport :to="options.teleport">
    <transition :name="options.transition" @after-leave="handleAfterLeave">
      <div
        :class="[
          initBem({
            [options.type]: '',
            [options.position]: ''
          })
        ]"
        @click="closeIt"
        v-show="options.visible"
      >
        <slot>
          <!-- <div>图标{{ options.icon }}</div> -->
          <!-- <div :class="iconClass" v-if="options.dangerouslyUseHTMLString" v-html="icon"></div> -->
        </slot>
        <span :class="initBem('text')">{{ options.message }}</span>
      </div>
    </transition>
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
        forbidClick: false
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

      const closeIt = () => {
        if (!options.forbidClick) {
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

      const handleAfterLeave = () => {
        // this.$destroy(true);
        // this.$el.parentNode.removeChild(this.$el);
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

      return {
        initBem,
        options,
        handleAfterLeave,
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
