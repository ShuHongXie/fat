<template>
  <div class="home">
    <fat-cell value="value" title="title" size="large">
      <template #title>
        title1
      </template>
      <template #label>
        label2
      </template>
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
    <van-cell>
      <template #title>
        title
      </template>
      <template #label>
        label
      </template>
      1232
    </van-cell>
    <div class="test-box tbox">
      1321
    </div>
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
        window.addEventListener('popstate', function() {
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

      function increment(): void {
        const res = [1, 2, 3]
        state.count++
      }

      return {
        state,
        increment,
        open,
        close,
        clickRow,
        clickIcon
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
