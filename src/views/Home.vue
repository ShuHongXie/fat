<template>
  <div class="home">
    <!-- <router-link to="/other">Go to Home</router-link>
    {{ state.count }} -->
    <!-- <div class="home-box"></div> -->
    <!-- <fat-popup
      position="top"
      clickMaskClose
      v-model:visible="state.show"
      round
      :style="{
        height: '30%'
      }"
      @open="open"
      @close="close"
    /> -->
    <fat-row>
      <fat-col :span="8">1312321</fat-col>
      <fat-col :span="8">21321</fat-col>
      <fat-col :span="8">12323112</fat-col>
    </fat-row>
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
        setTimeout(() => {
          state.show = true
          console.log(state.show)
        }, 2000)

        // setTimeout(() => {
        //   state.show = false
        // }, 6000)
      })

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
        close
      }
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
