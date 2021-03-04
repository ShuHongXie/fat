<!--
 * @Author: shuhongxie
 * @Date: 2020-12-01 20:43:46
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 14:04:21
 * @FilePath: /fat-ui/src/package/image/index.vue
-->
<template>
  <div
    :class="initBem({ [round ? 'round' : '']: '' })"
    :style="{
      width: stringParseFunc(width),
      height: stringParseFunc(height),
      radius: stringParseFunc(radius)
    }"
    @click="$emit('click')"
  >
    <img
      :class="initBem('img')"
      :src="src"
      :alt="alt"
      :style="{ objectFit }"
      @error="loadError"
      @load="loadSuccess(this)"
      ref="curr"
      v-lazy="src"
    />
    <!-- <img
      :class="initBem('img')"
      :src="src"
      :alt="alt"
      :style="{ objectFit }"
      @error="loadError"
      @load="loadSuccess(this)"
      ref="curr"
      v-else
    /> -->
    <div v-if="showLoading && isImageLoad" :class="initBem('loading')">
      <slot name="laoding">
        <fat-loading />
      </slot>
    </div>
    <div v-if="showError && isImageError" :class="initBem('error')">
      <slot name="error">
        <fat-icon :name="errorIcon" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import init from 'fat-ui/utils/init'
  import config from 'fat-ui/utils/config'
  import stringParse from 'fat-ui/utils/general/stringParse'
  import fatIcon from 'fat-ui/package/icon'
  export default defineComponent({
    name: `${config.frameworkName}Image`,
    components: {
      fatIcon
    },
    props: {
      // 图片链接
      src: {
        type: String,
        defult: ''
      },
      // 宽度
      width: {
        type: [String, Number],
        default: ''
      },
      // 高度
      height: {
        type: [String, Number],
        default: ''
      },
      // 圆角大小
      radius: {
        type: [String, Number],
        default: ''
      },
      // 替代文本
      alt: {
        type: String,
        default: ''
      },
      // 是否为圆形
      round: {
        type: Boolean,
        default: false
      },
      // 图片填充模式
      /*
        fill	默认，不保证保持原有的比例，内容拉伸填充整个内容容器。
        contain	保持原有尺寸比例。内容被缩放。
        cover	保持原有尺寸比例。但部分内容可能被剪切。
        none	保留原有元素内容的长度和宽度，也就是说内容不会被重置。
        scale-down	保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。
        initial	设置为默认值，关于 initial
        inherit	从该元素的父元素继承属性。 关于 inherit
      */
      objectFit: {
        type: String,
        default: 'fill'
      },
      // 是否开启懒加载
      lazyLoad: {
        type: Boolean,
        default: false
      },
      // 是否展示图片加载错误提示
      showError: {
        type: Boolean,
        default: true
      },
      // 是否展示图片加载提示
      showLoading: {
        type: Boolean,
        default: true
      },
      // 失败时显示的图标名称
      errorIcon: {
        type: String,
        default: 'error'
      },
      // 加载时显示的图标名称
      loadingIcon: {
        type: String,
        default: ''
      },
      // 图标类名前缀，同 Icon 组件的 class-prefix 属性
      iconPrefix: {
        type: String,
        default: 'fat'
      }
    },
    emits: ['click', 'error', 'load'],
    setup(props, { emit }) {
      const [initBem] = reactive(init('image'))
      const curr = ref(null) // 绑定当前对象
      const stringParseFunc = (value: number | string) => stringParse(value)
      const isImageError = ref(false)
      const isImageLoad = ref(true)
      const isFirstLoad = ref(false)

      // 加载失败
      const loadError = (ev: Event) => {
        console.log(ev)

        console.log('图片错误')
        isImageError.value = true
        const img = ev.srcElement as any
        img.onerror = null
        isImageLoad.value = false
        emit('error')
      }

      // 加载成功才显示
      const loadSuccess = () => {
        if (isFirstLoad.value) return
        curr.value.style.display = 'block'
        console.log(curr.value.offsetTop)

        isFirstLoad.value = true
        isImageLoad.value = false
        emit('load')
        console.log('加载成功')
        return
      }

      onMounted(() => {
        console.log(curr)
      })

      return {
        initBem,
        stringParseFunc,
        onMounted,
        loadError,
        loadSuccess,
        isImageLoad,
        isImageError,
        curr
      }
    }
  })
</script>
