/* * @Author: shuhongxie * @Date: 2021-01-19 17:53:00 * @Last Modified by: shuhongxie * @Last
Modified time: 2021-01-19 17:53:00 */
<template>
  <div :class="initBem()" :data-checked="modelValue">
    <div
      @click="change"
      :class="
        initBem('icon', [
          checked ? 'checked' : '',
          shape === 'round' ? 'round' : 'shape',
          disabled ? 'disabled' : ''
        ])
      "
    >
      <slot name="icon" :props="props">
        <fat-icon
          name="select"
          :style="{
            backgroundColor: checked ? checkedColor : '',
            borderColor: checked ? checkedColor : ''
          }"
        ></fat-icon>
      </slot>
      <span :class="initBem('label')">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    computed,
    onMounted,
    inject,
    getCurrentInstance,
    ref,
    watch,
    onBeforeMount
  } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  import useParent from '@/utils/use/useParent'
  import { COMPONENT_PARENT_NAME } from '@/views/checkboxGroup/index.vue'
  export default defineComponent({
    name: `${config.frameworkName}Checkbox`,
    props: {
      // 选中颜色
      checkedColor: {
        type: String,
        default: '#1989fa'
      },
      // 源数据
      modelValue: {
        type: Boolean,
        default: false
      },
      // 是否与复选框绑定
      bindGroup: {
        type: Boolean,
        default: true
      },
      // 是否圆角显示
      shape: {
        type: String,
        default: 'square'
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 鉴别checkbox的唯一值
      name: {
        type: String,
        default: ''
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('checkbox'))
      let parent: any = reactive({})
      let parentObj: any = reactive({})
      // 选中的状态
      const checked = computed({
        get() {
          console.log(87)
          // 如果是和父级绑定 并且父级的值跟当前值相当 那么就等于父级的值
          if (
            props.bindGroup &&
            parent &&
            props.name === parent?.props.modelValue[parentObj.index.value]
          ) {
            return true
          } else if (
            props.bindGroup &&
            parent &&
            props.name !== parent?.props.modelValue[parentObj.index.value]
          ) {
            return false
          } else {
            return props.modelValue
          }
        },
        set(value) {
          return value
        }
      })

      // 初始化参数
      const initialize = (value: boolean = props.modelValue) => {
        console.log('开始初始化', parentObj.index, parent)
        if (props.bindGroup && parent) {
          const parentValue = parent?.props.modelValue
          parentValue[parentObj.index.value] = value ? props.name : ''
          parent?.emit('update:moduleValue', parentValue)
          parent?.emit('change', parentValue)
          return
        }
      }

      // 选中/反选
      const change = (e: Event) => {
        if (props.disabled) return
        initialize(!checked.value)
        emit('update:modelValue', !checked.value)
        emit('change', !checked.value)
        setTimeout(() => {
          emit('click')
        }, 0)
      }

      const toggle = (checked?: boolean) => {
        if (typeof checked === 'boolean') {
          if (props.bindGroup && parent) {
            const parentValue = parent?.props.modelValue
            parentValue[parentObj.index.value] = checked ? props.name : ''
            parent?.emit('update:moduleValue', parentValue)
            parent?.emit('change', parentValue)
          } else {
            emit('update:moduleValue', checked ? true : false)
            emit('change', checked ? true : false)
          }
        } else {
          if (props.bindGroup && parent) {
            const parentValue = parent?.props.modelValue
            parentValue[parentObj.index.value] = !parentValue[parentObj.index.value]
              ? props.name
              : ''
            parent?.emit('update:moduleValue', parentValue)
            parent?.emit('change', parentValue)
          } else {
            emit('update:moduleValue', !checked)
            emit('change', !checked)
          }
        }
      }

      onBeforeMount(() => {
        // 账号绑定
        if (props.bindGroup) {
          parentObj = useParent(COMPONENT_PARENT_NAME)
          parent = parentObj.parent
          console.log
        }
      })

      watch(
        () => props.modelValue,
        n => {
          emit('change', props.modelValue)
        }
      )

      return {
        initBem,
        change,
        checked,
        initialize,
        props,
        toggle
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
