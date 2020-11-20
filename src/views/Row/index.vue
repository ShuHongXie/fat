<template>
  <div class="home"></div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

  export interface State {
    count: number
    double?: number
    init: number
  }

  export default defineComponent({
    name: 'Home',
    components: {
      HelloWorld
    },
    setup() {
      const state: State = reactive({
        count: 0,
        init: 0,
        double: computed(() => state.count * 2),
        arr: ['dajiao', 'teacher', 28]
      })

      // const s: State = reactive({
      //   count: 123,
      //   init: 444
      // })
      watchEffect(onInvalidate => {
        console.log(`count的值为${state.count}`)
        console.log(`init${state.init}`)
        onInvalidate(() => {
          // id 改变时 或 停止侦听时
          // 取消之前的异步操作
          console.log('副作用清除xx')
        })
      })

      function increment(): void {
        const res = [1, 2, 3]
        state.count++
      }

      return {
        state,
        increment
      }
    }
  })
</script>
