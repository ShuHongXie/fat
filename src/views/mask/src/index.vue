<template>
  <teleport :to="teleport">
    <transition name="fade">
      <div
        :class="initBem()"
        :style="{
          zIndex
        }"
        v-if="visible"
      ></div>
    </transition>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, onMounted } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Mask`,
    props: {
      zIndex: {
        type: Number,
        default: 2
      },
      visible: {
        type: Boolean,
        default: false
      },
      teleport: {
        type: String,
        default: 'body'
      }
    },
    setup() {
      const [initBem] = reactive(init('mask'))
      return {
        initBem
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
