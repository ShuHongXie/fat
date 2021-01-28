<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-01-21 20:46:42
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/views/toast/index.vue
-->
<template>
  <!-- <div
    :class="[
      initBem({
        [direction]: ''
      })
    ]"
  >
    <slot></slot>
  </div> -->
  <teleport to="body">
    <transition name="fat-fade" @after-leave="handleAfterLeave">
      <div :class="[initBem()]" v-show="options.visible">
        <slot>
          <div>图标</div>
          <!-- <div :class="iconClass" v-if="options.dangerouslyUseHTMLString" v-html="icon"></div> -->
        </slot>
        <p :class="initBem('content')">{{ options.message }}</p>
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
    onMounted
  } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Toast`,
    props: {
      // 源数据
      modelValue: String,
      direction: {
        type: String,
        default: 'horizontal'
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('toast'))
      const options = reactive({
        message: '', // 提示信息
        icon: '', // 当前渲染的图片
        dangerouslyUseHTMLString: true, // 是否使用v-html渲染
        duration: 3000, // 持续时间
        iconType: '', // 当前的icon类型  scroll/null
        timer: null, // 存储当前定时器
        visible: true, // 显示隐藏
        closed: false // 隐藏的标识
      })

      const close = () => {
        options.closed = true
      }

      const open = () => {
        options.visible = true
      }

      const startTimer = () => {
        if (options.duration > 0) {
          ;(options.timer as any) = setTimeout(() => {
            close()
          }, options.duration)
        }
      }

      const handleAfterLeave = () => {
        // this.$destroy(true);
        // this.$el.parentNode.removeChild(this.$el);
      }

      onBeforeMount(() => {})

      return {
        initBem,
        options,
        handleAfterLeave,
        close,
        open
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
