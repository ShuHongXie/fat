import { h, reactive, defineComponent, onMounted } from 'vue'
import init from '@/utils/init'
import config from '@/utils/config'
import './index.scss'

export default defineComponent({
  name: `${config.frameworkName}Col`,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    offset: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props, { slots, attrs, emit }) {
    const [initBem] = reactive(init('col'))
    // 返回render函数
    return () =>
      h(
        props.tag,
        {
          class: initBem({
            [props.span]: '',
            [props.offset !== 0 ? `offset-${props.offset}` : '']: ''
          }),
          style: {},
          onClick: (event: MouseEvent) => {
            // event.stopPropagation()
            emit('click', event)
          }
        },
        slots
      )
  }
})
