/*
 * @Author: shuhongxie
 * @Date: 2020-11-26 20:52:21
 * @Last Modified by: shuhongxie
 * @Last Modified time: 2020-11-27 15:05:44
 */
const CLASSNAME = 'fat--lock'
let lockCount = 0

/**
 * @description 自动加锁 防止背景滚动
 * @author shuhongxie
 * @param {boolean} status
 * @return {*}
 */
export default function lockFunc(status: boolean) {
  const lock = (): void => {
    if (status) {
      console.log(status)

      lockCount++
      if (!document.body.classList.contains(CLASSNAME)) {
        document.body.classList.add(CLASSNAME)
      }
    }
  }

  const unlock = (): void => {
    if (lockCount > 0) {
      lockCount--
      if (lockCount === 0) {
        document.body.classList.remove(CLASSNAME)
      }
    }
  }

  return [lock, unlock]
}
