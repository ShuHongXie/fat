/*
 * @Author: shuhongxie
 * @Date: 2021-02-23 15:06:45
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-03 22:52:57
 * @FilePath: /fat-ui/types/component.d.ts
 */
import Vue, { App } from 'vue'

export class FatComponent {
  static name: string

  static install: (app: App) => any

  $props: Record<string, any>
}
