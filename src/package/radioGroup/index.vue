<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-01-19 17:57:42
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/views/radioGroup/index.vue
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
  import init from 'fat-ui/utils/init'
  import useChildren from 'fat-ui/utils/use/useChildren'
  import config from 'fat-ui/utils/config'
  export const COMPONENT_PARENT_NAME = 'radioGroup'
  export default defineComponent({
    name: `${config.frameworkName}RadioGroup`,
    props: {
      // 源数据
      modelValue: String,
      direction: {
        type: String,
        default: 'horizontal'
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('radio-group'))
      const { children, linkChildren } = useChildren(COMPONENT_PARENT_NAME)

      onBeforeMount(() => {
        linkChildren({
          emit,
          props
        })
      })

      return {
        initBem
      }
    }
  })
</script>
