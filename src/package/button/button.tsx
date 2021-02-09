/*
 * @Author: shuhongxie
 * @Date: 2021-02-07 20:03:15
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-09 19:51:17
 * @FilePath: /fat-ui/src/package/button/button.tsx
 */
import { defineComponent, ref, PropType, reactive } from 'vue'
import init from '@/utils/init'
import { useRoute, routeProps } from '@/utils/use/useRoute'
import config from '@/utils/config'
import stringParse from '@/utils/general/stringParse'
import './index.scss'

//  "button": "./src/package/button/index.ts",
export default defineComponent({
  name: `${config.frameworkName}Button`,
  props: {
    // 按钮根节点的 HTML 标签	string	button
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'button'
    },
    // 类型 可选值为 primary success warning danger	string default
    type: {
      type: String,
      default: 'default'
    },
    // 按钮颜色
    color: {
      type: String,
      default: ''
    },
    // 按钮大小 large small mini normal
    size: {
      type: String,
      default: 'normal'
    },
    // icon名字
    icon: {
      type: String,
      default: ''
    },
    // icon属性前缀
    iconPrefix: {
      type: String,
      default: 'fat-icon'
    },
    // 图标展示位置 right left
    iconPosition: {
      type: String,
      default: 'left'
    },
    // 原生 button 标签的 type 属性
    nativeType: {
      type: String,
      default: 'left'
    },
    // 是否为块级元素
    block: {
      type: Boolean,
      default: false
    },
    // 是否为朴素按钮
    plain: {
      type: Boolean,
      default: false
    },
    // 是否为方形按钮
    square: {
      type: Boolean,
      default: false
    },
    // 是否为圆形按钮
    round: {
      type: Boolean,
      default: false
    },
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否使用 0.5px 边框
    hairline: {
      type: Boolean,
      default: false
    },
    // 是否显示为加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 加载状态提示文字
    loadingText: {
      type: String,
      default: 'left'
    },
    // 加载图标类型，可选值为spinner	string	circular
    loadingType: {
      type: String,
      default: 'left'
    },
    // 加载图标大小
    loadingSize: {
      type: String,
      default: '20px'
    },
    // 样式
    style: {
      type: Object,
      default: () => {}
    },
    className: {
      type: String,
      default: ''
    },
    ...routeProps
  },
  setup(props, { slots }) {
    const [initBem] = reactive(init('button'))
    const route = useRoute()

    return () => {
      const {
        tag,
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        icon,
        iconPrefix,
        iconPosition,
        loadingSize,
        loadingText,
        style,
        color,
        className
      } = props

      const onClick = () => {
        if (!props.to && !props.url) return
        if (props.url) {
          location.href = props.url
          return
        }
        if (props.to || props.replace) {
          route()
        }
      }

      return (
        <tag
          type={nativeType}
          class={[
            initBem({
              [type]: '',
              [size]: '',
              [round ? 'round' : '']: '',
              [block ? 'block' : '']: '',
              [plain ? 'plain' : '']: '',
              [square ? 'square' : '']: '',
              [loading ? 'loading' : '']: '',
              [disabled ? 'disabled' : '']: '',
              [hairline ? 'hairline' : '']: ''
            }),
            className
          ]}
          style={{
            ...style,
            background: color
          }}
          disabled={disabled}
          onClick={onClick}
        >
          <div class={initBem('content')}>
            {icon && !loading && iconPosition !== 'right' ? (
              <fat-icon size={loadingSize} name={`-${icon}`} classPrefix={iconPrefix} />
            ) : (
              ''
            )}
            {loading ? <fat-loading size={loadingSize} text={loadingText} /> : ''}
            <span class={initBem('text')}>{slots.default ? slots.default() : null}</span>
            {icon && !loading && iconPosition === 'right' ? (
              <fat-icon size={loadingSize} name={`-${icon}`} classPrefix={iconPrefix} />
            ) : (
              ''
            )}
          </div>
        </tag>
      )
    }
  }
})
