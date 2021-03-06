/*
 * @Author: shuhongxie
 * @Date: 2021-02-17 21:19:41
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-03 22:05:08
 * @FilePath: /fat-ui/src/package/row/row.ts
 */
import { h, reactive, defineComponent, onMounted } from 'vue'
import init from 'fat-ui/utils/init'
import config from 'fat-ui/utils/config'

export default defineComponent({
  name: `${config.frameworkName}Row`,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    type: {
      type: String,
      default: ''
    },
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },
  setup(props, { slots, attrs, emit }) {
    const [initBem] = reactive(init('row'))
    // console.log(slots)
    // 返回render函数
    return () =>
      h(
        props.tag,
        {
          class: initBem({
            [props.type]: '',
            [props.type === 'flex' ? `justify-${props.justify}` : '']: '',
            [props.type === 'flex' ? `align-${props.align}` : '']: ''
          })
        },
        slots
      )
  }
})
