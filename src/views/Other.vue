<!--
 * @Author: shuhongxie
 * @Date: 2021-02-08 21:22:47
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-16 14:44:49
 * @FilePath: /fat-ui/src/views/Other.vue
-->
<template>
  <div class="home">
    <div id="z1">1</div>
    <div id="z2">2</div>
  </div>
</template>

<script lang="ts">
  import bem from 'fat-ui/utils/init/bem'
  import { defineComponent, reactive, computed, watchEffect, onMounted, toRef } from 'vue'
  // import HelloWorld from 'fat-ui/components/HelloWorld.vue' // @ is an alias to /src

  export interface State {
    count: number
    double?: number
    init: number
    show: boolean
  }

  export default defineComponent({
    name: 'Home',
    // components: {
    //   HelloWorld
    // },

    setup() {
      onMounted(() => {
        const z1 = document.querySelector('#z1')
        const z2 = document.querySelector('#z2')
        console.log(z1.getBoundingClientRect().top, z2.getBoundingClientRect().top)

        console.log()
      })
      return {}
    }
  })
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    #z1 {
      width: 300px;
      height: 300px;
    }
    #z2 {
      width: 300px;
      height: 300px;
    }
    &-box {
      width: 80px;
      height: 200%;
      background-color: black;
    }
  }
</style>
