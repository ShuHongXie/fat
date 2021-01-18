<template>
  <div :class="[initBem()]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    computed,
    watchEffect,
    onMounted,
    onBeforeMount,
    inject,
    ref,
    Ref,
    getCurrentInstance
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
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('checkbox-group'))
      const [initBemCheckBox = initBem] = reactive(init('checkbox'))
      const value = reactive([])
      // const checkboxGroupRef: Ref<any> = ref(null)
      onBeforeMount(() => {
        console.log(getCurrentInstance())
        const { children, linkChildren } = useChildren(COMPONENT_PARENT_NAME)
        linkChildren({
          emit,
          props
        })
        const value = []
      })
      return {
        initBem,
        initBemCheckBox
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
