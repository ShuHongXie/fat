<template>
  <div class="home">
    234
    <fat-popup
      position="bottom"
      v-model:visible="state.show"
      :style="{
        height: '30%'
      }"
      duration="1"
      :overlay="false"
    />
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
      const state: State = reactive({
        count: 0,
        init: 0,
        double: computed(() => state.count * 2),
        arr: ['dajiao', 'teacher', 28],
        show: false
      })

      onMounted(() => {
        // eslint-disable-next-line vue/no-parsing-error
        setTimeout(() => {
          state.show = true
          console.log(state.show)
        }, 2000)

        setTimeout(() => {
          state.show = false
        }, 6000)
      })

      // watchEffect(onInvalidate => {
      //   console.log(`count的值为${state.count}`)
      //   console.log(`init${state.init}`)
      //   onInvalidate(() => {
      //     // id 改变时 或 停止侦听时
      //     // 取消之前的异步操作
      //     console.log('副作用清除xx')
      //   })
      // })

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

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
  }
</style>
