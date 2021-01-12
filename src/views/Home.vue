<template>
  <div class="home">
    <fat-cell to="/other" value="value" title="title" size="large">
      <template #title>title1</template>
      <template #label>label2</template>
      value3
    </fat-cell>
    <!-- <router-link to="/other">Go to Home</router-link>
    {{ state.count }} -->
    <!-- <fat-popup
      position="left"
      clickMaskClose
      v-model:visible="state.show"
      round
      :style="{
        width: '30%',
        height: '100%'
      }"
      @open="open"
      @close="close"
    /> -->
    <!-- <fat-mask :visible="true" /> -->
    <van-icon class-prefix="my-icon" name="extra" />
    <fat-icon classPrefix="dsss" name="arrow-up-circle" color="red" dot></fat-icon>
    <fat-icon @click="clickIcon" name="arrow-up-circle" color="red" dot></fat-icon>
    <fat-row :tag="`span`" type="flex" @click="clickRow">
      <fat-col :span="6" offset="10">1312321</fat-col>
      <fat-col :span="6">21321</fat-col>
      <fat-col :span="6">12323112</fat-col>
    </fat-row>
    <!-- <van-row gutter="10">
      <van-col :span="8" offset="1">是的撒所多撒</van-col>
      <van-col :span="8">是的撒所多撒</van-col>
      <van-col :span="8">是的撒所多撒</van-col>
    </van-row> -->
    <!-- <fat-checkbox v-model="state.show" @change="change">
      复选框
      <template #icon="{ props }">
        <div>{{ props }}213</div>
      </template>
    </fat-checkbox> -->
    <!-- <van-checkbox-group v-model="checkData" direction="horizontal">
      <van-checkbox name="a">复选框 a</van-checkbox>
      <van-checkbox name="b">复选框 b</van-checkbox>
      <van-checkbox name="c">复选框 c</van-checkbox>
    </van-checkbox-group> -->
    <fat-checkbox-group v-model="checkData">
      <fat-cell>
        <div class="sdsd">
          <fat-checkbox name="a">复选框 a</fat-checkbox>
        </div>
      </fat-cell>
      <fat-checkbox name="b">复选框 b</fat-checkbox>
      <fat-checkbox name="c">复选框 c</fat-checkbox>
      <div>123</div>
    </fat-checkbox-group>
    <!-- <fat-checkbox-group v-model="checkData1">
      <fat-checkbox name="a">复选框 a</fat-checkbox>
      <fat-checkbox name="b">复选框 b</fat-checkbox>
    </fat-checkbox-group> -->
  </div>
</template>

<script lang="ts">
  import bem from '@/utils/init/bem'
  import {
    getCurrentInstance,
    defineComponent,
    reactive,
    computed,
    watchEffect,
    onMounted,
    toRef
  } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

  export interface State {
    count: number
    double?: number
    init: number
    show: boolean
  }

  export enum color {
    Red
  }

  export interface SquareConfig {
    color?: string
    width?: number
    [propName: string]: any
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

      const checkData = reactive(['a', 'b'])
      const checkData1: Array<boolean> = reactive([])

      const yanse: color = color.Red

      const pullPromise = () => {
        Promise.all([
          new Promise((res, rej) => {
            setTimeout(() => {
              console.log('1')
              res('1')
            }, 10000)
          }),
          new Promise((res, rej) => {
            setTimeout(() => {
              console.log('2')
              res('2')
            }, 10000)
          })
        ]).then(res => {
          console.log(res)
        })
      }

      const getup = (val: boolean) => {
        console.log(val)
      }

      const change = (bool: boolean) => {
        console.log(bool)
      }

      const onInput = (val: any) => {
        console.log(val)
      }

      onMounted(() => {
        // console.log(yanse)
        // pullPromise()
        // eslint-disable-next-line vue/no-parsing-error
        window.addEventListener('popstate', function () {
          console.log(history.state)
        })
        // setTimeout(() => {
        //   state.show = true
        //   console.log(state.show)
        // }, 2000)

        // setTimeout(() => {
        //   state.show = false
        // }, 6000)
      })

      const clickIcon = () => {
        console.log('clickIcon')
      }

      const clickRow = (e: MouseEvent) => {
        console.log('----')
        console.log(e)
      }

      const open = () => {
        console.log('open')
      }

      const close = () => {
        console.log('close')
      }

      return {
        state,
        open,
        close,
        clickRow,
        clickIcon,
        pullPromise,
        getup,
        change,
        checkData,
        checkData1,
        onInput
      }
    }
  })
</script>

<style lang="scss">
  @import '~@/style/index.scss';
  .home {
    width: 100%;
    height: 100%;

    &-box {
      width: 80px;
      height: 200%;
      background-color: black;
    }
    .test-box {
      width: 100%;
      height: 300px;
      position: relative;
      // border: 1px solid red;
      &::before {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 0 solid red;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }
    }
    .tbox {
      &::before {
        border-width: 1px 0;
      }
    }
  }
</style>
