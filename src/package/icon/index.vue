<!--
 * @Author: shuhongxie
 * @Date: 2020-12-01 20:43:46
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-04 23:10:06
 * @FilePath: /fat-ui/src/views/icon/index.vue
-->
<template>
  <i
    :class="
      classPrefix
        ? name
          ? `${classPrefix} ${classPrefix}-${name}`
          : `${classPrefix}`
        : initBem({ [name]: name })
    "
    :style="{
      color,
      fontSize: stringParseFunc(size),
      ...style
    }"
  >
    <div v-if="dot" :class="initInfoBem({ dot })"></div>
    <div v-if="badge" :class="initInfoBem({ badge })">{{ badge }}</div>
    <slot v-if="isImage"><img :src="name" :class="initBem('image')" alt="" /></slot>
  </i>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import init from 'fat-ui/utils/init'
  import config from 'fat-ui/utils/config'
  import stringParse from 'fat-ui/utils/general/stringParse'
  export default defineComponent({
    name: `${config.frameworkName}Icon`,
    props: {
      // 名称
      name: {
        type: String,
        defult: ''
      },
      // 字体大小 px, em
      size: {
        type: String,
        defult: ''
      },
      // 颜色
      color: {
        type: [String, Number],
        defult: ''
      },
      // 红点标识
      dot: {
        type: Boolean,
        defult: false
      },
      // 红点标识
      badge: {
        type: [Boolean, String],
        defult: false
      },
      // 自定义前缀
      classPrefix: {
        type: String,
        defult: 'fat'
      },
      // 样式
      style: {
        type: Object,
        default: () => {}
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('icon'))
      const [initInfoBem] = reactive(init('info'))
      const isImage = ref(false)
      const stringParseFunc = (value: number | string) => stringParse(value)

      onMounted(() => {
        isImage.value = props.name.includes('/')
      })

      return {
        initBem,
        initInfoBem,
        stringParseFunc,
        isImage,
        onMounted
      }
    }
  })
</script>
