/*
 * @Author: shuhongxie
 * @Date: 2021-02-23 15:10:03
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-23 15:34:59
 * @FilePath: /fat-ui/types/index.d.ts
 */
import { App } from 'vue'
import { FatComponent } from './component'
// import { Dialog } from './dialog'
import { Toast } from './toast'

export const install: (app: App) => any

export class button extends FatComponent {}
export class cell extends FatComponent {}
export class col extends FatComponent {}
export class icon extends FatComponent {}
export class image extends FatComponent {}
export class info extends FatComponent {}
export class loading extends FatComponent {}
export class mask extends FatComponent {}
export class popup extends FatComponent {}
export class radio extends FatComponent {}
export class radioGroup extends FatComponent {}
export class rate extends FatComponent {}
export class row extends FatComponent {}

export { Toast }
