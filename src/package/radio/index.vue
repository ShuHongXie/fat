<template>
  <div :class="initBem()" :data-checked="checked">
    <div
      @click="change"
      :class="
        initBem('icon', [
          checked ? 'checked' : '',
          shape === 'round' ? 'round' : 'shape',
          isParentDisabled || disabled ? 'disabled' : ''
        ])
      "
    >
      <slot name="icon" :props="props" @click="change">
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
  import init from 'fat-ui/utils/init'
  import config from 'fat-ui/utils/config'
  import useParent from 'fat-ui/utils/use/useParent'
  import fatIcon from 'fat-ui/package/icon'
  export default defineComponent({
    name: `${config.frameworkName}Radio`,
    components: {
      fatIcon
    },
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
      // 是否圆角显示 round | square
      shape: {
        type: String,
        default: 'round'
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 鉴别radio的唯一值
      name: {
        type: String,
        default: ''
      },
      // 文本区域是否可点击
      labelDisabled: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const [initBem] = reactive(init('radio'))
      let parent: any = reactive({})
      let parentObj: any = reactive({})
      // 选中的状态
      const checked = computed({
        get() {
          return props.name === parent?.props.modelValue
        },
        set(value) {
          return value
        }
      })

      // 父级是否为禁止状态
      const isParentDisabled = computed(() => parent?.props && parent?.props.disabled)

      // 初始化参数
      /**
       * @Description: 参数初始化
       * @Author: shuhongxie
       * @param {*} initialize 父级的值
       */
      const initialize = (value: boolean = props.modelValue) => {
        console.log('开始初始化', parentObj.index, parent)
        if (!parent) throw '请使用fat-radio-group包裹fat-radio'
        let parentValue = parent?.props.modelValue
        parentValue = value ? props.name : ''
        parent.emit('update:modelValue', parentValue)
        parent.emit('change', parentValue)
        emit('click')
        return
      }

      /**
       * @Description: 选中/反选
       * @Author: shuhongxie
       * @param {*} change
       */
      const change = (e: Event | null) => {
        // 是否禁用
        if (props.disabled || isParentDisabled.value) return
        // 是否禁止文本区域点击
        if ((e?.target as HTMLElement).className === 'fat-radio__label' && props.labelDisabled)
          return
        initialize(true)
      }

      onBeforeMount(() => {
        // 账号绑定
        parentObj = useParent('radioGroup')
        parent = parentObj.parent
      })

      return {
        initBem,
        change,
        checked,
        initialize,
        props,
        parent,
        parentObj,
        isParentDisabled
      }
    }
  })
</script>
