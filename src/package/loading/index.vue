<!--
 * @Author: shuhongxie
 * @Date: 2021-02-01 21:27:56
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 14:04:33
 * @FilePath: /fat-ui/src/package/loading/index.vue
-->
<template>
  <span
    :class="[
      initBem({
        [vertical ? 'vertical' : '']: ''
      })
    ]"
  >
    <span :class="initBem('warp')">
      <fat-icon name="loading" :color="color" :size="size"></fat-icon>
      <!-- <span :class="[initBem('rotate')]" :style="overLayStyle"></span> -->
    </span>
    <span
      :class="initBem('text')"
      :style="{ fontSize: stringParseFunc(textSize), color: textColor }"
      v-if="text"
    >
      {{ text }}
    </span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import init from 'fat-ui/utils/init'
  import config from 'fat-ui/utils/config'
  import stringParse from 'fat-ui/utils/general/stringParse'
  import fatIcon from 'fat-ui/package/icon'
  export default defineComponent({
    name: `${config.frameworkName}Loading`,
    components: {
      fatIcon
    },
    props: {
      // 颜色
      color: {
        type: String,
        default: '#C9C9C9'
      },
      // 类型
      type: {
        type: String,
        default: 'circular'
      },
      // icon图标大小
      size: {
        type: [String, Number],
        default: '30px'
      },
      text: {
        type: String,
        default: ''
      },
      // 字体大小
      textSize: {
        type: [String, Number],
        default: '14px'
      },
      // 字体大小
      textColor: {
        type: String,
        default: '#C9C9C9'
      },
      // 是否竖向排列
      vertical: {
        type: Boolean,
        default: false
      },
      overLayStyle: {
        type: Object,
        default: () => {}
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('loading'))
      const stringParseFunc = (value: number | string) => stringParse(value)

      return {
        initBem,
        stringParseFunc
      }
    }
  })
</script>
