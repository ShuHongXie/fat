<template>
  <div :class="initBem()" :data-checked="modelValue">
    <div
      @click="change"
      :class="initBem('icon', [modelValue ? 'checked' : '', shape === 'round' ? 'round' : 'shape'])"
    >
      <slot name="icon" :props="props">
        <fat-icon name="select"></fat-icon>
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
    watchEffect,
    onMounted,
    inject,
    getCurrentInstance
  } from 'vue'
  import init from '@/utils/init'
  import config from '@/utils/config'
  import useParent from '@/utils/use/useParent'
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
      name: {
        type: String,
        default: ''
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('checkbox'))
      // 选中/反选
      const change = (e: Event) => {
        if (props.disabled) return
        emit('update:modelValue', !props.modelValue)
        emit('change', !props.modelValue)
        setTimeout(() => {
          emit('click')
        }, 0)
      }

      const parent = inject('fatCheckbox', null)

      onMounted(() => {
        // console.log(getCurrentInstance())
        // console.log(parent)
        // console.log('----------')
        // console.log(useParent('FatCheckboxGroup'))
      })

      return {
        initBem,
        change,
        props
      }
    }
  })
</script>

<style lang="scss">
  @import './index';
</style>
