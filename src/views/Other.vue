<template>
  <div class="home">
    other
  </div>
</template>

<script lang="ts">
  import bem from '@/utils/init/bem'
  import { defineComponent, reactive, computed, watchEffect, onMounted, toRef } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

  export interface State {
    count: number
    double?: number
    init: number
    show: boolean
  }

  export default defineComponent({
    name: 'Home',
    components: {
      HelloWorld
    },
    setup() {
      return {}
    }
  })
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;

    &-box {
      width: 80px;
      height: 200%;
      background-color: black;
    }
  }
</style>
