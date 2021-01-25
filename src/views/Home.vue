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
    <button @click="toggle">toggle测试</button>
    <button @click="radioData = 'c'">单选测试</button>
    <button @click="routerpush">路由跳转</button>
    <!-- <fat-checkbox v-model="state.show" @change="change">
      复选框
      <template #icon="{ props }">
        <div>{{ props }}213</div>
      </template>
    </fat-checkbox> -->
    <fat-checkbox-group
      direction="vertical"
      ref="doms"
      v-model="checkData"
      @change="changeCheckboxGroup"
    >
      <fat-cell>
        <div class="sdsd">
          <fat-checkbox checked-color="red" name="a">复选框 a</fat-checkbox>
        </div>
      </fat-cell>
      <fat-checkbox labelDisabled checked-color="#999" name="b">复选框 b</fat-checkbox>
      <fat-checkbox name="c" v-model="state.show" :bind-group="false">复选框 c</fat-checkbox>
      <fat-checkbox name="d">复选框 d</fat-checkbox>
      <div>123</div>
    </fat-checkbox-group>
    <fat-radio-group direction="vertical" v-model="radioData" @change="changeRadioGroup">
      <!-- <fat-cell>
        <div class="sdsd">
          <fat-radio checked-color="red" name="a">复选框 a</fat-radio>
        </div>
      </fat-cell> -->
      <fat-radio labelDisabled name="b">单选框 b</fat-radio>
      <fat-radio name="c">单选框 c</fat-radio>
      <fat-radio name="d">单选框 d</fat-radio>
    </fat-radio-group>
    <!-- <fat-toast></fat-toast> -->
    <!-- <hello-world v-model="radioData" /> -->
  </div>
</template>

<script lang="ts">
  import bem from '@/utils/init/bem'
  import Vue from 'vue'
  import {
    getCurrentInstance,
    defineComponent,
    reactive,
    computed,
    watchEffect,
    onMounted,
    inject,
    ref
  } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

  export interface State {
    count: number
    double?: number
    init: number
    show: boolean
    radioData: string
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
    setup(props, context) {
      const state: State = reactive({
        count: 0,
        init: 0,
        double: computed(() => state.count * 2),
        arr: ['dajiao', 'teacher', 28],
        show: false,
        radioData: 'd'
      })

      const toastProvide = inject('toast', null)

      const curr = getCurrentInstance()

      const doms = ref(null)

      const checkData = reactive([])
      const radioData = ref('b')
      const checkData1: Array<boolean> = reactive([])

      const yanse: color = color.Red

      const pullPromise = () => {}

      const getup = (val: boolean) => {
        console.log(val)
      }

      const change = (bool: boolean) => {
        console.log(bool)
      }

      const onInput = (val: any) => {
        console.log(val)
      }

      const routerpush = () => {
        // console.log(curr?.proxy?.$toast)
        ;(curr?.proxy?.$toast as any).init()
        // curr?.proxy?.$router.push('/other')
      }

      onMounted(() => {
        console.log(toastProvide, typeof getCurrentInstance()?.proxy?.$toast)
        // getCurrentInstance()?.proxy?.$toast('')

        // getCurrentInstance()?.proxy?.$toast()
        // eslint-disable-next-line vue/no-parsing-error
        // window.addEventListener('popstate', function () {
        //   console.log(history.state)
        // })
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

      const changeCheckboxGroup = (arr: any) => {
        console.log(arr)
      }

      const changeRadioGroup = (value: string) => {
        console.log(radioData.value)

        console.log(value)
      }

      const toggle = () => {
        ;(doms as any).value.toggleAll()
        console.log(doms.value)
      }

      const getRadioValue = (val: any) => {
        console.log('默认值')
        console.log(val)
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
        onInput,
        changeCheckboxGroup,
        doms,
        toggle,
        radioData,
        changeRadioGroup,
        getRadioValue,
        routerpush,
        toastProvide
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
