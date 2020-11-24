<template>
  <transition>
    <div class="fat-mask"></div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, onMounted } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  export default defineComponent({
    name: `${config.frameworkName}Mask`,
    setup() {
      const [initBem] = init('mask')
      return {}
    }
  })
</script>
