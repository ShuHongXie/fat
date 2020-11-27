import { h, reactive, defineComponent } from 'vue'
import init from '@/utils/init'
import config from '@/utils/config'
import { Tag } from 'vant/types'
import initBem from '@/utils/init/bem'

export default defineComponent({
  name: `${config.frameworkName}Row`,
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, { slots, attrs, emit }) {
    const [initBem] = reactive(init('row'))
    // 返回render函数
    return () =>
      h(
        props.tag,
        {
          class: initBem()
        },
        slots?.default
      )
  }
})

// import Vue from 'vue'

// export const row = {
//   render(): Vue.VNode {
//     const { h } = Vue

//     return h(
//       'h' + this.props.level, // tag name
//       {}, // props/attributes
//       $slots.default() // array of children
//     )
//   },
//   name: `${config.frameworkName}Row`,
//   props: {
//     level: {
//       type: Number,
//       required: true
//     }
//   }
// }
