/*
 * @Author: shuhongxie
 * @Date: 2020-11-27 11:33:39
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-04 10:21:16
 * @FilePath: /fat-ui/src/utils/general/maxZIndex.ts
 */
/**
 * @description 获取最大的zIndex值
 * @author shuhongxie
 * @export
 * @return {*}
 */
export default function maxZIndex(): number {
  const allDom = Array.from(document.querySelectorAll('body *'))
  const indexArr = []
  for (const i of allDom) {
    indexArr.push(Number(window.getComputedStyle(i).zIndex) || 0)
  }
  const zIndex = Math.max(...indexArr)
  return zIndex < 1000 ? zIndex + 1000 : zIndex
}
