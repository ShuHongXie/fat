<!--
 * @Author: shuhongxie
 * @Date: 2021-01-07 20:34:26
 * @LastEditTime: 2021-03-03 22:03:52
 * @LastEditors: shuhongxie
 * @Description: In User Settings Edit
 * @FilePath: /fat-ui/src/package/checkboxGroup/index.vue
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
  export const COMPONENT_PARENT_NAME = 'checkboxGroup'
  export default defineComponent({
    name: `${config.frameworkName}CheckboxGroup`,
    props: {
      // 源数据
      modelValue: {
        type: Array,
        default: (): any => []
      },
      // 布局方向 horizontal | vertical
      direction: {
        type: String,
        default: 'horizontal'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('checkbox-group'))
      const { children, linkChildren } = useChildren(COMPONENT_PARENT_NAME)
      const value = reactive([])
      // const checkboxGroupRef: Ref<any> = ref(null)
      onBeforeMount(() => {
        linkChildren({
          emit,
          props
        })
      })

      /**
       * @Description: 控制子级全选或反选/
       * @Author: shuhongxie
       * @param {*} toggle true: 勾选 false: 取消勾选 (空): 反选
       */
      const toggleAll = (options?: boolean) => {
        for (const child of children) {
          ;(child as any).toggle(typeof options === 'boolean' ? options : null)
        }
      }

      return {
        initBem,
        toggleAll
      }
    }
  })
</script>
