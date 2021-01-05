import init from '@/utils/init'
import Vue from 'vue'

const [initBem, initComponents] = init('mask')

export default initComponents({
  name: 'mask',
  props: {},
  setup(props) {
    console.log(props)
    const renderMask = () => <div class={initBem()}></div>

    return () => {
      return <transition name="fade">{renderMask()}</transition>
    }
  }
})
