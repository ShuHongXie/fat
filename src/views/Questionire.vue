<template>
  <div class="questionire">
    <van-checkbox-group v-model="result.value" direction="horizontal">
      <van-checkbox name="a">复选框 a</van-checkbox>
      <van-checkbox name="b">复选框 b</van-checkbox>
    </van-checkbox-group>
    <van-icon name="chat-o" dot />
    <van-radio-group v-model="state.radio">
      <van-radio name="1">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
    {{ state.count }}
  </div>
</template>

<script lang="ts">
  // import { test } from '../../test.js'
  import { defineComponent, reactive, computed, watchEffect, ref } from 'vue'
  export interface State {
    count: number
    double?: number
    init: number
  }

  export default defineComponent({
    name: 'Home',
    setup() {
      const state: State = reactive({
        count: 0,
        init: 0,
        radio: '1',
        double: computed(() => state.count * 2),
        arr: ['dajiao', 'teacher', 28],
        result: []
      })

      const result = ref(['a'])
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
        state.count++
      }

      return {
        state,
        increment,
        result
      }
    }
  })
</script>

<style lang="scss" scoped>
  .questionire {
  }
</style>
