<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-02-09 22:31:51
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/package/dialog/index.vue
-->
<template>
  <teleport :to="options.teleport">
    <fat-popup
      v-model:visible="options.visible"
      :mask="options.mask"
      :lock-scroll="options.lockScroll"
      :click-mask-close="options.closeOnClickMask"
      @click="closeIt"
      :transition="options.transition"
      :className="`${initBem()}
        ${Array.isArray(options.className) ? options.className.join(' ') : options.className}
      `"
      :style="{
        width: options.width ? stringParseFunc(options.width) : ''
        //  width: '300px'
      }"
    >
      <div :class="initBem('header')">{{ options.title }}</div>
      <div
        :class="[
          initBem('content', {
            ['has-title']: '',
            [options.messageAlign ? options.messageAlign : '']: ''
          })
        ]"
      >
        {{ options.message }}
      </div>
      <div :class="initBem('footer')">
        <fat-button
          block
          :className="initBem('cancel')"
          v-if="options.showCancelButton"
          :style="{ color: options.cancelButtonColor }"
        >
          {{ options.cancelButtonText }}
        </fat-button>
        <fat-button
          block
          :className="initBem('confrim')"
          v-if="options.showConfirmButton"
          :style="{ color: options.confirmButtonColor }"
        >
          {{ options.confirmButtonText }}
        </fat-button>
      </div>
    </fat-popup>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, watch } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  import stringParse from '@/utils/general/stringParse'
  import lockFunc from '@/utils/use/useLockScroll'
  import useLockTouch from '@/utils/use/useLockTouch'
  // import { InitOptions } from './index'
  export default defineComponent({
    name: `${config.frameworkName}Dialog`,
    props: {
      // 源数据
      modelValue: String
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('dialog'))
      const options: any = reactive({
        // message: '', // 提示信息
        // icon: '', // 当前渲染的图片
        // mask: true,
        // dangerouslyUseHTMLString: true, // 是否使用v-html渲染
        // duration: 3000, // 持续时间
        // iconType: '', // 当前的icon类型  scroll/null
        // timer: null, // 存储当前定时器
        visible: false, // 显示隐藏
        // closed: false, // 隐藏的标识
        // transition: 'fat-fade', // 过渡动画名字
        // teleport: 'body', //挂载位置
        // type: 'text', // 类型
        // position: 'middle',
        // forbidClick: false,
        // closeOnClick: false,
        // closeOnClickMask: false,
        // className: '',
        onOpened: () => {},
        onClose: () => {},

        title: '',
        width: '',
        message: '',
        messageAlign: '',
        theme: '',
        className: '',
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonText: '',
        confirmButtonColor: '#ee0a24',
        cancelButtonText: '',
        cancelButtonColor: 'black',
        mask: true,
        maskClass: '',
        maskStyle: {},
        closeOnPopstate: false,
        lockScroll: true,
        allowHtml: false,
        beforeClose: () => true,
        transition: 'fade',
        teleport: 'body'
      })
      const stringParseFunc = (value: number | string) => stringParse(value)
      /**
       * @Description: 合并所有参数
       * @Author: shuhongxie
       * @param {*} initOptions
       */
      const initOptions = (option: any) => {
        for (const k in options) {
          options[k] = option[k]
        }
        console.log(option)
        console.log(options)
        options.visible = true
      }

      /**
       * @Description: 关闭
       * @Author: shuhongxie
       * @param {*} close
       */
      const close = () => {
        // options.closed = true
      }

      /**
       * @Description: 内容区域点击消失
       * @Author: shuhongxie
       * @param {*} closeIt
       */
      const closeIt = () => {
        // if (options.closeOnClick) {
        //   close()
        // }
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
        // if (options.duration > 0) {
        //   options.timer = setTimeout(() => {
        //     close()
        //   }, options.duration)
        // }
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

      return {
        initBem,
        options,
        close,
        open,
        startTimer,
        initOptions,
        closeIt,
        stringParseFunc
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
