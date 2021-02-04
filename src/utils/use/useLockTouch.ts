/*
 * @Author: shuhongxie
 * @Date: 2021-02-04 14:54:19
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-04 14:59:49
 * @FilePath: /fat-ui/src/utils/use/useLockTouch.ts
 */

let lockTouchCount = 0

/**
 * @Description: 全局点击事件禁止
 * @Author: shuhongxie
 * @param {boolean} isLock: true: 锁定  false: 解锁
 */
export default function useLockTouch(isLock: boolean) {
  const touchLock = (): void => {
    if (isLock) {
      lockTouchCount++
      document.addEventListener(
        'touchstart',
        ev => {
          ev.preventDefault()
        },
        { passive: false }
      )
    }
  }

  const unTouchLock = (): void => {
    if (lockTouchCount > 0) {
      lockTouchCount--
      if (lockTouchCount === 0) {
        document.removeEventListener('touchstart', ev => {})
      }
    }
  }

  return [touchLock, unTouchLock]
}
