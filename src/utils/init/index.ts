/*
 * @Author: shuhongxie
 * @Date: 2020-11-19 19:58:21
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-08 23:20:17
 * @FilePath: /fat-ui/src/utils/init/index.ts
 */
import { defineComponent } from 'vue'
import initBem from './bem'
// import initComponents from './component'

export default function init(name: string) {
  return [initBem(name)]
}
