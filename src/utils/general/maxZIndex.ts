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
  console.log(indexArr)
  const zIndex = Math.max(...indexArr)
  return zIndex < 1000 ? zIndex + 1000 : zIndex
}
