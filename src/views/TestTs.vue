<template>
  <div class="test">测试测试</div>
</template>

<script lang="ts">
  export interface SquareConfig {
    color?: string
    width?: number
    [key: string]: any
  }

  export interface NumberObj {
    length: number
  }
  import {
    getCurrentInstance,
    defineComponent,
    reactive,
    computed,
    watchEffect,
    onMounted,
    toRef,
    ref
  } from 'vue'
  export default defineComponent({
    setup() {
      const res = reactive({})

      const testInterface = (config: SquareConfig): { color: string; area: number } => {
        return {
          color: config.color || 'red',
          area: config.width ? config.width * config.width : 20
        }
      }

      const testFunc = (firstName: string, lastName = 'Smith'): string => {
        return firstName + ' ' + lastName
      }

      function identity<T extends NumberObj>(arg: T): T {
        console.log(arg.length)
        return arg
      }

      onMounted(() => {
        // console.log(testInterface({ colour: 'red' }))
        const result1 = testFunc('Bob') // works correctly now, returns "Bob Smith"
        const result2 = testFunc('Bob', undefined) // still works, also returns "Bob Smith"
        // const result3 = testFunc('Bob', 'Adams', 'Sr.') // error, too many parameters

        console.log(identity([]))
      })
      return {
        testInterface,
        testFunc
      }
    }
  })
</script>

<style lang="scss" scoped></style>
