<template>
  <teleport :to="teleport">
    <transition :name="position === 'center' ? 'van-fade' : `van-popup-slide-${position}`">
      <div :class="initBem()"></div>
    </transition>
  </teleport>
  <fat-mask :teleport="teleport" :visible="visible" />
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, onMounted } from 'vue'
  import mask from '../mask/src/index.vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Popup`,
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
      },
      // 位置 top | bottom | right | left
      position: {
        type: String,
        default: 'center'
      }
    },
    setup() {
      console.log(mask)
      const [initBem] = reactive(init('popup'))
      return {
        initBem
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
