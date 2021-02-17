<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-02-15 23:05:37
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/package/dialog/index.vue
-->
<template>
  <teleport :to="teleport">
    <fat-popup
      v-model:visible="options.visible"
      :mask="mask"
      :lock-scroll="lockScroll"
      :click-mask-close="closeOnClickMask"
      @click="closeIt"
      @closed="() => {}"
      :transition="transition"
      :className="`${initBem()}
        ${Array.isArray(className) ? className.join(' ') : className}
      `"
      :style="{
        width: width ? stringParseFunc(width) : ''
      }"
    >
      <div :class="initBem('header')">{{ title }}</div>
      <div
        v-if="allowHtml"
        v-html="message"
        :class="[
          initBem('content', {
            ['has-title']: '',
            [messageAlign ? messageAlign : '']: ''
          })
        ]"
      ></div>
      <div
        v-else
        :class="[
          initBem('content', {
            ['has-title']: '',
            [messageAlign ? messageAlign : '']: ''
          })
        ]"
      >
        {{ message }}
      </div>
      <div :class="initBem('footer')">
        <fat-button
          block
          :className="initBem('cancel')"
          v-if="showCancelButton"
          :style="{ color: cancelButtonColor }"
        >
          {{ cancelButtonText }}
        </fat-button>
        <fat-button
          block
          :className="initBem('confrim')"
          v-if="showConfirmButton"
          :style="{ color: confirmButtonColor }"
          @click="close"
        >
          {{ confirmButtonText }}
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
      modelValue: {
        default: false,
        type: Boolean
      },
      // visible: {
      //   type: Boolean,
      //   default: false
      // }, // 显示隐藏
      title: {
        type: String,
        default: ''
      },
      width: String,
      message: {
        type: String,
        default: ''
      },
      messageAlign: {
        type: String,
        default: ''
      },
      theme: String,
      className: {
        type: String,
        default: ''
      },
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      showCancelButton: {
        type: Boolean,
        default: true
      },
      confirmButtonText: {
        type: String,
        default: ''
      },
      confirmButtonColor: {
        type: String,
        default: '#ee0a24'
      },
      cancelButtonText: {
        type: String,
        default: ''
      },
      cancelButtonColor: {
        type: String,
        default: 'black'
      },
      mask: {
        type: Boolean,
        default: true
      },
      maskClass: {
        type: String,
        default: ''
      },
      maskStyle: {
        type: Object,
        default: () => {}
      },
      closeOnClickMask: {
        type: Boolean,
        default: true
      },
      closeOnPopstate: {
        type: Boolean,
        default: false
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
      allowHtml: {
        type: Boolean,
        default: false
      },
      beforeClose: {
        type: Function,
        default: () => {}
      },
      transition: {
        type: String,
        default: 'fade'
      },
      teleport: {
        type: String,
        default: 'body'
      }
    },
    emits: ['update:modelValue'],
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
        // closed: false, // 隐藏的标识
        // transition: 'fat-fade', // 过渡动画名字
        // teleport: 'body', //挂载位置
        // type: 'text', // 类型
        // position: 'middle',
        // forbidClick: false,
        // closeOnClick: false,
        // closeOnClickMask: false,
        // className: '',
        visible: false // 显示隐藏
        // onOpened: () => {},
        // onClose: () => {},
        // title: '',
        // width: '',
        // message: '',
        // messageAlign: '',
        // theme: '',
        // className: '',
        // showConfirmButton: false,
        // showCancelButton: false,
        // confirmButtonText: '',
        // confirmButtonColor: '#ee0a24',
        // cancelButtonText: '',
        // cancelButtonColor: 'black',
        // mask: true,
        // maskClass: '',
        // maskStyle: {},
        // closeOnClickMask: false,
        // closeOnPopstate: false,
        // lockScroll: true,
        // allowHtml: false,
        // beforeClose: () => true,
        // transition: 'fade',
        // teleport: 'body'
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
        if (props.beforeClose) {
          props.beforeClose(options.close)
        }
        options.closed = true
        // return Promise.reject()
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
        if (props.modelValue) {
          options.visible = true
        }
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

      watch(
        () => props.modelValue,
        n => {
          console.log('开始监听', n)

          if (n) {
            options.visible = true
          }
        }
      )

      watch(
        () => options.visible,
        n => {
          if (!n) {
            emit('update:modelValue', options.visible)
          }
          console.log(options.visible)
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
