<template>
  <i
    :class="initBem({ [name]: name })"
    :style="{
      color,
      fontSize: typeof size === 'number' ? `${size}px` : size
    }"
    @click="$emit('click')"
  >
    <div v-if="dot" :class="initInfoBem({ dot })"></div>
    <div v-if="badge" :class="initInfoBem({ badge })">{{ badge }}</div>
  </i>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
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
        type: Boolean,
        defult: false
      }
    },
    emits: [],
    setup(props, { emit }) {
      const [initBem] = reactive(init('icon'))
      const [initInfoBem] = reactive(init('info'))
      return {
        initBem,
        initInfoBem
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
