<!--
 * @Author: your name
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-01-19 17:57:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/views/checkboxGroup/index.vue
-->
<template>
  <div
    :class="[
      initBem({
        [direction]: ''
      })
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    computed,
    watch,
    onBeforeMount,
    inject,
    ref,
    Ref,
    getCurrentInstance,
    onMounted
  } from 'vue'
  import init from '@/utils/init'
  import useChildren from '@/utils/use/useChildren'
  import config from '@/utils/config'
  import { v4 as uuidv4 } from 'uuid'
  export const COMPONENT_PARENT_NAME = 'checkboxGroup'
  export default defineComponent({
    name: `${config.frameworkName}CheckboxGroup`,
    props: {
      // 源数据
      modelValue: {
        type: Array,
        default: () => []
      },
      direction: {
        type: String,
        default: 'horizontal'
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('checkbox-group'))
      const [initBemCheckBox = initBem] = reactive(init('checkbox'))
      const { children, linkChildren } = useChildren(COMPONENT_PARENT_NAME)
      const value = reactive([])
      // const checkboxGroupRef: Ref<any> = ref(null)
      onBeforeMount(() => {
        linkChildren({
          emit,
          props
        })
        console.log('--s')
      })

      onMounted(() => {})

      const toggleAll = (options?: boolean) => {
        for (const child of children) {
          ;(child as any).toggle(typeof options === 'boolean' ? options : null)
        }
      }

      return {
        initBem,
        initBemCheckBox,
        toggleAll
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
