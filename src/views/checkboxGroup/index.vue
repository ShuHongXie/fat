<template>
  <div :class="[initBem(), checkboxGroupRef]" ref="checkboxGroupRef">
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
    inject,
    ref,
    Ref,
    getCurrentInstance
  } from 'vue'
  import init from '@/utils/init'

  import config from '@/utils/config'
  import { v4 as uuidv4 } from 'uuid'
  export default defineComponent({
    name: `${config.frameworkName}CheckboxGroup`,
    props: {
      // 源数据
      modelValue: {
        type: Array,
        default: () => []
      }
    },
    setup(props, context) {
      const [initBem] = reactive(init('checkbox-group'))
      const [initBemCheckBox = initBem] = reactive(init('checkbox'))
      const value = reactive([])
      const checkboxGroupRef: Ref<any> = ref(null)
      onMounted(() => {
        console.log(getCurrentInstance())

        // for (const child of checkboxGroupRef.value.childNodes) {
        //   if (child.childNodes.classList.includes(initBemCheckBox())) {
        //     // eslint-disable-next-line no-prototype-builtins
        //     if (child.childNodes.attributes.hasOwnProperty('name')) {
        //       // this.
        //     }
        //   }
        // }
        // const doms: NodeList = document.querySelectorAll(
        //   `.${checkboxGroupRef.value} .${initBemCheckBox()}`
        // )
        // console.log(doms)
        // console.log(props, context)
      })
      return {
        initBem,
        initBemCheckBox,
        checkboxGroupRef
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
