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
          console.log(props.bindGroup, parentObj)
          if (props.bindGroup && props.name === parent?.props.modelValue[parentObj.index.value]) {
            return true
          } else if (
            props.bindGroup &&
            props.name !== parent?.props.modelValue[parentObj.index.value]
          ) {
            return false
          } else {
            return props.modelValue
          }
        },
        set(value) {
          // emit('update:moduleValue', value)
          return value
        }
      })

      // 初始化参数
      const initialize = (value: boolean = props.modelValue) => {
        console.log('开始初始化', parentObj.index)
        if (props.bindGroup) {
          const parentValue = parent?.props.modelValue
          console.log(parentValue)
          parentValue[parentObj.index.value] = value ? props.name : ''
          console.log(parentValue)
          parent?.emit('update:moduleValue', parentValue)
        }
        return
      }

      // 选中/反选
      const change = (e: Event) => {
        if (props.disabled) return
        console.log(!checked.value)
        initialize(!checked.value)
        emit('update:modelValue', !checked.value)
        emit('change', !checked.value)
        setTimeout(() => {
          emit('click')
        }, 0)
      }

      onBeforeMount(() => {
        // 账号绑定
        if (props.bindGroup) {
          parentObj = useParent(COMPONENT_PARENT_NAME)
          parent = parentObj.parent
          // initialize()
        }
        // console.log(getCurrentInstance())
        console.log(parent?.props.modelValue, parentObj.index)
      })

      // watch(
      //   () => parent.modelValue,
      //   n => {
      //     console.log('nnn')
      //     initialize()
      //   }
      // )

      // watch(
      //   () => value,
      //   n => {
      //     console.log('xxxxx')
      //     console.log(value)
      //     console.log(parent)
      //     initialize()
      //   }
      //   // {
      //   //   immediate: true
      //   // }
      // )

      return {
        initBem,
        change,
        checked,
        initialize,
        props
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
